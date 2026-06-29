from datetime import date

from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import (
    Customer, Currency, QuotationType, SalesOrder,
    SalesExecutive, SalesQuotation, DocumentTemplate,
)

from ..serializers.serializers import (
    CustomerSerializer, CurrencySerializer, QuotationTypeSerializer,
    SalesExecutiveSerializer, DocumentTemplateSerializer
)


class SalesMasterDataAPIView(APIView):
    def get(self, request):
        return Response({
            "customers": CustomerSerializer(Customer.objects.order_by("name"), many=True).data,
            "currencies": CurrencySerializer(Currency.objects.order_by("code"), many=True).data,
            "quotation_types": QuotationTypeSerializer(QuotationType.objects.order_by("name"), many=True).data,
            "sales_executives": SalesExecutiveSerializer(SalesExecutive.objects.order_by("name"), many=True).data,
        })


class NextQuotationNumberAPIView(APIView):
    def get(self, request):
        year = date.today().year
        last = (SalesQuotation.objects.order_by("-id").first())

        if last:
            last_no = int(last.quotation_no.split("-")[-1])
            next_no = last_no + 1
        else:
            next_no = 1

        return Response({"quotation_no": f"QT-{year}-{next_no:04d}"})


class CustomerDocumentTemplateAPIView(RetrieveUpdateAPIView):
    serializer_class = DocumentTemplateSerializer

    def get_object(self):
        customer = Customer.objects.get(pk=self.kwargs["customer_id"])
        template, _ = DocumentTemplate.objects.get_or_create(customer=customer)

        return template


class NextOrderNumberAPIView(APIView):
    def get(self, request):
        year = date.today().year
        last = (SalesOrder.objects.order_by("-id").first())

        if last:
            last_no = int(last.order_no.split("-")[-1])
            next_no = last_no + 1
        else:
            next_no = 1

        return Response({"Order_no": f"SO-{year}-{next_no:04d}"})
