import React from 'react';
import { render, screen } from '@testing-library/react';
import StudyTracker from '../StudyTracker';

describe('StudyTracker Component', () => {
  test('renders the focus record title', () => {
    render(<StudyTracker />);
    expect(screen.getByText(/Focus Record/i)).toBeInTheDocument();
  });

  test('renders 7 focus record items', () => {
    render(<StudyTracker />);
    
    // There should be 7 day labels (03 to 09)
    const dayLabels = ['03', '04', '05', '06', '07', '08', '09'];
    dayLabels.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });

    // If needed: assert count of divs with height styles
    const bars = document.querySelectorAll('div[style*="height:"]');
    expect(bars.length).toBeGreaterThanOrEqual(7);
  });

  test('displays correct height for one known bar', () => {
    render(<StudyTracker />);
    
    // For example, 35 minutes → 58.33%
    const bar = screen.getByText('07').previousSibling.firstChild;
    expect(bar).toHaveStyle('height: 58.333333333333336%');
  });
});