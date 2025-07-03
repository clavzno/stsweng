import React from 'react';

export default function Announcements({ announcements }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Announcements</h3>
      <ul className="space-y-4">
        {announcements.map((announcement) => (
          <li key={announcement.id} className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <p className="text-gray-800 dark:text-gray-200 font-semibold">{announcement.title}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{announcement.content}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{announcement.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}