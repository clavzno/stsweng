"use client";
import React from "react";

export default function GroupBySelector({ selected, onChange }) {
  return (
    <div className="flex items-center space-x-3 mb-4">
      <label className="text-gray-700 dark:text-gray-200 font-medium">Group By:</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
      >
        <option value="none">None</option>
        <option value="priority">Priority</option>
        <option value="date">Due Date</option>
      </select>
    </div>
  );
}
