import {
   Box,
   Barcode,
   DollarSign,
   ShoppingCart,
   TrendingUp,
   Image,
} from "lucide-react";

const TABS = [
   {
      key: "general",
      label: "General",
      sub: "Basic item information",
      icon: Box,
   },
   {
      key: "unit-barcode",
      label: "Unit & Barcode",
      sub: "Units and barcode management",
      icon: Barcode,
   },
   {
      key: "price-list",
      label: "Price List",
      sub: "Pricing information",
      icon: DollarSign,
   },
   {
      key: "purchase-history",
      label: "Purchase History",
      sub: "Purchase records",
      icon: ShoppingCart,
   },
   {
      key: "sales-history",
      label: "Sales History",
      sub: "Sales records",
      icon: TrendingUp,
   },
   {
      key: "photo",
      label: "Photo",
      sub: "Item image",
      icon: Image,
   },
];

export default function ItemFileTabs({ activeTab, onChange }) {
   return (
      <div className="ml-4 rounded-md overflow-hidden border border-gray-100 pb-4">
         <div className="flex">
            {TABS.map((tab, index) => {
               const Icon = tab.icon;
               const active = activeTab === tab.key;

               return (
                  <button
                     key={tab.key}
                     onClick={() => onChange(tab.key)}
                     className={`flex items-center mr-3 px-8 py-3
                        transition-colors text-left rounded-lg cursor-pointer 
                        ${active && "bg-white shadow-md"}`}
                  >
                     <div
                        className={`
                           w-5 h-5 mr-2.5 rounded-full flex items-center justify-center shrink-0
                           ${
                              active
                                 ? " text-blue-500"
                                 : "bg-gray-100 text-gray-400"
                           }
                        `}
                     >
                        <Icon size={18} />
                     </div>

                     <div className="min-w-0">
                        <div
                           className={`
                              text-xs font-medium truncate
                              ${active ? "text-blue-500" : "text-gray-700"}
                           `}
                        >
                           {tab.label}
                        </div>

                        <div className="text-[9px] text-gray-400 truncate">
                           {tab.sub}
                        </div>
                     </div>
                  </button>
               );
            })}
         </div>
      </div>
   );
}
