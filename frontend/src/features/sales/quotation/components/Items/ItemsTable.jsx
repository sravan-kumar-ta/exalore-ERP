import { Plus, Search, Trash2 } from "lucide-react";
import { COLUMNS } from "../../helper/columnHeaders";
import { fmt } from "../../helper/calculationHelper";
import ItemRow from "./ItemRow";

export default function ItemsTable({
   rows,
   disabled,
   updateRow,
   addRow,
   deleteRow,
   setActiveRowId,
   setSearchText,
   activeRowId,
   filteredItems,
   handleItemSelect,
   getUnitCode,
   handleUnitChange,
   handleDiscPercentTab,
   codeRefs,
}) {
   return (
      <>
         <div className="flex-1 overflow-hidden px-6 min-h-0">
            <div className="h-96 rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
               <div
                  className="flex-1 overflow-y-auto overflow-x-auto"
                  data-testid="table-scroll"
               >
                  <table className="w-full border-collapse text-sm">
                     <thead className="sticky top-0 z-10">
                        <tr className="bg-slate-950 text-white">
                           {COLUMNS.map((col, i) => (
                              <th
                                 key={i}
                                 className={`px-3 py-2.5 bg-linear-to-l from-slate-950 to-slate-800 text-left font-semibold align-top ${col.width}`}
                              >
                                 <div className="flex flex-col leading-tight">
                                    <span className="text-[13px]">
                                       {col.title}
                                    </span>
                                    {col.sub && (
                                       <span className="text-[10px] font-normal text-slate-300 mt-0.5">
                                          {col.sub}
                                       </span>
                                    )}
                                 </div>
                              </th>
                           ))}
                        </tr>
                     </thead>
                     <tbody>
                        {rows.map((row, idx) => (
                           <ItemRow
                              key={row.id}
                              row={row}
                              idx={idx}
                              rows={rows}
                              disabled={disabled}
                              updateRow={updateRow}
                              deleteRow={deleteRow}
                              setActiveRowId={setActiveRowId}
                              setSearchText={setSearchText}
                              activeRowId={activeRowId}
                              filteredItems={filteredItems}
                              handleItemSelect={handleItemSelect}
                              getUnitCode={getUnitCode}
                              handleUnitChange={handleUnitChange}
                              handleDiscPercentTab={handleDiscPercentTab}
                              codeRefs={codeRefs}
                           />
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* Add row footer — pinned, never scrolls */}
               {/* <div className="border-t border-slate-200 bg-slate-50/60 px-3 py-2">
                  <button
                     type="button"
                     onClick={addRow}
                     disabled={disabled}
                     className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 hover:text-sky-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                     <Plus size={14} /> Add Row
                  </button>
               </div> */}
            </div>
         </div>
      </>
   );
}
