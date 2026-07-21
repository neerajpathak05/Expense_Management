import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <Navbar
        user={user}
        setSidebarOpen={setSidebarOpen}
      />


      <div className="flex">

        {/* Sidebar */}

        <Sidebar
          user={user}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />


        {/* Main Content */}

        <main
          className={`
            pt-20
            p-4
            sm:p-6
            w-full
            min-w-0
            transition-all
            duration-300
            ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}
          `}
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;