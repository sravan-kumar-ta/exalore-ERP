import { fmt } from "../../helper/calculationHelper";
import SummaryField from "../SummaryField";

export default function QuotationSummary({ totals }) {
   return (
      <div
         data-testid="summary-section"
         className="sticky bottom-14 bg-white border-t border-slate-200 px-6 py-3"
      >
         <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <SummaryField label="Gross" value={fmt(totals.gross)} />
            <SummaryField label="Disc" value={fmt(totals.disc)} />
            <SummaryField label="Net Total" value={fmt(totals.net)} />
            <SummaryField label="VAT" value={fmt(totals.vat)} />
            <SummaryField
               label="Net After VAT"
               value={fmt(totals.netAfterVat)}
               highlight
            />
         </div>
      </div>
   );
}
