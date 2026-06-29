import { Search, Trash2 } from "lucide-react";
import { fmt } from "../../helper/calculationHelper";

export default function ItemRow({
   row,
   idx,
   disabled,
   updateRow,
   deleteRow,
   rows,
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
         <tr
            key={row.id}
            data-testid={`row-${idx + 1}`}
            className="border-b border-slate-200 hover:bg-slate-50"
         >
            <td className="px-3 py-1 align-middle">
               <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-slate-200 text-slate-600 text-xs font-semibold">
                  {idx + 1}
               </span>
            </td>
            <td className="px-1 py-1 align-middle border-l border-slate-200">
               <div className="relative">
                  <input
                     value={row.code}
                     onChange={(e) => {
                        updateRow(row.id, "code", e.target.value);
                        setActiveRowId(row.id);
                        setSearchText(e.target.value);
                     }}
                     ref={(el) => {
                        if (el) codeRefs.current[row.id] = el;
                     }}
                     disabled={disabled}
                     className="w-full h-9 px-2 text-sm bg-transparent outline-none focus:bg-sky-50 disabled:cursor-not-allowed disabled:text-slate-500 pr-7"
                  />
                  <Search
                     size={14}
                     className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  {activeRowId === row.id && filteredItems.length > 0 && (
                     <div className="absolute z-50 top-full left-0 right-0 bg-white shadow-md max-h-48 overflow-auto">
                        {filteredItems.map((item) => (
                           <div
                              key={item.id}
                              onClick={() => handleItemSelect(row.id, item)}
                              className="px-3 py-2 cursor-pointer hover:bg-slate-100 border border-slate-200"
                           >
                              {item.item_code}
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </td>
            <td className="px-1 py-1 align-middle border-l border-slate-200">
               <div className="relative">
                  <input
                     value={row.description}
                     onChange={(e) =>
                        updateRow(row.id, "description", e.target.value)
                     }
                     disabled={disabled}
                     className="w-full h-9 px-2 text-sm bg-transparent outline-none focus:bg-sky-50 disabled:cursor-not-allowed disabled:text-slate-500 pr-7"
                  />
                  <Search
                     size={14}
                     className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
               </div>
            </td>
            <td className="px-1 py-1 align-middle border-l border-slate-200">
               <select
                  value={row.unit}
                  onChange={(e) => {
                     handleUnitChange(row.id, e.target.value);
                  }}
                  disabled={disabled}
                  className="w-full h-9 px-2 text-sm bg-transparent outline-none focus:bg-sky-50 disabled:cursor-not-allowed disabled:text-slate-500 appearance-none"
               >
                  {row.unitOptions.map((u) => (
                     <option key={u.id} value={u.id}>
                        {getUnitCode(u.unit)}
                     </option>
                  ))}
               </select>
            </td>
            <td className="px-1 py-1 align-middle border-l border-slate-200">
               <input
                  type="number"
                  inputMode="decimal"
                  value={row.qty}
                  onChange={(e) => updateRow(row.id, "qty", e.target.value)}
                  disabled={disabled}
                  min={0}
                  className="w-full h-9 px-2 text-sm bg-transparent outline-none focus:bg-sky-50 disabled:cursor-not-allowed disabled:text-slate-500 text-right tabular-nums"
               />
            </td>
            <td className="px-1 py-1 align-middle border-l border-slate-200">
               <input
                  type="number"
                  inputMode="decimal"
                  value={row.rate}
                  onChange={(e) => updateRow(row.id, "rate", e.target.value)}
                  disabled={disabled}
                  min={0}
                  className="w-full h-9 px-2 text-sm bg-transparent outline-none focus:bg-sky-50 disabled:cursor-not-allowed disabled:text-slate-500 text-right tabular-nums"
               />
            </td>
            <td className="px-1 py-1 align-middle border-l border-slate-200">
               <input
                  type="number"
                  inputMode="decimal"
                  value={row.discPercent}
                  onChange={(e) =>
                     updateRow(row.id, "discPercent", e.target.value)
                  }
                  onKeyDown={(e) => handleDiscPercentTab(e, row.id)}
                  disabled={disabled}
                  min={0}
                  className="w-full h-9 px-2 text-sm bg-transparent outline-none focus:bg-sky-50 disabled:cursor-not-allowed disabled:text-slate-500 text-right tabular-nums"
               />
            </td>
            <td className="px-2 py-1 align-middle border-l border-slate-200 text-right tabular-nums text-slate-700">
               {fmt(row.discAmount)}
            </td>
            <td className="px-2 py-1 align-middle border-l border-slate-200 text-right tabular-nums text-slate-700">
               {fmt(row.net)}
            </td>
            <td className="px-2 py-1 align-middle border-l border-slate-200 text-right tabular-nums text-slate-700">
               {fmt(row.vat)}
            </td>
            <td className="px-2 py-1 align-middle border-l border-slate-200 text-right tabular-nums font-medium text-slate-800">
               {fmt(row.netAfterVat)}
            </td>
            <td className="px-1 py-1 align-middle border-l border-slate-200">
               <button
                  type="button"
                  title="Delete row"
                  onClick={() => deleteRow(row.id)}
                  disabled={disabled || rows.length === 1}
                  className="inline-flex items-center justify-center w-7 h-7 rounded text-rose-500 outline-rose-200 cursor-pointer hover:bg-rose-50 disabled:opacity-30 disabled:cursor-not-allowed"
               >
                  <Trash2 size={15} />
               </button>
            </td>
         </tr>
      </>
   );
}
