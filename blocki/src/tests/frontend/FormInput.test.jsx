import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FormInput from '../../components/FormInput'

describe('FormInput Component', () => {
  test('renders input with label and placeholder', () => {
    render(
      <FormInput
        id="username"
        label="Username"
        value=""
        onChange={() => {}}
        placeholder="Enter your username"
      />
    )

    // Check if label is present
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()

    // Check if placeholder is applied
    const input = screen.getByPlaceholderText(/enter your username/i)
    expect(input).toBeInTheDocument()

    // Ensure the input is connected to the correct label via id
    expect(input).toHaveAttribute('id', 'username')
  })

  test('displays the provided value', () => {
    render(
      <FormInput
        id="email"
        label="Email"
        value="test@example.com"
        onChange={() => {}}
      />
    )

    // Check that the input has the correct value
    const input = screen.getByLabelText(/email/i)
    expect(input).toHaveValue('test@example.com')
  })

  test('calls onChange when user types', () => {
    const mockChange = jest.fn()

    render(
      <FormInput
        id="email"
        label="Email"
        value=""
        onChange={mockChange}
      />
    )

    const input = screen.getByLabelText(/email/i)

    // Simulate typing
    fireEvent.change(input, { target: { value: 'hello@example.com' } })

    // Expect the onChange callback to be called
    expect(mockChange).toHaveBeenCalled()
  })

  test('applies custom className and style', () => {
    const customStyle = { backgroundColor: 'black' }

    render(
      <FormInput
        id="phone"
        label="Phone Number"
        value=""
        onChange={() => {}}
        className="custom-class"
        style={customStyle}
      />
    )

    const input = screen.getByLabelText(/phone number/i)

    // Check for custom class
    expect(input).toHaveClass('custom-class')

    // Check for inline style
    expect(input).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)' })
  })

  test('supports different input types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url']

    types.forEach(type => {
      render(
        <FormInput
          id={type}
          label={type}
          type={type}
          value=""
          onChange={() => {}}
        />
      )

      const input = screen.getByLabelText(new RegExp(type, 'i'))

      // Check if the correct input type is applied
      expect(input).toHaveAttribute('type', type)
    })
  })
})