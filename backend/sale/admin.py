from django.contrib import admin

from .models import SalesQuotation, SalesQuotationLine


class SalesQuotationLineInline(admin.TabularInline):
    model = SalesQuotationLine
    extra = 0


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
        "customer",
        "sales_executive",
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
        "item__name_1",
    )

    list_select_related = (
        "quotation",
        "item",
        "unit",
    )
