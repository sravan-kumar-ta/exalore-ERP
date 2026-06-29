import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSalesOrder, updateSalesOrder } from "../services/orderService";

export const useCreateSalesOrder = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: createSalesOrder,
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["salesOrders"],
         });
      },
   });
};

export const useUpdateSalesOrder = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateSalesOrder,
      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: ["salesOrders"],
         });

         queryClient.invalidateQueries({
            queryKey: ["salesOrder", variables.id],
         });
      },
   });
};
