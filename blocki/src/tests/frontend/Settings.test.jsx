import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../../components/Settings';

// Mock the child components
jest.mock('../../components/ThemeToggleSwitch', () => () => (
  <div data-testid="theme-toggle-switch">ThemeToggleSwitch</div>
));

jest.mock('../../components/ColorPalettePicker', () => ({ onColorChange }) => (
  <div data-testid="color-palette-picker" onClick={() => onColorChange('blue')}>
    ColorPalettePicker
  </div>
));

jest.mock('../../components/SaveLayoutButton', () => ({ onSave }) => (
  <button data-testid="save-layout-button" onClick={onSave}>
    Save Layout
  </button>
));

describe('Settings Component', () => {
  it('renders all child components and heading', () => {
    render(<Settings />);

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle-switch')).toBeInTheDocument();
    expect(screen.getByTestId('color-palette-picker')).toBeInTheDocument();
    expect(screen.getByTestId('save-layout-button')).toBeInTheDocument();
  });

  it('calls handleColorChange when color is picked', () => {
    console.log = jest.fn();
    render(<Settings />);
    
    fireEvent.click(screen.getByTestId('color-palette-picker'));
    expect(console.log).toHaveBeenCalledWith('Selected color:', 'blue');
  });

  it('shows alert when save layout button is clicked', () => {
    window.alert = jest.fn();
    render(<Settings />);

    fireEvent.click(screen.getByTestId('save-layout-button'));
    expect(window.alert).toHaveBeenCalledWith('Layout saved (implement storage logic)');
  });
});