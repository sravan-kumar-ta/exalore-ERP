import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuotation, updateQuotation } from "../services/quotationService";

export const useCreateQuotation = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: createQuotation,

      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: ["quotations"],
         });

         queryClient.invalidateQueries({
            queryKey: ["quotation", variables.id],
         });
      },
   });
};

export const useUpdateQuotation = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateQuotation,

      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: ["quotations"],
         });

         queryClient.invalidateQueries({
            queryKey: ["quotation", variables.id],
         });
      },
   });
};
