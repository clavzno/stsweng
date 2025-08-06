import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UpdatedMainContent from '../../components/MainContent';

beforeAll(() => {
  window.alert = jest.fn(); // prevent jsdom error
});


// Mocks
jest.mock('../../components/CoursesList', () => () => <div>CoursesList</div>);
jest.mock('../../components/Calendar', () => () => <div>Calendar</div>);
jest.mock('../../components/StudyTracker', () => () => <div>StudyTracker</div>);
jest.mock('../../components/Pomodoro', () => () => <div>Pomodoro</div>);
jest.mock('../../components/PixelTracker', () => () => <div>PixelTracker</div>);
jest.mock('../../components/AddComponentModal', () => ({ isOpen, onClose, onAddComponent }) =>
  isOpen ? (
    <div data-testid="modal">
      <button onClick={() => onAddComponent('calendar')}>Add Calendar</button>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null
);
jest.mock('../../components/Settings', () => () => <div>Settings</div>);
jest.mock('../../components/SaveLayoutButton', () => ({ onSave }) => (
  <button onClick={onSave}>Save</button>
));

describe('UpdatedMainContent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders empty dashboard prompt', () => {
    render(<UpdatedMainContent isEditMode={false} setIsEditMode={() => {}} />);
    expect(screen.getByText('Start Building Your Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Add Your First Component')).toBeInTheDocument();
  });

  test('opens modal when add button is clicked', () => {
    render(<UpdatedMainContent isEditMode={false} setIsEditMode={() => {}} />);
    fireEvent.click(screen.getByText('Add Your First Component'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  test('adds component to layout from modal', () => {
    render(<UpdatedMainContent isEditMode={true} setIsEditMode={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    fireEvent.click(screen.getByText('Add Calendar'));
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  test('shows Settings and Save button in edit mode', () => {
    render(<UpdatedMainContent isEditMode={true} setIsEditMode={() => {}} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});