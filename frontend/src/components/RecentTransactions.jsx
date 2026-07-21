import React from "react";

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-95 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-5">
        Recent Transactions
      </h2>

      {transactions?.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <h3 className="font-semibold">
                  {item.description}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.category}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-bold ${
                    item.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹ {item.amount}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-62.5 text-gray-400">
          No Transactions
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;