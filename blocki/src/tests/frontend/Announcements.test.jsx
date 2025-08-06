import React from 'react';
import { render, screen } from '@testing-library/react';
import Announcements from '../../components/Announcements';

describe('Announcements component', () => {
  const mockAnnouncements = [
    {
      id: 1,
      title: 'Welcome!',
      content: 'This is your first announcement.',
      date: '2025-08-06',
    },
    {
      id: 2,
      title: 'New Feature Released',
      content: 'Check out the new calendar integration.',
      date: '2025-08-05',
    },
  ];

  test('renders the title', () => {
    render(<Announcements announcements={mockAnnouncements} />);
    expect(screen.getByText('Announcements')).toBeInTheDocument();
  });

  test('renders a list of announcements', () => {
    render(<Announcements announcements={mockAnnouncements} />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('This is your first announcement.')).toBeInTheDocument();
    expect(screen.getByText('2025-08-06')).toBeInTheDocument();

    expect(screen.getByText('New Feature Released')).toBeInTheDocument();
    expect(screen.getByText('Check out the new calendar integration.')).toBeInTheDocument();
    expect(screen.getByText('2025-08-05')).toBeInTheDocument();
  });

  test('renders no list items if announcements array is empty', () => {
    render(<Announcements announcements={[]} />);
    expect(screen.getByText('Announcements')).toBeInTheDocument();
    const items = screen.queryAllByRole('listitem');
    expect(items.length).toBe(0);
  });
});