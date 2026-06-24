import { Search, Calendar } from "lucide-react";

import {
   QUOTATION_TYPES,
   SALES_EXECUTIVES,
   CURRENCIES,
} from "../../../quotation/schemas/schemas";
import Field from "../Field";

export default function OrderHeader({
   header,
   disabled,
   updateHeader,
   isEditing,
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
                     disabled={disabled}
                     maxLength={20}
                  />
                  <Field
                     label="Sales Order Type"
                     type="select"
                     value={header.type}
                     onChange={updateHeader("type")}
                     disabled={disabled}
                     placeholder="Select order type"
                     options={QUOTATION_TYPES}
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
                  <Field
                     label="No quotaions linked"
                     value={header.noQuotLinked}
                     onChange={updateHeader("noQuotLinked")}
                     disabled={disabled}
                     maxLength={50}
                     counter
                  />
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
                     options={SALES_EXECUTIVES}
                  />
                  <Field
                     label="Currency"
                     type="select"
                     value={header.currency}
                     onChange={updateHeader("currency")}
                     disabled={disabled}
                     placeholder="Select currency"
                     options={CURRENCIES}
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
