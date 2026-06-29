import { LayoutGrid, ShoppingCart, TrendingUp } from "lucide-react";

import Logo from "./Logo";
import FeatureRow from "./FeatureRow";

export default function BrandPanel() {
   return (
      <div className="hidden lg:flex lg:w-[44%] relative flex-col justify-between overflow-hidden bg-[#171b2c] p-12">
         {/* Background accents */}
         <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#7c5cf0]/10 blur-3xl" />
         <div className="absolute bottom-0 right-0 h-80 w-80 translate-y-1/3 rounded-full bg-[#7c5cf0]/10 blur-3xl" />

         {/* Logo */}
         <div className="relative z-10">
            <Logo dark />
         </div>

         {/* Content */}
         <div className="relative z-10 max-w-md">
            <h1 className="mb-4 text-3xl font-semibold leading-snug text-white">
               Run your inventory and sales from one place.
            </h1>

            <p className="text-sm leading-relaxed text-[#9097ad]">
               Item catalogs, price lists, quotations, and orders — all kept in
               sync, so your team always works from the same numbers.
            </p>

            <div className="mt-10 space-y-4">
               <FeatureRow
                  icon={LayoutGrid}
                  title="Centralized item master"
                  subtitle="One source of truth for every SKU"
               />

               <FeatureRow
                  icon={ShoppingCart}
                  title="Quotation to invoice"
                  subtitle="Move deals forward without re-entry"
               />

               <FeatureRow
                  icon={TrendingUp}
                  title="Live sales history"
                  subtitle="See trends as orders come in"
               />
            </div>
         </div>

         {/* Footer */}
         <p className="relative z-10 text-xs text-[#5d6280]">
            © {new Date().getFullYear()} Exalore. All rights reserved.
         </p>
      </div>
   );
}
