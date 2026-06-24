import { View, Text } from "@react-pdf/renderer";

export default function PDFFooter() {
   return (
      <View
         style={{
            marginTop: 25,
            textAlign: "center",
         }}
      >
         <Text
            style={{
               fontSize: 12,
               fontWeight: "bold",
               marginBottom: 5,
            }}
         >
            Thank you for considering Exalore
         </Text>

         <Text
            style={{
               fontSize: 8,
            }}
         >
            www.exalore.com
         </Text>

         <Text
            style={{
               fontSize: 8,
            }}
         >
            sales@exalore.com
         </Text>

         <Text
            style={{
               fontSize: 8,
            }}
         >
            +966 00 000 0000
         </Text>
      </View>
   );
}
