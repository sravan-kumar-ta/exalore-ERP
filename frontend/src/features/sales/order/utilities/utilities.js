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
   quotation: "",
   noQuotLinked: "",
   customerPO: "",
   customerSearch: "",
   salesExecutive: "",
   currency: "",
   exRate: "",
   deliveryPlace: "",
   notes: "",
};

export const QUOTATION_COLUMNS = [
   { key: "order_no", label: "ORDER NO" },
   { key: "quotation_no", label: "QUOTATION NO" },
   { key: "order_type_name", label: "ORDER TYPE" },
   { key: "issue_date", label: "ISSUE DATE", type: "date" },
   { key: "quotation.customer.name", label: "CUSTOMER NAME", filter: false },
   { key: "sales_executive", label: "SALESMAN", filter: false },
];
