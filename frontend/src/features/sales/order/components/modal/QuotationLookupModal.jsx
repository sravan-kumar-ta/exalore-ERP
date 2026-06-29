import { useMemo, useState } from "react";
import { X, FileText } from "lucide-react";
import { useSalesOrders } from "../../hooks/queries";
import QuotationLookupTable from "./QuotationLookupTable";
import QuotationLookupPagination from "./QuotationLookupPagination";
import { QUOTATION_COLUMNS } from "../../utilities/utilities";

export default function QuotationLookupModal({ open, onClose, onSelect }) {
   const { data = [] } = useSalesOrders();

   const [filters, setFilters] = useState({});
   const [page, setPage] = useState(1);

   const filteredData = useMemo(() => {
      return data.filter((row) =>
         QUOTATION_COLUMNS.every((col) => {
            if (col.filter === false) return true;

            const filter = filters[col.key];

            if (!filter) return true;

            if (col.type === "date") {
               return row[col.key] === filter;
            }

            return String(row[col.key] || "")
               .toLowerCase()
               .includes(filter.toLowerCase());
         }),
      );
   }, [data, filters]);

   if (!open) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
         <div className="w-full max-w-6xl rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
               <div className="flex items-center gap-3">
                  <FileText size={22} className="text-blue-600" />
                  <div>
                     <h2 className="font-semibold">Sales Quotations</h2>
                     <p className="text-xs text-slate-500">
                        Select a quotation to load
                     </p>
                  </div>
               </div>

               <button onClick={onClose}>
                  <X size={18} />
               </button>
            </div>

            <QuotationLookupTable
               rows={filteredData}
               filters={filters}
               setFilters={setFilters}
               onSelect={onSelect}
            />

            <QuotationLookupPagination page={page} setPage={setPage} />
         </div>
      </div>
   );
}
