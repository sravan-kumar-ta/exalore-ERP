from django.db import models


class ItemGroup(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Manufacturer(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Shelf(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Unit(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Item(models.Model):
    class Behaviour(models.TextChoices):
        PURCHASE = "PURCHASE", "Purchase Item"
        SALES = "SALES", "Sales Item"
        STOCK = "STOCK", "Stock Item"

    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        INACTIVE = "INACTIVE", "Inactive"

    class TaxableStatus(models.TextChoices):
        TAXABLE = "TAXABLE", "Taxable"
        NON_TAXABLE = "NON_TAXABLE", "Non Taxable"

    item_code = models.CharField(
        max_length=50,
        unique=True,
        db_index=True,
    )

    name_1 = models.CharField(max_length=255)

    name_2 = models.CharField(
        max_length=255,
        blank=True,
    )

    generic_name = models.CharField(
        max_length=255,
        blank=True,
    )

    description = models.TextField(
        blank=True,
    )

    behaviour = models.CharField(
        max_length=20,
        choices=Behaviour.choices,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ACTIVE,
    )

    taxable_status = models.CharField(
        max_length=20,
        choices=TaxableStatus.choices,
        default=TaxableStatus.NON_TAXABLE,
    )

    item_group = models.ForeignKey(
        ItemGroup,
        on_delete=models.PROTECT,
        related_name="items",
    )

    shelf = models.ForeignKey(
        Shelf,
        on_delete=models.PROTECT,
        related_name="items",
        null=True,
        blank=True,
    )

    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.PROTECT,
        related_name="items",
        null=True,
        blank=True,
    )

    is_editable_name = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    sales_unit = models.ForeignKey(
        Unit,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="sales_items",
    )

    stock_unit = models.ForeignKey(
        Unit,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="stock_items",
    )

    def __str__(self):
        return f"{self.item_code} - {self.name_1}"


class ItemUnit(models.Model):
    item = models.ForeignKey(
        Item,
        on_delete=models.CASCADE,
        related_name="units",
    )

    unit = models.ForeignKey(
        Unit,
        on_delete=models.PROTECT,
    )

    factor = models.SmallIntegerField(default=1)

    sale_price = models.PositiveSmallIntegerField(
        default=0,
        null=True,
        blank=True,
    )

    min_selling_price = models.PositiveSmallIntegerField(
        default=0,
        null=True,
        blank=True,
    )

    class Meta:
        unique_together = (
            "item",
            "unit",
        )

    def __str__(self):
        return f"{self.item.item_code} - {self.unit.name}"


class ItemImage(models.Model):
    item = models.OneToOneField(
        Item,
        on_delete=models.CASCADE,
        related_name="image",
    )
    image = models.ImageField(upload_to="item_images/", null=True, blank=True)

    def __str__(self):
        return f"{self.item.item_code} - image"
