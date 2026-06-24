from django.db import models

from inventory.models import Item, ItemUnit




class SalesQuotation(models.Model):
    quotation_no = models.CharField(max_length=30, unique=True)
    quotation_type = models.CharField(max_length=20)
    customer = models.CharField(max_length=200)
    quotation_date = models.DateField()
    customer_reference = models.CharField(max_length=50, blank=True)
    sales_executive = models.CharField(max_length=100)
    attention = models.CharField(max_length=200, blank=True)
    pay_terms = models.CharField(max_length=100, blank=True)
    delivery_place = models.CharField(max_length=150, blank=True)
    currency = models.CharField(max_length=10)
    exchange_rate = models.DecimalField(max_digits=18, decimal_places=6, default=1)
    notes = models.TextField(blank=True)
    gross_amount = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    net_amount = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    vat_amount = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    net_after_vat = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.quotation_no


class SalesQuotationLine(models.Model):
    quotation = models.ForeignKey(
        SalesQuotation,
        on_delete=models.CASCADE,
        related_name="lines"
    )
    item = models.ForeignKey(Item, on_delete=models.PROTECT)
    description = models.CharField(max_length=500, blank=True)
    unit = models.ForeignKey(ItemUnit, on_delete=models.PROTECT)
    qty = models.DecimalField(max_digits=18, decimal_places=3, default=0)
    rate = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    gross_amount = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    discount_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    net_amount = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    vat_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    vat_amount = models.DecimalField(max_digits=18, decimal_places=2, default=0)
    net_after_vat = models.DecimalField(max_digits=18, decimal_places=2, default=0)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return f"{self.quotation.quotation_no} - {self.item.name_1}"
