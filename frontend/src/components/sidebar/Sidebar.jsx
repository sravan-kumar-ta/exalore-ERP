import { useState } from "react";
import { LogOut, User, MapPin, Calendar, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import navData from "./navData";
import NavLeaf from "./NavLeaf";
import SubGroup from "./SubGroup";
import NavGroup from "./NavGroup";

export default function Sidebar() {
   return (
      <aside className="w-sidebar h-screen bg-[#1a1f2e] flex flex-col shrink-0">
         {/* Logo */}
         <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <div className="w-6 h-6 rounded-md bg-linear-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center">
               <span className="text-white text-[10px] font-bold">E</span>
            </div>
            <span className="text-white font-bold text-[15px] tracking-tight">
               Exlore
            </span>
         </div>
         {/* Search */}
         <div className="px-3 py-2">
            <div className="flex items-center gap-2 bg-white/8 rounded-md px-2 py-[5px]">
               <Search size={12} className="text-[#7a8499] shrink-0" />
               <input
                  type="text"
                  placeholder="Search menu..."
                  className="w-full bg-transparent text-[11px] text-[#7a8499] placeholder:text-[#7a8499] outline-none"
               />
            </div>
         </div>

         {/* Nav */}
         <nav className="flex-1 overflow-y-auto">
            {navData.map((item) =>
               item.type === "single" ? (
                  <NavLink
                     key={item.id}
                     to={item.path}
                     className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-1.75 rounded-md mx-1 transition-colors
                        ${
                           isActive
                              ? "bg-[#6c63ff]/15 text-[#6c63ff]"
                              : "text-[#c8cfe0] hover:text-white hover:bg-white/5"
                        }`
                     }
                  >
                     <item.icon size={15} />
                     <span className="font-medium">{item.label}</span>
                  </NavLink>
               ) : (
                  <NavGroup key={item.id} item={item} />
               ),
            )}
         </nav>
         {/* Footer */}
         <div className="mt-auto p-3 border-t border-gray-700">
            <div className="rounded-xl border border-[#2a3650] bg-[#1f2b45] p-3 space-y-3">
               <div className="flex items-center gap-2 text-[11px] text-[#b8c4d9]">
                  <User size={12} className="text-[#7d8fb3]" />
                  <span className="truncate">admin_Client11DB</span>
               </div>

               <div className="flex items-center gap-2 text-[11px] text-[#b8c4d9]">
                  <MapPin size={12} className="text-[#7d8fb3]" />
                  <span className="truncate">SHOWROOM (SA)</span>
               </div>

               <div className="flex items-center gap-2 text-[11px] text-[#b8c4d9]">
                  <Calendar size={12} className="text-[#7d8fb3]" />
                  <span className="truncate">01-01-2026 to 31-12-2026</span>
               </div>
            </div>

            <button className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500/30 bg-red-500/5 text-red-300 hover:bg-red-500/10 transition-colors">
               <LogOut size={14} />
               <span className="text-[12px] font-medium">Logout</span>
            </button>
         </div>
      </aside>
   );
}
