import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgressSummary from '../../components/ProgressSummary'; // CHANGE IF NEEDED

describe('ProgressSummary Component', () => {
  const mockProgressData = {
    day: 60,
    week: 75,
    month: 85,
    subjects: {
      Math: 90,
      Science: 60,
      History: 80
    }
  };

  test('renders progress title and default time filter', () => {
    render(<ProgressSummary data={mockProgressData} />);
    expect(screen.getByText(/progress summary/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /day/i })).toHaveAttribute('aria-pressed', 'true');
  });

  test('displays correct progress for day by default', () => {
    render(<ProgressSummary data={mockProgressData} />);
    expect(screen.getByText(/60% complete/i)).toBeInTheDocument();
  });

  test('updates progress when switching to week or month', () => {
    render(<ProgressSummary data={mockProgressData} />);
    
    fireEvent.click(screen.getByRole('button', { name: /week/i }));
    expect(screen.getByText(/75% complete/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /month/i }));
    expect(screen.getByText(/85% complete/i)).toBeInTheDocument();
  });

  test('shows subject breakdown if available', () => {
    render(<ProgressSummary data={mockProgressData} />);
    expect(screen.getByText(/math/i)).toBeInTheDocument();
    expect(screen.getByText(/90%/i)).toBeInTheDocument();
  });
});