"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Trash2,
  Calendar,
  Flag,
  CheckCircle,
  Circle,
} from "lucide-react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handlePriorityChange = (e) => {
    onUpdate(todo.id, { priority: e.target.value });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-700 flex items-start space-x-3 transition-shadow duration-200 hover:shadow-lg hover:border-gray-600 min-w-0 ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <button
        {...listeners}
        className="cursor-grab touch-none text-gray-500 hover:text-white transition-colors flex-shrink-0 pt-1"
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="flex-1 flex flex-col space-y-2 min-w-0">
        <div className="flex items-start space-x-3 min-w-0">
          <button onClick={() => onUpdate(todo.id, { completed: !todo.completed })} className="flex-shrink-0 pt-0.5">
            {todo.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <p
            className={`flex-1 text-sm min-w-0 break-words ${
              todo.completed
                ? "line-through text-gray-500"
                : "text-gray-100"
            }`}
          >
            {todo.task}
          </p>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400 pl-8">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No date'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Flag className={`w-4 h-4 flex-shrink-0 ${getPriorityColor(todo.priority)}`} />
              <select
                value={todo.priority}
                onChange={handlePriorityChange}
                className="bg-transparent border-none text-xs text-gray-400 focus:outline-none focus:ring-0"
              >
                <option className="bg-gray-800 text-white" value="low">Low</option>
                <option className="bg-gray-800 text-white" value="medium">Medium</option>
                <option className="bg-gray-800 text-white" value="high">High</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-500 hover:text-red-500 transition-colors flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}