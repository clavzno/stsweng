"use client";
import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TodoItem from "./TodoItem";
import { Plus, ListTodo } from "lucide-react";

const initialTodos = [
  {
    id: 1,
    task: "Finish the report for the Q2 review, it is very important and needs to be done by the end of the day.",
    completed: false,
    priority: "high",
    dueDate: new Date(),
  },
  {
    id: 2,
    task: "Schedule a dentist appointment",
    completed: false,
    priority: "medium",
    dueDate: null,
  },
  {
    id: 3,
    task: "Pick up groceries on the way home",
    completed: true,
    priority: "low",
    dueDate: null,
  },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState("");

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        {
          id: Date.now(),
          task: inputValue.trim(),
          completed: false,
          priority: "medium",
          dueDate: null,
        },
        ...todos,
      ]);
      setInputValue("");
    }
  };

  const updateTodo = (id, updates) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div
        className="bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-700 h-full flex flex-col relative w-full"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .orbitron {
            font-family: 'Orbitron', monospace;
          }
        `}</style>
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white orbitron">
              Todo List
            </h2>
          </div>
        </div>

        <div className="flex space-x-2 mb-4 flex-shrink-0">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new task..."
            className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-sm text-white focus:border-[#526CF4] focus:outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-[#526CF4] hover:bg-[#4A61E8] text-white p-2 rounded-md font-semibold transition-colors text-sm flex items-center justify-center flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={todos} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdate={updateTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </>
  );
}