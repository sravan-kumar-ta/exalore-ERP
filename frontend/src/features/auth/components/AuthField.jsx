import { forwardRef } from "react";

const AuthField = forwardRef(
   (
      {
         label,
         icon: Icon,
         trailingIcon: TrailingIcon,
         onTrailingClick,
         error,
         type = "text",
         className = "",
         ...props
      },
      ref
   ) => {
      return (
         <div>
            <label
               htmlFor={props.name}
               className="block text-sm font-medium text-[#3c4256] mb-1.5"
            >
               {label}
            </label>

            <div className="relative">
               {Icon && (
                  <Icon
                     className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa0b4]"
                     strokeWidth={2}
                  />
               )}

               <input
                  ref={ref}
                  id={props.name}
                  type={type}
                  {...props}
                  className={`w-full bg-[#f4f5f8] border rounded-lg py-2.5 pl-10 pr-10 text-sm text-[#171b2c] placeholder:text-[#a4a9ba] outline-none transition-all
                  ${
                     error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-transparent focus:bg-white focus:border-[#7c5cf0]/40 focus:ring-2 focus:ring-[#7c5cf0]/15"
                  }
                  ${className}`}
               />

               {TrailingIcon && (
                  <button
                     type="button"
                     onClick={onTrailingClick}
                     tabIndex={-1}
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa0b4] hover:text-[#5b6175] transition-colors"
                  >
                     <TrailingIcon
                        className="w-4 h-4"
                        strokeWidth={2}
                     />
                  </button>
               )}
            </div>

            {error && (
               <p className="mt-1 text-xs text-red-500">
                  {error}
               </p>
            )}
         </div>
      );
   }
);

AuthField.displayName = "AuthField";

export default AuthField;