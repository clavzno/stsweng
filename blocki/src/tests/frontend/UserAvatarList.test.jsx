import React from 'react';
import { render, screen } from '@testing-library/react';
import UserAvatarList from '../../components/UserAvatarList';

describe('UserAvatarList Component', () => {
  const mockUsers = [
    { name: 'Alice', avatar: 'https://example.com/alice.jpg' },
    { name: 'Bob', avatar: 'https://example.com/bob.jpg' },
    { name: 'Charlie', avatar: 'https://example.com/charlie.jpg' },
  ];

  it('renders without crashing with no users', () => {
    render(<UserAvatarList users={[]} />);
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('renders all user avatars', () => {
    render(<UserAvatarList users={mockUsers} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockUsers.length);
  });

  it('renders correct src and alt attributes for each user', () => {
    render(<UserAvatarList users={mockUsers} />);
    mockUsers.forEach((user) => {
      const img = screen.getByAltText(user.name);
      expect(img).toHaveAttribute('src', user.avatar);
      expect(img).toHaveAttribute('alt', user.name);
      expect(img).toHaveAttribute('title', user.name);
    });
  });

  it('has the correct styling class for each avatar', () => {
    render(<UserAvatarList users={mockUsers} />);
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveClass('w-10', 'h-10', 'rounded-full', 'border-2', 'border-primary');
    });
  });
});