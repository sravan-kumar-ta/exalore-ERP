import { NavLink } from "react-router-dom";

export default function NavLeaf({ item, depth = 0 }) {
   return (
      <NavLink
         to={item.path || "#"}
         className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-[6px] rounded-md mx-1 text-[12px] transition-colors
            ${
               isActive
                  ? "bg-[#6c63ff]/15 text-[#6c63ff] font-semibold"
                  : "text-[#b0b8cc] hover:bg-white/5 hover:text-white"
            }`
         }
         style={{ paddingLeft: `${depth * 10 + 12}px` }}
      >
         {item.icon && <item.icon size={13} className="shrink-0" />}
         <span>{item.label}</span>
      </NavLink>
   );
}
