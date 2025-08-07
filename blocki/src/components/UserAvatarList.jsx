"use client";
import React from "react";

export default function UserAvatarList({ users = [], onSelect }) {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => onSelect && onSelect(user)}
        >
          <div className="relative">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-gray-300 group-hover:border-primary"
            />
            {user.status && (
              <span
                className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${
                  user.status === "online" ? "bg-green-500" : "bg-gray-400"
                } border-2 border-white`}
              />
            )}
          </div>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-200">
            {user.name}
          </p>
        </div>
      ))}
    </div>
  );
}
