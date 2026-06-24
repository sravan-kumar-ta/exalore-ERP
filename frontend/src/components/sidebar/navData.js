import {
   LayoutDashboard,
   Package,
   ShoppingCart,
   ShoppingBag,
   FileText,
   BarChart2,
   ChevronDown,
   ChevronRight,
   LogOut,
   User,
   MapPin,
   Calendar,
   Search,
   Tag,
   Layers,
   ClipboardList,
   ReceiptText,
   RotateCcw,
   Truck,
   Wrench,
} from "lucide-react";

const navData = [
   {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      type: "single",
   },
   {
      id: "inventory",
      label: "Inventory",
      icon: Package,
      type: "group",
      children: [
         {
            id: "inv-def",
            label: "Definitions",
            type: "subgroup",
            children: [
               {
                  id: "item-file",
                  label: "Item File",
                  icon: Tag,
                  path: "/inventory/item-file",
               },
               {
                  id: "item-group",
                  label: "Item Group",
                  icon: Layers,
                  path: "/inventory/item-group",
               },
            ],
         },
         {
            id: "inv-tx",
            label: "Transactions",
            icon: ClipboardList,
            type: "leaf",
            path: "/inventory/transaction",
         },
         {
            id: "inv-rep",
            label: "Reports",
            icon: BarChart2,
            type: "leaf",
            path: "/inventory/report",
         },
      ],
   },
   {
      id: "sales",
      label: "Sales",
      icon: ShoppingCart,
      type: "group",
      children: [
         {
            id: "sales-def",
            label: "Definitions",
            type: "subgroup",
            children: [],
         },
         {
            id: "sales-tx",
            label: "Transactions",
            type: "subgroup",
            children: [
               {
                  id: "sales-quot",
                  label: "Sales Quotation",
                  icon: FileText,
                  path: "/sales/quotation",
               },
               {
                  id: "sales-order",
                  label: "Sales Order",
                  icon: ClipboardList,
                  path: "/sales/order",
               },
               {
                  id: "sales-inv",
                  label: "Sales Invoice",
                  icon: ReceiptText,
                  path: "/sales/Invoice",
               },
               {
                  id: "sales-ret",
                  label: "Sales Return",
                  icon: RotateCcw,
                  path: "/sales/return",
               },
            ],
         },
         {
            id: "sales-rep",
            label: "Reports",
            icon: BarChart2,
            type: "leaf",
            path: "/sales/report",
         },
      ],
   },
   {
      id: "purchase",
      label: "Purchase",
      icon: ShoppingBag,
      type: "group",
      children: [
         {
            id: "pur-def",
            label: "Definitions",
            type: "subgroup",
            children: [],
         },
         {
            id: "pur-tx",
            label: "Transactions",
            type: "subgroup",
            children: [
               {
                  id: "pur-req",
                  label: "Purchase Requisition",
                  icon: ClipboardList,
                  path: "/purchase/pur-req",
               },
               {
                  id: "pur-ord",
                  label: "Purchase Order",
                  icon: ShoppingBag,
                  path: "/purchase/pur-ord",
               },
               {
                  id: "pur-inv",
                  label: "Purchase Invoice",
                  icon: ReceiptText,
                  path: "/purchase/pur-inv",
               },
               {
                  id: "pur-ret",
                  label: "Purchase Return",
                  icon: RotateCcw,
                  path: "/purchase/pur-ret",
               },
               {
                  id: "svc-pur",
                  label: "Service Purchases",
                  icon: Wrench,
                  path: "/purchase/pur-pur",
               },
            ],
         },
         {
            id: "pur-rep",
            label: "Reports",
            icon: BarChart2,
            type: "leaf",
            path: "/purchase/report",
         },
      ],
   },
];

export default navData;
