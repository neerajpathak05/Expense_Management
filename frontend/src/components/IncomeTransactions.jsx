import React from "react";

const IncomeTransactions = ({
  income = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-6 w-full min-w-0">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">

        <div>

          <h2 className="text-lg sm:text-xl font-semibold">
            Income Transactions
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            All your income records
          </p>

        </div>

      </div>


      {/* TABLE */}

      <div className="overflow-x-auto w-full">

        <table className="min-w-175 w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm font-semibold">
                Description
              </th>

              <th className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm font-semibold">
                Category
              </th>

              <th className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm font-semibold">
                Amount
              </th>

              <th className="text-left px-4 sm:px-5 py-3 sm:py-4 text-sm font-semibold">
                Date
              </th>

              <th className="text-center px-4 sm:px-5 py-3 sm:py-4 text-sm font-semibold">
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

                  <td className="px-4 sm:px-5 py-3 sm:py-4">
                    {item.description}
                  </td>


                  <td className="px-4 sm:px-5 py-3 sm:py-4">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                      {item.category}
                    </span>

                  </td>


                  <td className="px-4 sm:px-5 py-3 sm:py-4 font-semibold text-green-600 whitespace-nowrap">
                    ₹ {Number(item.amount).toLocaleString()}
                  </td>


                  <td className="px-4 sm:px-5 py-3 sm:py-4 text-gray-600 whitespace-nowrap">
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </td>


                  <td className="px-4 sm:px-5 py-3 sm:py-4">

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