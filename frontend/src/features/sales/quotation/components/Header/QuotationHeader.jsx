import { Search, Calendar } from "lucide-react";

import Field from "../Field";
import {
   QUOTATION_TYPES,
   SALES_EXECUTIVES,
   CURRENCIES,
} from "../../schemas/schemas";

export default function QuotationHeader({
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
                     options={QUOTATION_TYPES}
                  />
                  <Field
                     label="Date"
                     type="date"
                     value={header.date}
                     onChange={updateHeader("date")}
                     disabled={disabled}
                     rightIcon={Calendar}
                  />
                  <Field
                     label="Customer Search"
                     value={header.customer}
                     onChange={updateHeader("customer")}
                     disabled={disabled}
                     rightIcon={Search}
                  />
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
                     options={SALES_EXECUTIVES}
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
