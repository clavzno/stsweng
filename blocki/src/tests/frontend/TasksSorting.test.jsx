import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../../components/TaskList'; // CHANGE IF NEEDED

const mockTasks = [
  { id: 1, title: 'Do Homework', priority: 3 },
  { id: 2, title: 'Prepare Project', priority: 1 },
  { id: 3, title: 'Attend Review', priority: 4 },
  { id: 4, title: 'Submit Quiz', priority: 2 },
];

describe('TaskList sorting by priority', () => {
  test('renders tasks in default order', () => {
    render(<TaskList tasks={mockTasks} />);
    const taskTitles = screen.getAllByTestId('task-title').map(el => el.textContent);
    expect(taskTitles).toEqual([
      'Do Homework',
      'Prepare Project',
      'Attend Review',
      'Submit Quiz',
    ]);
  });

  test('sorts tasks by priority: Most to Least', () => {
    render(<TaskList tasks={mockTasks} />);
    fireEvent.change(screen.getByLabelText(/Sort by/i), {
      target: { value: 'high-to-low' }
    });

    const sortedTitles = screen.getAllByTestId('task-title').map(el => el.textContent);
    expect(sortedTitles).toEqual([
      'Prepare Project',   // priority 1
      'Submit Quiz',       // priority 2
      'Do Homework',       // priority 3
      'Attend Review',     // priority 4
    ]);
  });

  test('sorts tasks by priority: Least to Most', () => {
    render(<TaskList tasks={mockTasks} />);
    fireEvent.change(screen.getByLabelText(/Sort by/i), {
      target: { value: 'low-to-high' }
    });

    const sortedTitles = screen.getAllByTestId('task-title').map(el => el.textContent);
    expect(sortedTitles).toEqual([
      'Attend Review',     // priority 4
      'Do Homework',       // priority 3
      'Submit Quiz',       // priority 2
      'Prepare Project',   // priority 1
    ]);
  });
});