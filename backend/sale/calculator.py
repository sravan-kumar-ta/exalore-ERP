from decimal import Decimal


def calculate_amounts(line):
    gross_amount = line["qty"] * line["rate"]

    discount_amount = (
            gross_amount
            * line["discount_percent"]
            / Decimal("100")
    )

    net_amount = gross_amount - discount_amount

    vat_amount = (
            net_amount
            * line["vat_percent"]
            / Decimal("100")
    )

    net_after_vat = net_amount + vat_amount

    return {
        "gross_amount": gross_amount,
        "discount_amount": discount_amount,
        "net_amount": net_amount,
        "vat_amount": vat_amount,
        "net_after_vat": net_after_vat,
    }


def initialize_totals():
    return {
        "gross_amount": Decimal("0"),
        "discount_amount": Decimal("0"),
        "net_amount": Decimal("0"),
        "vat_amount": Decimal("0"),
        "net_after_vat": Decimal("0"),
    }


def update_totals(totals, amounts):
    totals["gross_amount"] += amounts["gross_amount"]
    totals["discount_amount"] += amounts["discount_amount"]
    totals["net_amount"] += amounts["net_amount"]
    totals["vat_amount"] += amounts["vat_amount"]
    totals["net_after_vat"] += amounts["net_after_vat"]


def apply_totals(obj, totals):
    obj.gross_amount = totals["gross_amount"]
    obj.discount_amount = totals["discount_amount"]
    obj.net_amount = totals["net_amount"]
    obj.vat_amount = totals["vat_amount"]
    obj.net_after_vat = totals["net_after_vat"]
