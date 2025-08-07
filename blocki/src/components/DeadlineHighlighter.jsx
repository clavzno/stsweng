"use client";
import React from "react";

export default function DeadlineHighlighter({ dueDate, children }) {
  if (!dueDate) return <div>{children}</div>;

  const today = new Date();
  const deadline = new Date(dueDate);
  const isOverdue = deadline < today && today.toDateString() !== deadline.toDateString();
  const isToday = deadline.toDateString() === today.toDateString();

  const highlightClass = isOverdue
    ? "border-red-500 bg-red-50 dark:bg-red-900/30"
    : isToday
    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30"
    : "border-green-500 bg-green-50 dark:bg-green-900/30";

  return <div className={`border-l-4 p-1 mb-1 rounded ${highlightClass}`}>{children}</div>;
}
