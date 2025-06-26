import { render, screen, fireEvent } from '@testing-library/react'
import Calendar from '../Calendar'

// Mock current date to March 30, 2025
beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date('2025-03-30T00:00:00'))
})

afterAll(() => {
  jest.useRealTimers()
})

describe('Calendar Component', () => {
  test('renders calendar component and default view', () => {
    render(<Calendar />)

    // Check for header showing the current date (should show "March 30")
    expect(screen.getByText(/March 30/)).toBeInTheDocument()

    // Check that tasks for today are displayed
    expect(screen.getByText(/Tasks for/i)).toBeInTheDocument()
    expect(screen.getByText(/Morning Standup/i)).toBeInTheDocument()
    expect(screen.getByText(/Code Review/i)).toBeInTheDocument()
  })

  test('navigates to next and previous weeks', () => {
    render(<Calendar />)

    const nextBtn = screen.getByTitle('Next')
    const prevBtn = screen.getByTitle('Previous')

    // Click next week
    fireEvent.click(nextBtn)
    expect(screen.getByText(/April 6|April 7|April 8/i)).toBeInTheDocument()

    // Click previous week (back to March 30)
    fireEvent.click(prevBtn)
    expect(screen.getByText(/March 30/)).toBeInTheDocument()
  })

  test('displays default task when no rules match', () => {
  render(<Calendar />)

  // Switch to month view to see a wider range of dates
  const monthBtn = screen.getByRole('button', { name: /month/i })
  fireEvent.click(monthBtn)

  // Navigate to a month ahead to avoid today’s tasks
  const nextBtn = screen.getByTitle('Next')
  fireEvent.click(nextBtn)
  fireEvent.click(nextBtn)

  // Pick a safe day (e.g., 29 is not %3 or %5)
  const span = screen
    .getAllByText((content, element) =>
      element?.tagName.toLowerCase() === 'span' &&
      content.trim() === '29'
    )
    .find(el => el.closest('div'))

  // Assert the day element was found
  expect(span).toBeDefined()

  // Click the parent day container
  fireEvent.click(span.closest('div'))

  // Expect the fallback task to render
  expect(screen.getByText(/Add Your First Task/i)).toBeInTheDocument()
})

  test('clicks a day to select it and view tasks', () => {
  render(<Calendar />)

  // Find any span inside a day cell that contains a number (date)
  const days = screen.getAllByText((content, el) => {
    const tag = el.tagName.toLowerCase()
    const isSpan = tag === 'span'
    const isNumber = !isNaN(Number(content))
    return isSpan && isNumber
  })

  // Choose the first valid day element
  const target = days[0]
  fireEvent.click(target.closest('div')) // Click its parent day cell

  // Check if the tasks section updates accordingly
  expect(screen.getByText(/Tasks for/)).toBeInTheDocument()
})

  test('toggles between week and month views', () => {
  render(<Calendar />)

  const weekBtn = screen.getByText('Week')
  const monthBtn = screen.getByText('Month')

  // Switch to month view
  fireEvent.click(monthBtn)

  // Find weekday headers specifically using their unique class
  const headers = screen.getAllByText((content, element) => {
    const tag = element.tagName.toLowerCase()
    const classNames = element.className
    const isHeader = /text-xs/.test(classNames) && tag === 'div'
    return isHeader && ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].includes(content)
  })

  expect(headers).toHaveLength(7)

  // Switch back to week view
  fireEvent.click(weekBtn)
  expect(screen.getByText(/March 30/)).toBeInTheDocument()
})

  test("highlights today's date correctly", () => {
    render(<Calendar />)

    // The current day (March 30) should have a background class for today highlight
    const today = screen.getAllByText((content, el) =>
      el.tagName.toLowerCase() === 'span' &&
      content === '30'
    )[0]

    const container = today.closest('div')

    expect(container.className).toMatch(/bg-blue-100|bg-primary/)
  })
})