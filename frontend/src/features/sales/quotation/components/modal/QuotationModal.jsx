import { X } from "lucide-react";
import { useQuotations } from "../../hooks/queries";
import { useState } from "react";

export default function QuotationModal({ open, onClose, onSelect }) {
   const { data = [], isLoading, error } = useQuotations();

   const [filters, setFilters] = useState({
      quotationNo: "",
      customer: "",
      date: "",
   });

   const filteredData = data.filter((q) => {
      return (
         q.quotation_no
            .toLowerCase()
            .includes(filters.quotationNo.toLowerCase()) &&
         q.customer.toLowerCase().includes(filters.customer.toLowerCase()) &&
         q.quotation_date.includes(filters.date)
      );
   });

   if (!open) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
         <div className="bg-white rounded-lg w-275 max-h-[80vh] shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
               <h2 className="font-semibold">Sales Quotations</h2>

               <button onClick={onClose}>
                  <X size={18} />
               </button>
            </div>

            <div className="p-4 overflow-auto">
               <table className="w-full text-sm">
                  <thead>
                     <tr>
                        <th>Quotation No</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Net</th>
                     </tr>

                     <tr>
                        <th>
                           <input
                              className="w-full border px-2 py-1"
                              placeholder="Filter..."
                              value={filters.quotationNo}
                              onChange={(e) =>
                                 setFilters((p) => ({
                                    ...p,
                                    quotationNo: e.target.value,
                                 }))
                              }
                           />
                        </th>

                        <th>
                           <input
                              className="w-full border px-2 py-1"
                              placeholder="Filter..."
                              value={filters.customer}
                              onChange={(e) =>
                                 setFilters((p) => ({
                                    ...p,
                                    customer: e.target.value,
                                 }))
                              }
                           />
                        </th>

                        <th>
                           <input
                              className="w-full border px-2 py-1"
                              placeholder="yyyy-mm-dd"
                              value={filters.date}
                              onChange={(e) =>
                                 setFilters((p) => ({
                                    ...p,
                                    date: e.target.value,
                                 }))
                              }
                           />
                        </th>

                        <th />
                     </tr>
                  </thead>

                  <tbody>
                     {filteredData.map((quotation) => (
                        <tr
                           key={quotation.id}
                           className="cursor-pointer hover:bg-slate-100"
                           onClick={() => {
                              onSelect(quotation);
                              onClose();
                           }}
                        >
                           <td>{quotation.quotation_no}</td>
                           <td>{quotation.customer}</td>
                           <td>{quotation.quotation_date}</td>
                           <td>{quotation.net_amount}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>

               {isLoading && <p className="p-4">Loading...</p>}
            </div>
         </div>
      </div>
   );
}
