import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
   return (
      <>
         <Toaster position="top-right" reverseOrder={false} />
         <BrowserRouter>
            <AppRoutes />
         </BrowserRouter>
      </>
   );
}

export default App;
