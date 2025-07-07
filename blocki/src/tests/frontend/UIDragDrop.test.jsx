import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardLayout from '../../components/DashboardLayout'; // CHANGE IF NEEDED

// Mock react-grid-layout's drag behavior if needed
jest.mock('react-grid-layout', () => {
  const Original = jest.requireActual('react-grid-layout');
  return {
    ...Original,
    Responsive: (props) => <div>{props.children}</div>,
    WidthProvider: (Comp) => Comp,
  };
});

describe('Dashboard drag-and-drop layout', () => {
  test('renders draggable components', () => {
    render(<DashboardLayout />);
    const widget1 = screen.getByTestId('widget-calendar');
    const widget2 = screen.getByTestId('widget-tasks');
    expect(widget1).toBeInTheDocument();
    expect(widget2).toBeInTheDocument();
  });

  test('allows rearranging components via drag and drop', async () => {
    render(<DashboardLayout />);
    const calendar = screen.getByTestId('widget-calendar');
    const tasks = screen.getByTestId('widget-tasks');

    // Simulate drag and drop (mocked logic; you can test grid position state if accessible)
    fireEvent.mouseDown(calendar);
    fireEvent.mouseMove(tasks);
    fireEvent.mouseUp(tasks);

    // If layout updates localStorage or state:
    expect(localStorage.getItem('dashboardLayout')).toBeTruthy(); // assuming layout is saved
  });
});