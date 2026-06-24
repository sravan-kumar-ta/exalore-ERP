export default function PagerButton({ icon: Icon, label, onClick }) {
   return (
      <button
         type="button"
         aria-label={label}
         title={label}
         onClick={onClick}
         className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
      >
         <Icon size={18} />
      </button>
   );
}
