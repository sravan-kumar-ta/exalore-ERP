import { View, Image, Text } from "@react-pdf/renderer";

export default function PDFQRCode({ qrDataUrl }) {
   if (!qrDataUrl) return null;

   return (
      <View
         style={{
            alignItems: "center",
            padding: 10,
         }}
      >
         <Text
            style={{
               fontSize: 8,
               marginBottom: 5,
            }}
         >
            Scan To Verify
         </Text>

         <Image
            src={qrDataUrl}
            style={{
               width: 80,
               height: 80,
            }}
         />
      </View>
   );
}