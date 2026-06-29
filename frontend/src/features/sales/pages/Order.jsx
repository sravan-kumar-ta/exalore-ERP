import { useState, useMemo } from "react";
import {
   Search,
   Calendar,
   Plus,
   Trash2,
   ChevronsLeft,
   ChevronLeft,
   ChevronRight,
   ChevronsRight,
   FilePlus2,
   Printer,
   Eye,
   List as ListIcon,
   X as XIcon,
} from "lucide-react";

import {
   QUOTATION_TYPES,
   SALES_EXECUTIVES,
   CURRENCIES,
} from "../quotation/schemas/schemas";

import { EMPTY_ROW, EMPTY_HEADER } from "../quotation/utilities/utilities";
import {
   recalcRow,
   fmt,
   VAT_RATE,
} from "../quotation/helper/calculationHelper";
import Field from "../quotation/components/Field";
import SummaryField from "../quotation/components/SummaryField";
import ActionButton from "../quotation/components/ActionButton";
import PagerButton from "../quotation/components/PagerButton";
import { COLUMNS } from "../quotation/helper/columnHeaders";
import ItemsTable from "../quotation/components/Items/ItemsTable";
import QuotationSummary from "../quotation/components/Summary/QuotationSummary";
import ActionBar from "../quotation/components/Actions/ActionBar";
import QuotationHeader from "../quotation/components/Header/QuotationHeader";
import { useQuotation } from "../quotation/hooks/useQuotation";
import { useItems, useUnitData } from "../../inventory/item-file/hooks/queries";
import { getItemUnits } from "../../inventory/item-file/services/itemService";
import {
   useCreateSalesOrder,
   useUpdateSalesOrder,
} from "../order/hooks/mutations";
import toast from "react-hot-toast";
import QuotationModal from "../quotation/components/modal/QuotationModal";
import QuotationLookupModal from "../order/components/modal/QuotationLookupModal";
import { getQuotation } from "../quotation/services/quotationService";
import {
   quotationToHeader,
   quotationToRows,
} from "../quotation/helper/updateQuotation";
import {
   useGetItemUnits,
   useQuotations,
   useSalesMasterData,
} from "../quotation/hooks/queries";
import OrderHeader from "../order/components/Header/OrderHeader";
import { useOrder } from "../order/hooks/useOrder";
import { quotationToOrderHeader } from "../order/helper/createOrderHeader";
import { getOrderNumber, getSalesOrder } from "../order/services/orderService";
import { buildOrderPayload } from "../order/helper/createPayload";
import { orderToHeader } from "../order/helper/updateOrder";

export default function Order() {
   const {
      header,
      rows,
      totals,
      disabled,
      isEditing,
      crrQutId,
      codeRefs,
      setIsEditing,
      updateHeader,
      updateRow,
      addRow,
      setRows,
      deleteRow,
      handleNew,
      handleCancel,
      setHeader,
      setCrrQutId,
      handleDiscPercentTab,
   } = useOrder();

   const [activeRowId, setActiveRowId] = useState(null);
   const [searchText, setSearchText] = useState("");
   const [showLookup, setShowLookup] = useState(false);
   const [showQuotations, setShowQuotations] = useState(false);

   const { data: items = [] } = useItems();
   const { data: units = [] } = useUnitData();
   const { data: itemUnits = [] } = useGetItemUnits();
   const { data: quotations = [] } = useQuotations();
   const { data: masterData } = useSalesMasterData();

   const {
      customers = [],
      quotation_types = [],
      currencies = [],
      sales_executives = [],
   } = masterData || {};

   const customerOptions = customers.map((c) => ({
      value: c.id,
      label: c.name,
   }));

   const quotationTypeOptions = quotation_types.map((t) => ({
      value: t.id,
      label: t.name,
   }));

   const currencyOptions = currencies.map((c) => ({
      value: c.id,
      label: c.code + " - " + c.name,
   }));

   const salesExecutiveOptions = sales_executives.map((s) => ({
      value: s.id,
      label: s.name,
   }));

   const createSalesOrderMutation = useCreateSalesOrder();
   const updateSalesOrderMutation = useUpdateSalesOrder();

   const updateRowFields = (rowId, values) => {
      setRows((prev) =>
         prev.map((row) => (row.id === rowId ? { ...row, ...values } : row)),
      );
   };

   const filteredItems =
      searchText.length === 0
         ? []
         : items.filter((item) =>
              item.item_code.toLowerCase().includes(searchText.toLowerCase()),
           );

   const customerMap = Object.fromEntries(customers.map((c) => [c.id, c]));
   const currencyMap = Object.fromEntries(currencies.map((c) => [c.id, c]));
   const quotationTypeMap = Object.fromEntries(
      quotation_types.map((t) => [t.id, t]),
   );
   const salesExecutiveMap = Object.fromEntries(
      sales_executives.map((s) => [s.id, s]),
   );

   const handleQuotationSelect = async (quotation) => {
      const data = await getQuotation(quotation.id);
      const header = quotationToOrderHeader(
         data,
         customerMap,
         quotationTypeMap,
         currencyMap,
         salesExecutiveMap,
      );

      setHeader((prev) => ({ ...prev, ...header }));
      setRows(quotationToRows(data.lines, itemUnits));

      setShowQuotations(false);
   };

   const handleItemSelect = async (rowId, item) => {
      const unitItemData = await getItemUnits(item.id);
      const firstUnit = unitItemData?.[0];

      updateRowFields(rowId, {
         itemId: item.id,
         code: item.item_code,
         description: item.name_1,
         unit: firstUnit?.id ?? "",
         // qty: firstUnit?.factor ?? "",
         rate: firstUnit?.sale_price ?? "",
         unitOptions: unitItemData,
         vatPercent: VAT_RATE,
      });

      setActiveRowId(null);
      setSearchText("");
   };

   const getUnitCode = (unitId) => {
      return units.find((unit) => unit.id === unitId)?.code || "";
   };

   const handleUnitChange = (rowId, selectedUnitId) => {
      setRows((prev) =>
         prev.map((row) => {
            if (row.id !== rowId) return row;

            const selectedUnit = row.unitOptions.find(
               (u) => u.id === Number(selectedUnitId),
            );

            if (!selectedUnit) return row;

            return {
               ...row,
               unit: selectedUnitId,
               // qty: selectedUnit.factor,
               rate: selectedUnit.sale_price,
            };
         }),
      );
   };

   const filteredQuotations = quotations.filter((quotation) =>
      quotation.quotation_no
         .toLowerCase()
         .includes((header.noQuotLinked || "").toLowerCase()),
   );

   const handleCreateQuotation = () => {
      const payload = buildOrderPayload(header);

      createSalesOrderMutation.mutate(payload, {
         onSuccess: (data) => {
            toast.success("Order created successfully.");
            setCrrQutId(data.id);
            setIsEditing(false);
         },
         onError: (error) => {
            console.error(error);
            toast.error("Failed to create order");
         },
      });
   };

   const handleLoadQuotation = async (id) => {
      setShowLookup(false);
      setCrrQutId(id);

      try {
         const data = await getSalesOrder(id);

         setHeader(orderToHeader(data));
         setRows(quotationToRows(data.lines, itemUnits));
         toast.success("Quotation " + data.quotation_no + " loaded.");
      } catch (error) {
         console.error(error);
         toast.error("Failed to fetch data");
      }
   };

   const handleUpdateQuotation = () => {
      const payload = buildOrderPayload(header);
      
      updateSalesOrderMutation.mutate(
         { id: crrQutId, payload },
         {
            onSuccess: (data) => {
               toast.success("Item updated successfully.");
            },
            onError: (error) => {
               console.error(error);
               toast.error("Failed to update item");
            },
         },
      );
   };

   const handlePreview = () => alert("Under contruction");

   return (
      <div
         data-testid="sales-quotation-page"
         className="h-screen flex flex-col bg-slate-100 text-slate-800"
         style={{ fontFamily: '"IBM Plex Sans", Inter, system-ui, sans-serif' }}
      >
         <div className="px-6 pt-4 pb-2 bg-slate-100">
            <h1
               data-testid="page-title"
               className="text-center text-xl font-semibold tracking-wide text-slate-800"
            >
               Sales Order
            </h1>
         </div>

         <OrderHeader
            header={header}
            disabled={disabled}
            updateHeader={updateHeader}
            isEditing={isEditing}
            showQuotations={showQuotations}
            setShowQuotations={setShowQuotations}
            sales_executives={salesExecutiveOptions}
            currencies={currencyOptions}
            quotation_types={quotationTypeOptions}
            customers={customerOptions}
            quotations={quotations}
            handleQuotationSelect={handleQuotationSelect}
            setHeader={setHeader}
            filteredQuotations={filteredQuotations}
         />

         <ItemsTable
            rows={rows}
            disabled={disabled}
            addRow={addRow}
            updateRow={updateRow}
            deleteRow={deleteRow}
            activeRowId={activeRowId}
            setActiveRowId={setActiveRowId}
            setSearchText={setSearchText}
            filteredItems={filteredItems}
            handleItemSelect={handleItemSelect}
            getUnitCode={getUnitCode}
            handleUnitChange={handleUnitChange}
            codeRefs={codeRefs}
            handleDiscPercentTab={handleDiscPercentTab}
         />

         <QuotationSummary totals={totals} />

         <ActionBar
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleNew={handleNew}
            handleCancel={handleCancel}
            handlePreview={handlePreview} // need to change
            rows={rows}
            header={header}
            handleCreateQuotation={handleCreateQuotation} // need to change
            setShowLookup={setShowLookup}
            crrQutId={crrQutId}
            handleUpdateQuotation={handleUpdateQuotation} // need to change
         />

         <QuotationLookupModal
            open={showLookup}
            onClose={() => setShowLookup(false)}
            onSelect={handleLoadQuotation}
         />
      </div>
   );
}
