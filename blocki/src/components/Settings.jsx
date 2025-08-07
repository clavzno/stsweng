"use client";
import ThemeToggleSwitch from "./ThemeToggleSwitch";
import ColorPalettePicker from "./ColorPalettePicker";
import SaveLayoutButton from "./SaveLayoutButton";

const Settings = () => {
  const applyPalette = (colors) => {
    if (!colors) {
      
      document.documentElement.removeAttribute("style");
      return;
    }

    
    Object.entries(colors).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  };

  const handleSave = () => {
    alert("Layout saved (implement storage logic)");
  };

  const handleColorChange = (colors) => {
    console.log("Selected color:", colors);
    applyPalette(colors);
    // Optional: save to localStorage or backend here
  };

  return (
    <div className="p-4 bg-off-white dark:bg-dark-bg shadow rounded-lg space-y-4">
      <h2 className="font-orbitron text-xl text-dark-blue dark:text-white">
        Settings
      </h2>
      <ThemeToggleSwitch />
      <ColorPalettePicker onColorChange={handleColorChange} />
      <SaveLayoutButton onSave={handleSave} />
    </div>
  );
};

export default Settings;
