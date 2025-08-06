import React from 'react';

export default function ProfileEditor() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Edit Profile</h2>
      <textarea
        className="w-full h-32 p-2 rounded border dark:bg-gray-700 dark:text-white"
        placeholder="Write something about yourself..."
      />
      <button className="mt-3 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">
        Update Bio
      </button>
    </div>
  );
}
