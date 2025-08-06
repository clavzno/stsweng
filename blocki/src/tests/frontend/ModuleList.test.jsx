import React from 'react';
import { render, screen } from '@testing-library/react';
import ModuleList from '../../components/ModuleList';

describe('ModuleList component', () => {
  const mockModules = [
    { id: 1, title: 'Module 1: Introduction', link: '/modules/1' },
    { id: 2, title: 'Module 2: Deep Dive', link: '/modules/2' },
  ];

  test('renders the section title', () => {
    // Render the component with sample module data
    render(<ModuleList modules={mockModules} />);

    // Expect the header to appear in the document
    expect(screen.getByText('Modules')).toBeInTheDocument();
  });

  test('renders all modules passed as props', () => {
    render(<ModuleList modules={mockModules} />);

    // Check that each module title is present in the DOM
    mockModules.forEach((module) => {
      expect(screen.getByText(module.title)).toBeInTheDocument();
    });
  });

  test('renders correct number of module items', () => {
    render(<ModuleList modules={mockModules} />);

    // Each module is inside a list item, so count the list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockModules.length);
  });

  test('each module has a working "View" link', () => {
    render(<ModuleList modules={mockModules} />);

    // Check that each "View" link has the correct href
    mockModules.forEach((module) => {
      const link = screen.getByText('View', { selector: 'a[href="' + module.link + '"]' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', module.link);
    });
  });

  test('handles empty module list gracefully', () => {
    // Render with an empty array of modules
    render(<ModuleList modules={[]} />);

    // The section title should still render
    expect(screen.getByText('Modules')).toBeInTheDocument();

    // There should be no list items
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});