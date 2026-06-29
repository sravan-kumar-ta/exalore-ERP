import { ChevronLeft, ChevronRight } from "lucide-react";

export default function QuotationLookupPagination({ page, setPage }) {
   return (
      <div className="flex justify-end gap-2 border-t border-gray-400 bg-slate-50 px-5 py-3">
         <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
            <ChevronLeft size={16} />
         </button>

         <span className="bg-blue-600/80 px-1 rounded-md text-white">{page}</span>

         <button onClick={() => setPage((p) => p + 1)}>
            <ChevronRight size={16} />
         </button>
      </div>
   );
}
