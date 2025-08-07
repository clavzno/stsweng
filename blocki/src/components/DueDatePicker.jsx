"use client";
import React from "react";

export default function DueDatePicker({ value, onChange }) {
  return (
    <input
      type="date"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
    />
  );
}
