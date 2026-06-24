import { View, Text } from "@react-pdf/renderer";

export default function PDFNotes({ notes }) {
   return (
      <View
         style={{
            marginTop: 30,
            borderTop: 1,
            borderColor: "#d1d5db",
            paddingTop: 10,
         }}
      >
         <Text
            style={{
               fontSize: 10,
               fontWeight: "bold",
               marginBottom: 6,
            }}
         >
            NOTES & TERMS
         </Text>

         <Text
            style={{
               fontSize: 8,
               lineHeight: 1.5,
            }}
         >
            {notes}
         </Text>
      </View>
   );
}
