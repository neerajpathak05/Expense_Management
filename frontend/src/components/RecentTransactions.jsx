import React from "react";

const RecentTransactions = ({
  transactions = [],
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full min-w-0 h-80 sm:h-95 overflow-y-auto">

      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
        Recent Transactions
      </h2>


      {transactions.length > 0 ? (

        <div className="space-y-4">

          {transactions.map((item) => (

            <div
              key={item._id}
              className="flex justify-between items-start gap-3 border-b pb-3"
            >

              {/* LEFT SIDE */}

              <div className="min-w-0 flex-1">

                <h3 className="font-semibold text-sm sm:text-base wrap-break-words">
                  {item.description}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 mt-1 wrap-break-words">
                  {item.category}
                </p>

              </div>


              {/* RIGHT SIDE */}

              <div className="text-right shrink-0">

                <p
                  className={`font-bold text-sm sm:text-base whitespace-nowrap ${
                    item.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹ {Number(item.amount).toLocaleString()}
                </p>

                <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="flex justify-center items-center h-52 sm:h-62.5 text-gray-400 text-sm sm:text-base">
          No Transactions
        </div>

      )}

    </div>
  );
};

export default RecentTransactions;