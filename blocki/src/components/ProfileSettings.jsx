import React from 'react';

export default function ProfileSettings() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Profile Settings</h2>
      <form className="space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Settings
        </button>
      </form>
    </div>
  );
}
