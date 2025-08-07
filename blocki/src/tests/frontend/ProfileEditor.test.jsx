import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileEditor from '../../components/ProfileEditor'; // Adjust path as needed

describe('ProfileEditor', () => {
  test('renders header, textarea, and button', () => {
    render(<ProfileEditor />);
    
    // Check for heading
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    
    // Check for textarea
    const textarea = screen.getByPlaceholderText('Write something about yourself...');
    expect(textarea).toBeInTheDocument();

    // Check for button
    const button = screen.getByRole('button', { name: /update bio/i });
    expect(button).toBeInTheDocument();
  });

  test('allows typing into the textarea', () => {
    render(<ProfileEditor />);

    const textarea = screen.getByPlaceholderText('Write something about yourself...');
    fireEvent.change(textarea, { target: { value: 'Hello, I am Ryan!' } });

    expect(textarea.value).toBe('Hello, I am Ryan!');
  });
});