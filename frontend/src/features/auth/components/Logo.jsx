export default function Logo({ dark = false }) {
   return (
      <div className="flex items-center gap-2.5">
         <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7c5cf0]">
            <span className="text-base font-semibold text-white">E</span>
         </div>

         <span
            className={`text-lg font-semibold tracking-tight ${
               dark ? "text-white" : "text-[#171b2c]"
            }`}
         >
            Exalore
         </span>
      </div>
   );
}
