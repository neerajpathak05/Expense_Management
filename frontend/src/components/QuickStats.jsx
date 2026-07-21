import React from "react";
import {
  IndianRupee,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const QuickStats = ({
  income = 0,
  expense = 0,
  balance = 0,
  savingsRate = 0,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

      {/* TOTAL BALANCE */}

      <div className="bg-linear-to-r from-teal-500 to-cyan-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">

        <div className="flex justify-between items-center gap-3">

          <div className="min-w-0">

            <p className="text-xs sm:text-sm opacity-90">
              Total Balance
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mt-2 wrap-break-words">
              ₹ {Number(balance).toLocaleString()}
            </h2>

          </div>

          <Wallet
            size={32}
            className="sm:w-9.5 sm:h-9.5 shrink-0"
          />

        </div>

      </div>


      {/* INCOME */}

      <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">

        <div className="flex justify-between items-center gap-3">

          <div className="min-w-0">

            <p className="text-xs sm:text-sm opacity-90">
              Income
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mt-2 wrap-break-words">
              ₹ {Number(income).toLocaleString()}
            </h2>

          </div>

          <TrendingUp
            size={32}
            className="sm:w-9.5 sm:h-9.5 shrink-0"
          />

        </div>

      </div>


      {/* EXPENSE */}

      <div className="bg-linear-to-r from-red-500 to-pink-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">

        <div className="flex justify-between items-center gap-3">

          <div className="min-w-0">

            <p className="text-xs sm:text-sm opacity-90">
              Expense
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mt-2 wrap-break-words">
              ₹ {Number(expense).toLocaleString()}
            </h2>

          </div>

          <TrendingDown
            size={32}
            className="sm:w-9.5 sm:h-9.5 shrink-0"
          />

        </div>

      </div>


      {/* SAVINGS RATE */}

      <div className="bg-linear-to-r from-purple-500 to-indigo-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">

        <div className="flex justify-between items-center gap-3">

          <div className="min-w-0">

            <p className="text-xs sm:text-sm opacity-90">
              Savings Rate
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              {Number(savingsRate).toFixed(1)}%
            </h2>

          </div>

          <IndianRupee
            size={32}
            className="sm:w-9.5 sm:h-9.5 shrink-0"
          />

        </div>

      </div>

    </div>
  );
};

export default QuickStats;