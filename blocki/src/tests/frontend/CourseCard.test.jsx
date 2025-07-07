import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react'
import CourseCard from '../../components/CourseCard'
import placeholderImage from '../../assets/images/placeholder.png'

// Mock next/image so it doesn't throw errors related to `fill`
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // Render a regular <img> tag instead for testing purposes
    const { src, alt, ...rest } = props
    return <img src={typeof src === 'string' ? src : 'mocked.png'} alt={alt} {...rest} />
  },
}))

describe('CourseCard component', () => {
  const mockCourse = {
    id: 1,
    title: 'Advanced Software Engineering',
    instructor: 'Jordan Aiko Deja',
    progress: 75,
    imageUrl: placeholderImage,
  }

  test('renders course information correctly', () => {
    render(<CourseCard course={mockCourse} />)

    // Check that the course title is rendered
    expect(screen.getByText(/Advanced Software Engineering/i)).toBeInTheDocument()

    // Check that the instructor name is rendered
    expect(screen.getByText(/Jordan Aiko Deja/i)).toBeInTheDocument()

    // Check that the View Course link points to the correct URL
    expect(screen.getByText(/View Course/i)).toHaveAttribute('href', '/course/1')

    // Check that the progress bar has the correct width based on course.progress
    const progressBar = document.querySelector('div.bg-green-500')
    expect(progressBar).toHaveStyle('width: 75%')
  })

  test('toggles edit mode when edit button is clicked', () => {
    render(<CourseCard course={mockCourse} />)

    // Simulate clicking the edit button
    const editButton = screen.getByRole('button')
    fireEvent.click(editButton)

    // After clicking, the file input should appear
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  test('calls onImageChange when a new image is uploaded', async () => {
    const mockHandler = jest.fn()

    render(<CourseCard course={mockCourse} onImageChange={mockHandler} />)

    // Enter edit mode by clicking the button
    const editButton = screen.getByRole('button')
    fireEvent.click(editButton)

    // Find the file input element
    const fileInput = document.querySelector('input[type="file"]')

    // Define a dummy file to simulate upload
    const testFile = new File(['dummy content'], 'test.png', { type: 'image/png' })

    // Mock the FileReader API
    const mockResult = 'data:image/png;base64,dummydata'
    const mockReader = {
      readAsDataURL: jest.fn(),
      onloadend: null,
      result: mockResult,
    }
    window.FileReader = jest.fn(() => mockReader)

    // Trigger file selection
    await act(() => {
      fireEvent.change(fileInput, { target: { files: [testFile] } })
      if (mockReader.onloadend) mockReader.onloadend()
    })

    // Ensure the callback was called with the correct parameters
    expect(mockHandler).toHaveBeenCalled()
    expect(mockHandler).toHaveBeenCalledWith(mockCourse.id, mockResult)
  })
})