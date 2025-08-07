import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorPalettePicker from '../../components/ColorPalettePicker'; // adjust path if needed

describe('ColorPalettePicker', () => {
  const colors = [
    { name: 'Primary Blue', value: 'bg-primary' },
    { name: 'Accent Green', value: 'bg-accent' },
    { name: 'Orange', value: 'bg-secondary' },
    { name: 'Red', value: 'bg-red' }
  ];

  it('renders all color buttons', () => {
    const { getByTitle } = render(<ColorPalettePicker onColorChange={() => {}} />);

    colors.forEach((color) => {
      expect(getByTitle(color.name)).toBeInTheDocument();
    });
  });

  it('calls onColorChange with correct color value when a button is clicked', () => {
    const mockOnColorChange = jest.fn();
    const { getByTitle } = render(<ColorPalettePicker onColorChange={mockOnColorChange} />);

    const redButton = getByTitle('Red');
    fireEvent.click(redButton);

    expect(mockOnColorChange).toHaveBeenCalledWith('bg-red');
  });
});