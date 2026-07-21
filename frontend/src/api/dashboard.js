import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const getDashboardData = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${BASE_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};