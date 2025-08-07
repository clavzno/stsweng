import React from 'react';
import { render, screen, within } from '@testing-library/react';
import MessageThread from '../../components/MessageThread'; // Adjust path as needed

describe('MessageThread', () => {
  test('renders the heading', () => {
    render(<MessageThread />);
    expect(screen.getByText('Messages')).toBeInTheDocument();
  });

  test('displays "No messages yet." when messages array is empty', () => {
    render(<MessageThread messages={[]} />);
    expect(screen.getByText('No messages yet.')).toBeInTheDocument();
  });
  
  it('renders each message passed in the messages prop', () => {
    const messages = [
      { sender: 'Alice', text: 'Hi there!' },
      { sender: 'Bob', text: 'Hello!' }
    ];

    render(<MessageThread messages={messages} />);

    const aliceMessages = screen.getAllByText(
      (_, el) =>
        el?.tagName.toLowerCase() === 'p' &&
        el.textContent === 'Alice: Hi there!'
    );
    expect(aliceMessages).toHaveLength(1);

    const bobMessages = screen.getAllByText(
      (_, el) =>
        el?.tagName.toLowerCase() === 'p' &&
        el.textContent === 'Bob: Hello!'
    );
    expect(bobMessages).toHaveLength(1);
  });
});