import { DollarSign, BarChart3, Receipt } from "lucide-react";

const IncomeStats = ({ income = [] }) => {
  const totalIncome = income.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const averageIncome =
    income.length > 0 ? Math.round(totalIncome / income.length) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      <div className="bg-white rounded-xl border p-5 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Income</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹ {totalIncome.toLocaleString()}
            </h2>
            <p className="text-xs text-gray-400 mt-2">
              {income.length} Transactions
            </p>
          </div>

          <div className="bg-green-100 p-3 rounded-lg">
            <DollarSign className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-5 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Average Income</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹ {averageIncome.toLocaleString()}
            </h2>
            <p className="text-xs text-gray-400 mt-2">
              Per Transaction
            </p>
          </div>

          <div className="bg-blue-100 p-3 rounded-lg">
            <BarChart3 className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-5 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Transactions</p>
            <h2 className="text-3xl font-bold mt-2">
              {income.length}
            </h2>
            <p className="text-xs text-gray-400 mt-2">
              Total Records
            </p>
          </div>

          <div className="bg-purple-100 p-3 rounded-lg">
            <Receipt className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default IncomeStats;