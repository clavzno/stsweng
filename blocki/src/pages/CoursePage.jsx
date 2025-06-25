"use client";

import React from 'react';
import Sidebar from '../components/Sidebar';
import CourseCard from '../components/CourseCard';
import ModuleList from '../components/ModuleList';
import Announcements from '../components/Announcements';
import AssignmentList from '../components/AssignmentList';
import placeholderImage from '../assets/images/placeholder.png';

export default function CoursePage() {
  const course = {
    id: 1,
    title: '1243 STSWENG SS1',
    description: 'Advanced Software Engineering',
    instructor: 'Jordan Aiko Deja',
    imageUrl: placeholderImage,
  };

  const modules = [
    { id: 1, title: 'Module 1: Course Introduction', link: '#' },
    { id: 2, title: 'Module 2: Unit Testing and Continuous Integration', link: '#' },
    { id: 3, title: 'Module 3: Quality Assurance', link: '#' },
  ];

  const announcements = [
    { id: 1, title: 'Welcome to the course!', content: 'We are excited to have you here.', date: '2025-03-30' },
    { id: 2, title: 'Assignment 1 Due', content: 'Please submit your MCO3 by April 5th.', date: '2025-04-01' },
  ];

  const assignments = [
    { id: 1, title: 'MCO1 - Project Proposal', instructions: 'Upload a PDF file outlining your project idea.' },
    { id: 2, title: 'MCO2 - Project Update', instructions: 'Upload a PDF file with an update on your progress.' },
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