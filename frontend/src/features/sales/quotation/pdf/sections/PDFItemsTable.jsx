import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";
import { money } from "../utils";

export default function PDFItemsTable({ rows }) {
   const widths = [5, 12, 30, 8, 6, 12, 8, 12, 12, 15];

   const headers = [
      "#",
      "Code",
      "Description",
      "Unit",
      "Qty",
      "Rate",
      "Disc %",
      "Disc Amt",
      "VAT",
      "Net After VAT",
   ];

   return (
      <View style={{ marginTop: 25 }}>
         <View style={styles.tableHeader}>
            {headers.map((h, i) => (
               <Text
                  key={h}
                  style={{
                     ...styles.cell,
                     width: `${widths[i]}%`,
                  }}
               >
                  {h}
               </Text>
            ))}
         </View>

         {rows.map((row, index) => (
            <View key={index} style={styles.tableRow}>
               <Text style={{ ...styles.cell, width: "5%" }}>{index + 1}</Text>

               <Text style={{ ...styles.cell, width: "12%" }}>{row.code}</Text>

               <Text style={{ ...styles.cell, width: "30%" }}>
                  {row.description}
               </Text>

               <Text style={{ ...styles.cell, width: "8%" }}>
                  {row.unitCode}
               </Text>

               <Text style={{ ...styles.cell, width: "6%" }}>{row.qty}</Text>

               <Text style={{ ...styles.cell, width: "12%" }}>
                  {money(row.rate)}
               </Text>

               <Text style={{ ...styles.cell, width: "8%" }}>
                  {row.discPercent}
               </Text>

               <Text style={{ ...styles.cell, width: "12%" }}>
                  {money(row.discAmount)}
               </Text>

               <Text style={{ ...styles.cell, width: "12%" }}>
                  {money(row.vat)}
               </Text>

               <Text style={{ ...styles.cell, width: "15%" }}>
                  {money(row.netAfterVat)}
               </Text>
            </View>
         ))}
      </View>
   );
}
