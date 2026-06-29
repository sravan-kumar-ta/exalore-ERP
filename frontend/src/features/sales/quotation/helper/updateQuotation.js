export const quotationToHeader = (
   data,
   customerMap,
   quotationTypeMap,
   currencyMap,
   salesExecutiveMap,
) => ({
   quotationNo: data.quotation_no,
   type: quotationTypeMap[data.quotation_type]?.id ?? "",
   date: data.quotation_date,
   customer: customerMap[data.customer]?.id ?? "",
   customerName: customerMap[data.customer]?.name ?? "",
   cusRefNum: customerMap[data.customer]?.reference ?? "",
   salesExecutive: salesExecutiveMap[data.sales_executive]?.id ?? "",
   attention: data.attention,
   payTerms: data.pay_terms,
   deliveryPlace: data.delivery_place,
   currency: currencyMap[data.currency]?.id ?? "",
   exRate: data.exchange_rate,
   notes: data.notes,
});

export const quotationToRows = (lines, itemUnits) =>
   lines.map((line) => ({
      id: line.id,
      objId: line.id,
      code: line.item_code,
      description: line.description,
      unit: line.unit,

      qty: Number(line.qty),
      rate: Number(line.rate),

      discPercent: Number(line.discount_percent),
      discAmount: Number(line.discount_amount),

      net: Number(line.net_amount),
      vat: Number(line.vat_amount),
      netAfterVat: Number(line.net_after_vat),

      vatPercent: Number(line.vat_percent),

      unitOptions: [],
      unitOptions: itemUnits.filter((u) => u.item === line.item),

      itemId: line.item,
   }));
