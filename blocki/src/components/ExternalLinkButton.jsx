import React from 'react';

export default function ExternalLinkButton({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-secondary text-white px-4 py-2 rounded hover:bg-orange-600"
    >
      {label}
    </a>
  );
}
