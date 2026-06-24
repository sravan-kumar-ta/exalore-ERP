import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

export const Input = forwardRef(({ disabled, error, ...props }, ref) => {
   return (
      <input
         {...props}
         ref={(el) => {
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
            if (typeof props.ref === "function") props.ref(el);
         }}
         disabled={disabled}
         className={`w-full h-9 px-2.5 border rounded-md text-[12.5px] ${
            disabled ? "bg-[#f5f5f5] " : "bg-white"
         } ${error ? "border-red-400" : "border-gray-200"} text-gray-700 outline-none`}
      />
   );
});
Input.displayName = "Input";

export const Select = forwardRef(
   (
      {
         placeholder,
         options = [],
         disabled,
         error,
         valueKey = "id",
         labelKey = "name",
         ...props
      },
      ref,
   ) => {
      return (
         <div className="relative">
            <select
               ref={ref}
               disabled={disabled}
               {...props}
               className={`w-full h-9 pl-2.5 pr-7 border rounded-md text-[12.5px]
                  ${disabled ? "bg-[#f5f5f5]" : "bg-white"}
                  ${error ? "border-red-400" : "border-gray-200"}
                  text-gray-700 appearance-none outline-none cursor-pointer`}
            >
               <option value="">{placeholder}</option>

               {options.map((option) => {
                  if (
                     typeof option === "string" ||
                     typeof option === "number"
                  ) {
                     return (
                        <option key={option} value={option}>
                           {option}
                        </option>
                     );
                  }

                  const optionValue = option[valueKey];
                  const optionLabel = option[labelKey];

                  return (
                     <option key={optionValue} value={optionValue}>
                        {optionLabel}
                     </option>
                  );
               })}
            </select>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
               <ChevronDown size={13} stroke="#9ca3af" />
            </div>
         </div>
      );
   },
);
Select.displayName = "Select";

export function Field({ label, required, error, children }) {
   return (
      <div>
         <label className="block mb-1.5 text-xs font-medium text-gray-500">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
         </label>

         {children}

         {error && (
            <p className="mt-1 text-[11px] text-red-500">{error.message}</p>
         )}
      </div>
   );
}

export function Section({ title, children }) {
   return (
      <>
         <div className="bg-[#f8f9fc] px-4 py-2 border-y border-[#eef0f4]">
            <span className="text-xs font-semibold text-gray-700">{title}</span>
         </div>

         {children}
      </>
   );
}

export function ActionButtons({ onClear, onNew, onList, saveMode }) {
   return (
      <div className="flex justify-end gap-2 p-4 border-t border-[#eef0f4]">
         <button
            type="button"
            onClick={onNew}
            className={`px-7 py-2 text-xs font-semibold text-white bg-green-400 rounded-md cursor-pointer ${
               saveMode == "new" ? "block" : "hidden"
            }`}
         >
            New
         </button>

         <button
            type="submit"
            className={`px-7 py-2 text-xs font-semibold text-white bg-green-600 rounded-md cursor-pointer ${
               saveMode == "save" ? "block" : "hidden"
            }`}
         >
            Save
         </button>

         <button
            type="submit"
            className={`px-7 py-2 text-xs font-semibold text-white bg-yellow-500 rounded-md cursor-pointer ${
               saveMode == "update" ? "block" : "hidden"
            }`}
         >
            Update
         </button>

         <button
            type="button"
            onClick={onList}
            className="px-7 py-2 text-xs  text-white bg-violet-500 rounded-md cursor-pointer"
         >
            List
         </button>

         <button
            type="button"
            onClick={onClear}
            className="px-7 py-2 text-xs font-semibold text-white bg-gray-500 rounded-md cursor-pointer"
         >
            Clear
         </button>
      </div>
   );
}
