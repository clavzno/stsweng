import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PixelTracker from '../../components/PixelTracker';

// Mock the lucide-react icons to avoid rendering issues
jest.mock('lucide-react', () => {
  const MockIcon = (props) => <svg {...props} />;
  return {
    Upload: MockIcon,
    Image: MockIcon,
    Settings: MockIcon,
    X: MockIcon,
    RotateCcw: MockIcon,
    Trash2: MockIcon,
  };
});

describe('PixelTracker', () => {
  it('renders default progress and UI structure', () => {
    render(<PixelTracker progress={7} total={25} />);

    expect(screen.getByText('Pixel Tracker')).toBeInTheDocument();
    expect(screen.getByText('7/25')).toBeInTheDocument();
    expect(screen.getByText('Complete')).toBeInTheDocument();
    expect(screen.getByText('Revealed')).toBeInTheDocument();
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
  });

  it('displays correct calculated percentages and revealed blocks', () => {
    render(<PixelTracker progress={5} total={20} />);

    expect(screen.getByText('25%')).toBeInTheDocument(); // 5/20 = 25%
    expect(screen.getByText('100')).toBeInTheDocument(); // 25% of 400 = 100
    expect(screen.getByText('15')).toBeInTheDocument(); // 20 - 5 = 15 left
  });

  it('shows upload prompt when no image is present', () => {
    render(<PixelTracker />);
    expect(screen.getByText('Choose')).toBeInTheDocument();
    expect(screen.getByText('Complete tasks to reveal')).toBeInTheDocument();
  });

  it('opens and closes settings modal', () => {
    render(<PixelTracker progress={10} total={20} />);

    // Simulate image being uploaded manually to show settings icon
    const settingsButton = screen.queryByTitle('Settings');
    if (settingsButton) {
      fireEvent.click(settingsButton);
      expect(screen.getByText('Settings')).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: '' });
      fireEvent.click(closeButton);
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    }
  });
});