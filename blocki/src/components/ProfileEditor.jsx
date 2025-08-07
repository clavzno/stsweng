"use client";
import React, { useState } from "react";

export default function ProfileEditor({ initialProfile = {}, onSave }) {
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Edit Profile</h2>
      <input
        name="name"
        value={profile.name || ""}
        onChange={handleChange}
        placeholder="Full Name"
        className="border p-2 rounded w-full"
      />
      <input
        name="email"
        type="email"
        value={profile.email || ""}
        onChange={handleChange}
        placeholder="Email Address"
        className="border p-2 rounded w-full"
      />
      <textarea
        name="bio"
        value={profile.bio || ""}
        onChange={handleChange}
        placeholder="Bio"
        className="border p-2 rounded w-full"
      />
      <button
        onClick={() => onSave && onSave(profile)}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
