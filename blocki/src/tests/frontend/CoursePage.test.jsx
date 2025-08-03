import React from 'react'
import { render, screen } from '@testing-library/react'
import CoursePage from '../../components/CoursePage'

// Mock all child components used inside CoursePage to isolate this file's layout logic
jest.mock('../../components/Sidebar', () => () => <div>Sidebar</div>)
jest.mock('../../components/CourseCard', () => ({ course }) => (
  <div>
    CourseCard
    <span>{course.title}</span>
    <span>{course.instructor}</span>
  </div>
))
jest.mock('../../components/ModuleList', () => ({ modules }) => (
  <div>
    ModuleList
    {modules.map(module => (
      <span key={module.id}>{module.title}</span>
    ))}
  </div>
))
jest.mock('../../components/AssignmentList', () => ({ assignments }) => (
  <div>
    AssignmentList
    {assignments.map(assignment => (
      <span key={assignment.id}>{assignment.title}</span>
    ))}
  </div>
))
jest.mock('../../components/Announcements', () => ({ announcements }) => (
  <div>
    Announcements
    {announcements.map(announcement => (
      <span key={announcement.id}>{announcement.title}</span>
    ))}
  </div>
))

test('renders Sidebar and main layout', () => {
  render(<CoursePage />)

  // Sidebar should always render
  expect(screen.getByText('Sidebar')).toBeInTheDocument()

  // Main sections should be visible
  expect(screen.getByText('CourseCard')).toBeInTheDocument()
  expect(screen.getByText('ModuleList')).toBeInTheDocument()
  expect(screen.getByText('AssignmentList')).toBeInTheDocument()
  expect(screen.getByText('Announcements')).toBeInTheDocument()
})

test('passes and renders course details', () => {
  render(<CoursePage />)

  // These are rendered inside the mocked CourseCard
  expect(screen.getByText('1243 STSWENG SS1')).toBeInTheDocument()
  expect(screen.getByText('Jordan Aiko Deja')).toBeInTheDocument()
})

test('renders all modules by title', () => {
  render(<CoursePage />)

  expect(screen.getByText('Module 1: Course Introduction')).toBeInTheDocument()
  expect(screen.getByText('Module 2: Unit Testing and Continuous Integration')).toBeInTheDocument()
  expect(screen.getByText('Module 3: Quality Assurance')).toBeInTheDocument()
})

test('renders all assignments by title', () => {
  render(<CoursePage />)

  expect(screen.getByText('MCO1 - Project Proposal')).toBeInTheDocument()
  expect(screen.getByText('MCO2 - Project Update')).toBeInTheDocument()
})

test('renders all announcements by title', () => {
  render(<CoursePage />)

  expect(screen.getByText('Welcome to the course!')).toBeInTheDocument()
  expect(screen.getByText('Assignment 1 Due')).toBeInTheDocument()
})