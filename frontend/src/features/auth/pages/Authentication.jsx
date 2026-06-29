import { useState } from "react";
import BrandPanel from "../components/BrandPanel";
import AuthCard from "../components/AuthCard";
export default function Authentication() {
   const [mode, setMode] = useState("login");

   return (
      <div className="min-h-screen flex bg-[#f4f5f7]">
         <BrandPanel />

         <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
            <AuthCard mode={mode} setMode={setMode} />
         </div>
      </div>
   );
}
