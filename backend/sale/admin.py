from django.contrib import admin

from .models import (
    Customer, Currency, QuotationType,
    SalesExecutive, SalesQuotation,
    SalesQuotationLine, SalesOrder,
    DocumentTemplate,
)


class SalesQuotationLineInline(admin.TabularInline):
    model = SalesQuotationLine
    extra = 0


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("id", "reference", "name")
    search_fields = ("reference", "name")


@admin.register(SalesExecutive)
class SalesExecutiveAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ("id", "code", "name", "exchange_rate")
    search_fields = ("code", "name")


@admin.register(QuotationType)
class QuotationTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(SalesQuotation)
class SalesQuotationAdmin(admin.ModelAdmin):
    list_display = (
        "quotation_no",
        "id",
        "customer",
        "quotation_type",
        "quotation_date",
        "currency",
        "net_after_vat",
    )

    search_fields = (
        "quotation_no",
        "customer__name",
        "customer__reference",
        "sales_executive__name",
    )

    list_filter = (
        "quotation_type",
        "quotation_date",
        "currency",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    list_select_related = (
        "customer",
        "quotation_type",
        "currency",
        "sales_executive",
    )

    inlines = [SalesQuotationLineInline]


@admin.register(SalesQuotationLine)
class SalesQuotationLineAdmin(admin.ModelAdmin):
    list_display = (
        "quotation",
        "id",
        "item",
        "qty",
        "rate",
        "net_after_vat",
    )

    search_fields = (
        "quotation__quotation_no",
        "item__item_code",
        "item__name_1",
    )

    list_select_related = (
        "quotation",
        "item",
        "unit",
    )


@admin.register(SalesOrder)
class SalesOrderAdmin(admin.ModelAdmin):
    list_display = (
        "order_no",
        "id",
        "order_type",
        "issue_date",
        "quotation",
    )


admin.site.register(DocumentTemplate)
