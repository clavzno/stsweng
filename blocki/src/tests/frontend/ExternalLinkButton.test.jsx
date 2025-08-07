import React from 'react';
import { render, screen } from '@testing-library/react';
import ExternalLinkButton from '../../components/ExternalLinkButton';

describe('ExternalLinkButton', () => {
  it('renders the button with the correct label', () => {
    render(<ExternalLinkButton href="https://example.com" label="Visit Site" />);
    expect(screen.getByText('Visit Site')).toBeInTheDocument();
  });

  it('has the correct href and target attributes', () => {
    render(<ExternalLinkButton href="https://example.com" label="Visit Site" />);
    const link = screen.getByRole('link', { name: /visit site/i });

    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has the correct styling classes', () => {
    render(<ExternalLinkButton href="#" label="Test Button" />);
    const link = screen.getByText('Test Button');

    expect(link).toHaveClass('inline-block');
    expect(link).toHaveClass('bg-secondary');
    expect(link).toHaveClass('text-white');
    expect(link).toHaveClass('px-4');
    expect(link).toHaveClass('py-2');
    expect(link).toHaveClass('rounded');
    expect(link).toHaveClass('hover:bg-orange-600');
  });
});