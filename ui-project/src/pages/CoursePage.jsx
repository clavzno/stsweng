import React from 'react';
import Sidebar from '../components/Sidebar';
import CourseCard from '../components/CourseCard';
import ModuleList from '../components/ModuleList';
import Announcements from '../components/Announcements';
import AssignmentList from '../components/AssignmentList';

export default function CoursePage() {
  const course = {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of HTML, CSS, and JavaScript.',
    instructor: 'John Doe',
    imageUrl: 'https://via.placeholder.com/600x400',
  };

  const modules = [
    { id: 1, title: 'Module 1: HTML Basics', link: '#' },
    { id: 2, title: 'Module 2: CSS Styling', link: '#' },
    { id: 3, title: 'Module 3: JavaScript Fundamentals', link: '#' },
  ];

  const announcements = [
    { id: 1, title: 'Welcome to the course!', content: 'We are excited to have you here.', date: '2025-03-30' },
    { id: 2, title: 'Assignment 1 Due', content: 'Please submit your first assignment by April 5th.', date: '2025-04-01' },
  ];

  const assignments = [
    { id: 1, title: 'HTML Structure Challenge', instructions: 'Create a basic HTML page with a header, main content, and footer.' },
    { id: 2, title: 'CSS Styling Task', instructions: 'Style the HTML page you created with CSS. Add colors, fonts, and layout.' },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-dark-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CourseCard course={course} />
            <ModuleList modules={modules} />
            <AssignmentList assignments={assignments} />
          </div>
          <div>
            <Announcements announcements={announcements} />
          </div>
        </div>
      </main>
    </div>
  );
}