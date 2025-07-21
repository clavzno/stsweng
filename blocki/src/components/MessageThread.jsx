import React from 'react';

export default function MessageThread({ messages = [] }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow max-h-80 overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>{msg.sender}</strong>: {msg.text}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
