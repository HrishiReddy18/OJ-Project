import React from "react";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

export const signInOutRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
