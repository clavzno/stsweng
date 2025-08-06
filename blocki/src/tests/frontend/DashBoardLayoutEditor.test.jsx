import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardLayoutEditor from '../../components/DashboardLayoutEditor';

describe('DashboardLayoutEditor', () => {
  it('renders all sample cards', () => {
    render(<DashboardLayoutEditor />);

    // Check if each card title is rendered
    expect(screen.getByText('Card A')).toBeInTheDocument();
    expect(screen.getByText('Card B')).toBeInTheDocument();
    expect(screen.getByText('Card C')).toBeInTheDocument();
  });

  it('renders a drag handle for each card', () => {
    render(<DashboardLayoutEditor />);

    const dragHandles = screen.getAllByTestId('drag-handle');
    expect(dragHandles).toHaveLength(3);
  });
});