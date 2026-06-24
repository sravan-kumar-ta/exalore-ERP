import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
   createItem,
   updateItem,
   createItemUnit,
   updateUnits,
   deleteItemUnit,
   updateUnitPrice,
   createItemImage,
   deleteItemImage,
} from "../services/itemService";

export const useCreateItem = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: createItem,

      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["items"],
         });
      },
   });
};

export const useUpdateItem = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateItem,

      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: ["items"],
         });

         queryClient.invalidateQueries({
            queryKey: ["item", variables.id],
         });
      },
   });
};

export const useCreateItemUnit = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: createItemUnit,

      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: ["itemUnits", variables.item],
         });
      },
   });
};

export const useUpdateUnit = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateUnits,

      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: ["items"],
         });

         queryClient.invalidateQueries({
            queryKey: ["item", variables.itemId],
         });
      },
   });
};

export const useDeleteItemUnit = (itemId) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: deleteItemUnit,

      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["itemUnits", itemId],
         });
      },
   });
};

export const useUpdateUnitPrice = (itemId) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateUnitPrice,

      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: ["itemUnits", itemId],
         });
      },
   });
};

export const useCreateItemImageMutation = (itemId) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: createItemImage,

      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["item-image", itemId],
         });
      },
   });
};

export const useDeleteItemImage = (itemId) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: () => deleteItemImage(itemId),

      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["item-image", itemId],
         });
      },
   });
};
