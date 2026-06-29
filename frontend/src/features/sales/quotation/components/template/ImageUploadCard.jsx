import { ImagePlus, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export default function ImageUploadCard({ title, image, file, onChange }) {
   const [preview, setPreview] = useState(image);
   
   useEffect(() => {
      if (file) {
         const url = URL.createObjectURL(file);
         setPreview(url);

         return () => URL.revokeObjectURL(url);
      }
      setPreview(image);
   }, [file, image]);

   return (
      <div className="rounded-xl border bg-white p-5 shadow-sm">
         <h3 className="mb-1 text-lg font-semibold">{title}</h3>
         <div className="overflow-hidden bg-gray-50">
            {preview ? (
               <img
                  src={preview}
                  alt={title}
                  className="h-56 w-full object-contain"
               />
            ) : (
               <div className="flex h-56 flex-col items-center justify-center gap-3 text-gray-400">
                  <ImagePlus size={40} />
                  <p>No image available</p>
               </div>
            )}
         </div>

         <div className="mt-4 flex items-center justify-between">
            <div className="truncate text-sm text-gray-500">
               {file
                  ? file.name
                  : preview
                    ? "Current image"
                    : "No file selected"}
            </div>

            <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
               <RefreshCw size={16} />
               {preview ? "Change" : "Upload"}
               <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                     const selected = e.target.files?.[0];
                     if (selected) {
                        onChange(selected);
                     }
                  }}
               />
            </label>
         </div>
      </div>
   );
}
