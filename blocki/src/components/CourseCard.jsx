// CourseCard.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import placeholderImage from '../assets/images/placeholder.png';
import { User, BookOpen, ArrowRight, Edit3, GripVertical, CheckCircle, Clock, Palette, Image as ImageIcon, X, Sliders } from 'lucide-react';

const getGradeColor = (grade) => {
  const gradeValue = parseFloat(grade); // Convert the grade to a float for numerical comparison

  if (gradeValue >= 3.5) {
    return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'; // Corresponds to A and A-
  } else if (gradeValue >= 2.5) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'; // Corresponds to B and B-
  } else if (gradeValue >= 1.5) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'; // Corresponds to C and C-
  } else if (gradeValue >= 0.5) { // Assuming 1.0 is the lowest passing, anything above 0.0 but below 1.5 would be D
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300'; // Corresponds to D
  } else {
    return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'; // Corresponds to F (0.0)
  }
};

const overlayOptions = [
  { label: 'Light', value: 'rgba(0, 0, 0, 0.3)' },
  { label: 'Medium', value: 'rgba(0, 0, 0, 0.5)' },
  { label: 'Dark', value: 'rgba(0, 0, 0, 0.7)' },
  { label: 'Blue Tint', value: 'rgba(37, 99, 235, 0.4)' },
  { label: 'Purple Tint', value: 'rgba(124, 58, 237, 0.4)' },
  { label: 'Green Tint', value: 'rgba(5, 150, 105, 0.4)' },
  { label: 'Red Tint', value: 'rgba(225, 29, 72, 0.4)' },
  { label: 'None', value: 'rgba(0, 0, 0, 0)' }
];

const accentColorOptions = [
  { label: 'Blue', value: '#2563eb' },
  { label: 'Green', value: '#059669' },
  { label: 'Orange', value: '#ea580c' },
  { label: 'Purple', value: '#7c3aed' },
  { label: 'Red', value: '#dc2626' },
  { label: 'Pink', value: '#e11d48' },
  { label: 'Indigo', value: '#4f46e5' },
  { label: 'Teal', value: '#0891b2' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Slate', value: '#475569' }
];

export default function CourseCard({ 
  course, 
  onImageChange, 
  onCustomizationChange, 
  showGrades = true, 
  showAssignments = true, 
  isEditMode = false, 
  themes = {} 
}) {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(course.imageUrl);
  const [activeTab, setActiveTab] = useState('image');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setNewImageUrl(result);
        if (onImageChange) {
          onImageChange(course.id, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOverlayChange = (overlay) => {
    if (onCustomizationChange) {
      onCustomizationChange(course.id, { imageOverlay: overlay });
    }
  };

  const handleAccentColorChange = (color) => {
    if (onCustomizationChange) {
      onCustomizationChange(course.id, { accentColor: color });
    }
  };

  const progressPercentage = course.progress || 0;
  const completedAssignments = course.assignments ? course.assignments.filter(a => a.completed).length : 0;
  const totalAssignments = course.assignments ? course.assignments.length : 0;
  const customization = course.customization || {
    imageOverlay: 'rgba(0, 0, 0, 0.5)',
    accentColor: '#2563eb',
    theme: 'default'
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-full flex flex-col relative">

      {/* Drag Handle - Only shown in edit mode */}
      {isEditMode && (
        <div className="absolute top-3 left-3 z-20 bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-300 p-1.5 rounded-md shadow-sm cursor-grab">
          <GripVertical className="w-4 h-4" />
        </div>
      )}

      {/* Customization Button */}
      {isEditMode && (
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-300 p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-sm"
          >
            <Palette className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Customization Modal */}
      {isCustomizing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Customize {course.title}
              </h3>
              <button
                onClick={() => setIsCustomizing(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('image')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'image'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Image
              </button>
              <button
                onClick={() => setActiveTab('overlay')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'overlay'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Sliders className="w-4 h-4" />
                Overlay
              </button>
              <button
                onClick={() => setActiveTab('colors')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'colors'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Palette className="w-4 h-4" />
                Colors
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === 'image' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="mb-4">
                      <Image
                        src={newImageUrl || placeholderImage}
                        alt={course.title}
                        width={200}
                        height={120}
                        className="mx-auto rounded-lg object-cover"
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/50 dark:file:text-blue-300 cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Upload a new image for this course
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'overlay' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose an overlay effect for the course image
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {overlayOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOverlayChange(option.value)}
                        className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
                          customization.imageOverlay === option.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div
                          className="w-full h-8 rounded mb-2 bg-gradient-to-r from-gray-300 to-gray-400"
                          style={{
                            background: `linear-gradient(${option.value}, ${option.value}), linear-gradient(45deg, #f3f4f6, #d1d5db)`
                          }}
                        />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'colors' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose an accent color for progress bars and buttons
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {accentColorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleAccentColorChange(color.value)}
                        className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                          customization.accentColor === color.value
                            ? 'border-gray-800 dark:border-gray-200 scale-110'
                            : 'border-gray-200 dark:border-gray-700 hover:scale-105'
                        }`}
                        title={color.label}
                      >
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color.value }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsCustomizing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full h-40 overflow-hidden">
        <Image
          src={newImageUrl || placeholderImage}
          alt={course.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{ backgroundColor: customization.imageOverlay }}
        />

        {/* Grade Badge */}
        {showGrades && course.grade && (
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getGradeColor(course.grade)}`}>
              {course.grade}
            </span>
          </div>
        )}

        {/* Course Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-semibold leading-tight">
            {course.title}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          {/* Instructor */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <User className="w-4 h-4" />
            <span>{course.instructor}</span>
          </div>

          {/* Description */}
          {course.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
              {course.description}
            </p>
          )}

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
              <span className="font-medium text-gray-900 dark:text-white">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${progressPercentage}%`,
                  backgroundColor: customization.accentColor 
                }}
              />
            </div>
          </div>

          {/* Assignments Section */}
          {showAssignments && course.assignments && course.assignments.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Assignments</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {completedAssignments}/{totalAssignments}
                </span>
              </div>
              <div className="space-y-2">
                {course.assignments.slice(0, 2).map((assignment) => (
                  <div key={assignment.id} className="flex items-center gap-2 text-sm">
                    {assignment.completed ? (
                      <CheckCircle 
                        className="w-4 h-4 flex-shrink-0" 
                        style={{ color: customization.accentColor }}
                      />
                    ) : (
                      <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    )}
                    <span className={`flex-1 ${assignment.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-gray-300'}`}>
                      {assignment.title}
                    </span>
                  </div>
                ))}
                {course.assignments.length > 2 && (
                  <div 
                    className="text-xs font-medium"
                    style={{ color: customization.accentColor }}
                  >
                    +{course.assignments.length - 2} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Link
            href={`/course/${course.id}`}
            className="inline-flex items-center justify-center w-full py-2.5 px-4 text-white text-sm font-medium rounded-lg transition-all duration-200 group hover:shadow-md"
            style={{ 
              backgroundColor: customization.accentColor,
              '&:hover': { filter: 'brightness(0.9)' }
            }}
            onMouseEnter={(e) => e.target.style.filter = 'brightness(0.9)'}
            onMouseLeave={(e) => e.target.style.filter = 'brightness(1)'}
          >
            <span className="mr-2">View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}