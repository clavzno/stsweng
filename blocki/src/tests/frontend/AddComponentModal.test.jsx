import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddComponentModal from '../../components/AddComponentModal';

describe('AddComponentModal', () => {
  const onCloseMock = jest.fn();
  const onAddComponentMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when isOpen is false', () => {
    render(
      <AddComponentModal
        isOpen={false}
        onClose={onCloseMock}
        onAddComponent={onAddComponentMock}
      />
    );

    expect(screen.queryByText(/Add a Component/i)).not.toBeInTheDocument();
  });

  test('renders component options when isOpen is true', () => {
    render(
      <AddComponentModal
        isOpen={true}
        onClose={onCloseMock}
        onAddComponent={onAddComponentMock}
      />
    );

    // Title should be present
    expect(screen.getByText(/Add a Component/i)).toBeInTheDocument();

    // Component cards should be visible
    expect(screen.getByText(/Courses List/i)).toBeInTheDocument();
    expect(screen.getByText(/Calendar/i)).toBeInTheDocument();
    expect(screen.getByText(/Study Tracker/i)).toBeInTheDocument();
    expect(screen.getByText(/Pomodoro Timer/i)).toBeInTheDocument();
  });

  test('calls onAddComponent when a component is clicked', () => {
    render(
      <AddComponentModal
        isOpen={true}
        onClose={onCloseMock}
        onAddComponent={onAddComponentMock}
      />
    );

    fireEvent.click(screen.getByText(/Courses List/i));
    expect(onAddComponentMock).toHaveBeenCalledWith('courses');

    fireEvent.click(screen.getByText(/Calendar/i));
    expect(onAddComponentMock).toHaveBeenCalledWith('calendar');

    fireEvent.click(screen.getByText(/Study Tracker/i));
    expect(onAddComponentMock).toHaveBeenCalledWith('tracker');

    fireEvent.click(screen.getByText(/Pomodoro Timer/i));
    expect(onAddComponentMock).toHaveBeenCalledWith('pomodoro');
  });

  test('calls onClose when the Cancel button is clicked', () => {
    render(
      <AddComponentModal
        isOpen={true}
        onClose={onCloseMock}
        onAddComponent={onAddComponentMock}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('calls onClose when the top right close button is clicked', () => {
    render(
      <AddComponentModal
        isOpen={true}
        onClose={onCloseMock}
        onAddComponent={onAddComponentMock}
      />
    );

    const closeButtons = screen.getAllByRole('button');
    const topCloseBtn = closeButtons.find(btn =>
      btn.innerHTML.includes('M19 6.41L17.59 5') // Matches the close icon SVG path
    );

    fireEvent.click(topCloseBtn);
    expect(onCloseMock).toHaveBeenCalled();
  });
});