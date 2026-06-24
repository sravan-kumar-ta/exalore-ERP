import { Grid3X3, X } from "lucide-react";
import { useItems } from "../hooks/queries";
import { useItemContext } from "../../context/ItemContext";

export default function ItemListModal({
   open,
   setIsListOpen,
   onSelect,
   selectedItemId,
   setSaveMode,
}) {
   const { data: items = [], isLoading, error } = useItems();
   const { itemId } = useItemContext();

   if (itemId) selectedItemId = itemId;

   if (isLoading) return <p>Loading...</p>;

   if (error) return <p>Something went wrong</p>;

   if (!open) return null;

   const handleUpdate = (id) => {
      onSelect(id);
      setSaveMode("update");
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
         <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
               <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                     <Grid3X3 size={18} className="text-blue-600" />
                  </div>

                  <div>
                     <h2 className="text-lg font-semibold text-gray-900">
                        Item List
                     </h2>
                     <p className="text-xs text-gray-500">
                        Select an item to update
                     </p>
                  </div>
               </div>

               <button
                  onClick={() => setIsListOpen(false)}
                  className="rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
               >
                  <X size={20} />
               </button>
            </div>

            {/* Table */}
            <div className="p-6">
               <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full">
                     <thead className="bg-gray-50">
                        <tr>
                           <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Code
                           </th>
                           <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Name
                           </th>
                           <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Status
                           </th>
                           <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Group
                           </th>
                           <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                              Action
                           </th>
                        </tr>
                     </thead>

                     <tbody className="divide-y divide-gray-100">
                        {items.map((item) => (
                           <tr
                              key={item.id}
                              className="hover:bg-gray-50 transition-colors"
                           >
                              <td className="px-4 py-3 text-sm text-gray-700">
                                 {item.item_code}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                 {item.name_1}
                              </td>
                              <td className="px-4 py-3">
                                 <span
                                    className={`inline-flex rounded-full ${item.status == "ACTIVE" ? "bg-green-700/60" : "bg-yellow-500/60"}  px-2 py-1 text-xs font-medium text-white`}
                                 >
                                    {item.status}
                                 </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                 {item.item_group_name}
                              </td>
                              <td className="px-4 py-3 text-center">
                                 <button
                                    onClick={() => handleUpdate(item.id)}
                                    disabled={selectedItemId === item.id}
                                    className={`
                                       rounded-md px-3 py-1 text-xs font-medium text-white transition-colors
                                       ${
                                          selectedItemId === item.id
                                             ? "bg-gray-300 cursor-not-allowed"
                                             : "bg-violet-500 hover:bg-violet-700"
                                       }
                                    `}
                                 >
                                    {selectedItemId === item.id
                                       ? "Selected"
                                       : "View"}
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
}
