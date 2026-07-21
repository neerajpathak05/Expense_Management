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

const SpendingCategory = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full min-w-0">

      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
        Spending by Category
      </h2>

      {data.length > 0 ? (

        <div className="w-full h-80 sm:h-95">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="45%"
                outerRadius="65%"
                label={false}
              >

                {data.map((entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />

                ))}

              </Pie>


              <Tooltip
                formatter={(value) => [
                  `₹ ${Number(value).toLocaleString()}`,
                  "Amount",
                ]}
              />


              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      ) : (

        <div className="flex justify-center items-center h-64 text-gray-400">
          No Expense Data
        </div>

      )}

    </div>
  );
};

export default SpendingCategory;