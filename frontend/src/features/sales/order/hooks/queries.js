import { useQuery } from "@tanstack/react-query";
import { getSalesOrder, getSalesOrders } from "../services/orderService";

export const useSalesOrders = () => {
   return useQuery({
      queryKey: ["salesOrders"],
      queryFn: getSalesOrders,
   });
};

export const useSalesOrder = (id) => {
   return useQuery({
      queryKey: ["salesOrder", id],
      queryFn: () => getSalesOrder(id),
      enabled: !!id,
   });
};
