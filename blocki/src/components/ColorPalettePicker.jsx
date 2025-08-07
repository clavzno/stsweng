"use client";
import React, { useState } from "react";

const palettes = [
  { name: "Reds", colors: ["#f5222d", "#ff7875", "#ffccc7"] },
  { name: "Oranges", colors: ["#fa8c16", "#ffa940", "#ffd591"] },
  { name: "Greens", colors: ["#52c41a", "#73d13d", "#b7eb8f"] },
  { name: "Blues", colors: ["#1890ff", "#40a9ff", "#91d5ff"] },
  { name: "Pinks", colors: ["#eb2f96", "#ff85c0", "#ffd6e7"] },
  { name: "Purples", colors: ["#722ed1", "#9254de", "#b37feb"] },
  { name: "Pastels", colors: ["#ffd6e7", "#fff0f6", "#d6f5ff"] },
  { name: "Rainbow", colors: ["#f5222d", "#fa8c16", "#fadb14", "#52c41a", "#1890ff", "#722ed1"] },
];

export default function ColorPalettePicker({ onColorChange }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (palette) => {
    setSelected(palette.name);
    if (onColorChange) onColorChange(palette.colors);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-orbitron text-lg text-dark-blue dark:text-white">Popular Palettes</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {/* Reset Button */}
        <button
          onClick={() => {
            setSelected(null);
            if (onColorChange) onColorChange(null);
          }}
          className="col-span-3 sm:col-span-4 p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          Revert to original
        </button>

        {palettes.map((palette) => (
          <button
            key={palette.name}
            onClick={() => handleSelect(palette)}
            className={`p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                        transition text-left ${
                          selected === palette.name ? "ring-2 ring-primary" : ""
                        }`}
          >
            <div className="flex space-x-1 mb-1">
              {palette.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">{palette.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
