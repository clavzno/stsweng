import React from 'react';

export default function UserAvatarList({ users = [] }) {
  return (
    <div className="flex space-x-3">
      {users.map((user, index) => (
        <img
          key={index}
          src={user.avatar}
          alt={user.name}
          title={user.name}
          className="w-10 h-10 rounded-full border-2 border-primary"
        />
      ))}
    </div>
  );
}
