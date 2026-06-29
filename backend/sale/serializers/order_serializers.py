from rest_framework import serializers

from sale.models import SalesOrder
from sale.serializers.quotation_serializers import SalesQuotationLineSerializer


class OrderCreateOrUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesOrder
        fields = "__all__"


class OrderGetSerializer(serializers.ModelSerializer):
    order_type_name = serializers.CharField(source="order_type.name", read_only=True)
    quotation_no = serializers.CharField(source="quotation.quotation_no", read_only=True)
    lines = SalesQuotationLineSerializer(source="quotation.lines", many=True, read_only=True)

    class Meta:
        model = SalesOrder
        fields = "__all__"
        depth = 2
