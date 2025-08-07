// src/tests/frontend/GroupPicker.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GroupPicker from '../../components/GroupPicker';

describe('GroupPicker', () => {
  const groups = ['Admin', 'Manager', 'Customer'];
  const onSelectMock = jest.fn();

  beforeEach(() => {
    render(<GroupPicker groups={groups} onSelect={onSelectMock} />);
  });

  it('renders the label', () => {
    expect(screen.getByText('Select Group:')).toBeInTheDocument();
  });

  it('renders all group options', () => {
    groups.forEach(group => {
      expect(screen.getByText(group)).toBeInTheDocument();
    });
  });

  it('calls onSelect when an option is selected', () => {
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Manager' } });

    expect(onSelectMock).toHaveBeenCalledWith('Manager');
  });
});