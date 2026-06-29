function TabButton({ label, active, onClick }) {
   return (
      <button
         type="button"
         onClick={onClick}
         className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-all cursor-pointer ${
            active
               ? "bg-white text-[#171b2c] shadow-sm"
               : "text-[#80869a] hover:text-[#5b6175]"
         }`}
      >
         {label}
      </button>
   );
}

export default function AuthTabs({ mode, setMode }) {
   return (
      <div className="flex bg-[#f1f2f6] rounded-lg p-1 mb-7">
         <TabButton
            label="Sign in"
            active={mode === "login"}
            onClick={() => setMode("login")}
         />

         <TabButton
            label="Sign up"
            active={mode === "register"}
            onClick={() => setMode("register")}
         />
      </div>
   );
}
