import React from 'react';

export default function Groups() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Groups</h2>
      <ul className="space-y-2">
        <li className="hover:text-primary cursor-pointer">CS Study Buddies</li>
        <li className="hover:text-primary cursor-pointer">Web Dev Circle</li>
        <li className="hover:text-primary cursor-pointer">STSWENG Group 3</li>
      </ul>
    </div>
  );
}
