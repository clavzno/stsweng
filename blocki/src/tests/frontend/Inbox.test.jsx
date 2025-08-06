import React from 'react';
import { render, screen } from '@testing-library/react';
import Inbox from '../../components/Inbox';

describe('Inbox component', () => {
  const sampleMessages = [
    { id: 1, sender: 'John', content: 'Hey! Meeting at 3PM?' },
    { id: 2, sender: 'Mary', content: 'Assignment submitted!' },
  ];

  it('renders an "Inbox" heading', () => {
    render(<Inbox messages={sampleMessages} />);
    expect(screen.getByRole('heading', { name: /inbox/i })).toBeInTheDocument();
  });

  it('renders a list of messages passed as props', () => {
    render(<Inbox messages={sampleMessages} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(sampleMessages.length);
  });

  it('displays each message with sender and content', () => {
    render(<Inbox messages={sampleMessages} />);
    sampleMessages.forEach(({ sender, content }) => {
      expect(screen.getByText(new RegExp(`${sender}.*${content}`, 'i'))).toBeInTheDocument();
    });
  });

  it('renders no messages when the messages prop is empty', () => {
    render(<Inbox messages={[]} />);
    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
  });

  it('renders no messages when the messages prop is not provided', () => {
    render(<Inbox />);
    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
  });
});