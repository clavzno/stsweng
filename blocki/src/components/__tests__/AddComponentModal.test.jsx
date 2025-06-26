import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AddComponentModal from '../AddComponentModal'

// Define a helper function to render the modal with customizable props
const renderModal = (props = {}) => {
  const defaultProps = {
    isOpen: true,           // Ensures the modal is visible by default
    onClose: jest.fn(),     // Spy to check if the close button works
    onAddComponent: jest.fn() // Spy to test which component was selected
  }

  return {
    ...defaultProps,
    ...props,
    ...render(<AddComponentModal {...defaultProps} {...props} />)
  }
}

test('does not render the modal when isOpen is false', () => {
  // Render the modal with isOpen set to false
  render(<AddComponentModal isOpen={false} onClose={jest.fn()} onAddComponent={jest.fn()} />)

  // Modal content should not be in the DOM
  expect(screen.queryByText(/Add a Component/i)).not.toBeInTheDocument()
})

test('renders all component cards with name and description', () => {
  renderModal()

  // Expect all components to be rendered by name
  expect(screen.getByText('Courses List')).toBeInTheDocument()
  expect(screen.getByText('Manage your course schedule')).toBeInTheDocument()

  expect(screen.getByText('Calendar')).toBeInTheDocument()
  expect(screen.getByText('Track important dates')).toBeInTheDocument()

  expect(screen.getByText('Study Tracker')).toBeInTheDocument()
  expect(screen.getByText('Monitor your progress')).toBeInTheDocument()

  expect(screen.getByText('Pomodoro Timer')).toBeInTheDocument()
  expect(screen.getByText('Focus with time blocks')).toBeInTheDocument()
})

test('calls onAddComponent with correct ID when a component is clicked', () => {
  const onAddComponent = jest.fn()

  renderModal({ onAddComponent })

  // Simulate clicking the "Calendar" card
  fireEvent.click(screen.getByText('Calendar'))

  // Check that onAddComponent was called with the "calendar" ID
  expect(onAddComponent).toHaveBeenCalledWith('calendar')
})

test('calls onClose when the close (X) button is clicked', () => {
  const onClose = jest.fn()

  renderModal({ onClose })

  // The close button is an SVG button in the header
  const closeButton = screen.getByRole('button', { name: '' }) // unnamed SVG button

  // Simulate a click on the close (X) button
  fireEvent.click(closeButton)

  // Verify that onClose handler was triggered
  expect(onClose).toHaveBeenCalled()
})

test('calls onClose when the Cancel button is clicked', () => {
  const onClose = jest.fn()

  renderModal({ onClose })

  // Find and click the bottom cancel button
  fireEvent.click(screen.getByText('Cancel'))

  // Ensure that the close handler was executed
  expect(onClose).toHaveBeenCalled()
})