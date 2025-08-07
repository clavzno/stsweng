// CourseDetail.jsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ArrowLeft, 
  User, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Calendar,
  FileText,
  Award,
  BarChart3,
  Target,
  Palette,
  Image as ImageIcon,
  X,
  Sliders,
  Edit3
} from 'lucide-react';
import placeholderImage from '../../assets/images/placeholder.png';

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

const getGradeColor = (grade) => {
  const gradeValue = parseFloat(grade);

  if (gradeValue >= 3.5) {
    return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
  } else if (gradeValue >= 2.5) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
  } else if (gradeValue >= 1.5) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
  } else if (gradeValue >= 0.5) {
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
  } else {
    return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
  }
};

export default function CourseDetail({ course, onBack, onImageChange, onCustomizationChange }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [activeTab, setActiveTab] = useState('image');
  const [newImageUrl, setNewImageUrl] = useState(course?.imageUrl);

  if (!course) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Course not found
          </h2>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const customization = course.customization || {
    imageOverlay: 'rgba(0, 0, 0, 0.5)',
    accentColor: '#2563eb',
    theme: 'default'
  };

  const progressPercentage = course.progress || 0;
  const completedAssignments = course.assignments ? course.assignments.filter(a => a.completed).length : 0;
  const totalAssignments = course.assignments ? course.assignments.length : 0;

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

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 bg-gray-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>

          {/* Edit Mode Toggle */}
          <button
          data-testid="edit-mode"
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isEditMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {isEditMode ? <CheckCircle className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            {isEditMode ? 'Finish Editing' : 'Edit Course'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Course Image */}
          <div className="relative w-full lg:w-80 h-48 lg:h-60 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={newImageUrl || course.imageUrl || placeholderImage}
              alt={course.title}
              fill
              className="object-cover"
            />
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: customization.imageOverlay }}
            />
            
            {/* Grade Badge */}
            {course.grade && (
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(course.grade)}`}>
                  Grade: {course.grade}
                </span>
              </div>
            )}

            {/* Customization Button */}
            {isEditMode && (
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsCustomizing(!isCustomizing)}
                  className="bg-gray-900/90 text-gray-300 p-2 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm"
                >
                  <Palette className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              {course.title}
            </h1>
            
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <User className="w-5 h-5" />
              <span className="text-lg">{course.instructor}</span>
            </div>

            {course.description && (
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                {course.description}
              </p>
            )}

            {/* Course Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Progress</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {progressPercentage}%
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Assignments</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {completedAssignments}/{totalAssignments}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Category</span>
                </div>
                <div className="text-sm font-medium text-white">
                  {course.category || 'General'}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Difficulty</span>
                </div>
                <div className="text-sm font-medium text-white">
                  {course.difficulty || 'Intermediate'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Progress Overview */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>Course Progress</h2>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-gray-300">Overall Progress</span>
                <span className="font-medium text-white">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${progressPercentage}%`,
                    backgroundColor: customization.accentColor 
                  }}
                />
              </div>
            </div>
          </div>

          {/* Assignments List */}
          {course.assignments && course.assignments.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>Assignments</h2>
              
              <div className="space-y-4">
                {course.assignments.map((assignment) => (
                  <div 
                    key={assignment.id}
                    className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {assignment.completed ? (
                        <CheckCircle 
                          className="w-6 h-6" 
                          style={{ color: customization.accentColor }}
                        />
                      ) : (
                        <Clock className="w-6 h-6 text-orange-500" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-medium ${assignment.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {assignment.title}
                      </h3>
                      {assignment.due && (
                        <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                          <Calendar className="w-4 h-4" />
                          Due: {new Date(assignment.due).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assignment.completed 
                          ? 'bg-green-900/50 text-green-300'
                          : 'bg-yellow-900/50 text-yellow-300'
                      }`}>
                        {assignment.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {isCustomizing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Customize {course.title}
              </h3>
              <button
                onClick={() => setIsCustomizing(false)}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('image')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'image'
                    ? 'border-b-2 border-blue-500 text-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Image
              </button>
              <button
                onClick={() => setActiveTab('overlay')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'overlay'
                    ? 'border-b-2 border-blue-500 text-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Sliders className="w-4 h-4" />
                Overlay
              </button>
              <button
                onClick={() => setActiveTab('colors')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'colors'
                    ? 'border-b-2 border-blue-500 text-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
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
                        src={newImageUrl || course.imageUrl || placeholderImage}
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
                      className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-900/50 file:text-blue-300 hover:file:bg-blue-800/50 cursor-pointer"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      Upload a new image for this course
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'overlay' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">
                    Choose an overlay effect for the course image
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {overlayOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOverlayChange(option.value)}
                        className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
                          customization.imageOverlay === option.value
                            ? 'border-blue-500 bg-blue-900/20 text-blue-300'
                            : 'border-gray-700 text-gray-300 hover:border-gray-600'
                        }`}
                      >
                        <div
                          className="w-full h-8 rounded mb-2"
                          style={{
                            background: `linear-gradient(${option.value}, ${option.value}), linear-gradient(45deg, #374151, #1f2937)`
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
                  <p className="text-sm text-gray-400">
                    Choose an accent color for progress bars and buttons
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {accentColorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleAccentColorChange(color.value)}
                        className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                          customization.accentColor === color.value
                            ? 'border-gray-200 scale-110'
                            : 'border-gray-700 hover:scale-105'
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
            <div className="flex justify-end gap-3 p-4 border-t border-gray-700">
              <button
                onClick={() => setIsCustomizing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}