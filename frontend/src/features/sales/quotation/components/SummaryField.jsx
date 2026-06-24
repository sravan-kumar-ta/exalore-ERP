export default function SummaryField({ label, value, highlight }) {
   return (
      <div
         className={`relative rounded-md border px-3 pt-5 pb-2 ${
            highlight
               ? "border-emerald-200 bg-emerald-50/40"
               : "border-slate-200 bg-slate-50"
         }`}
      >
         <span className="pointer-events-none absolute left-3 top-1.5 text-[11px] font-medium tracking-wide text-sky-600">
            {label}
         </span>
         <div
            className={`text-right tabular-nums text-sm ${
               highlight ? "text-emerald-700 font-semibold" : "text-slate-700"
            }`}
         >
            {value}
         </div>
      </div>
   );
}
