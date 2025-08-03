import React from 'react';

export default function FeedbackPanel() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Feedback</h2>
      <textarea
        placeholder="Your feedback..."
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        rows={4}
      />
      <button className="mt-2 bg-green text-white px-4 py-2 rounded hover:bg-green-600">
        Submit
      </button>
    </div>
  );
}
