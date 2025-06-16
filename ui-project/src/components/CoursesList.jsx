import React from 'react';
import CourseCard from './CourseCard';
import placeholderImage from '../assets/images/placeholder.png';

export default function CoursesList() {
  const courses = [
    {
      id: 1,
      title: '1243 STSWENG SS1',
      description: 'Advanced Software Engineering.',
      instructor: 'Jordan Aiko Deja',
      imageUrl: placeholderImage, // Use the imported image for this course
    },
    {
      id: 2,
      title: '1243 STCLOUD S14',
      description: 'Introduction to Cloud Computing.',
      instructor: 'Fritz Kevin Flores',
      imageUrl: placeholderImage, // 2. Set to null to use the placeholder from CourseCard
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