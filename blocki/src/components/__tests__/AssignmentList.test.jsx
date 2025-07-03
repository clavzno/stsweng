import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AssignmentList from '../AssignmentList'

// Mock FileUploader to isolate the modal behavior
jest.mock('../FileUploader', () => () => <div>FileUploader</div>)

// Sample data for testing
const sampleAssignments = [
  {
    id: 1,
    title: 'MCO1 - Project Proposal',
    instructions: 'Upload a PDF file outlining your project idea.'
  },
  {
    id: 2,
    title: 'MCO2 - Project Update',
    instructions: 'Upload a PDF file with an update on your progress.'
  }
]

test('renders the Assignments header', () => {
  render(<AssignmentList assignments={sampleAssignments} />)

  // Verify that the Assignments title appears
  expect(screen.getByText(/Assignments/i)).toBeInTheDocument()
})

test('renders a list of assignment titles as buttons', () => {
  render(<AssignmentList assignments={sampleAssignments} />)

  // Ensure all assignment titles render as clickable buttons
  sampleAssignments.forEach(assignment => {
    expect(screen.getByText(assignment.title)).toBeInTheDocument()
  })
})

test('opens modal with assignment details when a title is clicked', () => {
  render(<AssignmentList assignments={sampleAssignments} />)

  // Simulate user clicking the first assignment
  fireEvent.click(screen.getByText('MCO1 - Project Proposal'))

  // Expect two elements with the title:
  // 1. The button
  // 2. The modal heading
  const matches = screen.getAllByText('MCO1 - Project Proposal')
  expect(matches).toHaveLength(2)

  // Verify the instruction text is in the modal
  expect(screen.getByText('Upload a PDF file outlining your project idea.')).toBeInTheDocument()

  // Verify that the FileUploader mock is rendered
  expect(screen.getByText('FileUploader')).toBeInTheDocument()
})

test('closes modal when the "Close" button is clicked', () => {
  render(<AssignmentList assignments={sampleAssignments} />)

  // Open modal
  fireEvent.click(screen.getByText('MCO1 - Project Proposal'))

  // Close modal
  fireEvent.click(screen.getByText('Close'))

  // Expect modal content to be removed
  expect(screen.queryByText('Upload a PDF file outlining your project idea.')).not.toBeInTheDocument()
})