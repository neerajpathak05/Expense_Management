import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />

      <div className="flex">
        <Sidebar
          user={user}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <main
          className={`pt-20 p-6 transition-all duration-300 w-full ${
            isCollapsed ? "lg:ml-20" : "lg:ml-64"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;