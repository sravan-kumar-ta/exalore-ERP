from rest_framework.routers import DefaultRouter
from django.urls import path

from . import views

router = DefaultRouter()
router.register(r"items", views.ItemViewSet, basename="item")

urlpatterns = [
    path("item-master-data/", views.ItemMasterDataAPIView.as_view()),
    path("units/", views.UnitListAPIView.as_view()),
    path("item-units/", views.ItemUnitCreateAPIView.as_view()),
    path("item-units/<int:item_id>/", views.ItemUnitListAPIView.as_view()),
    path("item-unit-detail/<int:pk>/", views.ItemUnitDetailAPIView.as_view()),
    path("item-image/<int:item_id>/", views.ItemImageAPIView.as_view()),
] + router.urls
