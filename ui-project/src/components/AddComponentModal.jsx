import React from 'react';

export default function AddComponentModal({ isOpen, onClose, onAddComponent }) {
  if (!isOpen) return null;

  const components = [
    { id: 'courses', name: 'Courses List' },
    { id: 'calendar', name: 'Calendar' },
    { id: 'tracker', name: 'Study Tracker' },
    { id: 'pomodoro', name: 'Pomodoro Timer' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add a Component</h2>
        <ul className="space-y-2">
          {components.map((component) => (
            <li key={component.id}>
              <button
                onClick={() => onAddComponent(component.id)}
                className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                {component.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}