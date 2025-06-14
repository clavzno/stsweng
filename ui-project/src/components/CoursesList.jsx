import React from 'react';
import CourseCard from './CourseCard';

export default function CoursesList() {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of HTML, CSS, and JavaScript.',
      instructor: 'John Doe',
      imageUrl: 'https://via.placeholder.com/600x400',
    },
    {
      id: 2,
      title: 'Advanced React',
      description: 'Take your React skills to the next level.',
      instructor: 'Jane Smith',
      imageUrl: 'https://via.placeholder.com/600x400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}