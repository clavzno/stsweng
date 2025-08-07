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
          key={color.value}
          onClick={() => onColorChange(color.value)}
          className={`w-8 h-8 rounded-full ${color.value} border-2 border-white hover:ring-2 ring-white transition`}
          title={color.name}
          data-testid={`color-button-${color.value}`}
        />
      </div>
    </div>)
}