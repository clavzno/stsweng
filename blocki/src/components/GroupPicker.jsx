import React from 'react';

export default function GroupPicker({ groups = [], onSelect }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Select Group:</label>
      <select
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        onChange={(e) => onSelect(e.target.value)}
      >
        {groups.map((group, index) => (
          <option key={index} value={group}>
            {group}
          </option>
        ))}
      </select>
    </div>
  );
}
