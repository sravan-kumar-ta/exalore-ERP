import axiosInstance from "../../../../api/axios";

export const getQuotationNumber = async () => {
   const { data } = await axiosInstance.get("sales/next-qot-no/");
   return data;
};

export const getSalesMasterData = async () => {
   const { data } = await axiosInstance.get("/sales/master-data/");
   return data;
};

export const getQuotations = async () => {
   const { data } = await axiosInstance.get("/sales/quotations-list/");
   return data;
};

export const getQuotation = async (id) => {
   const { data } = await axiosInstance.get(`/sales/quotations/${id}/`);
   return data;
};

export const getItemUnits = async () => {
   const { data } = await axiosInstance.get(`/inventory/item-units/`);
   return data;
};

export const createQuotation = async (payload) => {
   const { data } = await axiosInstance.post("sales/quotations/", payload);
   return data;
};

export const updateQuotation = async ({ id, payload }) => {
   const { data } = await axiosInstance.put(
      `/sales/quotations/${id}/`,
      payload,
   );
   return data;
};

export const getDocumentTemplate = async (customerId) => {
   const { data } = await axiosInstance.get(
      `/sales/customers/${customerId}/document-template/`,
   );

   return data;
};

export const updateDocumentTemplate = async ({ customerId, formData }) => {
   const { data } = await axiosInstance.patch(
      `/sales/customers/${customerId}/document-template/`,
      formData,
      {
         headers: { "Content-Type": "multipart/form-data" },
      },
   );

   return data;
};
