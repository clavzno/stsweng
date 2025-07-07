import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../components/ThemeToggle'; // CHANGE IF NEEDED

describe('Theme Toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = ''; // reset HTML root class
  });

  test('defaults to dark theme if no preference is set', () => {
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('toggles to light theme on button click', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });

    // Click to switch to light
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  test('remembers last selected theme from localStorage', () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});