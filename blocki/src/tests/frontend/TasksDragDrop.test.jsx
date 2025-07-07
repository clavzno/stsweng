import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalendarWithDragDrop from '../../components/CalendarWithDragDrop'; // CHANGE IF NEEDED

describe('Calendar Drag and Drop', () => {
  test('allows a student to drag a task to a different date', async () => {
    render(<CalendarWithDragDrop />);

    // Confirm original task is on July 10
    const originalTask = screen.getByText('Study for Exam');
    expect(originalTask.closest('[data-date="2025-07-10"]')).toBeInTheDocument();

    // Simulate drag-and-drop from July 10 to July 12
    const source = originalTask;
    const target = screen.getByTestId('date-2025-07-12');

    await userEvent.dragAndDrop(source, target);

    // Task should now appear under the new date
    expect(screen.getByText('Study for Exam').closest('[data-date="2025-07-12"]')).toBeInTheDocument();
  });
});