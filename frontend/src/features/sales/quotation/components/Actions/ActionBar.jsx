import {
   ChevronsLeft,
   ChevronLeft,
   ChevronRight,
   ChevronsRight,
   FilePlus2,
   Printer,
   Eye,
   List as ListIcon,
   X as XIcon,
} from "lucide-react";

import PagerButton from "../PagerButton";
import ActionButton from "../ActionButton";

export default function ActionBar({
   handleNew,
   handleCancel,
   handlePreview,
   rows,
   isEditing,
   handleCreateQuotation,
   setShowLookup,
   header,
   crrQutId,
   handleUpdateQuotation,
   totals,
   getUnitCode,
}) {
   return (
      <div
         data-testid="action-bar"
         className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-2"
      >
         <div className="flex flex-wrap justify-end items-center gap-2">
            <PagerButton icon={ChevronsLeft} label="First" />
            <PagerButton icon={ChevronLeft} label="Previous" />
            <PagerButton icon={ChevronRight} label="Next" />
            <PagerButton icon={ChevronsRight} label="Last" />
            <div className="w-px h-6 bg-slate-200 mx-1" />
            {/* 
            <ActionButton
               icon={FilePlus2}
               variant={isEditing ? "emerald" : "green"}
               onClick={isEditing ? handleCreateQuotation : handleNew}
            >
               {isEditing ? "Save" : "New"}
            </ActionButton> */}
            <ActionButton
               icon={FilePlus2}
               variant={crrQutId ? "amber" : isEditing ? "emerald" : "green"}
               onClick={
                  crrQutId
                     ? handleUpdateQuotation
                     : isEditing
                       ? handleCreateQuotation
                       : handleNew
               }
            >
               {crrQutId ? "Update" : isEditing ? "Save" : "New"}
            </ActionButton>

            <ActionButton
               icon={Printer}
               variant="light"
               disabled={!isEditing}
               onClick={() => handlePreview(rows, header, totals, getUnitCode)}
            >
               Print
            </ActionButton>
            <ActionButton icon={Eye} variant="light" disabled={!isEditing}>
               Preview
            </ActionButton>
            <ActionButton
               icon={ListIcon}
               variant="violet"
               onClick={() => setShowLookup(true)}
            >
               List
            </ActionButton>
            <ActionButton
               icon={XIcon}
               variant="dark"
               onClick={handleCancel}
               disabled={!isEditing}
            >
               Cancel
            </ActionButton>
         </div>
      </div>
   );
}
