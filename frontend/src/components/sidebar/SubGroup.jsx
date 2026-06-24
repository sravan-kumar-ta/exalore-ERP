import { ChevronDown, ChevronRight } from "lucide-react";

import NavLeaf from "./NavLeaf";
import { useState } from "react";

export default function SubGroup({ group, depth }) {
   const [open, setOpen] = useState(true);
   return (
      <div>
         <div
            className="flex items-center justify-between px-3 py-1.25 cursor-pointer text-[11px] text-[#7a8499] uppercase tracking-wider hover:text-[#b0b8cc] transition-colors"
            style={{ paddingLeft: `${depth * 10 + 12}px` }}
            onClick={() => setOpen(!open)}
         >
            <span>{group.label}</span>
            {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
         </div>
         {open &&
            group.children?.map((child) => (
               <NavLeaf key={child.id} item={child} depth={depth + 1} />
            ))}
      </div>
   );
}
