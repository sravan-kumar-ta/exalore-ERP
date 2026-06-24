import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";

export default function PDFCustomerInfo({ header }) {
   return (
      <View
         style={{
            ...styles.row,
            marginTop: 15,
         }}
      >
         <View
            style={{
               ...styles.box,
               flex: 1,
            }}
         >
            <Text
               style={{
                  backgroundColor: "#1d2d50",
                  color: "#fff",
                  padding: 4,
                  marginBottom: 10,
               }}
            >
               BILL TO
            </Text>

            <Text>{header.customer}</Text>

            <Text>Attention: {header.attention}</Text>
            <Text>Delivery Place: {header.deliveryPlace}</Text>
         </View>

         <View
            style={{
               ...styles.box,
               flex: 1,
            }}
         >
            <Text
               style={{
                  backgroundColor: "#1d2d50",
                  color: "#fff",
                  padding: 4,
                  marginBottom: 10,
               }}
            >
               QUOTATION DETAILS
            </Text>

            <Text>Customer Ref #: {header.cusRefNum}</Text>
            <Text>Sales Executive: {header.salesExecutive}</Text>
            <Text>Pay Terms: {header.payTerms}</Text>
         </View>
      </View>
   );
}
