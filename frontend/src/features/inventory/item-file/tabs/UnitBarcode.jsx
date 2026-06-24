import { ChevronDown, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useItemContext } from "../../context/ItemContext";
import { useItem, useItemUnits, useUnitData } from "../hooks/queries";
import {
   useCreateItemUnit,
   useDeleteItemUnit,
   useUpdateUnit,
} from "../hooks/mutations";
import toast from "react-hot-toast";

export default function UnitBarcode() {
   const [selectedUnit, setSelectedUnit] = useState("");
   const [cofactor, setCofactor] = useState(1);
   const [salesUnit, setSalesUnit] = useState("");
   const [stockUnit, setStockUnit] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   const { itemId } = useItemContext();

   const { data: unitItemData, refetch } = useItemUnits(itemId);
   const { data: units } = useUnitData();
   const { data: itemData } = useItem(itemId);

   const createItemUnitMutation = useCreateItemUnit();
   const deleteItemUnitMutation = useDeleteItemUnit(itemId); // for invalidate
   const updateItemUnitsMutation = useUpdateUnit();

   if (!itemId) {
      return (
         <div className="p-4 text-sm text-red-500">
            Please create or select an item first.
         </div>
      );
   }

   useEffect(() => {
      if (!itemData) return;

      setSalesUnit(itemData.sales_unit || "");
      setStockUnit(itemData.stock_unit || "");
   }, [itemData]);

   const handleAddUnit = () => {
      if (!selectedUnit) return;

      setErrorMessage("");

      const payload = {
         item: itemId,
         unit: selectedUnit,
         factor: Number(cofactor),
      };

      createItemUnitMutation.mutate(payload, {
         onSuccess: () => {
            setSelectedUnit("");
            setCofactor(1);
            toast.success("Unit added successfully");
         },

         onError: (error) => {
            setErrorMessage(
               error?.response?.data?.detail || "Unit already exists",
            );
            toast.error("Failed to add unit");
         },
      });
   };

   const handleDelete = (id) => {
      deleteItemUnitMutation.mutate(id, {
         onSuccess: async () => {
            await refetch();
            toast.success("Unit deleted successfully");
         },

         onError: (error) => {
            console.error(error);
            toast.error("Failed to delete unit");
         },
      });
   };

   const handleUnitCode = (id) => {
      return units?.find((unit) => unit.id === id)?.code || "";
   };

   const handleSaveUnit = () => {
      if (!salesUnit && !stockUnit) return;

      const payload = {
         sales_unit: salesUnit,
         stock_unit: stockUnit,
      };

      updateItemUnitsMutation.mutate(
         { itemId, payload },
         {
            onSuccess: () => {
               toast.success("Unit added successfully");
            },

            onError: (error) => {
               console.error(error);
               toast.error("Failed to add unit");
            },
         },
      );
   };

   return (
      <div className="flex-1 overflow-y-auto p-3">
         <div className="flex divide-gray-200">
            {/* Left Panel - Unit Management */}
            <div className="w-6/10  border rounded-xl border-gray-200">
               <h2 className="text-sm font-semibold text-gray-700 mb-5 py-2 px-3 border-b border-gray-200">
                  Unit Management
               </h2>

               {/* Add Unit Row */}
               <div className="flex items-end gap-3    px-6">
                  {/* Unit Select */}
                  <div className="flex-1 max-w-2xl">
                     <label className="block text-xs font-medium text-blue-500 mb-1">
                        Unit
                     </label>
                     <div className="relative">
                        <select
                           value={selectedUnit}
                           onChange={(e) =>
                              setSelectedUnit(Number(e.target.value))
                           }
                           className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent pr-8"
                        >
                           <option value="">Select unit</option>

                           {units?.map((unit) => (
                              <option key={unit.id} value={unit.id}>
                                 {unit.name}
                              </option>
                           ))}
                        </select>

                        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
                           <ChevronDown size={20} />
                        </span>
                     </div>
                  </div>

                  {/* Cofactor */}
                  <div className="w-64">
                     <label className="block text-xs font-medium text-blue-500 mb-1">
                        Cofactor
                     </label>
                     <input
                        type="number"
                        min="1"
                        value={cofactor}
                        onChange={(e) => setCofactor(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                     />
                  </div>

                  {/* Add Button */}
                  <button
                     onClick={handleAddUnit}
                     disabled={!selectedUnit}
                     className="flex items-center gap-1.5 bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 text-sm font-medium px-4 py-2 rounded-md transition-colors"
                  >
                     <Plus size={15} />
                     Add Unit
                  </button>
               </div>
               {errorMessage && (
                  <div className="mt-2 text-end mr-8 text-sm text-red-500">
                     {errorMessage}
                  </div>
               )}

               {/* Existing Units */}
               <div className="px-6 mt-8">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-medium text-gray-500">
                        Existing Units
                     </span>
                     <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">
                        {unitItemData && unitItemData.length}
                     </span>
                  </div>

                  <div className="rounded-lg overflow-hidden">
                     {!unitItemData || unitItemData.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-400">
                           No units added yet
                        </div>
                     ) : (
                        unitItemData.map((unit, idx) => (
                           <div
                              key={unit.id}
                              className={
                                 "flex items-center justify-between px-4 py-3 rounded-lg border mb-2 border-gray-300"
                              }
                           >
                              <div>
                                 <p className="text-sm font-medium text-gray-700">
                                    {handleUnitCode(unit.unit)}
                                 </p>
                                 <p className="text-xs text-gray-500">
                                    × {unit.factor}
                                 </p>
                              </div>
                              <button
                                 onClick={() => handleDelete(unit.id)}
                                 className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded cursor-pointer"
                              >
                                 <Trash2 size={15} />
                              </button>
                           </div>
                        ))
                     )}
                  </div>
               </div>
            </div>

            {/* Right Panel - Unit Settings */}
            <div className="w-5/10 flex flex-col border rounded-xl border-gray-200 ml-4">
               <h2 className="text-sm font-semibold text-gray-700 mb-5 py-2 px-3 border-b border-gray-200">
                  Unit Settings
               </h2>

               <div className="space-y-5 px-6">
                  {/* Sales Unit */}
                  <div className="w-64">
                     <label className="block text-xs font-medium text-gray-500 mb-1">
                        Sales Unit
                     </label>
                     <div className="relative">
                        <select
                           value={salesUnit}
                           onChange={(e) =>
                              setSalesUnit(Number(e.target.value))
                           }
                           className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent pr-8"
                        >
                           <option value="">Select unit</option>
                           {units?.map((unit) => (
                              <option key={unit.id} value={unit.id}>
                                 {unit.name}
                              </option>
                           ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
                           <ChevronDown size={20} />
                        </span>
                     </div>
                  </div>

                  {/* Stock Unit */}
                  <div className="w-64">
                     <label className="block text-xs font-medium text-gray-500 mb-1">
                        Stock Unit
                     </label>
                     <div className="relative">
                        <select
                           value={stockUnit}
                           onChange={(e) =>
                              setStockUnit(Number(e.target.value))
                           }
                           className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent pr-8"
                        >
                           <option value="">Select unit</option>
                           {units?.map((unit) => (
                              <option key={unit.id} value={unit.id}>
                                 {unit.name}
                              </option>
                           ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
                           <ChevronDown size={20} />
                        </span>
                     </div>
                  </div>
               </div>

               {/* Save Button */}
               <div className="flex justify-end my-6 px-6">
                  <button
                     onClick={() => handleSaveUnit()}
                     className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors cursor-pointer"
                  >
                     <Save size={15} />
                     Save Settings
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
