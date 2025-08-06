"use client";
import React, { useState } from "react";
import TodoItem from "./TodoItem";
import CarryOverLogic from "./CarryOverLogic";
import PrioritySorter from "./PrioritySorter";
import GroupBySelector from "./GroupBySelector";
import DueDatePicker from "./DueDatePicker";
import DeadlineHighlighter from "./DeadlineHighlighter";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [groupBy, setGroupBy] = useState("none");

  const addTodo = (task) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        task,
        completed: false,
        dueDate: null,
        priority: "medium",
      },
    ]);
  };

  const updateTodo = (id, updates) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)));
  };

  const groupedTodos = PrioritySorter(CarryOverLogic(todos), groupBy);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Todo List</h2>
      <GroupBySelector selected={groupBy} onChange={setGroupBy} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const task = e.target.task.value.trim();
          if (task) addTodo(task);
          e.target.reset();
        }}
        className="flex space-x-2"
      >
        <input name="task" placeholder="New Task" className="border p-2 rounded w-full" />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Add</button>
      </form>

      {groupedTodos.map((todo) => (
        <DeadlineHighlighter key={todo.id} dueDate={todo.dueDate}>
          <TodoItem todo={todo} onUpdate={updateTodo} />
        </DeadlineHighlighter>
      ))}
    </div>
  );
};

export default TodoList;
