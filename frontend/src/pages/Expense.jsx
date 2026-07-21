import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://expense-management-backend-inm4.onrender.com";

const Expense = () => {
  const [expense, setExpense] = useState([]);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // =========================
  // Get Expense
  // =========================
  useEffect(() => {
    getExpense();
  }, []);

  const getExpense = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${BASE_URL}/api/expense/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Expense Response:", res.data);

      if (res.data.success) {
        setExpense(res.data.expense || []);
      }
    } catch (err) {
      console.log(
        "Expense Error:",
        err.response?.data || err
      );
    }
  };

  // =========================
  // Handle Change
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Add Modal
  // =========================
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

  // =========================
  // Edit Modal
  // =========================
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

  // =========================
  // Save / Update Expense
  // =========================
  const saveExpense = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(
          `${BASE_URL}/api/expense/update/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${BASE_URL}/expense/add`,
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

      await getExpense();

    } catch (err) {
      console.log(
        "Save Expense Error:",
        err.response?.data || err
      );
    }
  };

  // =========================
  // Delete Expense
  // =========================
  const deleteExpense = async (id) => {
    if (!window.confirm("Delete Expense?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${BASE_URL}/api/expense/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getExpense();

    } catch (err) {
      console.log(
        "Delete Expense Error:",
        err.response?.data || err
      );
    }
  };

  // =========================
  // Download Excel
  // =========================
  const downloadExcel = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${BASE_URL}/api/expense/download`,
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
      link.download = "Expense.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.log(
        "Download Error:",
        err.response?.data || err
      );
    }
  };

  // =========================
  // Search
  // =========================
  const filteredExpense = expense.filter((item) =>
    item.description
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // Total Expense
  // =========================
  const totalExpense = expense.reduce(
    (total, item) =>
      total + Number(item.amount || 0),
    0
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Expense Overview
          </h1>

          <p className="text-gray-500">
            Track and manage your expenses
          </p>

          <div className="flex gap-2 mt-4">

            {[
              "Daily",
              "Weekly",
              "Monthly",
              "Yearly",
            ].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-lg border text-sm hover:bg-red-50"
              >
                {filter}
              </button>
            ))}

          </div>
        </div>

        <div className="flex gap-3">

          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Download
          </button>

          <button
            onClick={openAddModal}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            + Add Expense
          </button>

        </div>

      </div>


      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Expense
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            ₹ {totalExpense.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Transactions
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {expense.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Average Expense
          </p>

          <h2 className="text-3xl font-bold text-orange-600 mt-2">
            ₹{" "}
            {expense.length > 0
              ? (
                  totalExpense /
                  expense.length
                ).toFixed(2)
              : 0}
          </h2>
        </div>

      </div>


      {/* SPENDING BY CATEGORY */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-6">
          Spending by Category
        </h2>

        {expense.length === 0 ? (

          <p className="text-center text-gray-500 py-8">
            No expense data available
          </p>

        ) : (

          <div className="space-y-4">

            {Object.entries(
              expense.reduce((acc, item) => {

                const category =
                  item.category || "Other";

                acc[category] =
                  (acc[category] || 0) +
                  Number(item.amount || 0);

                return acc;

              }, {})
            ).map(
              ([category, amount]) => (

                <div key={category}>

                  <div className="flex justify-between mb-2">

                    <span className="font-medium">
                      {category}
                    </span>

                    <span className="font-semibold text-red-600">
                      ₹ {amount.toLocaleString()}
                    </span>

                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{
                        width: `${Math.min(
                          (amount /
                            totalExpense) *
                            100,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* TRANSACTIONS */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-6 flex justify-between items-center">

          <h2 className="text-xl font-bold">
            Expense Transactions
          </h2>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg p-3"
          />

        </div>


        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-3 text-left">
                  Description
                </th>

                <th className="px-6 py-3 text-left">
                  Category
                </th>

                <th className="px-6 py-3 text-left">
                  Amount
                </th>

                <th className="px-6 py-3 text-left">
                  Date
                </th>

                <th className="px-6 py-3 text-center">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredExpense.length > 0 ? (

                filteredExpense.map((item) => (

                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">
                      {item.description}
                    </td>

                    <td className="px-6 py-4">
                      {item.category}
                    </td>

                    <td className="px-6 py-4 font-semibold text-red-600">
                      ₹ {item.amount}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(
                        item.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            openEditModal(item)
                          }
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteExpense(item._id)
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No Expense Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl w-105 p-6">

            <h2 className="text-2xl font-bold mb-6">

              {editingId
                ? "Update Expense"
                : "Add Expense"}

            </h2>


            <form
              onSubmit={saveExpense}
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


              <div className="flex justify-end gap-3 pt-2">

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
                  className="bg-red-600 text-white px-5 py-2 rounded-lg"
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

export default Expense;