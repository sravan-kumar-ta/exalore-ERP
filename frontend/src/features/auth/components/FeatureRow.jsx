export default function FeatureRow({ icon: Icon, title, subtitle }) {
   return (
      <div className="flex items-start gap-3">
         <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <Icon className="h-4 w-4 text-[#a89bf5]" strokeWidth={2} />
         </div>

         <div>
            <p className="text-sm font-medium leading-tight text-white">
               {title}
            </p>

            <p className="mt-0.5 text-xs text-[#80869a]">{subtitle}</p>
         </div>
      </div>
   );
}
