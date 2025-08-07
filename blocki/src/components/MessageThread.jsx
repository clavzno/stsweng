"use client";
import React from "react";

export default function MessageThread({ messages = [] }) {
  return (
    <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto border rounded">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
          <div
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "me"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            <p>{msg.text}</p>
            <span className="block text-xs text-gray-500 mt-1">{msg.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
