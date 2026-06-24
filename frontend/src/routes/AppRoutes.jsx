import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
// import ItemGroupPage from "../features/inventory/pages/ItemGroupPage";
// import SalesQuotationPage from "../features/sales/pages/SalesQuotationPage";
// import SalesOrderPage from "../features/sales/pages/SalesOrderPage";
// import PurchaseRequisitionPage from "../features/purchase/pages/PurchaseRequisitionPage";
// import PurchaseOrderPage from "../features/purchase/pages/PurchaseOrderPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ItemFilePage from "../features/inventory/pages/ItemFilePage";
import Quotation from "../features/sales/pages/Quotaion";
import Order from "../features/sales/pages/Order";

export default function AppRoutes() {
   return (
      <Routes>
         <Route element={<MainLayout />}>
            {/* Default Route */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Inventory */}
            <Route path="/inventory/item-file" element={<ItemFilePage />} />

            {/* <Route path="/inventory/item-group" element={<ItemGroupPage />} /> */}

            {/* Sales */}
            <Route path="/sales/quotation" element={<Quotation />} />
            <Route path="/sales/order" element={<Order />} />

            {/* Purchase */}
            {/* <Route
               path="/purchase/requisition"
               element={<PurchaseRequisitionPage />}
            /> */}

            {/* <Route path="/purchase/order" element={<PurchaseOrderPage />} /> */}

            {/* 404 */}
            <Route path="*" element={<h1 className="p-6 text-red-500">Page Not Found...!</h1>} />
         </Route>
      </Routes>
   );
}
