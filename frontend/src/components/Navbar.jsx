import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

const Navbar = ({ user: propUser, onLogout }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(
    propUser || {
      name: "",
      email: "",
    }
  );

  useEffect(() => {
    if (propUser) {
      setUser(propUser);
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await axios.get(`${BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile = res.data.user || res.data;

        setUser(profile);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [propUser]);

  useEffect(() => {
    const close = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener("mousedown", close);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    onLogout?.();

    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-50">

      <div className="max-w-full h-full flex justify-between items-center px-8">

        <h1
          className="text-2xl font-bold text-teal-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Expense Tracker
        </h1>

        <div
          className="relative"
          ref={menuRef}
        >

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3"
          >

            <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex justify-center items-center font-bold">
              {user?.name
                ? user.name[0].toUpperCase()
                : "U"}
            </div>

            <div className="hidden md:block text-left">

              <h3 className="font-semibold">
                {user?.name || "User"}
              </h3>

              <p className="text-xs text-gray-500">
                {user?.email}
              </p>

            </div>

            <ChevronDown
              size={18}
              className={`transition ${
                menuOpen ? "rotate-180" : ""
              }`}
            />

          </button>

          {menuOpen && (

            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border">

              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-100"
              >
                <User size={18} />
                Profile
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-100 text-red-500"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
};

export default Navbar;