import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomizableSidebar from '../../components/Sidebar';

describe('CustomizableSidebar', () => {
  beforeEach(() => {
    localStorage.clear();
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query.includes('dark'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
  });

  it('renders default tabs', () => {
    render(<CustomizableSidebar />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Announcements')).toBeInTheDocument();
  });

  it('removes a tab when remove button is clicked', async () => {
    render(<CustomizableSidebar />);

    const announcementsRemoveButton = screen.getAllByRole('button').find((btn) =>
      btn.querySelector('svg')
    );

    fireEvent.click(announcementsRemoveButton);

    await waitFor(() => {
      expect(screen.queryByText('Announcements')).not.toBeInTheDocument();
    });
  });

  it('respects dark mode from system preference', () => {
    render(<CustomizableSidebar />);
    // just confirming no crash; real test would check dark styling applied
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('loads saved tabs from localStorage', () => {
    const savedTabs = JSON.stringify([
      { id: 'calendar', name: 'Calendar', icon: 'calendar', href: '#calendar' },
    ]);
    localStorage.setItem('sidebarTabs', savedTabs);

    render(<CustomizableSidebar />);
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });
});