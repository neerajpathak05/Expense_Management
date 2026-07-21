import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  ArrowUp,
  ArrowDown,
  User,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const MENU_ITEMS = [
  {
    text: "Dashboard",
    path: "/",
    icon: <Home size={20} />,
  },
  {
    text: "Income",
    path: "/income",
    icon: <ArrowUp size={20} />,
  },
  {
    text: "Expense",
    path: "/expense",
    icon: <ArrowDown size={20} />,
  },
  {
    text: "Profile",
    path: "/profile",
    icon: <User size={20} />,
  },
];

const Sidebar = ({
  user,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const sidebarRef = useRef(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const username = user?.name || "User";
  const email =
    user?.email || "user@example.com";

  const initial =
    username.charAt(0).toUpperCase();

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const closeDrawer = (e) => {
      if (
        mobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      closeDrawer
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        closeDrawer
      );
  }, [mobileOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}

      <motion.aside
        animate={{
          width: isCollapsed ? 80 : 250,
        }}
        transition={{
          duration: 0.3,
        }}
        className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-64px)] bg-white shadow-lg z-40 flex-col"
      >
        <button
          onClick={() =>
            setIsCollapsed(!isCollapsed)
          }
          className="absolute -right-4 top-5 bg-teal-600 text-white rounded-full p-2 shadow"
        >
          {isCollapsed ? ">" : "<"}
        </button>

        <div className="p-6 border-b">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex justify-center items-center text-xl font-bold">
              {initial}
            </div>

            {!isCollapsed && (
              <div>

                <h3 className="font-semibold">
                  {username}
                </h3>

                <p className="text-sm text-gray-500">
                  {email}
                </p>

              </div>
            )}

          </div>

        </div>

        <ul className="flex-1 py-6">

          {MENU_ITEMS.map((item) => (

            <li key={item.text}>

              <Link
                to={item.path}
                className={`mx-3 my-2 rounded-lg flex items-center gap-4 px-5 py-3 transition ${
                  pathname === item.path
                    ? "bg-teal-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.icon}

                {!isCollapsed && (
                  <span>
                    {item.text}
                  </span>
                )}

              </Link>

            </li>

          ))}

        </ul>
                <div className="border-t p-4">

          <Link
            to="https://github.com/neerajpathak05"
            target="_blank"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <HelpCircle size={20} />

            {!isCollapsed && (
              <span>Support</span>
            )}
          </Link>

          <button
            onClick={logout}
            className={`mt-2 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={20} />

            {!isCollapsed && (
              <span>Logout</span>
            )}
          </button>

        </div>

      </motion.aside>

      {/* Mobile Menu Button */}

      <button
        onClick={() =>
          setMobileOpen(true)
        }
        className="lg:hidden fixed top-20 left-4 z-50 bg-teal-600 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Sidebar */}

      <AnimatePresence>

        {mobileOpen && (
          <>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="fixed inset-0 bg-black/40 z-40"
            />

            <motion.div
              ref={sidebarRef}
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
              className="fixed left-0 top-0 h-screen w-72 bg-white z-50 shadow-xl flex flex-col"
            >

              <div className="flex items-center justify-between p-5 border-b">

                <h2 className="text-xl font-bold text-teal-600">
                  Expense Tracker
                </h2>

                <button
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <X size={24} />
                </button>

              </div>

              <div className="p-5 border-b flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                  {initial}
                </div>

                <div>

                  <h3 className="font-semibold">
                    {username}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {email}
                  </p>

                </div>

              </div>

              <ul className="flex-1 p-4 space-y-2">

                {MENU_ITEMS.map((item) => (

                  <li key={item.text}>

                    <Link
                      to={item.path}
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        pathname === item.path
                          ? "bg-teal-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}

                      <span>{item.text}</span>

                    </Link>

                  </li>

                ))}

              </ul>

              <div className="border-t p-4">

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 text-red-500 px-4 py-3 hover:bg-red-50 rounded-lg"
                >
                  <LogOut size={20} />

                  Logout

                </button>

              </div>

            </motion.div>

          </>
        )}

      </AnimatePresence>

    </>
  );
};

export default Sidebar;