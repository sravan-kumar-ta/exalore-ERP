from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers
from .models import Item, ItemGroup, Manufacturer, Shelf, ItemUnit, Unit, ItemImage
from .serializers import ItemImageSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.select_related(
        "item_group",
        "manufacturer",
        "shelf",
    )

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.ItemListSerializer

        return serializers.ItemDetailSerializer


class ItemMasterDataAPIView(APIView):

    def get(self, request):
        return Response({
            "item_groups": serializers.ItemGroupSerializer(
                ItemGroup.objects.all(),
                many=True
            ).data,

            "manufacturers": serializers.ManufacturerSerializer(
                Manufacturer.objects.all(),
                many=True
            ).data,

            "shelves": serializers.ShelfSerializer(
                Shelf.objects.all(),
                many=True
            ).data,
        })


class UnitListAPIView(APIView):
    def get(self, request):
        units = Unit.objects.all()
        serializer = serializers.UnitSerializer(units, many=True)
        return Response(serializer.data)


class ItemUnitListAPIView(APIView):
    def get(self, request, item_id):
        units = ItemUnit.objects.filter(item_id=item_id)
        serializer = serializers.ItemUnitSerializer(units, many=True)
        return Response(serializer.data)


class ItemUnitDetailAPIView(APIView):
    def delete(self, request, pk):
        item_unit = get_object_or_404(ItemUnit, pk=pk)
        item_unit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, pk):
        item_unit = get_object_or_404(ItemUnit, pk=pk)
        serializer = serializers.ItemUnitSerializer(item_unit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemUnitCreateAPIView(APIView):
    def post(self, request):
        serializer = serializers.ItemUnitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        item_units = ItemUnit.objects.all()
        serializer = serializers.ItemUnitSerializer(item_units, many=True)
        return Response(serializer.data)


class ItemImageAPIView(APIView):
    def get(self, request, item_id):
        item_image = ItemImage.objects.filter(item_id=item_id).first()

        if not item_image:
            return Response({"image_url": None})

        serializer = ItemImageSerializer(
            item_image,
            context={"request": request},
        )

        return Response(serializer.data)

    def post(self, request, item_id):
        item_image, _ = ItemImage.objects.get_or_create(item_id=item_id)

        # Delete old image before replacing
        if item_image.image and "image" in request.FILES:
            item_image.image.delete(save=False)

        serializer = serializers.ItemImageSerializer(
            item_image,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, item_id):
        item_image = ItemImage.objects.filter(item_id=item_id).first()

        # Delete image file from storage
        if item_image.image:
            item_image.image.delete(save=False)

        # Delete database record
        item_image.delete()

        return Response(
            {"message": "Image deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
