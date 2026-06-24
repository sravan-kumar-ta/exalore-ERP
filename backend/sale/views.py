from datetime import date

from django.db import transaction
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SalesQuotation
from .serializers import SalesQuotationSerializer, SalesQuotationListSerializer


class SalesQuotationCreateAPIView(APIView):
    @transaction.atomic
    def post(self, request):
        serializer = SalesQuotationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quotation = serializer.save()

        return Response(
            SalesQuotationSerializer(quotation).data,
            status=status.HTTP_201_CREATED
        )


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


class SalesQuotationListAPIView(ListAPIView):
    queryset = SalesQuotation.objects.all()
    serializer_class = SalesQuotationListSerializer


class SalesQuotationDetailAPIView(APIView):
    def get(self, request, pk):
        quotation = get_object_or_404(
            SalesQuotation.objects.prefetch_related("lines"),
            pk=pk,
        )

        serializer = SalesQuotationSerializer(quotation)

        return Response(serializer.data)

    @transaction.atomic
    def put(self, request, pk):
        quotation = get_object_or_404(SalesQuotation, pk=pk)

        serializer = SalesQuotationSerializer(quotation, data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
