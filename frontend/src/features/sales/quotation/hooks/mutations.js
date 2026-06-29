import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuotation, updateDocumentTemplate, updateQuotation } from "../services/quotationService";

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

export const useUpdateDocumentTemplate = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateDocumentTemplate,

      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: ["documentTemplate", variables.customerId],
         });
      },
   });
};
