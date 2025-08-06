import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import AssignmentList from '../../components/AssignmentList';

// Mock FileUploader since it's imported from a different module
jest.mock('../../components/course/FileUploader', () => () => (
  <div data-testid="file-uploader">Mock FileUploader</div>
));

// Helper to get the currently open modal by class name
const getModal = () => {
  return document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50.flex.items-center.justify-center');
};

describe('AssignmentList', () => {
  const mockAssignments = [
    {
      id: 1,
      title: 'Assignment 1',
      instructions: 'Read chapters 1-3 and submit a summary.',
    },
    {
      id: 2,
      title: 'Assignment 2',
      instructions: 'Complete the coding exercise on arrays.',
    },
  ];

  test('renders assignment titles', () => {
    render(<AssignmentList assignments={mockAssignments} />);

    expect(screen.getByText('Assignments')).toBeInTheDocument();
    expect(screen.getByText('Assignment 1')).toBeInTheDocument();
    expect(screen.getByText('Assignment 2')).toBeInTheDocument();
  });

  test('opens and displays selected assignment details', () => {
    render(<AssignmentList assignments={mockAssignments} />);

    fireEvent.click(screen.getByText('Assignment 1'));

    const modal = getModal();
    expect(modal).not.toBeNull();

    const withinModal = within(modal);
    expect(withinModal.getByText('Assignment 1')).toBeInTheDocument();
    expect(withinModal.getByText('Read chapters 1-3 and submit a summary.')).toBeInTheDocument();
    expect(withinModal.getByTestId('file-uploader')).toBeInTheDocument();
    expect(withinModal.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('closes the modal when Close button is clicked', () => {
    render(<AssignmentList assignments={mockAssignments} />);

    fireEvent.click(screen.getByText('Assignment 2'));

    const modal = getModal();
    expect(modal).not.toBeNull();

    const closeButton = within(modal).getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Modal content should no longer be visible
    expect(screen.queryByText('Complete the coding exercise on arrays.')).not.toBeInTheDocument();
  });
});