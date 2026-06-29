export const buildOrderPayload = (header) => ({
   order_no: header.orderNo,
   order_type: header.type,
   issue_date: header.issueDate,
   valid_date: header.validDate,
   quotation: header.quotation,
});
