import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const FinancialOverview = ({ income, expense }) => {
  const data = [
    {
      name: "Income",
      amount: income,
    },
    {
      name: "Expense",
      amount: expense,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 h-95">
      <h2 className="text-xl font-semibold mb-5">
        Financial Overview
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="colorIncome"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#14b8a6"
            fillOpacity={1}
            fill="url(#colorIncome)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialOverview;