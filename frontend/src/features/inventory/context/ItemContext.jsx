import { createContext, useContext, useState } from "react";

const ItemContext = createContext();

export function ItemProvider({ children }) {
   const [itemId, setItemId] = useState(localStorage.getItem("itemId") || null);

   const saveItemId = (id) => {
      setItemId(id);
      localStorage.setItem("itemId", id);
   };

   const clearItem = () => {
      setItemId(null);
      localStorage.removeItem("itemId");
   };

   return (
      <ItemContext.Provider
         value={{
            itemId,
            saveItemId,
            clearItem,
         }}
      >
         {children}
      </ItemContext.Provider>
   );
}

export function useItemContext() {
   const context = useContext(ItemContext);

   if (!context) {
      throw new Error("useItemContext must be used inside ItemProvider");
   }

   return context;
}
