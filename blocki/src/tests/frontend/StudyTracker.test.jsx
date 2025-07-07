import { render, screen } from '@testing-library/react';
import StudyTracker from '../../components/StudyTracker';

describe('StudyTracker Component', () => {
  test('renders the Study Tracker title', () => {
    render(<StudyTracker />);
    expect(screen.getByText(/Study Tracker/i)).toBeInTheDocument();
  });

  test('shows placeholder message', () => {
    render(<StudyTracker />);
    expect(screen.getByText(/Widget coming soon/i)).toBeInTheDocument();
  });
});