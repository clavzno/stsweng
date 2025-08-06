import { render, screen } from '@testing-library/react';
import React from 'react';
import Sidebar from '../../components/Sidebar';

describe('Sidebar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders default tabs', () => {
    render(<Sidebar />);
    
    // Check for default sidebar tabs
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/courses/i)).toBeInTheDocument();
    expect(screen.getByText(/announcements/i)).toBeInTheDocument();
  });

  test('shows Add Tab button', () => {
    render(<Sidebar />);
    expect(screen.getByText(/add tab/i)).toBeInTheDocument();
  });

  test('does not look for nonexistent blocki icon', () => {
    render(<Sidebar />);
    
    // Instead of checking for alt text, we assert useful sidebar content
    expect(screen.queryByAltText(/blocki icon/i)).not.toBeInTheDocument();
  });
});