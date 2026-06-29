import { useEffect, useState } from "react";
import { DollarSign, Package, Tag } from "lucide-react";
import { useItem, useItemUnits, useUnitData } from "../hooks/queries";
import { useItemContext } from "../../context/ItemContext";
import { useUpdateUnitPrice } from "../hooks/mutations";
import toast from "react-hot-toast";

export default function PriceList() {
   const [priceRows, setPriceRows] = useState([]);
   const { itemId } = useItemContext();

   const { data: itemUnits } = useItemUnits(itemId);
   const { data: units } = useUnitData();
   const updateUnitPriceMutation = useUpdateUnitPrice(itemId); // for invalidate
   const { data: itemData } = useItem(itemId);

   if (!itemId) {
      return (
         <div className="p-4 text-sm text-red-500">
            Please create or select an item first.
         </div>
      );
   }

   useEffect(() => {
      if (itemUnits) {
         setPriceRows(itemUnits);
      }
   }, [itemUnits]);

   const handleSalePriceChange = (id, value) => {
      setPriceRows((prev) =>
         prev.map((row) =>
            row.id === id ? { ...row, sale_price: value } : row,
         ),
      );
   };

   const handleMinPriceChange = (id, value) => {
      setPriceRows((prev) =>
         prev.map((row) =>
            row.id === id ? { ...row, min_selling_price: value } : row,
         ),
      );
   };

   const saveRows = () => {
      priceRows.forEach((row) => {
         updateUnitPriceMutation.mutate(
            {
               unitId: row.id,
               payload: {
                  item: row.item,
                  unit: row.unit,
                  sale_price: row.sale_price,
                  min_selling_price: row.min_selling_price,
               },
            },
            {
               onSuccess: () => {
                  // console.log(`Row ${row.id} updated`);
                  toast.success("Price added successfully")
               },
               onError: (error) => {
                  console.error(`Row ${row.id} failed`, error);
                  toast.error("Error on adding price")
               },
            },
         );
      });
   };

   const getUnitName = (id) => {
      return units?.find((unit) => unit.id === id)?.code || "";
   };

   return (
      <>
         {/* Header card */}
         <div className="flex items-center justify-between mx-8 pt-5 pb-4 border-b border-gray-300">
            <div className="flex items-center gap-3">
               <DollarSign
                  size={20}
                  strokeWidth={2}
                  className="shrink-0 text-slate-700"
               />
               <div>
                  <h1 className="text-[14.5px] font-bold leading-tight text-slate-800">
                     Price List Management
                  </h1>
                  <div className="mt-1.5 flex items-center gap-2">
                     <span className="rounded bg-blue-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                        {itemData?.item_code}
                     </span>
                     <span className="text-[11.5px] text-slate-400">
                        {itemData?.name_1}
                     </span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-4 rounded-md border border-gray-300 px-3 py-1.5 text-[11.5px] text-slate-500">
               <span className="flex items-center gap-1.5">
                  <Package size={13} strokeWidth={1.8} />
                  {itemUnits?.length || 0} Units
               </span>
               <span className="flex items-center gap-1.5">
                  <Tag size={13} strokeWidth={1.8} />1 Price Types
               </span>
            </div>
         </div>

         {/* Table card */}
         <div className="min-h-105 overflow-hidden mx-12 bg-white mt-4">
            {priceRows.length === 0 ? (
               <div className="flex items-center justify-center h-40 border border-gray-300 rounded-lg">
                  <p className="text-sm text-slate-500">No units added yet</p>
               </div>
            ) : (
               <div className=" border border-gray-300 rounded-lg">
                  <table className="w-full text-[12.5px]">
                     <thead>
                        <tr className="border-b border-gray-300 bg-slate-50">
                           <th className="w-[22%] px-4 py-2 text-left font-semibold text-slate-600">
                              Price List Type
                           </th>
                           <th className="w-[16%] px-4 py-2 text-left font-semibold text-slate-600">
                              Unit
                           </th>
                           <th className="w-[26%] px-4 py-2 text-left font-semibold text-slate-600">
                              Sale Price
                           </th>
                           <th className="px-4 py-2 text-left font-semibold text-slate-600">
                              Minimum Selling Price
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {priceRows.map((item, i) => (
                           <tr
                              key={item.id}
                              className={
                                 i < itemUnits.length - 1
                                    ? "border-b border-gray-300"
                                    : ""
                              }
                           >
                              {i === 0 && (
                                 <td
                                    rowSpan={itemUnits.length}
                                    className="bg-slate-50 px-4 py-3 align-middle"
                                 >
                                    <span className="inline-block rounded bg-blue-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                                       Retail
                                    </span>
                                 </td>
                              )}
                              <td className="px-4 py-5">
                                 <span className="inline-block rounded border border-gray-300 px-2.5 py-1 text-[11px] text-slate-500">
                                    {getUnitName(item.unit)}
                                 </span>
                              </td>
                              <td className="px-4 py-5">
                                 <input
                                    type="text"
                                    value={item.sale_price}
                                    onChange={(e) =>
                                       handleSalePriceChange(
                                          item.id,
                                          Number(e.target.value),
                                       )
                                    }
                                    className="w-full max-w-sidebar rounded border border-gray-300 bg-white px-3 py-2 text-right text-[13px] text-slate-500 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                 />
                              </td>
                              <td className="px-4 py-5">
                                 <input
                                    type="text"
                                    value={item.min_selling_price}
                                    onChange={(e) =>
                                       handleMinPriceChange(
                                          item.id,
                                          Number(e.target.value),
                                       )
                                    }
                                    className="w-full max-w-sidebar rounded border border-gray-300 bg-white px-3 py-2 text-right text-[13px] text-slate-500 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                 />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div>

         {/* Bottom action bar */}
         <div className="flex justify-end gap-2 border-t rounded-lg border-gray-300 bg-slate-100 px-4 py-3">
            <button
               type="button"
               onClick={() => {
                  saveRows();
               }}
               className="rounded-md bg-emerald-500 px-6 py-2 text-[13px] font-semibold text-white transition hover:bg-emerald-600"
            >
               Save
            </button>
            <button
               type="button"
               className="rounded-md bg-violet-500 px-6 py-2 text-[13px] font-semibold text-white transition hover:bg-violet-600"
            >
               List
            </button>
            <button
               type="button"
               className="rounded-md bg-gray-500 px-6 py-2 text-[13px] font-semibold text-white transition hover:bg-gray-600"
            >
               Clear
            </button>
         </div>
      </>
   );
}
