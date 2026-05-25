import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-zinc-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex flex-1 flex-col">
        <AdminNavbar />

        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;