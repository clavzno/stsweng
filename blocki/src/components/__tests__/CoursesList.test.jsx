import React from 'react'
import { render, screen } from '@testing-library/react'
import CoursesList from '../CoursesList'

// Mock the placeholder image to prevent asset-related errors during testing
jest.mock('../../assets/images/placeholder.png', () => 'placeholder.png')

// Mock the CourseCard component to isolate CoursesList logic
jest.mock('../CourseCard', () => (props) => {
  const { course } = props
  return <div data-testid="course-card">{course.title}</div>
})

describe('CoursesList component', () => {
  test('renders a grid of course cards', () => {
    // Render the CoursesList component
    render(<CoursesList />)

    // Query all elements rendered as mocked CourseCard components
    const cards = screen.getAllByTestId('course-card')

    // Expect 7 course cards based on the hardcoded course array
    expect(cards).toHaveLength(7)
  })

  test('renders course titles in order', () => {
    render(<CoursesList />)

    // Verify that specific course titles appear in the document
    expect(screen.getByText('1243 STSWENG SS1')).toBeInTheDocument()
    expect(screen.getByText('1243 STCLOUD S14')).toBeInTheDocument()
    expect(screen.getByText('CSCI-ART S12')).toBeInTheDocument()
    expect(screen.getByText('BASPHYS S11')).toBeInTheDocument()
    expect(screen.getByText('WEBDEVT S15')).toBeInTheDocument()
    expect(screen.getByText('DATANLS S11')).toBeInTheDocument()
    expect(screen.getByText('MOBAPDE S13')).toBeInTheDocument()
  })

  test('ensures each card has a unique key', () => {
    // Spying on console.error to check for React key warnings
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(<CoursesList />)

    // Confirm no key warnings were triggered
    expect(consoleSpy).not.toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})