"use client";
import React from "react";
import DueDatePicker from "./DueDatePicker";

export default function TodoItem({ todo, onUpdate }) {
  const toggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handlePriorityChange = (e) => {
    onUpdate(todo.id, { priority: e.target.value });
  };

  const handleDueDateChange = (date) => {
    onUpdate(todo.id, { dueDate: date });
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded shadow-sm border border-gray-200 dark:border-gray-700 mb-2">
      <div className="flex items-center space-x-3 w-full">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="h-5 w-5 text-primary rounded focus:ring-primary"
        />
        <span
          className={`flex-1 ${
            todo.completed ? "line-through text-gray-400" : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {todo.task}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Priority Selector */}
        <select
          value={todo.priority}
          onChange={handlePriorityChange}
          className="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Due Date Picker */}
        <DueDatePicker value={todo.dueDate} onChange={handleDueDateChange} />
      </div>
    </div>
  );
}
