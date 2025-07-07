import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from '../app/components/TaskManager'; // Adjust path if needed

// Mock task data
const mockTasks = [
  { id: 1, title: 'Finish CS paper', priority: 'High', dueDate: '2025-07-08' },
  { id: 2, title: 'Read chapters 3-5', priority: 'Low', dueDate: '2025-07-12' },
  { id: 3, title: 'Group project call', priority: 'Medium', dueDate: '2025-07-07' },
];

describe('TaskManager Grouping', () => {
  test('groups tasks by priority by default', () => {
    render(<TaskManager />);

    expect(screen.getByText('High Priority')).toBeInTheDocument();
    expect(screen.getByText('Medium Priority')).toBeInTheDocument();
    expect(screen.getByText('Low Priority')).toBeInTheDocument();

    expect(screen.getByText('Finish CS paper')).toBeInTheDocument();
    expect(screen.getByText('Group project call')).toBeInTheDocument();
    expect(screen.getByText('Read chapters 3-5')).toBeInTheDocument();
  });

  test('allows switching to group by due date', () => {
    render(<TaskManager />);
    
    // Simulate user toggling to 'Due Date' mode
    fireEvent.change(screen.getByLabelText(/Group by/i), {
      target: { value: 'dueDate' },
    });

    expect(screen.getByText('Due Today')).toBeInTheDocument();
    expect(screen.getByText('This Week')).toBeInTheDocument();
    expect(screen.getByText('Later')).toBeInTheDocument();
  });

  test('each group shows relevant tasks when grouped by due date', () => {
    render(<TaskManager />);

    fireEvent.change(screen.getByLabelText(/Group by/i), {
      target: { value: 'dueDate' },
    });

    // Task with dueDate 2025-07-07 should be in "Due Today"
    expect(screen.getByText('Group project call')).toBeInTheDocument();
    expect(screen.getByText('Due Today')).toBeInTheDocument();

    // Others should appear in "This Week" or "Later"
    expect(screen.getByText('Finish CS paper')).toBeInTheDocument();
    expect(screen.getByText('Read chapters 3-5')).toBeInTheDocument();
  });
});