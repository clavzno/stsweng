import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FileUploader from '../FileUploader'

describe('FileUploader component', () => {
  test('renders upload instructions and button', () => {
    // Render the FileUploader component
    render(<FileUploader />)

    // Check that the heading is present
    expect(screen.getByText(/Submit Assignment/i)).toBeInTheDocument()

    // Check for upload instructions
    expect(screen.getByText(/Click to upload/i)).toBeInTheDocument()
    expect(screen.getByText(/PDF, DOCX, or ZIP/i)).toBeInTheDocument()

    // Check that the submit button is rendered
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  test('handles file selection and displays file name', () => {
    render(<FileUploader />)

    // Locate the hidden file input using the label's htmlFor
    const fileInput = screen.getByLabelText(/click to upload/i, { selector: 'input' })

    // Create a mock file
    const file = new File(['dummy content'], 'assignment1.pdf', { type: 'application/pdf' })

    // Simulate selecting a file in the input
    fireEvent.change(fileInput, {
      target: { files: [file] }
    })

    // Expect the file name to appear in the document
    expect(screen.getByText(/Selected file: assignment1\.pdf/i)).toBeInTheDocument()
  })
})