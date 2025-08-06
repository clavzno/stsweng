"use client";
import React, { useState } from "react";

export default function FeedbackPanel({ onSubmit }) {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="p-4 space-y-4 border rounded">
      <h2 className="text-lg font-bold">Feedback</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share your feedback..."
        className="border p-2 rounded w-full"
      />
      <button
        onClick={() => {
          if (feedback.trim()) {
            onSubmit && onSubmit(feedback);
            setFeedback("");
          }
        }}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
