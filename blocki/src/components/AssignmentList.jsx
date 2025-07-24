"use client";

import React, { useState } from 'react';
import FileUploader from './course/FileUploader';

export default function AssignmentList({ assignments }) {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Assignments</h3>
      <ul className="space-y-2">
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <button
              onClick={() => setSelectedAssignment(assignment)}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {assignment.title}
            </button>
          </li>
        ))}
      </ul>

      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{selectedAssignment.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedAssignment.instructions}</p>
            <FileUploader />
            <button
              onClick={() => setSelectedAssignment(null)}
              className="mt-4 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}