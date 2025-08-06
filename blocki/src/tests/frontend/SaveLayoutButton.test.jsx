import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SaveLayoutButton from '../../components/SaveLayoutButton';

describe('SaveLayoutButton', () => {
  it('renders the button with correct text', () => {
    render(<SaveLayoutButton onSave={() => {}} />);
    const button = screen.getByTestId('save-layout-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('💾 Save Layout');
  });

  it('calls onSave when clicked', () => {
    const mockOnSave = jest.fn();
    render(<SaveLayoutButton onSave={mockOnSave} />);
    fireEvent.click(screen.getByTestId('save-layout-button'));
    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });
});