import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
   return (
      <div className="flex h-screen">
         <Sidebar />

         <div className="flex flex-col flex-1">
            <Header />

            <main className="flex-1">
               <Outlet />
            </main>
         </div>
      </div>
   );
}