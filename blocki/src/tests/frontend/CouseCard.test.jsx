// CourseCard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseCard from '../../components/CourseCard';
import '@testing-library/jest-dom';

const mockCourse = {
  id: 'course-123',
  title: 'Intro to AI',
  instructor: 'Dr. Smith',
  grade: '3.7',
  description: 'An introduction to artificial intelligence.',
  imageUrl: '',
  assignments: [
    { id: 1, title: 'Assignment 1', completed: true, due: '2025-09-01' },
    { id: 2, title: 'Assignment 2', completed: false, due: '2025-09-08' },
    { id: 3, title: 'Assignment 3', completed: false, due: '2025-09-15' },
  ],
  customization: {
    imageOverlay: 'rgba(13, 18, 44, 0.5)',
    accentColor: '#526CF4',
    theme: 'default',
  },
};

describe('CourseCard', () => {
  it('renders course title and instructor', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('Intro to AI')).toBeInTheDocument();
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
  });

  it('displays grade badge if showGrades is true', () => {
    render(<CourseCard course={mockCourse} showGrades={true} />);
    expect(screen.getByText('3.7')).toBeInTheDocument();
  });

  it('does not display grade badge if showGrades is false', () => {
    render(<CourseCard course={mockCourse} showGrades={false} />);
    expect(screen.queryByText('3.7')).not.toBeInTheDocument();
  });

  it('shows only first 2 assignments by default', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('Assignment 1')).toBeInTheDocument();
    expect(screen.getByText('Assignment 2')).toBeInTheDocument();
    expect(screen.queryByText('Assignment 3')).not.toBeInTheDocument();
  });

  it('shows all assignments when "+more" is clicked', () => {
    render(<CourseCard course={mockCourse} />);
    fireEvent.click(screen.getByText('+1 more'));
    expect(screen.getByText('Assignment 3')).toBeInTheDocument();
  });

  it('triggers customization UI in edit mode', () => {
    render(<CourseCard course={mockCourse} isEditMode={true} />);
    const button = screen.getByRole('button', { name: '' }); // Palette icon button
    fireEvent.click(button);
    expect(screen.getByText(/customize/i)).toBeInTheDocument();
  });
});