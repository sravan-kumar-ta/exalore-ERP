import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";

export default function PDFHeader({ header }) {
   return (
      <>
         <View style={styles.headerBar}>
            <View>
               <Text style={styles.companyName}>EXALORE</Text>
               <Text style={styles.companySub}>
                  Inventory & Sales Management
               </Text>
            </View>

            <View>
               <Text style={styles.title}>Sales Quotation</Text>
               <Text style={styles.quoteNo}>No. {header.quotationNo}</Text>
            </View>
         </View>

         <View style={styles.goldLine} />
      </>
   );
}
