<<<<<<< HEAD
// frontend/src/pages/admin/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar only here */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
=======
import React from 'react'

export default function  () {
  return (
    <div> </div>
  )
}
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
