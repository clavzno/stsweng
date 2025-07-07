import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PixelProgressTracker from '../../components/PixelProgressTracker'; // CHANGE IF NEEDED

describe('PixelProgressTracker Component', () => {
  const mockImageFile = new File(['dummy content'], 'image.png', { type: 'image/png' });

  test('renders the upload button', () => {
    render(<PixelProgressTracker />);
    expect(screen.getByRole('button', { name: /upload image/i })).toBeInTheDocument();
  });

  test('allows user to upload an image', async () => {
    render(<PixelProgressTracker />);
    const input = screen.getByLabelText(/choose image/i);
    fireEvent.change(input, { target: { files: [mockImageFile] } });

    const preview = await screen.findByAltText(/progress image/i);
    expect(preview).toBeInTheDocument();
  });

  test('reveals more pixels as progress increases', () => {
    render(<PixelProgressTracker initialProgress={0.3} />);
    const pixelatedCanvas = screen.getByTestId('pixel-canvas');
    expect(pixelatedCanvas).toHaveAttribute('data-progress', '0.3');
  });
});