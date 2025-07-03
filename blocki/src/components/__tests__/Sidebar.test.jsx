// Create a mock function for logout, so we can track if it's called during the test
const logoutMock = jest.fn()

// Mock the useAuth hook provided by the AuthContext module
// This ensures that Sidebar can use `useAuth()` without needing a real provider
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    logout: logoutMock // Provide our custom mock logout function
  })
}))

// Mock all imported image assets used in the Sidebar component
// Without these, Jest would throw an error because it doesn't handle static files like Webpack
jest.mock('../../assets/images/logo_single.png', () => ({ src: 'logo_single.png' }))
jest.mock('../../assets/images/logo_full.png', () => ({ src: 'logo_full.png' }))
jest.mock('../../assets/images/logo_full_light.png', () => ({ src: 'logo_full_light.png' }))
jest.mock('../../assets/images/profilepic.png', () => ({ src: 'profilepic.png' }))

// Import required utilities and the component under test
import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from '../Sidebar'

// Before any tests run, define a mock implementation for `window.matchMedia`
// This is needed because `matchMedia` is used inside the Sidebar's useEffect to detect dark mode preference
// Jest runs in a Node environment where `window.matchMedia` doesn't exist, so we simulate it here
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false, // Simulate system preferring light mode by default
      media: '',
      onchange: null,
      addListener: jest.fn(), // Stub listener methods for compatibility
      removeListener: jest.fn()
    }))
  })
})

// Before each test, reset mocks and define a fresh localStorage mock
// This prevents tests from affecting each other through shared state
beforeEach(() => {
  // Mock localStorage with spyable getItem and setItem methods
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null), // Simulate no saved theme in localStorage
      setItem: jest.fn()            // Spy on setItem to verify theme saving
    },
    writable: true
  })

  // Clear previous call history for logoutMock to ensure accurate test results
  logoutMock.mockClear()
})

// Test 1: Basic rendering of the Sidebar component
test('renders Sidebar component UI', () => {
  render(<Sidebar />)

  // Check that the small icon logo is present (collapsed sidebar state)
  expect(screen.getByAltText('blocki icon')).toBeInTheDocument()

  // Check that all key navigation links exist
  expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
  expect(screen.getByText(/courses/i)).toBeInTheDocument()
  expect(screen.getByText(/announcements/i)).toBeInTheDocument()

  // Check that user profile name and email are displayed
  expect(screen.getByText(/aza velasquez/i)).toBeInTheDocument()
  expect(screen.getByText(/almira_velasquez@dlsu.edu.ph/i)).toBeInTheDocument()
})

// Test 2: Clicking the theme toggle button updates localStorage to "dark"
test('toggles dark mode and updates localStorage', () => {
  render(<Sidebar />)

  // Find the theme toggle button by its tooltip title
  const toggleButton = screen.getByTitle(/switch to dark mode/i)

  // Simulate clicking the toggle button
  fireEvent.click(toggleButton)

  // Expect localStorage.setItem to be called with key "theme" and value "dark"
  expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
})

// Test 3: Clicking the logout button triggers the mock logout function
test('calls logout when logout button is clicked', () => {
  render(<Sidebar />)

  // Find the logout button by its tooltip title
  const logoutButton = screen.getByTitle(/logout/i)

  // Simulate clicking the logout button
  fireEvent.click(logoutButton)

  // Verify that our mocked logout function was called
  expect(logoutMock).toHaveBeenCalled()
})