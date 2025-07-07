import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock next/navigation to prevent "expected app router to be mounted" error
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock all heavy child components so we isolate the dashboard rendering
jest.mock('../../components/Header', () => ({ isEditMode, setIsEditMode, onSaveLayout }) => (
  <div>Mocked Header</div>
));

jest.mock('../../components/Sidebar', () => () => (
  <div>Mocked Sidebar</div>
));

jest.mock('../../components/MainContent', () => ({ isEditMode, setIsEditMode }) => (
  <div>Mocked MainContent</div>
));

// Import the page under test
import UpdatedDashboardPage from '../../pages/DashboardPage';

describe('UpdatedDashboardPage', () => {
  it('renders the dashboard layout with header, sidebar, and main content', () => {
    render(<UpdatedDashboardPage />);

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Mocked MainContent')).toBeInTheDocument();
  });
});