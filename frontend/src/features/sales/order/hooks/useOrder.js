import { useMemo, useState } from "react";
import { EMPTY_ROW, EMPTY_HEADER } from "../utilities/utilities";
import { recalcRow } from "../../quotation/healper/calculationHelper";

export function useOrder() {
   const [isEditing, setIsEditing] = useState(false);
   const [header, setHeader] = useState(EMPTY_HEADER);
   const [rows, setRows] = useState([EMPTY_ROW]);
   const [crrQutId, setCrrQutId] = useState("");

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

   const addRow = () => {
      setRows((prev) => [
         ...prev,
         {
            ...EMPTY_ROW,
            id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
         },
      ]);
   };

   const deleteRow = (id) => {
      setRows((prev) =>
         prev.length > 1 ? prev.filter((r) => r.id !== id) : prev,
      );
   };

   const handleNew = async () => {
      // // const data = await getQuotationNumber();
      setCrrQutId("");
      setIsEditing(true);
      // setHeader((prev) => ({
      //    ...prev,
      //    quotationNo: data.quotation_no,
      // }));
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
   };
}
