import React, { useState } from "react";
import { useSalesMasterData } from "../quotation/hooks/queries";
import CustomerSearch from "../quotation/components/template/CustomerSearch";
import TemplatePreview from "../quotation/components/template/TemplatePreview";

function PDFTemplate() {
   const [selectedCustomer, setSelectedCustomer] = useState(null);

   const { data: masterData, isLoading } = useSalesMasterData();
   const { customers = [] } = masterData || {};

   return (
      <div className="mx-auto max-w-6xl space-y-6 p-6">
         {/* Page Header */}
         <div>
            <h1 className="text-2xl font-bold">Document Template</h1>

            <p className="mt-1 text-sm text-gray-500">
               Upload a custom quotation header and footer for each customer.
            </p>
         </div>

         {/* Customer Search */}
         <div className="rounded-xl border bg-white p-6 shadow-sm">
            {isLoading ? (
               <p>Loading customers...</p>
            ) : (
               <CustomerSearch
                  customers={customers}
                  selectedCustomer={selectedCustomer}
                  onSelect={setSelectedCustomer}
               />
            )}
         </div>

         {/* Preview */}
         {selectedCustomer ? (
            <TemplatePreview customerId={selectedCustomer.id} />
         ) : (
            <div className="rounded-xl border border-dashed bg-gray-50 p-16 text-center">
               <h2 className="text-lg font-semibold text-gray-700">
                  Select a Customer
               </h2>

               <p className="mt-2 text-sm text-gray-500">
                  Search and select a customer to manage their quotation header
                  and footer.
               </p>
            </div>
         )}
      </div>
   );
}

export default PDFTemplate;
