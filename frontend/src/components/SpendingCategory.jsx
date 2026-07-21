import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#14b8a6",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#10b981",
];

const SpendingCategory = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-95">
      <h2 className="text-xl font-semibold mb-5">
        Spending by Category
      </h2>

      {data?.length > 0 ? (
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex justify-center items-center h-62.5 text-gray-400">
          No Expense Data
        </div>
      )}
    </div>
  );
};

export default SpendingCategory;