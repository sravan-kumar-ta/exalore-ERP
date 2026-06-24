import React, { useRef, useState } from "react";
import { useItemContext } from "../../context/ItemContext";
import { useItemImageQuery } from "../hooks/queries";
import {
   useCreateItemImageMutation,
   useDeleteItemImage,
} from "../hooks/mutations";
import { Image } from "lucide-react";
import toast from "react-hot-toast";

export default function Photo() {
   const inputRef = useRef(null);

   const { itemId } = useItemContext();
   const { data: imageData, isLoading } = useItemImageQuery(itemId);
   const uploadMutation = useCreateItemImageMutation(itemId);
   const deleteImageMutation = useDeleteItemImage(itemId);

   const hasImage = !!imageData?.image_url;

   if (!itemId) {
      return (
         <div className="p-4 text-sm text-red-500">
            Please create or select an item first.
         </div>
      );
   }

   const handleUpload = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("image", file);
      uploadMutation.mutate(
         { itemId, payload: formData },
         {
            onSuccess: () => {
               toast.success("Photo added successfully.");
            },
            onError: (error) => {
               console.error(error);
               toast.error("Failed to add photo");
            },
         },
      );
   };

   const handleDelete = () => {
      const confirmed = window.confirm(
         "Are you sure you want to delete this image?",
      );

      if (!confirmed) return;

      deleteImageMutation.mutate(itemId, {
         onSuccess: () => {
            toast.success("Image deleted successfully");
         },
         onError: (error) => {
            toast.error(
               error?.response?.data?.message || "Failed to delete image",
            );
         },
      });
   };

   return (
      <div className="p-3">
         <div className="border rounded-xl border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700 mb-5 py-2 px-3 border-b border-gray-200">
               Unit Management
            </h2>

            {/* Add Unit Row */}
            <div className="w-full min-h-80 flex flex-col items-center justify-start">
               <div className="flex min-h-80 flex-col items-center justify-center">
                  {isLoading ? (
                     <div className="flex items-center">
                        <Image color="#b0b0b0" size={22} />
                        <p className="pl-2 text-lg font-medium text-gray-700/50">
                           Loading...
                        </p>
                     </div>
                  ) : imageData?.image_url ? (
                     <img
                        src={imageData.image_url}
                        alt="Item"
                        className="max-h-96 object-contain"
                     />
                  ) : (
                     <>
                        <Image color="#b0b0b0" size={50} />
                        <p className="mt-2 text-slate-600">
                           No image uploaded.
                        </p>
                     </>
                  )}
               </div>

               <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
               />
            </div>

            {/* Save Button */}
            <div className="flex justify-end my-6 px-6">
               <div className="flex justify-end gap-2 p-4 bg-[#f8f9fc] border-t border-[#eef0f4]">
                  <button
                     type="button"
                     onClick={() => inputRef.current?.click()}
                     className={`px-7 py-2 text-xs font-semibold text-white rounded-md cursor-pointer ${
                        hasImage ? "bg-green-600" : "bg-green-400"
                     }`}
                  >
                     {hasImage ? "Update" : "New"}
                  </button>

                  <button
                     type="button"
                     onClick={handleDelete}
                     disabled={!hasImage}
                     className={`px-7 py-2 text-xs font-semibold rounded-md
                           ${hasImage ? "bg-gray-500 text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                        `}
                  >
                     Clear
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
