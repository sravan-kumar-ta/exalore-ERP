import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
   ActionButtons,
   Field,
   Input,
   Section,
   Select,
} from "../components/General";
import { itemFormSchema, INITIAL_FORM } from "../schemas/itemSchema";
import { useItem, useItemMasterData } from "../hooks/queries";
import {
   BEHAVIOUR_OPTIONS,
   STATUS_OPTIONS,
   TAXABLE_STATUS_OPTIONS,
} from "../schemas/dbSchema";
import ItemListModal from "../components/ItemListModal";
import { useCreateItem, useUpdateItem } from "../hooks/mutations";
import { useItemContext } from "../../context/ItemContext";
import toast from "react-hot-toast";

export default function General() {
   const [isEditable, setIsEditable] = useState(false);
   const [saveMode, setSaveMode] = useState("new");
   const [selectedItemId, setSelectedItemId] = useState(null);
   const [isListOpen, setIsListOpen] = useState(false);
   const itemCodeRef = useRef(null);
   const { itemId, saveItemId, clearItem } = useItemContext();

   const { data: itemData } = useItem(itemId, {
      enabled: !!itemId,
   });
   const { data: masterData } = useItemMasterData();

   const createItemMutation = useCreateItem();
   const updateItemMutation = useUpdateItem();

   const itemGroups = masterData?.item_groups ?? [];
   const manufacturers = masterData?.manufacturers ?? [];
   const shelves = masterData?.shelves ?? [];

   const {
      register,
      control,
      reset,
      getValues,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(itemFormSchema),
      defaultValues: INITIAL_FORM,
      mode: "onBlur",
   });

   useEffect(() => {
      if (!itemData) return;

      updateClear();
      setIsEditable(true);

      reset({
         itemCode: itemData.item_code,
         name1: itemData.name_1,
         name2: itemData.name_2,
         genericName: itemData.generic_name,
         description: itemData.description,
         behaviour: itemData.behaviour,
         groupCode: String(itemData.item_group),
         status: itemData.status,
         taxableStatus: itemData.taxable_status,
         shelfCode: String(itemData.shelf),
         manufacturer: String(itemData.manufacturer),
         editName: false,
      });

      setIsListOpen(false);
   }, [itemData, reset]);

   const onSubmit = (data) => {
      const payload = {
         item_code: data.itemCode,
         name_1: data.name1,
         name_2: data.name2,
         generic_name: data.genericName,
         description: data.description,

         behaviour: data.behaviour,
         status: data.status,
         taxable_status: data.taxableStatus,

         item_group: Number(data.groupCode),
         shelf: Number(data.shelfCode),
         manufacturer: Number(data.manufacturer),
      };

      if (selectedItemId) {
         updateItemMutation.mutate(
            {
               id: selectedItemId,
               payload,
            },
            {
               onSuccess: () => {
                  saveItemId(selectedItemId);
                  toast.success("Item updated successfully.");
               },
               onError: (error) => {
                  console.error(error);
                  toast.error("Failed to update item");
               },
            },
         );
      } else {
         createItemMutation.mutate(payload, {
            onSuccess: (data) => {
               saveItemId(data.id);
               toast.success("Item added successfully.");
            },
            onError: (error) => {
               console.error(error);
               toast.error("Failed to add item");
            },
         });
      }

      setSaveMode("new");
      handleClear();
   };

   const handleNew = () => {
      setIsEditable(true);
      setTimeout(() => {
         itemCodeRef.current?.focus();
      }, 0);
      setSaveMode("save");
   };

   const updateClear = () => {
      reset(INITIAL_FORM);
      setIsEditable(false);
      setSaveMode("update");
   };

   const handleClear = () => {
      setSelectedItemId(null);
      clearItem();
      reset(INITIAL_FORM);
      setIsEditable(false);
      setSaveMode("new");
   };

   const handleSelectItem = (id) => {
      setSelectedItemId(id);
      saveItemId(id);
   };

   return (
      <div className="flex-1 overflow-y-auto px-4 pb-4">
         <ItemListModal
            open={isListOpen}
            setIsListOpen={setIsListOpen}
            onSelect={handleSelectItem}
            selectedItemId={selectedItemId}
            setSaveMode={setSaveMode}
         />
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="overflow-hidden bg-white rounded-md">
               {/* Header */}
               <div className="px-4 py-3 border-b border-gray-100">
                  <h2 className="text-[13px] font-bold text-gray-800">
                     Create Inventory Item
                  </h2>
               </div>

               {/* BASIC INFORMATION */}
               <Section title="Basic Information">
                  <div className="grid items-end grid-cols-[1fr_2fr_2fr_auto] gap-x-4 p-4">
                     <Field label="Item Code">
                        <Input
                           {...register("itemCode")}
                           ref={(e) => {
                              register("itemCode").ref(e);
                              itemCodeRef.current = e;
                           }}
                           disabled={!isEditable}
                           placeholder="Enter item code"
                        />
                     </Field>

                     <Field label="Name 1" required error={errors.name1}>
                        <Input
                           {...register("name1")}
                           disabled={!isEditable}
                           error={errors.name1}
                           placeholder="Enter name 1"
                        />
                     </Field>

                     <Field label="Name 2">
                        <Input
                           {...register("name2")}
                           disabled={!isEditable}
                           placeholder="Enter name 2"
                        />
                     </Field>

                     <div className="pb-1.5 whitespace-nowrap">
                        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                           <input
                              {...register("editName")}
                              disabled={!isEditable}
                              type="checkbox"
                              className="w-3.5 h-3.5"
                           />
                           Edit Name
                        </label>
                     </div>
                  </div>
               </Section>

               {/* ADDITIONAL INFORMATION */}
               <Section title="Additional Information">
                  <div className="grid grid-cols-[1fr_2fr] gap-x-4 p-4">
                     <Field label="Generic Name">
                        <Input
                           {...register("genericName")}
                           disabled={!isEditable}
                           placeholder="Enter generic name"
                        />
                     </Field>

                     <Field label="Description">
                        <Input
                           {...register("description")}
                           disabled={!isEditable}
                           placeholder="Enter description"
                        />
                     </Field>
                  </div>
               </Section>

               {/* CONFIGURATION */}
               <Section title="Configuration">
                  <div className="grid grid-cols-[1fr_2fr_2fr_1fr] gap-x-4 p-4">
                     <Field label="Behaviour" required error={errors.behaviour}>
                        <Controller
                           name="behaviour"
                           control={control}
                           render={({ field }) => (
                              <Select
                                 {...field}
                                 disabled={!isEditable}
                                 error={errors.behaviour}
                                 placeholder="Select Behaviour"
                                 options={BEHAVIOUR_OPTIONS}
                                 valueKey="value"
                                 labelKey="label"
                              />
                           )}
                        />
                     </Field>

                     <Field
                        label="Group Code"
                        required
                        error={errors.groupCode}
                     >
                        <Controller
                           name="groupCode"
                           control={control}
                           render={({ field }) => (
                              <Select
                                 {...field}
                                 disabled={!isEditable}
                                 error={errors.groupCode}
                                 placeholder="Select Group Code"
                                 options={itemGroups}
                                 valueKey="id"
                                 labelKey="name"
                              />
                           )}
                        />
                     </Field>

                     <Field label="Status" required error={errors.status}>
                        <Controller
                           name="status"
                           control={control}
                           render={({ field }) => (
                              <Select
                                 {...field}
                                 disabled={!isEditable}
                                 error={errors.status}
                                 placeholder="Select Status"
                                 options={STATUS_OPTIONS}
                                 valueKey="value"
                                 labelKey="label"
                              />
                           )}
                        />
                     </Field>

                     <Field
                        label="Taxable Status"
                        required
                        error={errors.taxableStatus}
                     >
                        <Controller
                           name="taxableStatus"
                           control={control}
                           render={({ field }) => (
                              <Select
                                 {...field}
                                 disabled={!isEditable}
                                 error={errors.taxableStatus}
                                 placeholder="Select Taxable Status"
                                 options={TAXABLE_STATUS_OPTIONS}
                                 valueKey="value"
                                 labelKey="label"
                              />
                           )}
                        />
                     </Field>
                  </div>

                  <div className="grid grid-cols-[1fr_2fr_3fr] gap-x-4 px-4 pb-4">
                     <Field label="Shelf Code">
                        <Controller
                           name="shelfCode"
                           control={control}
                           render={({ field }) => (
                              <Select
                                 {...field}
                                 disabled={!isEditable}
                                 placeholder="Select Shelf Code"
                                 options={shelves}
                                 valueKey="id"
                                 labelKey="name"
                              />
                           )}
                        />
                     </Field>

                     <Field label="Manufacturer">
                        <Controller
                           name="manufacturer"
                           control={control}
                           render={({ field }) => (
                              <Select
                                 {...field}
                                 disabled={!isEditable}
                                 placeholder="Select Manufacturer"
                                 options={manufacturers}
                                 valueKey="id"
                                 labelKey="name"
                              />
                           )}
                        />
                     </Field>
                  </div>
               </Section>

               <ActionButtons
                  onClear={handleClear}
                  onNew={handleNew}
                  onList={() => setIsListOpen(true)}
                  onEdit={isEditable}
                  saveMode={saveMode}
               />
            </div>
         </form>
      </div>
   );
}
