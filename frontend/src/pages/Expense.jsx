import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL =
  "https://expense-management-backend-inm4.onrender.com";

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
  // GET EXPENSE
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
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD MODAL
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
  // EDIT MODAL
  // =========================
  const openEditModal = (item) => {
    setEditingId(item._id);

    setForm({
      description: item.description || "",
      amount: item.amount || "",
      category: item.category || "",
      date: item.date
        ? item.date.slice(0, 10)
        : "",
    });

    setShowModal(true);
  };

  // =========================
  // SAVE / UPDATE EXPENSE
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
          `${BASE_URL}/api/expense/add`,
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

      setForm({
        description: "",
        amount: "",
        category: "",
        date: "",
      });

      await getExpense();

    } catch (err) {
      console.log(
        "Save Expense Error:",
        err.response?.data || err
      );
    }
  };

  // =========================
  // DELETE EXPENSE
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
  // DOWNLOAD EXCEL
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
  // SEARCH
  // =========================
  const filteredExpense = expense.filter((item) =>
    item.description
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // TOTAL EXPENSE
  // =========================
  const totalExpense = expense.reduce(
    (total, item) =>
      total + Number(item.amount || 0),
    0
  );

  // =========================
  // CATEGORY DATA
  // =========================
  const categoryData = Object.entries(
    expense.reduce((acc, item) => {
      const category =
        item.category || "Other";

      acc[category] =
        (acc[category] || 0) +
        Number(item.amount || 0);

      return acc;
    }, {})
  );

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">

        {/* TITLE */}

        <div className="min-w-0">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Expense Overview
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Track and manage your expenses
          </p>

          {/* FILTER BUTTONS */}

          <div className="flex gap-2 mt-5 overflow-x-auto pb-1">

            {[
              "Daily",
              "Weekly",
              "Monthly",
              "Yearly",
            ].map((filter) => (

              <button
                key={filter}
                className="shrink-0 px-4 sm:px-5 py-2 rounded-lg border border-gray-400 text-sm sm:text-base hover:bg-red-50"
              >
                {filter}
              </button>

            ))}

          </div>

        </div>


        {/* ACTION BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <button
            onClick={downloadExcel}
            className="w-full sm:w-auto bg-green-600 text-white px-5 sm:px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Download
          </button>

          <button
            onClick={openAddModal}
            className="w-full sm:w-auto bg-red-600 text-white px-5 sm:px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            + Add Expense
          </button>

        </div>

      </div>


      {/* =========================
          STATS
      ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        <div className="bg-white rounded-xl shadow p-5 sm:p-6">

          <p className="text-gray-500">
            Total Expense
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mt-2">
            ₹ {totalExpense.toLocaleString()}
          </h2>

        </div>


        <div className="bg-white rounded-xl shadow p-5 sm:p-6">

          <p className="text-gray-500">
            Transactions
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-2">
            {expense.length}
          </h2>

        </div>


        <div className="bg-white rounded-xl shadow p-5 sm:p-6 sm:col-span-2 lg:col-span-1">

          <p className="text-gray-500">
            Average Expense
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mt-2">
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


      {/* =========================
          SPENDING BY CATEGORY
      ========================= */}

      <div className="bg-white rounded-xl shadow p-5 sm:p-6 w-full overflow-hidden">

        <h2 className="text-lg sm:text-xl font-bold mb-6">
          Spending by Category
        </h2>

        {categoryData.length === 0 ? (

          <p className="text-center text-gray-500 py-8">
            No expense data available
          </p>

        ) : (

          <div className="space-y-5">

            {categoryData.map(
              ([category, amount]) => (

                <div key={category}>

                  <div className="flex justify-between items-center gap-4 mb-2">

                    <span className="font-medium truncate">
                      {category}
                    </span>

                    <span className="font-semibold text-red-600 whitespace-nowrap">
                      ₹ {amount.toLocaleString()}
                    </span>

                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{
                        width: `${
                          totalExpense > 0
                            ? Math.min(
                                (amount /
                                  totalExpense) *
                                  100,
                                100
                              )
                            : 0
                        }%`,
                      }}
                    />

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* =========================
          TRANSACTIONS
      ========================= */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {/* TRANSACTION HEADER */}

        <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

          <h2 className="text-lg sm:text-xl font-bold">
            Expense Transactions
          </h2>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg p-3 w-full sm:w-64 outline-none focus:border-red-500"
          />

        </div>


        {/* RESPONSIVE TABLE */}

        <div className="overflow-x-auto w-full">

          <table className="min-w-175 w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-4 sm:px-6 py-3 text-left">
                  Description
                </th>

                <th className="px-4 sm:px-6 py-3 text-left">
                  Category
                </th>

                <th className="px-4 sm:px-6 py-3 text-left">
                  Amount
                </th>

                <th className="px-4 sm:px-6 py-3 text-left">
                  Date
                </th>

                <th className="px-4 sm:px-6 py-3 text-center">
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

                    <td className="px-4 sm:px-6 py-4">
                      {item.description}
                    </td>

                    <td className="px-4 sm:px-6 py-4">
                      {item.category}
                    </td>

                    <td className="px-4 sm:px-6 py-4 font-semibold text-red-600">
                      ₹{" "}
                      {Number(
                        item.amount
                      ).toLocaleString()}
                    </td>

                    <td className="px-4 sm:px-6 py-4">
                      {new Date(
                        item.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-4 sm:px-6 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            openEditModal(item)
                          }
                          className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteExpense(item._id)
                          }
                          className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-red-600"
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


      {/* =========================
          ADD / EDIT MODAL
      ========================= */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-100 p-4">

          <div className="bg-white rounded-xl w-full max-w-md p-5 sm:p-6 max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl sm:text-2xl font-bold mb-6">

              {editingId
                ? "Update Expense"
                : "Add Expense"}

            </h2>


            <form
              onSubmit={saveExpense}
              className="space-y-4"
            >

              {/* DESCRIPTION */}

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
              />


              {/* AMOUNT */}

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
              />


              {/* CATEGORY */}

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
              />


              {/* DATE */}

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 outline-none focus:border-red-500"
              />


              {/* BUTTONS */}

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="w-full sm:w-auto bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="w-full sm:w-auto bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
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