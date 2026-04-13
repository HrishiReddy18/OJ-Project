import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
// import './index.css'
import App from "./App.jsx";
import { router } from "./router.jsx";
import {UserProvider} from "./modules/shared/userNameContext.jsx"
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>,

  <UserProvider>
  <RouterProvider
    router={router}
    fallbackElement={<h2>Loading app...</h2>}
  ></RouterProvider>
  </UserProvider>

);
