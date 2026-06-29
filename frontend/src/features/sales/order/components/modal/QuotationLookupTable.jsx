import { QUOTATION_COLUMNS } from "../../utilities/utilities";

export default function QuotationLookupTable({
   rows,
   filters,
   setFilters,
   onSelect,
}) {
   const updateFilter = (key) => (e) => {
      setFilters((prev) => ({
         ...prev,
         [key]: e.target.value,
      }));
   };

   return (
      <div className="p-5">
         <div className="overflow-hidden rounded-md border border-gray-400 p-2">
            <table className="w-full text-sm">
               <thead>
                  <tr>
                     {QUOTATION_COLUMNS.map((column) => (
                        <th
                           key={column.key}
                           className="bg-slate-50 p-3 text-left"
                        >
                           <div className="mb-2 text-xs font-semibold">
                              {column.label}
                           </div>

                           {column.filter !== false &&
                              (column.type === "date" ? (
                                 <input
                                    type="date"
                                    value={filters[column.key] || ""}
                                    onChange={updateFilter(column.key)}
                                    className="w-full rounded border border-gray-400 px-2 py-1"
                                 />
                              ) : (
                                 <input
                                    type="text"
                                    placeholder="Filter..."
                                    value={filters[column.key] || ""}
                                    onChange={updateFilter(column.key)}
                                    className="w-full rounded border border-gray-400 px-2 py-1"
                                 />
                              ))}
                        </th>
                     ))}
                  </tr>
               </thead>

               <tbody>
                  {rows.map((row) => (
                     <tr
                        key={row.id}
                        onClick={() => onSelect(row.id)}
                        className="cursor-pointer border-t border-gray-400 hover:bg-slate-50"
                     >
                        <td className="py-1">{row.order_no}</td>
                        <td>{row.quotation_no}</td>
                        <td>{row.order_type_name}</td>
                        <td>{row.issue_date}</td>
                        <td>{row.quotation.customer.name}</td>
                        <td>{row.quotation.sales_executive.name}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
