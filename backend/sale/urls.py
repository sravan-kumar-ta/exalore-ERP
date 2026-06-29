from django.urls import path

from sale.views import quotation, master_data, order

urlpatterns = [
    path("next-qot-no/", master_data.NextQuotationNumberAPIView.as_view()),
    path("master-data/", master_data.SalesMasterDataAPIView.as_view()),
    path("quotations/", quotation.SalesQuotationCreateAPIView.as_view()),
    path("quotations/<int:pk>/", quotation.SalesQuotationDetailAPIView.as_view()),
    path("quotations-list/", quotation.SalesQuotationListAPIView.as_view()),
    path("customers/<int:customer_id>/document-template/", master_data.CustomerDocumentTemplateAPIView.as_view()),
    path("next-ord-no/", master_data.NextOrderNumberAPIView.as_view()),
    path("orders/", order.SalesOrderListView.as_view()),
    path("orders/create/", order.SalesOrderCreateView.as_view()),
    path("orders/<int:pk>/", order.SalesOrderDetailView.as_view()),
    path("orders/<int:pk>/update/", order.SalesOrderUpdateView.as_view()),
]
