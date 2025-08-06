import ThemeToggleSwitch from './ThemeToggleSwitch';
import ColorPalettePicker from './ColorPalettePicker';
import SaveLayoutButton from './SaveLayoutButton';

const Settings = () => {
  const handleSave = () => {
    alert('Layout saved (implement storage logic)');
  };

  const handleColorChange = (color) => {
    console.log('Selected color:', color);
    // TODO: Apply or store color choice
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
