from django.contrib import admin

from inventory.models import Item, ItemGroup, Manufacturer, Shelf, Unit, ItemUnit, ItemImage


class ItemAdmin(admin.ModelAdmin):
    list_display = ("item_code", "id", "name_1", "status")


class ItemGroupAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


class ManufacturerAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


class ShelfAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


class UnitAdmin(admin.ModelAdmin):
    list_display = ("code", "id", "name")


class ItemUnitAdmin(admin.ModelAdmin):
    list_display = ("id", "item", "unit", "factor", "sale_price", "min_selling_price")


class ItemImageAdmin(admin.ModelAdmin):
    list_display = ("id", "item", "image")


# Register your models here.
admin.site.register(ItemGroup, ItemGroupAdmin)
admin.site.register(Manufacturer, ManufacturerAdmin)
admin.site.register(Shelf, ShelfAdmin)
admin.site.register(Unit, UnitAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(ItemUnit, ItemUnitAdmin)
admin.site.register(ItemImage, ItemImageAdmin)
