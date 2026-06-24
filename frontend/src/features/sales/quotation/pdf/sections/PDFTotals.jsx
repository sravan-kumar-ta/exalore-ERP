import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";
import { money } from "../utils";

export default function PDFTotals({ totals, header }) {
   return (
      <View style={styles.totalsContainer}>
         <Row label="Gross Total" value={money(totals.gross)} header={header} />

         <Row label="Discount" value={money(totals.disc)} header={header} />

         <Row label="Net Total" value={money(totals.net)} header={header} />

         <Row label="VAT (15%)" value={money(totals.vat)} header={header} />

         <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, styles.grandLabel]}>
               Net After VAT
            </Text>

            <Text style={[styles.totalValue, styles.grandValue]}>
               {header.currency} {money(totals.netAfterVat)}
            </Text>
         </View>
      </View>
   );
}

function Row({ label, value, header }) {
   return (
      <View style={styles.totalRow}>
         <Text style={styles.totalLabel}>{label}</Text>

         <Text style={styles.totalValue}>
            {header.currency} {value}
         </Text>
      </View>
   );
}
