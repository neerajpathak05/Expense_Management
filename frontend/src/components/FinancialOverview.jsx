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

const FinancialOverview = ({
  income = 0,
  expense = 0,
}) => {
  const data = [
    {
      name: "Income",
      amount: Number(income) || 0,
    },
    {
      name: "Expense",
      amount: Number(expense) || 0,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full min-w-0">

      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
        Financial Overview
      </h2>

      <div className="w-full h-64 sm:h-80 md:h-87.5">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >

            <defs>

              <linearGradient
                id="colorIncome"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#14b8a6"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#14b8a6"
                  stopOpacity={0.1}
                />

              </linearGradient>

            </defs>


            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
            />


            <YAxis
              tick={{ fontSize: 11 }}
              width={45}
            />


            <Tooltip
              formatter={(value) => [
                `₹ ${Number(value).toLocaleString()}`,
                "Amount",
              ]}
            />


            <Area
              type="monotone"
              dataKey="amount"
              stroke="#14b8a6"
              fillOpacity={1}
              fill="url(#colorIncome)"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default FinancialOverview;