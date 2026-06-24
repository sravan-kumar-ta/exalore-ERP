from django.urls import path

from . import views

urlpatterns = [
    path("quotations/", views.SalesQuotationCreateAPIView.as_view()),
    path("quotations/<int:pk>/", views.SalesQuotationDetailAPIView.as_view()),
    path("next-qot-no/", views.NextQuotationNumberAPIView.as_view()),
    path("quotations-list/", views.SalesQuotationListAPIView.as_view()),
]
