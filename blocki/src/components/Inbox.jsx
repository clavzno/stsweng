import React from 'react';

export default function Inbox() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Inbox</h2>
      <ul className="divide-y dark:divide-gray-600">
        <li className="py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          📩 John: "Hey! Meeting at 3PM?"
        </li>
        <li className="py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          📩 Mary: "Assignment submitted!"
        </li>
      </ul>
    </div>
  );
}
