"use client";
import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TodoItem from "./TodoItem";
import { Plus, ListTodo, X, Calendar, Flag, Save } from "lucide-react";

const initialTodos = [
  {
    id: 1,
    task: "Finish the report for the Q2 review",
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTodo, setNewTodo] = useState({
    task: "",
    priority: "medium",
    dueDate: "",
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  const addTodo = () => {
    if (newTodo.task.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: Date.now(),
          task: newTodo.task.trim(),
          completed: false,
          priority: newTodo.priority,
          dueDate: newTodo.dueDate ? new Date(newTodo.dueDate) : null,
        },
      ]);
      setNewTodo({ task: "", priority: "medium", dueDate: "" });
      setShowAddModal(false);
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
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .orbitron-semibold {
          font-family: 'Orbitron', sans-serif;
          font-weight: 600; /* Semi-bold */
        }
        .roboto {
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Roboto&display=swap"
        rel="stylesheet"
      />
      <div
        className="bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-700 h-full flex flex-col relative w-full roboto"
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg text-white orbitron-semibold">
              Todo List
            </h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#526CF4] hover:bg-[#4A61E8] text-white p-2 rounded-lg transition-colors flex items-center justify-center"
            title="Add new task"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pr-2">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={todos}
              strategy={verticalListSortingStrategy}
            >
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

        {showAddModal && (
          <div className="absolute inset-0 z-20 bg-transparent flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-700 w-full max-w-md flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h3 className="text-lg text-white orbitron-semibold">
                  Create New Task
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar p-1 roboto">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">
                    Task
                  </label>
                  <input
                    type="text"
                    name="task"
                    value={newTodo.task}
                    onChange={handleInputChange}
                    placeholder="What do you need to do?"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-sm text-white focus:border-[#526CF4] focus:outline-none roboto"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-300">
                      <Flag className="w-4 h-4" />
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={newTodo.priority}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-sm text-white focus:border-[#526CF4] focus:outline-none roboto"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-300">
                      <Calendar className="w-4 h-4" />
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={newTodo.dueDate}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-sm text-white focus:border-[#526CF4] focus:outline-none roboto"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex-shrink-0">
                <button
                  onClick={addTodo}
                  className="w-full bg-[#526CF4] hover:bg-[#4A61E8] text-white py-2 px-3 rounded-md transition-colors text-sm flex items-center justify-center gap-2 orbitron-semibold"
                >
                  <Save className="w-4 h-4" />
                  Save Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}