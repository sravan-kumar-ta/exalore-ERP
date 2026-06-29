import { useQuery } from "@tanstack/react-query";
import {
   getDocumentTemplate,
   getItemUnits,
   getQuotation,
   getQuotations,
   getSalesMasterData,
} from "../services/quotationService";

export const useQuotations = () => {
   return useQuery({
      queryKey: ["quotations"],
      queryFn: getQuotations,
   });
};

export const useGetItemUnits = () => {
   return useQuery({
      queryKey: ["itemUnits"],
      queryFn: getItemUnits,
   });
};

export const useSalesMasterData = () => {
   return useQuery({
      queryKey: ["salesMasterData"],
      queryFn: getSalesMasterData,
   });
};

export const useDocumentTemplate = (customerId) => {
   return useQuery({
      queryKey: ["documentTemplate", customerId],
      queryFn: () => getDocumentTemplate(customerId),
      enabled: !!customerId,
   });
};
