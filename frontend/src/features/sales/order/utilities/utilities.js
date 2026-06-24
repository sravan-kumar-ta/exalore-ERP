export const EMPTY_ROW = {
   id: "",
   code: "",
   description: "",
   unit: "",
   qty: "",
   rate: "",
   discPercent: "",
   discAmount: 0,
   net: 0,
   vat: 0,
   netAfterVat: 0,
   unitOptions: [],
   vatPercent: "",
};

export const EMPTY_HEADER = {
   orderNo: "",
   type: "",
   issueDate: new Date().toISOString().slice(0, 10),
   validDate: new Date().toISOString().slice(0, 10),
   noQuotLinked: "",
   customerPO: "",
   customerSearch: "",
   salesExecutive: "",
   currency: "SAR",
   exRate: "1",
   deliveryPlace: "",
   notes: "",
};

export const QUOTATION_COLUMNS = [
   { key: "quotation_no", label: "QUOTATION NO" },
   { key: "delivery_place", label: "DELIVERY PLACE" },
   { key: "quotation_date", label: "ISSUE DATE", type: "date" },
   { key: "customer_reference", label: "CUSTOMER REF NO" },
   { key: "customer", label: "CUSTOMER NAME" },
   { key: "sales_executive", label: "SALESMAN" },
   { key: "net_amount", label: "NET", filter: false },
];
