export const quotationToHeader = (data) => ({
   quotationNo: data.quotation_no,
   type: data.quotation_type,
   date: data.quotation_date,
   customer: data.customer,
   cusRefNum: data.customer_reference,
   salesExecutive: data.sales_executive,
   attention: data.attention,
   payTerms: data.pay_terms,
   deliveryPlace: data.delivery_place,
   currency: data.currency,
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
