import axiosInstance from "../../../../api/axios";

export const getItems = async () => {
   const { data } = await axiosInstance.get("inventory/items/");
   return data;
};

export const getItem = async (id) => {
   const { data } = await axiosInstance.get(`inventory/items/${id}/`);
   return data;
};

export const createItem = async (payload) => {
   const { data } = await axiosInstance.post("inventory/items/", payload);
   return data;
};

export const updateItem = async ({ id, payload }) => {
   const { data } = await axiosInstance.put(`inventory/items/${id}/`, payload);
   return data;
};

export const getItemMasterData = async () => {
   const { data } = await axiosInstance.get("/inventory/item-master-data/");
   return data;
};

export const getUnits = async () => {
   const { data } = await axiosInstance.get("inventory/units/");
   return data;
};

export const updateUnits = async ({ itemId, payload }) => {
   const { data } = await axiosInstance.patch(
      `/inventory/items/${itemId}/`,
      payload,
   );
   return data;
};

export const getItemUnits = async (id) => {
   const { data } = await axiosInstance.get(`/inventory/item-units/${id}/`);
   return data;
};

export const createItemUnit = async (payload) => {
   const { data } = await axiosInstance.post("/inventory/item-units/", payload);
   return data;
};

export const deleteItemUnit = async (id) => {
   const { data } = await axiosInstance.delete(
      `/inventory/item-unit-detail/${id}/`,
   );
   return data;
};

export const updateUnitPrice = async ({ unitId, payload }) => {
   const { data } = await axiosInstance.patch(
      `/inventory/item-unit-detail/${unitId}/`,
      payload,
   );
   return data;
};

export const createItemImage = async ({ itemId, payload }) => {
   const { data } = await axiosInstance.post(
      `/inventory/item-image/${itemId}/`,
      payload,
      {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      },
   );
   return data;
};

export const getItemImage = async (id) => {
   const { data } = await axiosInstance.get(`/inventory/item-image/${id}/`);
   return data;
};

export const deleteItemImage = async (id) => {
   const { data } = await axiosInstance.delete(`/inventory/item-image/${id}/`);
   return data;
};
