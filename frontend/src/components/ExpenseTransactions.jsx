import React from "react";

const ExpenseTransactions = ({
  expense = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-3 text-left">
              Description
            </th>

            <th className="px-6 py-3 text-left">
              Category
            </th>

            <th className="px-6 py-3 text-left">
              Amount
            </th>

            <th className="px-6 py-3 text-left">
              Date
            </th>

            <th className="px-6 py-3 text-center">
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

                <td className="px-6 py-4">
                  {item.description}
                </td>

                <td className="px-6 py-4">
                  {item.category}
                </td>

                <td className="px-6 py-4 font-semibold text-red-600">
                  ₹ {Number(item.amount).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(item)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        onDelete(item._id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded"
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