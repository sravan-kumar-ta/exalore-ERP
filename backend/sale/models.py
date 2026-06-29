import os

from django.db import models

from inventory.models import Item, ItemUnit


class QuotationType(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=200)
    reference = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class SalesExecutive(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Currency(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=50)
    exchange_rate = models.DecimalField(
        max_digits=18,
        decimal_places=4,
        default=1
    )

    def __str__(self):
        return self.code


class SalesQuotation(models.Model):
    quotation_no = models.CharField(max_length=30, unique=True)
    quotation_type = models.ForeignKey(QuotationType, on_delete=models.PROTECT)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    quotation_date = models.DateField()
    sales_executive = models.ForeignKey(SalesExecutive, on_delete=models.PROTECT)
    attention = models.CharField(max_length=200, blank=True)
    pay_terms = models.CharField(max_length=100, blank=True)
    delivery_place = models.CharField(max_length=150, blank=True)
    currency = models.ForeignKey(Currency, on_delete=models.PROTECT)
    exchange_rate = models.DecimalField(max_digits=18, decimal_places=4, default=1)
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
    qty = models.PositiveSmallIntegerField(default=0)
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


class DocumentTemplate(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    header = models.ImageField(
        upload_to="document_templates/headers/",
        blank=True,
        null=True,
    )

    footer = models.ImageField(
        upload_to="document_templates/footers/",
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.customer.name

    def save(self, *args, **kwargs):
        if self.pk:
            old = DocumentTemplate.objects.get(pk=self.pk)

            if old.header != self.header and old.header:
                if os.path.isfile(old.header.path):
                    os.remove(old.header.path)

            if old.footer != self.footer and old.footer:
                if os.path.isfile(old.footer.path):
                    os.remove(old.footer.path)

        super().save(*args, **kwargs)


class SalesOrder(models.Model):
    order_no = models.CharField(max_length=30, unique=True)
    order_type = models.ForeignKey(QuotationType, on_delete=models.PROTECT)
    issue_date = models.DateField()
    valid_date = models.DateField()
    quotation = models.ForeignKey(SalesQuotation, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.order_no
