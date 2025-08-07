import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

const mockSetIsEditMode = jest.fn();
const mockOnSaveLayout = jest.fn();

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('renders Header with all elements', () => {
    render(
      <Header isEditMode={false} setIsEditMode={mockSetIsEditMode} onSaveLayout={mockOnSaveLayout} />
    );

    expect(screen.getByPlaceholderText(/search components/i)).toBeInTheDocument();
    expect(screen.getByTitle(/edit layout/i)).toBeInTheDocument();
    expect(screen.getByTitle(/switch to dark mode/i)).toBeInTheDocument();
    expect(screen.getByTitle(/settings/i)).toBeInTheDocument();
    expect(screen.getByAltText(/profile/i)).toBeInTheDocument();
  });

  it('toggles edit mode on button click', () => {
    render(
      <Header isEditMode={false} setIsEditMode={mockSetIsEditMode} onSaveLayout={mockOnSaveLayout} />
    );

    fireEvent.click(screen.getByTitle(/edit layout/i));
    expect(mockSetIsEditMode).toHaveBeenCalledWith(true);
  });

  it('toggles dark mode and sets localStorage', () => {
    render(
      <Header isEditMode={false} setIsEditMode={mockSetIsEditMode} onSaveLayout={mockOnSaveLayout} />
    );

    const toggleButton = screen.getByTitle(/switch to dark mode/i);
    fireEvent.click(toggleButton);

    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('shows and hides profile dropdown menu', () => {
    render(
      <Header isEditMode={false} setIsEditMode={mockSetIsEditMode} onSaveLayout={mockOnSaveLayout} />
    );

    const profileButton = screen.getByAltText(/profile/i);
    fireEvent.click(profileButton);

    expect(screen.getByText(/almira velasquez/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});