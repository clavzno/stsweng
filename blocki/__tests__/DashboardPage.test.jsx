import React from 'react';
import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/MainContent';

import { render, screen } from '@testing-library/react';

// mock Sidebar to avoid crashing
jest.mock('../../components/Sidebar', () => () => <div data-testid="sidebar">MockSidebar</div>);

import DashboardPage from '../DashboardPage';

test('renders DashboardPage without crashing', () => {
  render(<DashboardPage />);
});

export default function DashboardPage() {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-dark-bg">
      <Sidebar />
      <MainContent />
    </div>
  );
}
