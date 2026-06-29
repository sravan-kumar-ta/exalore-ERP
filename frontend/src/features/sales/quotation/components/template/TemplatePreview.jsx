import { useState } from "react";
import toast from "react-hot-toast";

import EmptyImageCard from "./EmptyImageCard";
import ImageUploadCard from "./ImageUploadCard";
import { useDocumentTemplate } from "../../hooks/queries";
import { useUpdateDocumentTemplate } from "../../hooks/mutations";

export default function TemplatePreview({ customerId }) {
   const { data: template, isLoading } = useDocumentTemplate(customerId);

   const updateTemplate = useUpdateDocumentTemplate();

   const [headerFile, setHeaderFile] = useState(null);
   const [footerFile, setFooterFile] = useState(null);

   const hasChange = !!headerFile || !!footerFile;

   const handleSave = () => {
      const formData = new FormData();

      if (headerFile) formData.append("header", headerFile);

      if (footerFile) formData.append("footer", footerFile);

      if (!headerFile && !footerFile) {
         toast.error("No changes to save.");
         return;
      }

      updateTemplate.mutate(
         {
            customerId,
            formData,
         },
         {
            onSuccess: () => {
               toast.success("Template updated.");

               setHeaderFile(null);
               setFooterFile(null);
            },
         },
      );
   };

   if (isLoading) {
      return (
         <div className="rounded-lg border bg-white p-10 text-center">
            Loading...
         </div>
      );
   }

   return (
      <>
         <div className="grid grid-cols-2 gap-6">
            {/* Header */}
            {template?.header || headerFile ? (
               <ImageUploadCard
                  title="Header"
                  image={template?.header_url}
                  file={headerFile}
                  onChange={setHeaderFile}
               />
            ) : (
               <EmptyImageCard
                  title="No Header"
                  description="Add a header image for quotations."
                  onChange={setHeaderFile}
               />
            )}

            {/* Footer */}
            {template?.footer || footerFile ? (
               <ImageUploadCard
                  title="Footer"
                  image={template?.footer_url}
                  file={footerFile}
                  onChange={setFooterFile}
               />
            ) : (
               <EmptyImageCard
                  title="No Footer"
                  description="Add a footer image for quotations."
                  onChange={setFooterFile}
               />
            )}
         </div>

         <div className="flex justify-end">
            <button
               onClick={handleSave}
               disabled={updateTemplate.isPending}
               className={`${hasChange ? "block" : "hidden"} "rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"`}
            >
               {updateTemplate.isPending ? "Saving..." : "Save changes"}
            </button>
         </div>
      </>
   );
}
