import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import "./axiosConfig.js";
import { AuthProvider } from "./Components/hooks/useAuth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from "./Components/hooks/useLoading.jsx";
import CartProvider from "./Components/hooks/useCart.jsx";




 createRoot(document.getElementById("root")).render(
    <StrictMode>
  <BrowserRouter>
    <LoadingProvider>
     <AuthProvider>          
        <CartProvider>       
          <App />

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>
</StrictMode>

);
