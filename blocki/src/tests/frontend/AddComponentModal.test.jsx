import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddComponentModal from '../../components/AddComponentModal';

describe('AddComponentModal', () => {
  const mockOnClose = jest.fn();
  const mockOnAddComponent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when isOpen is false', () => {
    const { container } = render(
      <AddComponentModal isOpen={false} onClose={mockOnClose} onAddComponent={mockOnAddComponent} />
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders modal when isOpen is true', () => {
    render(
      <AddComponentModal isOpen={true} onClose={mockOnClose} onAddComponent={mockOnAddComponent} />
    );

    expect(screen.getByText('Add Component')).toBeInTheDocument();
    expect(screen.getByText('Courses List')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  test('calls onAddComponent when a component is clicked', () => {
    render(
      <AddComponentModal isOpen={true} onClose={mockOnClose} onAddComponent={mockOnAddComponent} />
    );

    fireEvent.click(screen.getByText('Courses List'));
    expect(mockOnAddComponent).toHaveBeenCalledWith('courses');
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <AddComponentModal isOpen={true} onClose={mockOnClose} onAddComponent={mockOnAddComponent} />
    );

    const closeButton = screen.getAllByRole('button').find(btn =>
      btn.innerHTML.includes('path') // crude check for SVG "X" icon
    );
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when Cancel button is clicked', () => {
    render(
      <AddComponentModal isOpen={true} onClose={mockOnClose} onAddComponent={mockOnAddComponent} />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});