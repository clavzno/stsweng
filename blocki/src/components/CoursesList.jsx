import React, { use, useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import placeholderImage from '../assets/images/placeholder.png';
import { Edit3, Check, Filter, Palette, Settings, X } from 'lucide-react';
import { CanvasAPI } from '@/vendor/CanvasAPI';
import {useSession} from 'next-auth/react';


// Theme presets updated with brand colors
const themes = {
  default: {
    name: 'Default',
    primary: '#526CF4',
    secondary: '#4AD147',
    accent: '#F38735'
  },
  energetic: {
    name: 'Energetic',
    primary: '#FF5757',
    secondary: '#F38735',
    accent: '#4AD147'
  },
  growth: {
    name: 'Growth',
    primary: '#4AD147',
    secondary: '#526CF4',
    accent: '#F38735'
  },
  warm: {
    name: 'Warm',
    primary: '#F38735',
    secondary: '#FF5757',
    accent: '#526CF4'
  },
  professional: {
    name: 'Professional',
    primary: '#0D122C',
    secondary: '#526CF4',
    accent: '#F38735'
  }
};

export default function CoursesList() {
  const { data: session, status } = useSession();

  const [isEditMode, setIsEditMode] = useState(false);
  const [showGrades, setShowGrades] = useState(true);
  const [showAssignments, setShowAssignments] = useState(true);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [courses, setCourses] = useState([
  //   {
  //     id: 1,
  //     title: 'STSWENG SS1',
  //     description: 'Advanced Software Engineering with modern practices and methodologies.',
  //     instructor: 'Jordan Aiko Deja',
  //     imageUrl: placeholderImage,
  //     progress: 75,
  //     category: 'Software Engineering',
  //     difficulty: 'Advanced',
  //     grade: 3.0,
  //     customization: {
  //       imageOverlay: 'rgba(13, 18, 44, 0.5)',
  //       accentColor: themes.default.primary,
  //       theme: 'default'
  //     },
  //     assignments: [
  //       { id: 1, title: 'Project Setup', due: '2025-08-15', completed: true },
  //       { id: 2, title: 'Requirements Analysis', due: '2025-08-22', completed: false },
  //       { id: 3, title: 'System Design', due: '2025-08-29', completed: false }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     title: 'STCLOUD S14',
  //     description: 'Introduction to Cloud Computing, AWS, and distributed systems.',
  //     instructor: 'Fritz Kevin Flores',
  //     imageUrl: placeholderImage,
  //     progress: 45,
  //     category: 'Cloud Computing',
  //     difficulty: 'Intermediate',
  //     grade: 3.5,
  //     customization: {
  //       imageOverlay: 'rgba(13, 18, 44, 0.5)',
  //       accentColor: themes.default.primary,
  //       theme: 'default'
  //     },
  //     assignments: [
  //       { id: 1, title: 'AWS Account Setup', due: '2025-08-10', completed: true },
  //       { id: 2, title: 'Lab 1: Introduction to AWS', due: '2025-08-17', completed: false }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     title: 'CSOPESY S19',
  //     description: 'In-depth study of operating systems principles and concepts.',
  //     instructor: 'Ren Tristan De La Cruz',
  //     imageUrl: placeholderImage,
  //     progress: 90,
  //     category: 'Computer Science',
  //     difficulty: 'Intermediate',
  //     grade: 4.0,
  //     customization: {
  //       imageOverlay: 'rgba(13, 18, 44, 0.5)',
  //       accentColor: themes.default.primary,
  //       theme: 'default'
  //     },
  //     assignments: [
  //       { id: 1, title: 'Process Scheduling Lab', due: '2025-08-12', completed: true },
  //       { id: 2, title: 'Final Project Proposal', due: '2025-08-25', completed: false }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     title: 'LCFILIB Y01',
  //     description: 'Pagbasa at Pagsulat sa Iba\'t Ibang Disiplina.',
  //     instructor: 'Mon Karlo Mangaran',
  //     imageUrl: placeholderImage,
  //     progress: 30,
  //     category: 'Filipino',
  //     difficulty: 'Beginner',
  //     grade: 2.5,
  //     customization: {
  //       imageOverlay: 'rgba(13, 18, 44, 0.5)',
  //       accentColor: themes.default.primary,
  //       theme: 'default'
  //     },
  //     assignments: [
  //       { id: 1, title: 'Pagsusuri ng Teksto', due: '2025-08-14', completed: true },
  //       { id: 2, title: 'Ulat Aklat', due: '2025-08-21', completed: false },
  //     ]
  //   },
  //   {
  //     id: 5,
  //     title: 'LASARE3 S11',
  //     description: 'A recollection course for spiritual and personal development.',
  //     instructor: 'Christian Peter Bangcaya',
  //     imageUrl: placeholderImage,
  //     progress: 60,
  //     category: 'Lasallian Studies',
  //     difficulty: 'Beginner',
  //     grade: 4.0,
  //     customization: {
  //       imageOverlay: 'rgba(13, 18, 44, 0.5)',
  //       accentColor: themes.default.primary,
  //       theme: 'default'
  //     },
  //     assignments: [
  //       { id: 1, title: 'Reflection Paper 1', due: '2025-08-16', completed: true },
  //       { id: 2, title: 'Final Reflection', due: '2025-08-23', completed: false }
  //     ]
  //   },
  //   {
  //     id: 6,
  //     title: 'LCLSTWO Y10',
  //     description: 'Exploring the life and works of St. John Baptist de La Salle.',
  //     instructor: 'Jefferson Acala',
  //     imageUrl: placeholderImage,
  //     progress: 85,
  //     category: 'Lasallian Studies',
  //     difficulty: 'Beginner',
  //     grade: 3.5,
  //     customization: {
  //       imageOverlay: 'rgba(13, 18, 44, 0.5)',
  //       accentColor: themes.default.primary,
  //       theme: 'default'
  //     },
  //     assignments: [
  //       { id: 1, title: 'De La Salle Biography Quiz', due: '2025-08-18', completed: true },
  //       { id: 2, title: 'Community Engagement Plan', due: '2025-08-26', completed: false }
  //     ]
  //   },
  //   {
  //     id: 7,
  //     title: 'GERIZAL Z45',
  //     description: 'A study of the life, works, and writings of Dr. Jose Rizal.',
  //     instructor: 'Angelo Christiane Arriola',
  //     imageUrl: placeholderImage,
  //     progress: 20,
  //     category: 'History',
  //     difficulty: 'Beginner',
  //     grade: 2.0,
  //     customization: {
  //       imageOverlay: 'rgba(13, 18, 44, 0.5)',
  //       accentColor: themes.default.primary,
  //       theme: 'default'
  //     },
  //     assignments: [
  //       { id: 1, title: 'Reading: Noli Me Tángere', due: '2025-08-20', completed: false },
  //       { id: 2, title: 'Film Review', due: '2025-08-27', completed: false },
  //     ]
  //   },
  //   {
  //       id: 8,
  //       title: 'PEDFOUR Z205',
  //       description: 'Physical Education 4: Team sports and recreational activities.',
  //       instructor: 'Carol Rodriguez',
  //       imageUrl: placeholderImage,
  //       progress: 50,
  //       category: 'Physical Education',
  //       difficulty: 'Beginner',
  //       grade: 4.0,
  //       customization: {
  //         imageOverlay: 'rgba(13, 18, 44, 0.5)',
  //         accentColor: themes.default.primary,
  //         theme: 'default'
  //       },
  //       assignments: [
  //         { id: 1, title: 'Basketball Skills Test', due: '2025-08-22', completed: true },
  //         { id: 2, title: 'Volleyball Tournament', due: '2025-09-05', completed: false },
  //       ]
  //   },
  //   {
  //       id: 9,
  //       title: 'SAS3000 S14',
  //       description: 'A non-academic course for university announcements and activities.',
  //       instructor: 'Remy Rose Poblete',
  //       imageUrl: placeholderImage,
  //       progress: 100,
  //       category: 'University Requirement',
  //       difficulty: 'Beginner',
  //       grade: 4.0,
  //       customization: {
  //         imageOverlay: 'rgba(13, 18, 44, 0.5)',
  //         accentColor: themes.default.primary,
  //         theme: 'default'
  //       },
  //       assignments: [
  //         { id: 1, title: 'University Survey', due: '2025-07-30', completed: true },
  //       ]
  //   }
  ]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/api/canvas/courses", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await res.json();
      setCourses(data);
    }
    fetchCourses();
  });


  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newCourses = [...courses];
    const draggedCourse = newCourses[draggedIndex];
    newCourses.splice(draggedIndex, 1);
    newCourses.splice(dropIndex, 0, draggedCourse);

    setCourses(newCourses);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleImageChange = (courseId, newImageUrl) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, imageUrl: newImageUrl }
        : course
    ));
  };

  const handleCustomizationChange = (courseId, customization) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, customization: { ...course.customization, ...customization } }
        : course
    ));
  };

  const applyThemeToAll = (themeName) => {
    const theme = themes[themeName];
    setCourses(courses.map(course => ({
      ...course,
      customization: {
        ...course.customization,
        accentColor: theme.primary,
        theme: themeName
      }
    })));
    setCurrentTheme(themeName);
    setShowThemeModal(false);
  };

  return (
    <div className="h-full flex flex-col space-y-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 flex-shrink-0 group">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}>
            My Courses
          </h1>
        </div>

        <div className={`flex items-center gap-3 transition-opacity duration-200 ${isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          {/* Theme Button */}
          <button
            onClick={() => setShowThemeModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
            title="Themes"
          >
            <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" />
            <span>Themes</span>
          </button>

          {/* Edit Mode Toggle */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isEditMode
                ? 'text-white hover:opacity-90'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            style={isEditMode ? { backgroundColor: '#526CF4' } : {}}
            title={isEditMode ? 'Finish Editing' : 'Edit Courses'}
          >
            {isEditMode ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Edit3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            )}
            <span>{isEditMode ? 'Finish Editing' : 'Edit Courses'}</span>
          </button>
        </div>
      </div>

      {/* Theme Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowThemeModal(false)}
              className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}>
                Choose Theme
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => applyThemeToAll(key)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      currentTheme === key
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {theme.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Mode Controls */}
      {isEditMode && (
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 flex-shrink-0" style={{ backgroundColor: 'rgba(82, 108, 244, 0.05)' }}>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}>
            Customize Your View
          </h3>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showGrades}
                onChange={(e) => setShowGrades(e.target.checked)}
                className="w-4 h-4 rounded focus:ring-2 accent-blue-600 dark:bg-gray-700 dark:border-gray-600"
                style={{ accentColor: '#526CF4' }}
              />
              <span className="text-sm text-gray-900 dark:text-gray-100">Show Grades</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showAssignments}
                onChange={(e) => setShowAssignments(e.target.checked)}
                className="w-4 h-4 rounded focus:ring-2 accent-blue-600 dark:bg-gray-700 dark:border-gray-600"
                style={{ accentColor: '#526CF4' }}
              />
              <span className="text-sm text-gray-900 dark:text-gray-100">Show Assignments</span>
            </label>
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 flex items-center gap-2">
            <Filter className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="currentColor" />
            Drag and drop courses to reorder them • Click course cards to customize colors and images
          </p>
        </div>
      )}

      {/* Scrollable Courses Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-4 px-2 py-2">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`transition-opacity duration-300 ${
                isEditMode ? 'cursor-move' : ''
              } ${draggedIndex === index ? 'opacity-30' : ''}`}
              draggable={isEditMode}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div className={`${isEditMode ? 'ring-2 dark:ring-red-400' : ''} rounded-lg h-full transition-all duration-200 group hover:scale-[1.01]`} 
                   style={isEditMode ? { ringColor: '#FF5757' } : {}}>
                <CourseCard
                  course={course}
                  onImageChange={handleImageChange}
                  onCustomizationChange={handleCustomizationChange}
                  showGrades={showGrades}
                  showAssignments={showAssignments}
                  isEditMode={isEditMode}
                  themes={themes}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
}