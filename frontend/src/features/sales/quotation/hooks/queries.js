import { useQuery } from "@tanstack/react-query";
import {
   getItemUnits,
   getQuotation,
   getQuotations,
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
