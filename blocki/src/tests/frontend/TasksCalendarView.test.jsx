import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskCalendar from '../../components/TaskCalendar'; // CHANGE IF NEEDED

describe('TaskCalendar Component', () => {
  test('displays tasks on their respective due dates', () => {
    const mockTasks = [
      { id: 1, title: 'Submit Essay', dueDate: '2025-07-10' },
      { id: 2, title: 'Math Homework', dueDate: '2025-07-12' },
      { id: 3, title: 'Physics Quiz', dueDate: '2025-07-12' },
    ];

    render(<TaskCalendar tasks={mockTasks} />);

    // Check that all tasks are visible in the calendar
    expect(screen.getByText('Submit Essay')).toBeInTheDocument();
    expect(screen.getByText('Math Homework')).toBeInTheDocument();
    expect(screen.getByText('Physics Quiz')).toBeInTheDocument();

    // (Optional) If dates are labeled in the calendar:
    expect(screen.getByTestId('date-2025-07-10')).toContainElement(screen.getByText('Submit Essay'));
    expect(screen.getByTestId('date-2025-07-12')).toContainElement(screen.getByText('Math Homework'));
    expect(screen.getByTestId('date-2025-07-12')).toContainElement(screen.getByText('Physics Quiz'));
  });
});