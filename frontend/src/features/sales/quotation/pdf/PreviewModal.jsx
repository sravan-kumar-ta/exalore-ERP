import { pdf, PDFViewer } from "@react-pdf/renderer";
import QuotationPDF from "./QuotationPDF";
import toast from "react-hot-toast";
import QRCode from "qrcode";
import { getDocumentTemplate } from "../services/quotationService";

export const handlePreview = async (rows = [], header, totals, getUnitCode) => {
   const qrPayload = {
      quotationNo: header.quotationNo,
      customer: header.customer,
      date: header.date,
      total: totals.netAfterVat,
   };

   const template = await getDocumentTemplate(header.customer);

   const qrDataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload), {
      width: 150,
      margin: 1,
   });

   if (totals.netAfterVat == 0) {
      toast.error("Add items before print.");
      return;
   }

   try {
      const blob = await pdf(
         <QuotationPDF
            header={header}
            rows={rows}
            totals={totals}
            qrDataUrl={qrDataUrl}
            getUnitCode={getUnitCode}
            headerImage={template.header_url ?? null}
            footerImage={template.footer_url ?? null}
         />,
      ).toBlob();

      const url = URL.createObjectURL(blob);

      window.open(url, "_blank");
   } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
   }
};
