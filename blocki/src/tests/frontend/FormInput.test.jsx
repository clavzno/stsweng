// src/tests/frontend/FormInput.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from '../../components/FormInput';

describe('FormInput', () => {
  const defaultProps = {
    id: 'username',
    label: 'Username',
    value: '',
    onChange: jest.fn(),
  };

  it('renders the input and label correctly', () => {
    render(<FormInput {...defaultProps} />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders with provided placeholder', () => {
    render(<FormInput {...defaultProps} placeholder="Enter username" />);
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('supports different input types', () => {
    render(<FormInput {...defaultProps} type="email" />);
    expect(screen.getByLabelText('Username')).toHaveAttribute('type', 'email');
  });

  it('applies custom styles', () => {
    const style = { backgroundColor: 'rgb(255, 0, 0)' };
    render(<FormInput {...defaultProps} style={style} />);
    expect(screen.getByLabelText('Username')).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('applies additional class names', () => {
    render(<FormInput {...defaultProps} className="custom-class" />);
    expect(screen.getByLabelText('Username').className).toMatch(/custom-class/);
  });

  it('calls onChange handler when value changes', () => {
    render(<FormInput {...defaultProps} />);
    const input = screen.getByLabelText('Username');
    fireEvent.change(input, { target: { value: 'newuser' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });
});