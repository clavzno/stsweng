const colors = [
  { name: 'Primary Blue', value: 'bg-primary' },
  { name: 'Accent Green', value: 'bg-accent' },
  { name: 'Orange', value: 'bg-secondary' },
  { name: 'Red', value: 'bg-red' }
];

const ColorPalettePicker = ({ onColorChange }) => {
  return (
    <div className="flex gap-2 mt-2">
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => onColorChange(color.value)}
          className={`w-8 h-8 rounded-full ${color.value} border-2 border-white hover:ring-2 ring-white transition`}
          title={color.name}
          data-testid={`color-button-${color.value}`}
        />
      ))}
    </div>
  );
};

export default ColorPalettePicker;
