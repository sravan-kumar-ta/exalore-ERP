import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function CustomerSearch({
   customers = [],
   selectedCustomer,
   onSelect,
}) {
   const [search, setSearch] = useState("");

   const filteredCustomers = useMemo(() => {
      if (!search.trim()) return customers;

      return customers.filter((customer) =>
         `${customer.code} ${customer.name}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      );
   }, [customers, search]);

   const handleSelect = (customer) => {
      onSelect(customer);
      setSearch(customer.name);
   };

   const clearSelection = () => {
      onSelect(null);
      setSearch("");
   };

   return (
      <div className="space-y-2">
         <label className="text-sm font-medium text-gray-700">
            Select Customer
         </label>

         <div className="relative">
            <Search size={18} className="absolute top-3 left-3 text-gray-400" />

            <input
               type="text"
               value={search}
               onChange={(e) => {
                  setSearch(e.target.value);
                  onSelect(null);
               }}
               placeholder="Search customer..."
               className="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />

            {search && (
               <button
                  type="button"
                  onClick={clearSelection}
                  className="absolute top-2.5 right-3"
               >
                  <X size={18} className="text-gray-400 hover:text-red-500" />
               </button>
            )}

            {!selectedCustomer && search && filteredCustomers.length > 0 && (
               <div className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-lg border bg-white shadow-lg">
                  {filteredCustomers.map((customer) => (
                     <button
                        key={customer.id}
                        type="button"
                        onClick={() => handleSelect(customer)}
                        className="flex w-full items-center justify-between border-b px-4 py-3 text-left hover:bg-gray-100"
                     >
                        <div>
                           <p className="font-medium">{customer.name}</p>

                           <p className="text-sm text-gray-500">
                              {customer.code}
                           </p>
                        </div>
                     </button>
                  ))}
               </div>
            )}

            {!selectedCustomer && search && filteredCustomers.length === 0 && (
               <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white p-4 text-center text-sm text-gray-500 shadow-lg">
                  No customers found.
               </div>
            )}
         </div>
      </div>
   );
}
