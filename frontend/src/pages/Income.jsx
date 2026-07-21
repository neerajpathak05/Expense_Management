import React, { useEffect, useState } from "react";
import axios from "axios";
import IncomeStats from "../components/IncomeStats";
import IncomeChart from "../components/IncomeChart";
import IncomeTransactions from "../components/IncomeTransactions";

const BASE_URL = "https://expense-management-backend-inm4.onrender.com";

const Income = () => {
  const [income, setIncome] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    getIncome();
  }, []);

  const getIncome = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${BASE_URL}/api/income/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("INCOME DATA:", res.data);

      if (res.data.success) {
        setIncome(res.data.income || []);
      }
    } catch (error) {
      console.log("Income Error:", error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      description: "",
      amount: "",
      category: "",
      date: "",
    });

    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);

    setForm({
      description: item.description,
      amount: item.amount,
      category: item.category,
      date: item.date
        ? item.date.slice(0, 10)
        : "",
    });

    setShowModal(true);
  };

  const saveIncome = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(
          `${BASE_URL}/income/update/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${BASE_URL}/income/add`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setShowModal(false);
      setEditingId(null);

      await getIncome();

    } catch (error) {
      console.log(
        "Save Income Error:",
        error.response?.data || error
      );
    }
  };

  const deleteIncome = async (id) => {
    if (!window.confirm("Delete Income?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${BASE_URL}/income/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getIncome();

    } catch (error) {
      console.log(
        "Delete Income Error:",
        error.response?.data || error
      );
    }
  };

  const downloadExcel = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${BASE_URL}/income/download`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "Income.xlsx";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.log(
        "Download Error:",
        error.response?.data || error
      );
    }
  };

  const filteredIncome = income.filter((item) =>
    item.description
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-start">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Income Overview
          </h1>

          <p className="text-gray-500 mt-1">
            Track and manage your income sources
          </p>

          <div className="flex gap-2 mt-5">

            {["Daily", "Weekly", "Monthly", "Yearly"].map(
              (filter) => (
                <button
                  key={filter}
                  className="px-5 py-2 border border-gray-400 rounded-lg hover:bg-teal-50"
                >
                  {filter}
                </button>
              )
            )}

          </div>
        </div>

        <div className="flex gap-3">

          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            Download
          </button>

          <button
            onClick={openAddModal}
            className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700"
          >
            + Add Income
          </button>

        </div>

      </div>


      {/* STATS */}

      <IncomeStats income={income} />


      {/* CHART */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Income Trends
        </h2>

        <IncomeChart income={income} />

      </div>


      {/* TRANSACTIONS */}

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-bold">
            Income Transactions
          </h2>

          <input
            type="text"
            placeholder="Search income..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          />

        </div>

        <IncomeTransactions
          income={filteredIncome}
          onEdit={openEditModal}
          onDelete={deleteIncome}
        />

      </div>


      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl w-105 p-6">

            <h2 className="text-2xl font-bold mb-6">
              {editingId
                ? "Update Income"
                : "Add Income"}
            </h2>

            <form
              onSubmit={saveIncome}
              className="space-y-4"
            >

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="bg-gray-300 px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-teal-600 text-white px-5 py-2 rounded-lg"
                >
                  {editingId
                    ? "Update"
                    : "Save"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Income;