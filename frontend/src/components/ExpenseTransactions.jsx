import React from "react";

const ExpenseTransactions = ({
  expense = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full overflow-x-auto">

      <table className="min-w-175 w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold whitespace-nowrap">
              Description
            </th>

            <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold whitespace-nowrap">
              Category
            </th>

            <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold whitespace-nowrap">
              Amount
            </th>

            <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold whitespace-nowrap">
              Date
            </th>

            <th className="px-4 sm:px-6 py-3 text-center text-sm font-semibold whitespace-nowrap">
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {expense.length > 0 ? (

            expense.map((item) => (

              <tr
                key={item._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  {item.description}
                </td>


                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">

                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                    {item.category}
                  </span>

                </td>


                <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-red-600 whitespace-nowrap">
                  ₹ {Number(item.amount).toLocaleString()}
                </td>


                <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 whitespace-nowrap">
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>


                <td className="px-4 sm:px-6 py-3 sm:py-4">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        onEdit(item)
                      }
                      className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 whitespace-nowrap"
                    >
                      Edit
                    </button>


                    <button
                      onClick={() =>
                        onDelete(item._id)
                      }
                      className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-red-600 whitespace-nowrap"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="5"
                className="text-center py-10 text-gray-500"
              >
                No Expense Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default ExpenseTransactions;