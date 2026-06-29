import { Search, Calendar } from "lucide-react";

import Field from "../Field";
import { useState } from "react";

export default function QuotationHeader({
   header,
   disabled,
   updateHeader,
   isEditing,
   customers,
   quotation_types,
   currencies,
   sales_executives,
   filteredCustomers,
   handleCustomerSelect,
   showCustomers,
   setShowCustomers,
   setHeader,
   updateCrrHeader,
}) {
   return (
      <>
         <div className="px-6">
            <div className="rounded-lg bg-white border border-slate-200 shadow-sm mb-4 p-4">
               {/* Row 1 */}
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  <Field
                     label="Quotation No"
                     value={header.quotationNo}
                     onChange={updateHeader("quotationNo")}
                     disabled
                     maxLength={20}
                  />
                  <Field
                     label="Sales Quotation Type"
                     type="select"
                     value={header.type}
                     onChange={updateHeader("type")}
                     disabled={disabled}
                     placeholder="Select quotation type"
                     options={quotation_types}
                  />
                  <Field
                     label="Date"
                     type="date"
                     value={header.date}
                     onChange={updateHeader("date")}
                     disabled={disabled}
                     rightIcon={Calendar}
                  />
                  <div className="relative">
                     <div className="relative rounded-md border border-slate-300 bg-white">
                        <label className="absolute left-3 top-1.5 text-[11px] font-medium text-gray-600">
                           Customer
                        </label>

                        <input
                           value={header.customerName}
                           onChange={(e) => {
                              setShowCustomers(true);
                              setHeader((prev) => ({
                                 ...prev,
                                 customerName: e.target.value,
                              }));
                           }}
                           onBlur={() => {
                              setTimeout(() => {
                                 setShowCustomers(false);
                              }, 150);
                           }}
                           disabled={disabled}
                           className={`w-full bg-transparent pl-3 pr-9 pb-1.5 pt-5 text-sm outline-none text-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed`}
                        />

                        <Search
                           size={16}
                           className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                     </div>

                     {showCustomers && filteredCustomers.length > 0 && (
                        <div className="absolute z-50 left-0 right-0 max-h-48 overflow-auto rounded-md border border-slate-300 bg-white shadow-md">
                           {filteredCustomers.map((customer) => (
                              <div
                                 key={customer.id}
                                 onMouseDown={() => handleCustomerSelect(customer)}
                                 className="cursor-pointer border-b border-slate-100 px-3 py-2 hover:bg-slate-100"
                              >
                                 {customer.name}
                              </div>
                           ))}
                        </div>
                     )}
                  </div>

                  <Field
                     label="CusRefNum#"
                     value={header.cusRefNum}
                     onChange={updateHeader("cusRefNum")}
                     disabled={disabled}
                     maxLength={50}
                     counter
                  />
                  <Field
                     label="Sales Executive"
                     type="select"
                     value={header.salesExecutive}
                     onChange={updateHeader("salesExecutive")}
                     disabled={disabled}
                     placeholder="Select Sales Executive"
                     options={sales_executives}
                  />
               </div>

               {/* Row 2 */}
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-3">
                  <Field
                     label="Attention"
                     value={header.attention}
                     onChange={updateHeader("attention")}
                     disabled={disabled}
                     maxLength={200}
                     counter
                  />
                  <Field
                     label="Pay Terms"
                     value={header.payTerms}
                     onChange={updateHeader("payTerms")}
                     disabled={disabled}
                     maxLength={100}
                     counter
                  />
                  <Field
                     label="Delivery Place"
                     value={header.deliveryPlace}
                     onChange={updateHeader("deliveryPlace")}
                     disabled={disabled}
                     maxLength={150}
                     counter
                  />
                  <Field
                     label="Currency"
                     type="select"
                     value={header.currency}
                     onChange={updateCrrHeader("currency")}
                     disabled={disabled}
                     placeholder="Select currency"
                     options={currencies}
                  />
                  <Field
                     label="Ex Rate"
                     value={header.exRate}
                     onChange={updateHeader("exRate")}
                     disabled={disabled}
                  />
                  <Field
                     label="Notes"
                     value={header.notes}
                     onChange={updateHeader("notes")}
                     disabled={disabled}
                     maxLength={500}
                     counter
                  />
               </div>
            </div>

            {/* Notice bar */}
            {!isEditing && (
               <div className="rounded-md bg-yellow-100 px-4 py-2.5">
                  <span className="text-sm font-medium text-yellow-800">
                     Click 'New/Edit' to enable the form
                  </span>
               </div>
            )}
         </div>
      </>
   );
}
