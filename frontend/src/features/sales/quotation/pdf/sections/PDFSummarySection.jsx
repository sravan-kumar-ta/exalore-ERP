import { View } from "@react-pdf/renderer";

import PDFQRCode from "./PDFQRCode";
import PDFTotals from "./PDFTotals";

export default function PDFSummarySection({ qrDataUrl, totals, header }) {
   return (
      <View
         style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
         }}
      >
         <View
            style={{
               width: "25%",
            }}
         >
            <PDFQRCode qrDataUrl={qrDataUrl} />
         </View>

         <View
            style={{
               width: "55%",
            }}
         >
            <PDFTotals totals={totals} header={header}/>
         </View>
      </View>
   );
}
