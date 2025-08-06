import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarComponent from '../../components/Calendar';

describe('CalendarComponent', () => {
  const mockTasks = [
    {
      id: 1,
      date: new Date(),
      time: '09:00',
      title: 'Morning Standup',
      description: 'Team sync meeting',
      iconType: 'meeting',
      color: 'orange'
    },
    {
      id: 2,
      date: new Date(),
      time: '14:00',
      title: 'Code Review',
      description: 'Review PR #123',
      iconType: 'code',
      color: 'blue'
    }
  ];

  test('renders calendar with tasks for today', () => {
    render(
      <CalendarComponent
        tasks={mockTasks}
        onDateSelect={jest.fn()}
        onTaskClick={jest.fn()}
        onAddTask={jest.fn()}
        initialView="week"
      />
    );

    // Expect to find both tasks
    expect(screen.getByText('Morning Standup')).toBeInTheDocument();
    expect(screen.getByText('Code Review')).toBeInTheDocument();
  });

  test('switches between week and month view', () => {
    render(<CalendarComponent tasks={mockTasks} />);

    const weekButton = screen.getByText('Week');
    const monthButton = screen.getByText('Month');

    // Switch to Month view
    fireEvent.click(monthButton);
    expect(monthButton).toHaveClass('bg-white'); // or your active class
    expect(weekButton).not.toHaveClass('bg-white');

    // Switch back to Week view
    fireEvent.click(weekButton);
    expect(weekButton).toHaveClass('bg-white');
  });

  
test('calls onAddTask when "+" button is clicked', () => {
  const mockOnAddTask = jest.fn();

  const { getByRole } = render(
    <CalendarComponent
      tasks={[]}
      onAddTask={mockOnAddTask}
    />
  );

  const addButton = getByRole('button', { name: 'Add Task' });

  fireEvent.click(addButton);

  expect(mockOnAddTask).toHaveBeenCalled();
});
});