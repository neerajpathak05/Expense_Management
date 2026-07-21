import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const IncomeChart = ({ income = [] }) => {
  const data = income
    .slice()
    .reverse()
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      amount: Number(item.amount),
    }));

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">
        Income Trends
      </h2>

      <div className="w-full h-87.5">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="incomeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#10b981"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="#10b981"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip
                formatter={(value) => [
                  `₹ ${Number(value).toLocaleString()}`,
                  "Income",
                ]}
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                fill="url(#incomeGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No income data available
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeChart;