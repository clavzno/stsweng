import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FormButton from '../FormButton' // Adjust path as necessary

describe('FormButton Component', () => {
  test('renders with default props and children', () => {
    // Render the button with default props and sample text
    render(<FormButton>Submit</FormButton>)

    // Check if the button is rendered with the correct text
    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toBeInTheDocument()

    // It should use the default type "submit"
    expect(button).toHaveAttribute('type', 'submit')

    // Default variant is "primary", which includes specific classes
    expect(button.className).toMatch(/bg-primary/)
  })

  test('applies custom variant styles correctly', () => {
    // Render the button with a "green" variant
    render(<FormButton variant="green">Save</FormButton>)

    const button = screen.getByRole('button', { name: /save/i })

    // Check if correct green variant class is applied
    expect(button.className).toMatch(/bg-green/)
  })

  test('applies custom type and className', () => {
    // Render the button with type="reset" and a custom class
    render(
      <FormButton type="reset" className="custom-class">
        Reset
      </FormButton>
    )

    const button = screen.getByRole('button', { name: /reset/i })

    // It should use the "reset" type
    expect(button).toHaveAttribute('type', 'reset')

    // Custom class should be included
    expect(button.className).toMatch(/custom-class/)
  })

  test('applies inline styles if provided', () => {
  render(
    <FormButton style={{ border: '2px solid red' }}>
      Styled
    </FormButton>
  )

  const button = screen.getByRole('button', { name: /styled/i })

  // Inline style will only work if not overridden by Tailwind
  expect(button).toHaveAttribute('style', expect.stringContaining('border'))
})

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn()

    // Render the button with an onClick handler
    render(<FormButton onClick={handleClick}>Click Me</FormButton>)

    const button = screen.getByRole('button', { name: /click me/i })

    // Simulate click
    fireEvent.click(button)

    // onClick handler should be called once
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('uses fallback "blue" variant if unknown variant is passed', () => {
    // Render with an invalid variant to check fallback
    render(<FormButton variant="unknown">Fallback</FormButton>)

    const button = screen.getByRole('button', { name: /fallback/i })

    // Should fall back to the "blue" variant
    expect(button.className).toMatch(/bg-primary/)
  })
})