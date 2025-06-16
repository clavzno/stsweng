import React from 'react';

export default function ModuleList({ modules }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Modules</h3>
      <ul className="space-y-2">
        {modules.map((module) => (
          <li key={module.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="text-gray-800 dark:text-gray-200">{module.title}</span>
            <a href={module.link} className="text-sm text-primary hover:underline">View</a>
          </li>
        ))}
      </ul>
    </div>
  );
}