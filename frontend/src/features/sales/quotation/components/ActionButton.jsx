const BUTTON_VARIANTS = {
   default: "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50",
   emerald: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm",
   light: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200",
   violet: "bg-violet-500 hover:bg-violet-600 text-white shadow-sm",
   dark: "bg-slate-800 hover:bg-slate-900 text-white",
   green: "bg-green-500 hover:bg-green-600 text-white shadow-sm",
   amber: "bg-amber-500 hover:bg-amber-600 text-white shadow-sm",
};

export default function ActionButton({
   children,
   icon: Icon,
   onClick,
   disabled,
   variant = "default",
}) {
   return (
      <button
         type="button"
         onClick={onClick}
         disabled={disabled}
         className={`
            inline-flex items-center justify-center gap-1.5
            rounded-md px-4 h-9 text-sm font-medium
            transition-all select-none
            ${BUTTON_VARIANTS[variant]}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
         `}
      >
         {Icon && <Icon size={15} />}
         {children}
      </button>
   );
}
