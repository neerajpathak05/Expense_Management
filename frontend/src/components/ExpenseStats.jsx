import React from "react";

const ExpenseStats = ({ expense = [] }) => {
  const totalExpense = expense.reduce(
    (sum, item) =>
      sum + Number(item.amount || 0),
    0
  );

  const transactions = expense.length;

  const averageExpense =
    transactions > 0
      ? totalExpense / transactions
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

      {/* TOTAL EXPENSE */}

      <div className="bg-red-50 border border-red-100 rounded-xl p-4 sm:p-6">

        <p className="text-gray-500 text-sm sm:text-base">
          Total Expense
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mt-2 wrap-break-words">
          ₹ {totalExpense.toLocaleString()}
        </h2>

      </div>


      {/* AVERAGE EXPENSE */}

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 sm:p-6">

        <p className="text-gray-500 text-sm sm:text-base">
          Average Expense
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mt-2 wrap-break-words">
          ₹ {averageExpense.toFixed(2)}
        </h2>

      </div>


      {/* TRANSACTIONS */}

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-6">

        <p className="text-gray-500 text-sm sm:text-base">
          Transactions
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">
          {transactions}
        </h2>

      </div>

    </div>
  );
};

export default ExpenseStats;