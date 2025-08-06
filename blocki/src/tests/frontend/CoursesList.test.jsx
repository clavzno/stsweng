import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoursesList from '../../components/CoursesList';

// Mock ResizeObserver if using @testing-library/react
beforeEach(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('CoursesList Component', () => {
  it('renders the header and courses', () => {
    render(<CoursesList />);
    expect(screen.getByText('My Courses')).toBeInTheDocument();
    expect(screen.getByText('STSWENG SS1')).toBeInTheDocument();
    expect(screen.getByText('STCLOUD S14')).toBeInTheDocument();
  });

  it('toggles edit mode when clicking the Edit Courses button', () => {
    render(<CoursesList />);
    const editButton = screen.getByRole('button', { name: /Edit Courses/i });
    fireEvent.click(editButton);
    expect(screen.getByText('Finish Editing')).toBeInTheDocument();
  });

  it('shows the theme modal when clicking Themes', () => {
    render(<CoursesList />);
    const editButton = screen.getByRole('button', { name: /Edit Courses/i });
    fireEvent.click(editButton);

    const themeButton = screen.getByRole('button', { name: /Themes/i });
    fireEvent.click(themeButton);

    expect(screen.getByText('Choose Theme')).toBeInTheDocument();
  });

  it('applies a selected theme to all courses', () => {
    render(<CoursesList />);
    const editButton = screen.getByRole('button', { name: /Edit Courses/i });
    fireEvent.click(editButton);

    const themeButton = screen.getByRole('button', { name: /Themes/i });
    fireEvent.click(themeButton);

    const energeticButton = screen.getByRole('button', { name: /Energetic/i });
    fireEvent.click(energeticButton);

    expect(screen.queryByText('Choose Theme')).not.toBeInTheDocument();
  });

  it('can toggle Show Grades and Show Assignments checkboxes', () => {
    render(<CoursesList />);
    const editButton = screen.getByRole('button', { name: /Edit Courses/i });
    fireEvent.click(editButton);

    const gradesCheckbox = screen.getByLabelText('Show Grades');
    const assignmentsCheckbox = screen.getByLabelText('Show Assignments');

    expect(gradesCheckbox).toBeChecked();
    expect(assignmentsCheckbox).toBeChecked();

    fireEvent.click(gradesCheckbox);
    fireEvent.click(assignmentsCheckbox);

    expect(gradesCheckbox).not.toBeChecked();
    expect(assignmentsCheckbox).not.toBeChecked();
  });
});