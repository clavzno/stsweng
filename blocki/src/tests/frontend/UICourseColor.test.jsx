import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../../components/Dashboard'; // CHANGE IF NEEDED

describe('Dashboard Card Color Customization', () => {
  test('allows user to change card color using color palette', () => {
    render(<Dashboard />);

    // Ensure initial card is rendered with default color
    const card = screen.getByTestId('dashboard-card');
    expect(card).toHaveClass('bg-blue-500');

    // Simulate user selecting a new color (e.g., red)
    const redOption = screen.getByRole('button', { name: /red/i });
    fireEvent.click(redOption);

    // The card should now have red background
    expect(card).toHaveClass('bg-red-500');
  });
});