from rest_framework import serializers

from .models import Item, ItemGroup, Manufacturer, Shelf, ItemUnit, Unit, ItemImage


class ItemListSerializer(serializers.ModelSerializer):
    item_group_name = serializers.CharField(
        source="item_group.name",
        read_only=True,
    )

    class Meta:
        model = Item

        fields = [
            "id",
            "item_code",
            "name_1",
            "status",
            "item_group_name",
        ]


class ItemDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class ItemGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemGroup
        fields = "__all__"


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = "__all__"


class ShelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelf
        fields = "__all__"


class ItemMasterDataSerializer(serializers.Serializer):
    item_groups = ItemGroupSerializer(many=True)
    manufacturers = ManufacturerSerializer(many=True)
    shelves = ShelfSerializer(many=True)


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = "__all__"


class ItemUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemUnit
        fields = "__all__"


class ItemImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ItemImage
        fields = [
            "id",
            "item",
            "image",
            "image_url",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")

        if obj.image:
            return request.build_absolute_uri(
                obj.image.url
            )

        return None
