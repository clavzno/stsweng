"use client";
import React, { useState } from "react";

export default function GroupPicker({ groups = [], onSelectGroup, onCreateGroup }) {
  const [newGroup, setNewGroup] = useState("");

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Groups</h2>

      <div className="flex space-x-2">
        <input
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="New Group Name"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={() => {
            if (newGroup.trim()) {
              onCreateGroup && onCreateGroup(newGroup);
              setNewGroup("");
            }
          }}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {groups.map((group) => (
          <li
            key={group.id}
            className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            onClick={() => onSelectGroup && onSelectGroup(group)}
          >
            {group.name} ({group.members.length} members)
          </li>
        ))}
      </ul>
    </div>
  );
}
