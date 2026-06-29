from rest_framework import generics

from sale.models import SalesOrder
from sale.serializers.order_serializers import (
    OrderCreateOrUpdateSerializer, OrderGetSerializer
)


class SalesOrderCreateView(generics.CreateAPIView):
    queryset = SalesOrder.objects.all()
    serializer_class = OrderCreateOrUpdateSerializer


class SalesOrderListView(generics.ListAPIView):
    queryset = (SalesOrder.objects.select_related("order_type", "quotation").all())
    serializer_class = OrderGetSerializer


class SalesOrderDetailView(generics.RetrieveAPIView):
    queryset = (SalesOrder.objects.select_related("order_type", "quotation").all())
    serializer_class = OrderGetSerializer
    lookup_field = "pk"


class SalesOrderUpdateView(generics.UpdateAPIView):
    queryset = SalesOrder.objects.all()
    serializer_class = OrderCreateOrUpdateSerializer
    lookup_field = "pk"
