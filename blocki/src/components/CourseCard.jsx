"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import placeholderImage from '../assets/images/placeholder.png';

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function CourseCard({ course, onImageChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(course.imageUrl);
  const [randomBgColor, setRandomBgColor] = useState('#ffffff'); // Default to white

  useEffect(() => {
    // Set a random background color when the component mounts
    setRandomBgColor(getRandomColor());
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result);
        // Propagate the change up if onImageChange is provided
        if (onImageChange) {
          onImageChange(course.id, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
      <div className="absolute top-2 right-2 z-10">
        <button onClick={() => setIsEditing(!isEditing)} className="bg-gray-500 bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
          </svg>
        </button>
      </div>
      {isEditing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90" 
          />
        </div>
      )}
      
     {/* Container for the image and the random color overlay */}
      <div className="relative w-full h-32">
        <Image
          src={newImageUrl || placeholderImage}
          alt={course.title}
          fill="true"
          className="object-cover"
        />
        {/* Random color overlay on top of the image */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: randomBgColor, opacity: 0.3 }} // Adjust opacity as desired (e.g., 0.3 for 30%)
        ></div>
      </div>
      {/* Content below the image area */}
      <div className="p-4"> {/* This div uses the default card background */}

        <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{course.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{course.instructor}</p>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div 
              className="bg-green-500 h-1.5 rounded-full" 
              style={{ width: `${course.progress || 0}%` }} // Added fallback for progress
            ></div>
          </div>
        </div>
        <Link href={`/course/${course.id}`} className="text-xs text-secondary hover:text-orange-700 dark:hover:text-orange-400 mt-2 inline-block transition-colors">
          View Course
        </Link>
      </div>
    </div>
  );
}
