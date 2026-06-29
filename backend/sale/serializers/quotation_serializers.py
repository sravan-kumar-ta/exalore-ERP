from rest_framework import serializers

from sale import models
from sale.calculator import initialize_totals, calculate_amounts, update_totals, apply_totals


class SalesQuotationLineSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    item_code = serializers.CharField(source="item.item_code", read_only=True)

    class Meta:
        model = models.SalesQuotationLine
        exclude = ("quotation",)


class SalesQuotationSerializer(serializers.ModelSerializer):
    lines = SalesQuotationLineSerializer(many=True)

    class Meta:
        model = models.SalesQuotation
        fields = "__all__"
        read_only_fields = (
            "gross_amount",
            "discount_amount",
            "net_amount",
            "vat_amount",
            "net_after_vat",
        )

    def create(self, validated_data):
        lines_data = validated_data.pop("lines")
        quotation = models.SalesQuotation.objects.create(**validated_data)
        totals = initialize_totals()

        for line in lines_data:
            amounts = calculate_amounts(line)
            models.SalesQuotationLine.objects.create(quotation=quotation, **amounts, **line)
            update_totals(totals, amounts)

        apply_totals(quotation, totals)
        quotation.save()

        return quotation

    def update(self, instance, validated_data):
        lines_data = validated_data.pop("lines", [])

        for field, value in validated_data.items():
            setattr(instance, field, value)

        existing_lines = {line.id: line for line in instance.lines.all()}
        incoming_ids = set()
        totals = initialize_totals()

        for line_data in lines_data:
            line_id = line_data.pop("id", None)
            amounts = calculate_amounts(line_data)

            if line_id:
                line = existing_lines.get(line_id)
                if not line:
                    raise serializers.ValidationError(f"Line {line_id} does not exist.")

                for field, value in line_data.items():
                    setattr(line, field, value)

                for field, value in amounts.items():
                    setattr(line, field, value)

                line.save()
                incoming_ids.add(line_id)

            else:
                line = models.SalesQuotationLine.objects.create(quotation=instance, **line_data, **amounts)
                incoming_ids.add(line.id)

            update_totals(totals, amounts)

        instance.lines.exclude(id__in=incoming_ids).delete()
        apply_totals(instance, totals)
        instance.save()

        return instance


class SalesQuotationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SalesQuotation
        fields = (
            "id",
            "quotation_no",
            "customer",
            "quotation_date",
            "sales_executive",
            "delivery_place",
            "net_amount",
        )
