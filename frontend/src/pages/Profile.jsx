import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://expense-management-backend-inm4.onrender.com";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const body = {
        name: user.name,
        email: user.email,
      };

      if (password.trim() !== "") {
        body.password = password;
      }

      const res = await axios.put(
        `${BASE_URL}/api/user/update-profile`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setPassword("");

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <form
        onSubmit={updateProfile}
        className="space-y-5"
      >

        <div>
          <label className="font-semibold">
            Name
          </label>

          <input
            type="text"
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="font-semibold">
            Email
          </label>

          <input
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="font-semibold">
            New Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Leave blank if you don't want to change"
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        <button
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg"
        >
          Update Profile
        </button>

      </form>

    </div>
  );
};

export default Profile;