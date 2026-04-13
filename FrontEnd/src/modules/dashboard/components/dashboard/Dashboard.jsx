import React from "react";
import { Outlet, RouterProvider } from "react-router-dom";
import Navbar from "../../../navigation/components/Navbar/Navbar";

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar></Navbar>
      <Outlet />
    </div>
  );
}

export default Dashboard;
