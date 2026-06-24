export default function Field({
   label,
   type = "text",
   value,
   onChange,
   disabled,
   placeholder,
   maxLength,
   counter,
   rightIcon: RightIcon,
   options,
}) {
   return (
      <div className="relative">
         <div className="relative rounded-md border transition-colors border-slate-300 bg-white focus-within:border-sky-300 focus-within:ring-1 focus-within:ring-sky-100">
            <label className="pointer-events-none absolute left-3 top-1.5 text-[11px] font-medium tracking-wide text-gray-600">
               {label}
            </label>

            {type === "select" ? (
               <>
                  <select
                     value={value}
                     onChange={onChange}
                     disabled={disabled}
                     className="w-full appearance-none bg-transparent pl-3 pr-9 pb-1.5 pt-5 text-sm outline-none text-slate-800 disabled:cursor-not-allowed disabled:text-slate-500"
                  >
                     <option value="">{placeholder}</option>
                     {options.map((o) => (
                        <option key={o.value} value={o.value}>
                           {o.label}
                        </option>
                     ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                     ▾
                  </span>
               </>
            ) : (
               <>
                  <input
                     type={type}
                     value={value}
                     onChange={onChange}
                     disabled={disabled}
                     maxLength={maxLength}
                     className={`appearance-none [&::-webkit-calendar-picker-indicator]:hidden w-full bg-transparent pl-3 pb-1.5 pt-5 text-sm outline-none text-slate-800 disabled:cursor-not-allowed disabled:text-slate-500 ${
                        RightIcon ? "pr-9" : "pr-3"
                     }`}
                  />
                  {RightIcon && (
                     <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <RightIcon size={16} />
                     </span>
                  )}
               </>
            )}
         </div>

         {counter && (
            <div className="mt-0.5 text-right text-[10px] text-slate-400">
               {value.length}/{maxLength}
            </div>
         )}
      </div>
   );
}
