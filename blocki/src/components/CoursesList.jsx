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
    {
      id: 3,
      title: 'CSCI-ART S12',
      description: 'Introduction to Artificial Intelligence.',
      instructor: 'Macario Cordel II',
      imageUrl: placeholderImage,
    },
    {
      id: 4,
      title: 'BASPHYS S11',
      description: 'Basic Physics for IT.',
      instructor: 'Rene P. Gumba',
      imageUrl: placeholderImage,
    },
    {
      id: 5,
      title: 'WEBDEVT S15',
      description: 'Introduction to Web Development.',
      instructor: 'Patricia Liana',
      imageUrl: placeholderImage,
    },
    {
      id: 6,
      title: 'DATANLS S11',
      description: 'Data Analytics Fundamentals.',
      instructor: 'Ryan Dimaunahan',
      imageUrl: placeholderImage,
    },
    {
      id: 7,
      title: 'MOBAPDE S13',
      description: 'Mobile App Development.',
      instructor: 'Aundrea Chan',
      imageUrl: placeholderImage,
    },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-2">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}