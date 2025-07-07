import { render, screen } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';

// Mock NextAuth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Optionally mock LoginButton if it’s complex
jest.mock('../../components/LoginButton', () => () => (
  <button>Sign in with Canvas</button>
));

test('renders LoginPage without crashing', () => {
  render(<LoginPage />);

  // Test main heading
  expect(screen.getByText(/Welcome to Blocki/i)).toBeInTheDocument();

  // Test CTA button
  expect(screen.getByText(/sign in with canvas/i)).toBeInTheDocument();
});