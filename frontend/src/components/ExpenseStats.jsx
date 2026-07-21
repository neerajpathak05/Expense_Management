import React from "react";

const ExpenseStats = ({ expense = [] }) => {
  const totalExpense = expense.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const transactions = expense.length;

  const averageExpense =
    transactions > 0 ? totalExpense / transactions : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-red-50 border border-red-100 rounded-xl p-6">
        <p className="text-gray-500">Total Expense</p>
        <h2 className="text-3xl font-bold text-red-600 mt-2">
          ₹ {totalExpense.toLocaleString()}
        </h2>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
        <p className="text-gray-500">Average Expense</p>
        <h2 className="text-3xl font-bold text-orange-600 mt-2">
          ₹ {averageExpense.toFixed(2)}
        </h2>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <p className="text-gray-500">Transactions</p>
        <h2 className="text-3xl font-bold text-blue-600 mt-2">
          {transactions}
        </h2>
      </div>

    </div>
  );
};

export default ExpenseStats;