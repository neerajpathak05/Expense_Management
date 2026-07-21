import React from "react";

const ExpenseChart = ({ expense = [] }) => {
  const categoryData = {};

  expense.forEach((item) => {
    const category = item.category || "Other";

    categoryData[category] =
      (categoryData[category] || 0) +
      Number(item.amount || 0);
  });

  const categories = Object.entries(categoryData);

  const maxAmount =
    categories.length > 0
      ? Math.max(
          ...categories.map(([, amount]) => amount)
        )
      : 0;

  return (
    <div className="bg-white rounded-xl w-full">

      <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">
        Spending by Category
      </h2>

      {categories.length === 0 ? (

        <div className="text-center py-8 sm:py-10 text-gray-500 text-sm sm:text-base">
          No expense data available
        </div>

      ) : (

        <div className="space-y-4 sm:space-y-5">

          {categories.map(([category, amount]) => (

            <div key={category}>

              <div className="flex justify-between items-center gap-4 mb-2">

                <span className="font-medium text-gray-700 truncate">
                  {category}
                </span>

                <span className="font-semibold text-red-600 whitespace-nowrap text-sm sm:text-base">
                  ₹ {amount.toLocaleString()}
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">

                <div
                  className="bg-red-500 h-2.5 sm:h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      maxAmount > 0
                        ? (amount / maxAmount) * 100
                        : 0
                    }%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default ExpenseChart;