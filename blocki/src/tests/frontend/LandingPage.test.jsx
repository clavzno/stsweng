import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../../pages/LandingPage';

// Mock FormButton to render as a simple <button>
jest.mock('../../components/FormButton', () => (props) => {
  return <button {...props}>{props.children}</button>;
});

// Mock next/image to render as <img>
jest.mock('next/image', () => (props) => {
  return <img {...props} />;
});

describe('LandingPage', () => {
  test('renders without crashing', () => {
    render(<LandingPage />);
    expect(
      screen.getByText(/Take control of your productivity with blocki/i)
    ).toBeInTheDocument();
  });

  test('renders all Try Blocki Now buttons', () => {
    render(<LandingPage />);
    const buttons = screen.getAllByRole('button', { name: /try blocki now/i });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});