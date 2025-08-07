"use client";
import React from "react";

export default function ExternalLinkButton({ url, label }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors"
    >
      {label || "Open Link"}
    </a>
  );
}
