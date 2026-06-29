import { Image } from "@react-pdf/renderer";

export default function PDFHeaderImage({ image }) {
   if (!image) return null;

   return (
      <Image
         src={image}
         style={{
            width: "100%",
            height: 90,
            marginBottom: 15,
         }}
      />
   );
}
