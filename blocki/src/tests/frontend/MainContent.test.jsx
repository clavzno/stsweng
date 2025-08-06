import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainContent from '../../components/MainContent';

// Mocks for subcomponents used in MainContent
jest.mock('../../components/CoursesList', () => () => <div>CoursesList</div>);
jest.mock('../../components/Calendar', () => () => <div>Calendar</div>);
jest.mock('../../components/StudyTracker', () => () => <div>StudyTracker</div>);
jest.mock('../../components/Pomodoro', () => () => <div>Pomodoro</div>);

// Mock AddComponentModal to simulate adding and closing components
jest.mock('../../components/AddComponentModal', () => ({ isOpen, onClose, onAddComponent }) =>
  isOpen ? (
    <div data-testid="add-modal">
      <button onClick={() => onAddComponent('calendar')}>Add Calendar</button>
      <button onClick={() => onAddComponent('courses')}>Add Courses</button>
      <button onClick={onClose}>Close Modal</button>
    </div>
  ) : null
);

// Mocks for localStorage behavior
const getItemMock = jest.fn(() => null);
const setItemMock = jest.fn();

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: getItemMock,
      setItem: setItemMock,
    },
    writable: true,
  });

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });
});

beforeEach(() => {
  getItemMock.mockClear();
  setItemMock.mockClear();
});

// Helper to render <MainContent /> with working state
function renderWithProps() {
  const Wrapper = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    return (
      <MainContent isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
    );
  };
  return render(<Wrapper />);
}

test('renders welcome message with name and date', () => {
  renderWithProps();
  expect(screen.getByText(/Hi, Almira Velasquez/i)).toBeInTheDocument();
  expect(screen.getByText(/Today is/i)).toBeInTheDocument();
});

test('shows empty state when layout is empty', () => {
  renderWithProps();
  expect(
    screen.getByText(/Let's get productive! Click the \+ button/i)
  ).toBeInTheDocument();
});

test('opens modal when floating + button is clicked', () => {
  renderWithProps();
  const addButton = screen.getAllByRole('button').find(btn =>
    btn.innerHTML.includes('svg')
  );
  fireEvent.click(addButton);
  expect(screen.getByTestId('add-modal')).toBeInTheDocument();
});

test('adds calendar component from modal', async () => {
  renderWithProps();
  const addButton = screen.getAllByRole('button').find(btn =>
    btn.innerHTML.includes('svg')
  );
  fireEvent.click(addButton);
  fireEvent.click(screen.getByText(/Add Calendar/i));
  expect(await screen.findByText('Calendar')).toBeInTheDocument();
});

test('adds multiple components and updates localStorage', async () => {
  renderWithProps();

  const addButton = screen.getAllByRole('button').find(btn =>
    btn.innerHTML.includes('svg')
  );

  // Add Courses
  fireEvent.click(addButton);
  fireEvent.click(screen.getByText(/Add Courses/i));

  // Add Calendar
  fireEvent.click(addButton);
  fireEvent.click(screen.getByText(/Add Calendar/i));

  expect(await screen.findByText('CoursesList')).toBeInTheDocument();
  expect(await screen.findByText('Calendar')).toBeInTheDocument();

  await waitFor(() => {
    expect(setItemMock).toHaveBeenCalled();
  });
});

test('closes modal when "Close Modal" is clicked', () => {
  renderWithProps();
  const addButton = screen.getAllByRole('button').find(btn =>
    btn.innerHTML.includes('svg')
  );
  fireEvent.click(addButton);
  fireEvent.click(screen.getByText(/Close Modal/i));
  expect(screen.queryByTestId('add-modal')).not.toBeInTheDocument();
});