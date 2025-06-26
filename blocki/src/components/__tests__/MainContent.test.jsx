// These mocks replace real subcomponents with simplified versions that render static text.
// This allows us to isolate and test the logic inside <MainContent /> without side effects or dependencies.
jest.mock('../CoursesList', () => () => <div>CoursesList</div>)
jest.mock('../Calendar', () => () => <div>Calendar</div>)
jest.mock('../StudyTracker', () => () => <div>StudyTracker</div>)
jest.mock('../Pomodoro', () => () => <div>Pomodoro</div>)

// Mock the AddComponentModal to simulate adding and closing components without a UI library
jest.mock('../AddComponentModal', () => ({ isOpen, onClose, onAddComponent }) =>
  isOpen ? (
    <div data-testid="add-modal">
      AddComponentModal
      <button onClick={() => onAddComponent('calendar')}>Add Calendar</button>
      <button onClick={() => onAddComponent('courses')}>Add Courses</button>
      <button onClick={onClose}>Close Modal</button>
    </div>
  ) : null
)

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MainContent from '../MainContent'

// Spies for localStorage methods to verify that MainContent correctly saves layout state
const getItemMock = jest.fn(() => null)
const setItemMock = jest.fn()

// Mock localStorage and matchMedia globally before tests run
beforeAll(() => {
  // Simulate browser localStorage for reading/saving layout data
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: getItemMock,
      setItem: setItemMock
    },
    writable: true
  })

  // Simulate window.matchMedia (used in Sidebar, but safe to keep here if MainContent ever uses it)
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
  })
})

// Clear mock histories before each test to ensure isolated assertions
beforeEach(() => {
  getItemMock.mockClear()
  setItemMock.mockClear()
})

test('renders welcome message and date', () => {
  render(<MainContent />)

  // Check for greeting and hardcoded date
  expect(screen.getByText(/Hello, Almira Velasquez/i)).toBeInTheDocument()
  expect(screen.getByText(/Today is March 30, 2025/i)).toBeInTheDocument()
})

test('renders "Get Productive" empty state when no layout exists', () => {
  render(<MainContent />)

  // This element is shown only when layout is empty
  expect(screen.getByText(/Get Productive/i)).toBeInTheDocument()
})

test('opens the modal when clicking the floating add button', () => {
  render(<MainContent />)

  // Find the circular add button (with plus icon inside) and click it
  const addButton = screen.getAllByRole('button').find(btn =>
    btn.innerHTML.includes('svg')
  )
  fireEvent.click(addButton)

  // Modal should now be rendered in the DOM
  expect(screen.getByTestId('add-modal')).toBeInTheDocument()
})

test('closes the modal when clicking "Close Modal" button', () => {
  render(<MainContent />)

  // Open the modal first
  fireEvent.click(screen.getAllByRole('button').find(btn =>
    btn.innerHTML.includes('svg')
  ))

  // Click the simulated "Close Modal" button inside the mocked modal
  fireEvent.click(screen.getByText(/Close Modal/i))

  // Modal should no longer be present
  expect(screen.queryByTestId('add-modal')).not.toBeInTheDocument()
})

test('adds a calendar component when selected from modal', async () => {
  render(<MainContent />)

  // Open modal
  fireEvent.click(screen.getAllByRole('button').find(btn =>
    btn.innerHTML.includes('svg')
  ))

  // Click to add calendar
  fireEvent.click(screen.getByText(/Add Calendar/i))

  // Calendar component should appear in layout
  expect(await screen.findByText('Calendar')).toBeInTheDocument()
})

test('adds multiple components and persists layout', async () => {
  render(<MainContent />)

  // Add Courses
  fireEvent.click(screen.getAllByRole('button').find(btn =>
    btn.innerHTML.includes('svg')
  ))
  fireEvent.click(screen.getByText(/Add Courses/i))

  // Add Calendar
  fireEvent.click(screen.getAllByRole('button').find(btn =>
    btn.innerHTML.includes('svg')
  ))
  fireEvent.click(screen.getByText(/Add Calendar/i))

  // Verify both components render
  expect(screen.getByText('CoursesList')).toBeInTheDocument()
  expect(screen.getByText('Calendar')).toBeInTheDocument()

  // Verify localStorage was updated for both components
  await waitFor(() => {
    expect(setItemMock).toHaveBeenCalledWith(
      'dashboardLayout',
      expect.stringContaining('"i":"courses"')
    )
    expect(setItemMock).toHaveBeenCalledWith(
      'dashboardLayout',
      expect.stringContaining('"i":"calendar"')
    )
  })
})

test('toggles edit mode on and off', () => {
  render(<MainContent />)

  // Click "Edit Layout" to enter edit mode
  const toggleBtn = screen.getByText(/Edit Layout/i)
  fireEvent.click(toggleBtn)

  // Button should now say "Done"
  expect(screen.getByText(/Done/i)).toBeInTheDocument()

  // Click "Done" to exit edit mode
  fireEvent.click(screen.getByText(/Done/i))

  // Button should revert to "Edit Layout"
  expect(screen.getByText(/Edit Layout/i)).toBeInTheDocument()
})

test('removes a component in edit mode', async () => {
  render(<MainContent />)

  // Add a calendar component first
  fireEvent.click(screen.getAllByRole('button').find(btn =>
    btn.innerHTML.includes('svg')
  ))
  fireEvent.click(screen.getByText(/Add Calendar/i))

  expect(screen.getByText('Calendar')).toBeInTheDocument()

  // Enter edit mode so remove (×) buttons appear
  fireEvent.click(screen.getByText(/Edit Layout/i))

  // Locate and click the remove (×) button rendered inside the component
  const removeBtn = screen.getByRole('button', { name: /×/ })
  fireEvent.click(removeBtn)

  // Calendar component should now be removed from the layout
  await waitFor(() => {
    expect(screen.queryByText('Calendar')).not.toBeInTheDocument()
  })
})