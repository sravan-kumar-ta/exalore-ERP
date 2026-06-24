import { useState } from "react";
import { Grid3X3 } from "lucide-react";

import ItemFileTabs from "../item-file/ItemFileTabs";
import ItemFormCard from "../item-file/ItemFormCard";
import General from "../item-file/tabs/General";
import UnitBarcode from "../item-file/tabs/UnitBarcode";
import PriceList from "../item-file/tabs/PriceList";
import PurchaseHistory from "../item-file/tabs/PurchaseHistory";
import SalesHistory from "../item-file/tabs/SalesHistory";
import Photo from "../item-file/tabs/Photo";
import { ItemProvider } from "../context/ItemContext";

const TAB_COMPONENTS = {
   general: General,
   "unit-barcode": UnitBarcode,
   "price-list": PriceList,
   "purchase-history": PurchaseHistory,
   "sales-history": SalesHistory,
   photo: Photo,
};

export default function ItemFilePage() {
   const [activeTab, setActiveTab] = useState("general");

   const ActiveTabComponent = TAB_COMPONENTS[activeTab];
   const CONTENT = "#edeff2"; // page bg

   return (
      <div className="flex flex-col h-screen w-full overflow-hidden bg-[#edeff2] font-sans">
         {/* ── Page header ── */}
         <div className="shrink-0 p-4 pb-0">
            <div className="bg-white rounded-md px-4 py-3 mb-2.5 flex items-center gap-2.5">
               <Grid3X3 />
               <div>
                  <div className="text-[15px] font-bold text-gray-800">
                     Item File
                  </div>
                  <div className="text-[11.5px] text-gray-400">
                     Basic item information
                  </div>
               </div>
            </div>
         </div>
         <ItemFileTabs activeTab={activeTab} onChange={setActiveTab} />

         <div className="flex-1 overflow-hidden px-4 pb-4">
            <ItemProvider>
               <ItemFormCard>
                  <ActiveTabComponent />
               </ItemFormCard>
            </ItemProvider>
         </div>
      </div>
   );
}
