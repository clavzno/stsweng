import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskItem from '../../components/TaskItem'; // CHANGE IF NEEDED
import dayjs from 'dayjs';

describe('TaskItem Component', () => {
  const today = dayjs();
  const nearDeadline = today.add(1, 'day').format('YYYY-MM-DD');
  const farDeadline = today.add(5, 'days').format('YYYY-MM-DD');

  test('renders task title', () => {
    render(<TaskItem task={{ title: 'Math Homework', dueDate: farDeadline }} />);
    expect(screen.getByText('Math Homework')).toBeInTheDocument();
  });

  test('task with near deadline should have red text or indicator', () => {
    render(<TaskItem task={{ title: 'Urgent Task', dueDate: nearDeadline }} />);
    const taskElement = screen.getByText('Urgent Task');
    expect(taskElement).toHaveClass('text-red-500'); // or 'text-red', depending on your Tailwind setup
  });

  test('task with distant deadline should not be red', () => {
    render(<TaskItem task={{ title: 'Future Task', dueDate: farDeadline }} />);
    const taskElement = screen.getByText('Future Task');
    expect(taskElement).not.toHaveClass('text-red-500');
  });
});