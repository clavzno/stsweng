import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileSettings from '../../components/ProfileSettings';

describe('ProfileSettings', () => {
  it('renders the profile settings form', () => {
    render(<ProfileSettings />);

    expect(screen.getByText('Profile Settings')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByText('Save Settings')).toBeInTheDocument();
  });

  it('allows input in Full Name and Email fields', () => {
    render(<ProfileSettings />);

    const nameInput = screen.getByPlaceholderText('Full Name');
    const emailInput = screen.getByPlaceholderText('Email');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
  });
});