import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ItemFilePage from "../features/inventory/pages/ItemFilePage";
import Quotation from "../features/sales/pages/Quotaion";
import Order from "../features/sales/pages/Order";
import PDFTemplate from "../features/sales/pages/PDFTemplate";
import Authentication from "../features/auth/pages/Authentication";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
   return (
      <Routes>
         <Route path="/authentication" element={<Authentication />} />
         <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
               <Route path="/" element={<Navigate to="/dashboard" replace />} />
               <Route path="/dashboard" element={<DashboardPage />} />
               <Route path="/inventory/item-file" element={<ItemFilePage />} />
               <Route path="/sales/quotation" element={<Quotation />} />
               <Route path="/sales/order" element={<Order />} />
               <Route path="/sales/pdf-template" element={<PDFTemplate />} />
            </Route>
         </Route>
         <Route
            path="*"
            element={<h1 className="p-6 text-red-500">Page Not Found...!</h1>}
         />
      </Routes>
   );
}
