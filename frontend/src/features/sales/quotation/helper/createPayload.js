export const buildQuotationPayload = (header, rows) => ({
   quotation_no: header.quotationNo,
   quotation_type: header.type,
   customer: header.customer,
   quotation_date: header.date,
   sales_executive: header.salesExecutive,
   attention: header.attention,
   pay_terms: header.payTerms,
   delivery_place: header.deliveryPlace,
   currency: header.currency,
   exchange_rate: header.exRate,
   notes: header.notes,

   lines: rows.map((row) => ({
      id: row.objId || null,
      item: row.itemId,
      description: row.description,
      unit: row.unit,
      qty: row.qty,
      rate: row.rate,
      discount_percent: Number(row.discPercent || 0),
      vat_percent: Number(row.vatPercent || 15),
   })),
});
