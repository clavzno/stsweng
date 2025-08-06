import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormButton from '../../components/FormButton';

describe('FormButton', () => {
  it('renders with default props and children', () => {
    render(<FormButton>Click Me</FormButton>);

    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveClass('bg-primary');
  });

  it('renders with a custom variant', () => {
    render(<FormButton variant="green">Submit</FormButton>);

    const button = screen.getByRole('button', { name: /submit/i });

    expect(button).toHaveClass('bg-green');
    expect(button).toHaveClass('hover:bg-[#3bc63a]');
  });

  it('applies custom type and className', () => {
    render(
      <FormButton type="reset" className="custom-class">
        Reset
      </FormButton>
    );

    const button = screen.getByRole('button', { name: /reset/i });

    expect(button).toHaveAttribute('type', 'reset');
    expect(button).toHaveClass('custom-class');
  });

  it('supports inline style', () => {
    render(
      <FormButton style={{ backgroundColor: 'red' }}>
        Styled Button
      </FormButton>
    );

    const button = screen.getByRole('button', { name: /styled button/i });

    expect(button).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('fires onClick handler', () => {
    const handleClick = jest.fn();
    render(<FormButton onClick={handleClick}>Click</FormButton>);

    const button = screen.getByRole('button', { name: /click/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});