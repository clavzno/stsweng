import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import placeholderImage from '../assets/images/placeholder.png';

export default function CourseCard({ course, onImageChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(course.imageUrl);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result);
        onImageChange(course.id, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
      <div className="absolute top-2 right-2 z-10">
        <button onClick={() => setIsEditing(!isEditing)} className="bg-gray-500 bg-opacity-50 text-white p-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
          </svg>
        </button>
      </div>
      {isEditing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-white" />
        </div>
      )}
      <img src={newImageUrl || placeholderImage} alt={course.title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{course.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{course.instructor}</p>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
        <Link to={`/course/${course.id}`} className="text-xs text-primary mt-2 inline-block">
          View Course
        </Link>
      </div>
    </div>
  );
}