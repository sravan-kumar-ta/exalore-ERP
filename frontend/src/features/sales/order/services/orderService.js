import axiosInstance from "../../../../api/axios";

export const getOrderNumber = async () => {
   const { data } = await axiosInstance.get("sales/next-ord-no/");
   return data;
};

export const getSalesOrders = async () => {
   const { data } = await axiosInstance.get("sales/orders/");
   return data;
};

export const getSalesOrder = async (id) => {
   const { data } = await axiosInstance.get(`sales/orders/${id}/`);
   return data;
};

export const createSalesOrder = async (payload) => {
   const { data } = await axiosInstance.post("sales/orders/create/", payload);
   return data;
};

export const updateSalesOrder = async ({ id, payload }) => {
   const { data } = await axiosInstance.put(`sales/orders/${id}/update/`, payload);
   return data;
};