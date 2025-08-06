import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackPanel from '../../components/FeedbackPanel';

describe('FeedbackPanel', () => {
  it('renders the heading, textarea, and button', () => {
    render(<FeedbackPanel />);

    // Check heading
    expect(
      screen.getByRole('heading', { name: /feedback/i })
    ).toBeInTheDocument();

    // Check textarea
    expect(
      screen.getByPlaceholderText(/your feedback/i)
    ).toBeInTheDocument();

    // Check button
    expect(
      screen.getByRole('button', { name: /submit/i })
    ).toBeInTheDocument();
  });

  it('allows typing in the textarea', () => {
    render(<FeedbackPanel />);
    const textarea = screen.getByPlaceholderText(/your feedback/i);

    fireEvent.change(textarea, { target: { value: 'Great app!' } });
    expect(textarea.value).toBe('Great app!');
  });

  it('has correct styling classes', () => {
    render(<FeedbackPanel />);
    const button = screen.getByRole('button', { name: /submit/i });

    expect(button).toHaveClass('bg-green');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('hover:bg-green-600');
  });
});