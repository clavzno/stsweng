import React from 'react';
import { render, screen } from '@testing-library/react';
import LayoutGrid from '../../components/LayoutGrid';

describe('LayoutGrid', () => {
  it('renders children inside the grid', () => {
    render(
      <LayoutGrid>
        <div>Child 1</div>
        <div>Child 2</div>
      </LayoutGrid>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('applies the correct grid and spacing classes', () => {
    const { container } = render(
      <LayoutGrid>
        <div>Sample</div>
      </LayoutGrid>
    );

    const gridDiv = container.firstChild;
    expect(gridDiv).toHaveClass('grid');
    expect(gridDiv).toHaveClass('grid-cols-1');
    expect(gridDiv).toHaveClass('sm:grid-cols-2');
    expect(gridDiv).toHaveClass('lg:grid-cols-3');
    expect(gridDiv).toHaveClass('gap-4');
    expect(gridDiv).toHaveClass('p-4');
  });

  it('renders correctly with no children', () => {
    const { container } = render(<LayoutGrid />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild.childElementCount).toBe(0);
  });
});