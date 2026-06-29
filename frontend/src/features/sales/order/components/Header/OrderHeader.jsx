import { Search, Calendar } from "lucide-react";

import Field from "../Field";

export default function OrderHeader({
   header,
   disabled,
   updateHeader,
   isEditing,
   showQuotations,
   setShowQuotations,
   quotations,
   handleQuotationSelect,
   setHeader,
   filteredQuotations,
   quotation_types,
   currencies,
   sales_executives,
}) {
   return (
      <>
         <div className="px-6">
            <div className="rounded-lg bg-white border border-slate-200 shadow-sm mb-4 p-4">
               {/* Row 1 */}
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  <Field
                     label="SO No"
                     value={header.orderNo}
                     onChange={updateHeader("orderNo")}
                     // disabled
                     disabled
                     maxLength={20}
                  />
                  <Field
                     label="Sales Order Type"
                     type="select"
                     value={header.type}
                     onChange={updateHeader("type")}
                     disabled={disabled}
                     placeholder="Select order type"
                     options={quotation_types}
                  />
                  <Field
                     label="Issue Date"
                     type="date"
                     value={header.issueDate}
                     onChange={updateHeader("issueDate")}
                     disabled={disabled}
                     rightIcon={Calendar}
                  />
                  <Field
                     label="Valid Date"
                     type="date"
                     value={header.validDate}
                     onChange={updateHeader("validDate")}
                     disabled={disabled}
                     rightIcon={Calendar}
                  />
                  <div className="relative">
                     <div className="relative rounded-md border border-slate-300 bg-white">
                        <label className="absolute left-3 top-1.5 text-[11px] font-medium text-gray-600">
                           No quotaions linked
                        </label>

                        <input
                           value={header.noQuotLinked}
                           onChange={(e) => {
                              setShowQuotations(true);
                              setHeader((prev) => ({
                                 ...prev,
                                 noQuotLinked: e.target.value,
                              }));
                           }}
                           onBlur={() => {
                              setTimeout(() => {
                                 setShowQuotations(false);
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

                     {showQuotations && filteredQuotations.length > 0 && (
                        <div className="absolute z-50 left-0 right-0 max-h-48 overflow-auto rounded-md border border-slate-300 bg-white shadow-md">
                           {filteredQuotations.map((quotation) => (
                              <div
                                 key={quotation.id}
                                 onMouseDown={() =>
                                    handleQuotationSelect(quotation)
                                 }
                                 className="cursor-pointer border-b border-slate-100 px-3 py-2 hover:bg-slate-100"
                              >
                                 {quotation.quotation_no}
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
                  <Field
                     label="Customer PO"
                     value={header.customerPO}
                     onChange={updateHeader("customerPO")}
                     disabled={disabled}
                     maxLength={50}
                     counter
                  />
               </div>

               {/* Row 2 */}
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-3">
                  <Field
                     label="Customer Search"
                     value={header.customerSearch}
                     onChange={updateHeader("customerSearch")}
                     disabled={disabled}
                     maxLength={200}
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
                  <Field
                     label="Currency"
                     type="select"
                     value={header.currency}
                     onChange={updateHeader("currency")}
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
                     label="Delivery Place"
                     value={header.deliveryPlace}
                     onChange={updateHeader("deliveryPlace")}
                     disabled={disabled}
                     maxLength={150}
                     counter
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
