import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggleSwitch from '../../components/ThemeToggleSwitch';

describe('ThemeToggleSwitch Component', () => {
  beforeEach(() => {
    // Reset document class before each test
    document.documentElement.classList.remove('dark');
  });

  it('renders with initial light mode', () => {
    render(<ThemeToggleSwitch />);
    expect(screen.getByRole('button')).toHaveTextContent('🌙 Dark Mode');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles to dark mode when clicked', () => {
    render(<ThemeToggleSwitch />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(button).toHaveTextContent('☀ Light Mode');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles back to light mode when clicked twice', () => {
    render(<ThemeToggleSwitch />);
    const button = screen.getByRole('button');

    fireEvent.click(button); // dark mode
    fireEvent.click(button); // light mode

    expect(button).toHaveTextContent('🌙 Dark Mode');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('has correct initial button classes', () => {
    render(<ThemeToggleSwitch />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(
      'px-4',
      'py-2',
      'rounded-full',
      'bg-primary',
      'text-white',
      'dark:bg-accent',
      'transition'
    );
  });
});