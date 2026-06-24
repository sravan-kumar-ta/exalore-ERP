import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
   page: {
      padding: 20,
      fontSize: 9,
      color: "#374151",
   },

   headerBar: {
      backgroundColor: "#1d2d50",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
      color: "#fff",
   },

   companyName: {
      fontSize: 20,
      fontWeight: "bold",
   },

   companySub: {
      fontSize: 8,
      marginTop: 3,
   },

   title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#c89b2b",
      textAlign: "right",
   },

   quoteNo: {
      marginTop: 5,
      textAlign: "right",
      color: "#fff",
   },

   goldLine: {
      height: 3,
      backgroundColor: "#c89b2b",
      marginVertical: 12,
   },

   row: {
      flexDirection: "row",
   },

   box: {
      border: 1,
      borderColor: "#d1d5db",
      padding: 8,
   },

   label: {
      fontSize: 7,
      color: "#6b7280",
   },

   value: {
      fontSize: 10,
      fontWeight: "bold",
      marginTop: 2,
   },

   tableHeader: {
      backgroundColor: "#1d2d50",
      color: "#fff",
      flexDirection: "row",
   },

   tableRow: {
      flexDirection: "row",
      borderBottom: 1,
      borderColor: "#e5e7eb",
      minHeight: 24,
      alignItems: "center",
   },

   cell: {
      padding: 4,
   },

   totalsContainer: {
      width: 220,
      alignSelf: "flex-end",
      marginTop: 20,
   },

   totalRow: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "#d1d5db",
   },

   totalLabel: {
      flex: 1,
      padding: 6,
      textAlign: "right",
   },

   totalValue: {
      width: 90,
      padding: 6,
      textAlign: "right",
   },

   grandLabel: {
      backgroundColor: "#1d2d50",
      color: "#fff",
      fontWeight: "bold",
   },

   grandValue: {
      backgroundColor: "#c89b2b",
      color: "#fff",
      fontWeight: "bold",
   },

   footer: {
      marginTop: 30,
      textAlign: "center",
   },
});
