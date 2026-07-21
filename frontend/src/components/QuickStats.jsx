import React from "react";
import { IndianRupee, Wallet, TrendingUp, TrendingDown } from "lucide-react";

const QuickStats = ({ income, expense, balance, savingsRate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-linear-to-r from-teal-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Total Balance</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹ {balance}
            </h2>
          </div>

          <Wallet size={38} />
        </div>
      </div>

      <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Income</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹ {income}
            </h2>
          </div>

          <TrendingUp size={38} />
        </div>
      </div>

      <div className="bg-linear-to-r from-red-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Expense</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹ {expense}
            </h2>
          </div>

          <TrendingDown size={38} />
        </div>
      </div>

      <div className="bg-linear-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Savings Rate</p>
            <h2 className="text-3xl font-bold mt-2">
              {savingsRate}%
            </h2>
          </div>

          <IndianRupee size={38} />
        </div>
      </div>

    </div>
  );
};

export default QuickStats;