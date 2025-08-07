import React from 'react';
import { render, screen } from '@testing-library/react';
import Groups from '../../components/Groups';

describe('Groups component', () => {
  const mockGroups = ['CS Study Buddies', 'Web Dev Circle', 'STSWENG Group 3'];

  it('renders a heading labeled "Groups"', () => {
    render(<Groups groups={mockGroups} />);
    expect(screen.getByRole('heading', { name: /groups/i })).toBeInTheDocument();
  });

  it('renders a list of groups passed via the "groups" prop', () => {
    render(<Groups groups={mockGroups} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockGroups.length);
  });

  it('displays each group name from the "groups" prop in the list', () => {
    render(<Groups groups={mockGroups} />);
    mockGroups.forEach(group => {
      expect(screen.getByText(group)).toBeInTheDocument();
    });
  });

  it('renders no group items when given an empty "groups" array', () => {
    render(<Groups groups={[]} />);
    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
  });

  it('renders without error when the "groups" prop is omitted', () => {
    render(<Groups />);
    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0); // Default to empty array
  });
});