import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgressGraph from '../../components/ProgressGraph'; // CHANGE IF NEEDED

describe('ProgressGraph Component', () => {
  test('renders with default graph view', () => {
    render(<ProgressGraph />);
    expect(screen.getByText(/progress over time/i)).toBeInTheDocument(); // Assuming default is line
  });

  test('toggles to bar chart view', () => {
    render(<ProgressGraph />);
    const barButton = screen.getByRole('button', { name: /bar chart/i });
    fireEvent.click(barButton);
    expect(screen.getByText(/progress by category/i)).toBeInTheDocument(); // Assumes a heading or label
  });

  test('toggles to pie chart view', () => {
    render(<ProgressGraph />);
    const pieButton = screen.getByRole('button', { name: /pie chart/i });
    fireEvent.click(pieButton);
    expect(screen.getByText(/distribution of completed tasks/i)).toBeInTheDocument();
  });

  test('only one graph is visible at a time', () => {
    render(<ProgressGraph />);
    const barButton = screen.getByRole('button', { name: /bar chart/i });
    fireEvent.click(barButton);

    expect(screen.queryByText(/progress over time/i)).not.toBeInTheDocument(); // Line chart removed
    expect(screen.getByText(/progress by category/i)).toBeInTheDocument();     // Bar chart active
  });
});