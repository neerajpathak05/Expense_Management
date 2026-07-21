import React from "react";

const IncomeTransactions = ({ income = [], onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            Income Transactions
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            All your income records
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>
            <tr className="border-b bg-gray-50">

              <th className="text-left px-5 py-4 text-sm font-semibold">
                Description
              </th>

              <th className="text-left px-5 py-4 text-sm font-semibold">
                Category
              </th>

              <th className="text-left px-5 py-4 text-sm font-semibold">
                Amount
              </th>

              <th className="text-left px-5 py-4 text-sm font-semibold">
                Date
              </th>

              <th className="text-center px-5 py-4 text-sm font-semibold">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {income.length > 0 ? (

              income.map((item) => (

                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-5 py-4">
                    {item.description}
                  </td>

                  <td className="px-5 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-semibold text-green-600">
                    ₹ {Number(item.amount).toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onEdit(item)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(item._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
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
                  No Income Transactions Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default IncomeTransactions;