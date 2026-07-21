import React, { useEffect, useState } from "react";
import axios from "axios";
import IncomeStats from "../components/IncomeStats";
import IncomeChart from "../components/IncomeChart";
import IncomeTransactions from "../components/IncomeTransactions";

const BASE_URL =
  "https://expense-management-backend-inm4.onrender.com";

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

  // =========================
  // GET INCOME
  // =========================
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
      console.log(
        "Income Error:",
        error.response?.data || error
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
  // OPEN ADD MODAL
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
  // OPEN EDIT MODAL
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
  // SAVE / UPDATE INCOME
  // =========================
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

      setForm({
        description: "",
        amount: "",
        category: "",
        date: "",
      });

      await getIncome();

    } catch (error) {
      console.log(
        "Save Income Error:",
        error.response?.data || error
      );
    }
  };

  // =========================
  // DELETE INCOME
  // =========================
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

  // =========================
  // DOWNLOAD EXCEL
  // =========================
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

  // =========================
  // SEARCH
  // =========================
  const filteredIncome = income.filter((item) =>
    item.description
      ?.toLowerCase()
      .includes(search.toLowerCase())
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
            Income Overview
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Track and manage your income sources
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
                className="shrink-0 px-4 sm:px-5 py-2 border border-gray-400 rounded-lg hover:bg-teal-50 text-sm sm:text-base"
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
            className="w-full sm:w-auto bg-teal-600 text-white px-5 sm:px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
          >
            + Add Income
          </button>

        </div>

      </div>


      {/* =========================
          STATS
      ========================= */}

      <div className="w-full overflow-hidden">
        <IncomeStats income={income} />
      </div>


      {/* =========================
          CHART
      ========================= */}

      <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full overflow-hidden">

        <h2 className="text-lg sm:text-xl font-bold mb-5">
          Income Trends
        </h2>

        <div className="w-full overflow-hidden">
          <IncomeChart income={income} />
        </div>

      </div>


      {/* =========================
          TRANSACTIONS
      ========================= */}

      <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full overflow-hidden">

        {/* TRANSACTION HEADER */}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5">

          <h2 className="text-lg sm:text-xl font-bold">
            Income Transactions
          </h2>

          <input
            type="text"
            placeholder="Search income..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg px-4 py-2 w-full sm:w-64 outline-none focus:border-teal-500"
          />

        </div>


        {/* TABLE */}

        <div className="w-full overflow-x-auto">

          <IncomeTransactions
            income={filteredIncome}
            onEdit={openEditModal}
            onDelete={deleteIncome}
          />

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
                ? "Update Income"
                : "Add Income"}

            </h2>


            <form
              onSubmit={saveIncome}
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
                className="w-full border rounded-lg p-3 outline-none focus:border-teal-500"
              />


              {/* AMOUNT */}

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 outline-none focus:border-teal-500"
              />


              {/* CATEGORY */}

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 outline-none focus:border-teal-500"
              />


              {/* DATE */}

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 outline-none focus:border-teal-500"
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
                  className="w-full sm:w-auto bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700"
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