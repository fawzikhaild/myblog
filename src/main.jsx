import React from "react";
import { Toaster, } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { createDefaultAdmin, migrateLegacyAuth, } from "./auth/authStorage";

// نقل البيانات القديمة إلى النظام الجديد 
 migrateLegacyAuth(); 
//  إنشاء Admin افتراضي 
createDefaultAdmin();

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  </React.StrictMode>
);