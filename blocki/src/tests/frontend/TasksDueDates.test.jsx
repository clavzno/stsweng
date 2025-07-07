import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarWithTasks from '../../components/CalendarWithTasks'; // CHANGE IF NEEDED

describe('Calendar task integration', () => {
  test('allows a student to add a task with an internal due date', () => {
    render(<CalendarWithTasks />);

    fireEvent.change(screen.getByLabelText(/task name/i), {
      target: { value: 'Finish draft essay' },
    });

    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: '2025-07-09' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    // Check if the task appears on the calendar on the right date
    const taskEvent = screen.getByText('Finish draft essay');
    expect(taskEvent).toBeInTheDocument();
    expect(taskEvent.closest('[data-date="2025-07-09"]')).toBeTruthy();
  });
});