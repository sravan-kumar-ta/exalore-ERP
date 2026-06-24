import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import SubGroup from "./SubGroup";
import NavLeaf from "./NavLeaf";

export default function NavGroup({ item }) {
   const [open, setOpen] = useState(true);
   const Icon = item.icon;
   return (
      <div>
         <div
            className="flex items-center justify-between px-3 py-1.75 cursor-pointer text-[13px] text-[#c8cfe0] hover:text-white hover:bg-white/5 rounded-md mx-1 transition-colors"
            onClick={() => setOpen(!open)}
         >
            <div className="flex items-center gap-2">
               <Icon size={15} className="shrink-0" />
               <span className="font-medium">{item.label}</span>
            </div>
            {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
         </div>
         {open && (
            <div className="mt-0.5">
               {item.children?.map((child) =>
                  child.type === "subgroup" ? (
                     <SubGroup key={child.id} group={child} depth={1} />
                  ) : child.type === "leaf" ? (
                     <NavLeaf
                        key={child.id}
                        item={{ ...child, icon: child.icon }}
                        depth={1}
                     />
                  ) : (
                     <NavLeaf key={child.id} item={child} depth={1} />
                  ),
               )}
            </div>
         )}
      </div>
   );
}
