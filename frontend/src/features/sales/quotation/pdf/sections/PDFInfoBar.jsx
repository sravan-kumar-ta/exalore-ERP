import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";
import { formatDate } from "../utils";

export default function PDFInfoBar({ header }) {
   const data = [
      ["QUOTATION NO.", header.quotationNo],
      ["TYPE", header.type],
      ["DATE", formatDate(header.date)],
      // ["VALID UNTIL", formatDate(header.validUntil)],
      ["CURRENCY", header.currency],
      ["EX RATE", header.exRate],
   ];

   return (
      <View style={styles.row}>
         {data.map(([label, value]) => (
            <View
               key={label}
               style={{
                  ...styles.box,
                  flex: 1,
               }}
            >
               <Text style={styles.label}>{label}</Text>
               <Text style={styles.value}>{value}</Text>
            </View>
         ))}
      </View>
   );
}
