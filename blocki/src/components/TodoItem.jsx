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
    transition: `transform 250ms ease, box-shadow 200ms ease`,
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-[#FF5757]"; // Red accent
      case "medium":
        return "text-[#F38735]"; // Orange accent
      case "low":
        return "text-[#4AD147]"; // Green accent
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-start gap-3 transition-shadow duration-200 hover:border-gray-600 ${
        todo.completed ? "opacity-50" : ""
      }`}
    >
      <button
        {...listeners}
        className="cursor-grab touch-none text-gray-500 hover:text-white transition-colors flex-shrink-0 pt-1"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onUpdate(todo.id, { completed: !todo.completed })}
            className="flex-shrink-0 pt-1"
            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <p
            className={`flex-1 text-sm break-words ${
              todo.completed ? "line-through text-gray-500" : "text-gray-100"
            }`}
          >
            {todo.task}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 pl-8">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {todo.dueDate
                  ? new Date(todo.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "No date"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flag className={`w-3.5 h-3.5 ${getPriorityColor(todo.priority)}`} />
              <span className="capitalize">{todo.priority}</span>
            </div>
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-500 hover:text-[#FF5757] transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}