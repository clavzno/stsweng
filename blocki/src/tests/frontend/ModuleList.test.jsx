import React from 'react';
import { render, screen, within } from '@testing-library/react';
import ModuleList from '../../components/ModuleList'; // Adjust path as needed

describe('ModuleList', () => {
  const mockModules = [
    { id: 1, title: 'Module 1: Introduction', link: '/modules/1' },
    { id: 2, title: 'Module 2: Advanced Topics', link: '/modules/2' },
  ];

  it('renders the module list heading', () => {
    render(<ModuleList modules={mockModules} />);
    expect(screen.getByText('Modules')).toBeInTheDocument();
  });

  it('renders all module titles', () => {
    render(<ModuleList modules={mockModules} />);
    mockModules.forEach((module) => {
      expect(screen.getByText(module.title)).toBeInTheDocument();
    });
  });

  it('renders correct links for each module', () => {
    render(<ModuleList modules={mockModules} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockModules.length);

    listItems.forEach((item, index) => {
      const utils = within(item);
      expect(utils.getByText(mockModules[index].title)).toBeInTheDocument();
      const link = utils.getByText('View');
      expect(link).toHaveAttribute('href', mockModules[index].link);
    });
  });
});