import { useQuery } from "@tanstack/react-query";
import {
   getItems,
   getItem,
   getItemMasterData,
   getItemUnits,
   getUnits,
   getItemImage,
} from "../services/itemService";

export const useItems = () => {
   return useQuery({
      queryKey: ["items"],
      queryFn: getItems,
   });
};

export const useItem = (id) => {
   return useQuery({
      queryKey: ["item", id],
      queryFn: () => getItem(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 30,
   });
};

export const useItemMasterData = () => {
   return useQuery({
      queryKey: ["item-master-data"],
      queryFn: getItemMasterData,
      staleTime: 1000 * 60 * 30,
   });
};

export const useUnitData = () => {
   return useQuery({
      queryKey: ["unit-data"],
      queryFn: getUnits,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30,
   });
};

export const useItemUnits = (id) => {
   return useQuery({
      queryKey: ["itemUnits", id],
      queryFn: () => getItemUnits(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 30,
   });
};

export const useItemImageQuery = (itemId) => {
   return useQuery({
      queryKey: ["item-image", itemId],
      queryFn: () => getItemImage(itemId),
      enabled: !!itemId,
   });
};
