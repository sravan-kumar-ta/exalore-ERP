import { useMemo, useRef, useState } from "react";
import { EMPTY_ROW, EMPTY_HEADER } from "../utilities/utilities";
import { recalcRow } from "../../quotation/helper/calculationHelper";
import { getOrderNumber } from "../services/orderService";

export function useOrder() {
   const [isEditing, setIsEditing] = useState(false);
   const [header, setHeader] = useState(EMPTY_HEADER);
   const [rows, setRows] = useState([EMPTY_ROW]);
   const [crrQutId, setCrrQutId] = useState("");
   const codeRefs = useRef({});

   const updateHeader = (field) => (e) =>
      setHeader((prev) => ({ ...prev, [field]: e.target.value }));

   const updateRow = (id, field, value) => {
      setRows((prev) =>
         prev.map((r) => {
            if (r.id !== id) return r;
            const updated = { ...r, [field]: value };
            return ["code", "qty", "rate", "discPercent"].includes(field)
               ? recalcRow(updated)
               : updated;
         }),
      );
   };

   // const addRow = () => {
   //    setRows((prev) => [
   //       ...prev,
   //       {
   //          ...EMPTY_ROW,
   //          id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
   //       },
   //    ]);
   // };
   const addRow = () => {
      const newId =
         rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;

      setRows((prev) => [...prev, { ...EMPTY_ROW, id: newId }]);
      return newId;
   };

   const handleDiscPercentTab = (e, rowId) => {
      if (e.key !== "Tab") return;

      // Only add a row if this is the last row
      const isLastRow = rows[rows.length - 1].id === rowId;

      if (!isLastRow) return;

      e.preventDefault();

      const newRowId = addRow();

      requestAnimationFrame(() => {
         codeRefs.current[newRowId]?.focus();
      });
   };

   const deleteRow = (id) => {
      setRows((prev) =>
         prev.length > 1 ? prev.filter((r) => r.id !== id) : prev,
      );
   };

   const handleNew = async () => {
      const data = await getOrderNumber();
      setCrrQutId("");
      setIsEditing(true);
      setHeader((prev) => ({
         ...prev,
         orderNo: data.Order_no,
      }));
   };

   const handleCancel = () => {
      setRows([EMPTY_ROW]);
      setIsEditing(false);
      setHeader(EMPTY_HEADER);
      setCrrQutId("");
   };

   const totals = useMemo(
      () =>
         rows.reduce(
            (acc, r) => {
               const qty = parseFloat(r.qty) || 0;
               const rate = parseFloat(r.rate) || 0;
               acc.gross += qty * rate;
               acc.disc += parseFloat(r.discAmount) || 0;
               acc.net += parseFloat(r.net) || 0;
               acc.vat += parseFloat(r.vat) || 0;
               acc.netAfterVat += parseFloat(r.netAfterVat) || 0;
               return acc;
            },
            { gross: 0, disc: 0, net: 0, vat: 0, netAfterVat: 0 },
         ),
      [rows],
   );

   const disabled = !isEditing;

   return {
      isEditing,
      disabled,
      header,
      rows,
      totals,
      crrQutId,
      codeRefs,
      updateHeader,
      updateRow,
      addRow,
      setRows,
      deleteRow,
      handleNew,
      handleCancel,
      setHeader,
      setIsEditing,
      setCrrQutId,
      handleDiscPercentTab,
   };
}
