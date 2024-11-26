import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className={`px-6 py-3 border-b dark:border-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                  column.accessor === 'actions' ? 'text-center' : ''
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((item, index) => (
            <tr key={item.id || index} className="dark:hover:bg-gray-800">
              {columns.map((column) => (
                <td
                  key={`${item.id}-${column.accessor}`}
                  className={`px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-300 ${
                    column.accessor === 'actions' ? 'text-center' : ''
                  }`}
                >
                  {column.cell ? column.cell(item) : item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
