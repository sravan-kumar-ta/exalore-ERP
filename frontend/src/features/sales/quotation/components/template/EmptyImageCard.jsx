import { ImagePlus } from "lucide-react";

export default function EmptyImageCard({ title, description, onChange }) {
   return (
      <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
            <ImagePlus size={32} className="text-gray-400" />
         </div>

         <h3 className="mt-4 text-lg font-semibold text-gray-700">{title}</h3>

         <p className="mt-2 text-sm text-gray-500">{description}</p>

         <label className="mt-6 inline-flex cursor-pointer items-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
            Upload Image
            <input
               type="file"
               accept="image/*"
               className="hidden"
               onChange={(e) => {
                  if (e.target.files?.[0]) {
                     onChange(e.target.files[0]);
                  }
               }}
            />
         </label>
      </div>
   );
}
