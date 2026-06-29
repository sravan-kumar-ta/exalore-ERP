import React from "react";
import { Document, Page, View } from "@react-pdf/renderer";

import { styles } from "./styles";

import PDFHeader from "./sections/PDFHeader";
import PDFInfoBar from "./sections/PDFInfoBar";
import PDFCustomerInfo from "./sections/PDFCustomerInfo";
import PDFItemsTable from "./sections/PDFItemsTable";
import PDFTotals from "./sections/PDFTotals";
import PDFNotes from "./sections/PDFNotes";
import PDFFooter from "./sections/PDFFooter"; // delete
import PDFSummarySection from "./sections/PDFSummarySection";
import PDFHeaderImage from "./sections/PDFHeaderImage";
import PDFFooterImage from "./sections/PDFFooterImage";

export default function QuotationPDF({
   header = {},
   rows = [],
   totals = {},
   qrDataUrl = "",
   getUnitCode,
   headerImage,
   footerImage,
}) {
   const pdfRows = rows.map((row) => ({
      ...row,

      unitCode: getUnitCode(
         row.unitOptions?.find((u) => u.id === row.unit)?.unit,
      ),

      qty: Number(row.qty || 0),
      rate: Number(row.rate || 0),
      discPercent: Number(row.discPercent || 0),
      discAmount: Number(row.discAmount || 0),
      vat: Number(row.vat || 0),
      netAfterVat: Number(row.netAfterVat || 0),
   }));

   return (
      <Document>
         <Page size="A4" style={styles.page}>
            {headerImage ? (
               <PDFHeaderImage image={headerImage} />
            ) : (
               <PDFHeader header={header} />
            )}
            <PDFInfoBar header={header} />
            <PDFCustomerInfo header={header} />
            <PDFItemsTable rows={pdfRows} />
            <PDFSummarySection
               qrDataUrl={qrDataUrl}
               totals={totals}
               header={header}
            />
            <PDFNotes notes={header.notes} />
            {footerImage && <PDFFooterImage image={footerImage} />}
         </Page>
      </Document>
   );
}
