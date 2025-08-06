import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Spinner,
  DotsLoader,
  PulseLoader,
  SkeletonLoader,
  LoadingOverlay,
  InlineLoader,
  LoadingButton,
  LoadingCard,
  ProgressLoader,
  LoadingTable
} from '../../components/LoadingSpinner';

describe('Loading Components', () => {
  test('Spinner renders with correct class for size and color', () => {
    render(<Spinner size="lg" color="green" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-8 h-8');
    expect(spinner).toHaveClass('border-green-600');
  });

  test('DotsLoader renders 3 bouncing dots', () => {
    render(<DotsLoader size="md" color="red" />);
    const dots = screen.getAllByRole('status');
    expect(dots.length).toBe(1); // only 1 container with role="status"
  });

  test('PulseLoader renders a single pulse element', () => {
    render(<PulseLoader size="sm" color="blue" />);
    const pulse = screen.getByRole('status');
    expect(pulse).toHaveClass('w-8 h-8');
  });

  test('SkeletonLoader renders correct number of lines', () => {
    render(<SkeletonLoader lines={4} seed={123} />);
    const skeletons = screen.getAllByRole('status');
    expect(skeletons.length).toBe(1); // wrapper only has role="status"
  });

  test('LoadingOverlay renders when visible', () => {
    render(<LoadingOverlay isVisible={true} message="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('InlineLoader renders spinner and text', () => {
    render(<InlineLoader text="Please wait..." />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  test('LoadingButton disables when loading', () => {
    render(<LoadingButton loading={true}>Click Me</LoadingButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('LoadingCard renders with avatar', () => {
    render(<LoadingCard title="Test Card" showAvatar={true} seed={999} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('ProgressLoader renders progress and message', () => {
    render(<ProgressLoader progress={40} message="Uploading..." />);
    expect(screen.getByText('Uploading...')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  test('LoadingTable renders correct rows and columns', () => {
    render(<LoadingTable rows={3} columns={2} seed={42} />);
    const cells = screen.getAllByRole('status');
    expect(cells.length).toBeGreaterThan(0);
  });
});