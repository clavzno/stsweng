import React from 'react'
import { render, screen } from '@testing-library/react'
import Announcements from '../../components/Announcements'

test('renders the Announcements header', () => {
  // Render the component with an empty list to isolate the header
  render(<Announcements announcements={[]} />)

  // Check that the header is present
  expect(screen.getByText(/Announcements/i)).toBeInTheDocument()
})

test('renders a list of announcement items', () => {
  // Define a sample list of announcements to pass as props
  const sampleAnnouncements = [
    {
      id: 1,
      title: 'Midterm Exam Reminder',
      content: 'The midterm exam will be held next Monday at 10AM.',
      date: 'March 20, 2025'
    },
    {
      id: 2,
      title: 'Project Submission',
      content: 'Submit your project proposal by Friday via the portal.',
      date: 'March 22, 2025'
    }
  ]

  // Render the component with sample data
  render(<Announcements announcements={sampleAnnouncements} />)

  // Check that each announcement title, content, and date is rendered
  sampleAnnouncements.forEach((announcement) => {
    expect(screen.getByText(announcement.title)).toBeInTheDocument()
    expect(screen.getByText(announcement.content)).toBeInTheDocument()
    expect(screen.getByText(announcement.date)).toBeInTheDocument()
  })
})

test('renders no list items if announcements array is empty', () => {
  // Render the component with no announcements
  render(<Announcements announcements={[]} />)

  // Try to find list items (li). There should be none.
  const items = screen.queryAllByRole('listitem')
  expect(items.length).toBe(0)
})