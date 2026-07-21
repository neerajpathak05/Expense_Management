import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "https://expense-management-backend-inm4.onrender.com";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await axios.post(`${BASE_URL}/user/login`, form);

    console.log("LOGIN RESPONSE:", res.data);

    if (res.data.success) {
      const token = res.data.token;
      const user = res.data.user;

      if (!token) {
        alert("Token not received from server");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("TOKEN SAVED:", localStorage.getItem("token"));
      console.log("USER SAVED:", localStorage.getItem("user"));

      if (setUser) {
        setUser(user);
      }

      navigate("/");
    }

  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data || err);

    alert(
      err.response?.data?.message || "Login Failed"
    );

  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-linear-to-br from-teal-500 to-cyan-600 flex justify-center items-center">

      <div className="bg-white rounded-xl shadow-xl p-8 w-100">

        <h1 className="text-3xl font-bold text-center mb-2">
          Expense Tracker
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 outline-none focus:border-teal-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 outline-none focus:border-teal-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg p-3 font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-teal-600 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;