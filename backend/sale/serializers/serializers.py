from rest_framework import serializers

from sale import models


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = "__all__"


class SalesExecutiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SalesExecutive
        fields = "__all__"


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Currency
        fields = "__all__"


class QuotationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuotationType
        fields = "__all__"


class DocumentTemplateSerializer(serializers.ModelSerializer):
    header_url = serializers.SerializerMethodField()
    footer_url = serializers.SerializerMethodField()

    class Meta:
        model = models.DocumentTemplate
        fields = "__all__"

    def get_header_url(self, obj):
        request = self.context["request"]

        if obj.header:
            return request.build_absolute_uri(obj.header.url)
        return None

    def get_footer_url(self, obj):
        request = self.context["request"]

        if obj.footer:
            return request.build_absolute_uri(obj.footer.url)
        return None
