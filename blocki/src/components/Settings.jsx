import { useEffect } from 'react';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import ColorPalettePicker from './ColorPalettePicker';
import SaveLayoutButton from './SaveLayoutButton';

const Settings = () => {
  // Load saved palette on mount
  useEffect(() => {
    const savedPalette = localStorage.getItem('selectedPalette');
    if (savedPalette) {
      applyPalette(JSON.parse(savedPalette));
    }
  }, []);

  const handleSave = () => {
    alert('Layout saved (implement storage logic)');
  };

  // ✅ Apply colors dynamically to :root
  const applyPalette = (palette) => {
    const root = document.documentElement;
    Object.entries(palette).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  const handleColorChange = (palette) => {
    console.log('Selected palette:', palette);
    applyPalette(palette);
    localStorage.setItem('selectedPalette', JSON.stringify(palette));
  };

  return (
    <div className="p-4 bg-off-white dark:bg-dark-bg shadow rounded-lg space-y-4">
      <h2 className="font-orbitron text-xl text-dark-blue dark:text-white">Settings</h2>
      <ThemeToggleSwitch />
      <ColorPalettePicker onColorChange={handleColorChange} />
      <SaveLayoutButton onSave={handleSave} />
    </div>
  );
};

export default Settings;
