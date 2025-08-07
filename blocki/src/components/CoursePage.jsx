"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ArrowLeft, FileText, Megaphone, BarChart3, MessageSquare } from 'lucide-react';

// Import components with proper paths - make sure these components exist and are properly exported
import CustomizableSidebar from './Sidebar';
import Header from './Header';
import CourseHeader from './course/CourseHeader';
import BentoGrid from './course/BentoGrid';
import RecentActivity from './course/RecentActivity';

// Modal imports - these should all be default exports
import AnnouncementsModal from './course/AnnouncementsModal';
import AssignmentsModal from './course/AssignmentsModal';
import ModulesModal from './course/ModulesModal';
import SyllabusModal from './course/SyllabusModal';
import GradesModal from './course/GradesModal';

// Import Spinner as named export
import { Spinner } from './course/LoadingComponents';

export default function CoursePage({courseId, onBackToDashboard = () => window.history.back() }) {
  const [activeModal, setActiveModal] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [bentoItems, setBentoItems] = useState([
    { id: 'modules', type: 'modules', size: 'large' },
    { id: 'assignments', type: 'assignments', size: 'medium' },
    { id: 'announcements', type: 'announcements', size: 'medium' },
    { id: 'grades', type: 'grades', size: 'small' },
    { id: 'syllabus', type: 'syllabus', size: 'small' },
    { id: 'discussions', type: 'discussions', size: 'medium' }
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      const res = await fetch('/api/canvas/course_page', {
        headers: {
          course_id: courseId
        }
      })
      
      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await res.json();
      try {
        setCourseData({
          id: data.id,
          title: data.course_code,
          description: data.name,
          instructor: data.teacher || 'Unknown Instructor',
          progress: 75,
          customization: {
            imageOverlay: 'rgba(0, 0, 0, 0.5)',
            accentColor: '#526CF4'
          }
        });
      } catch (error) {
        console.error('Failed to load course data:', error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  const handleSaveLayout = async () => {
    setSaveLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Course layout saved successfully');
    } catch (error) {
      console.error('Failed to save course layout:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleImageChange = (newImageUrl) => {
    setCourseData(prev => ({
      ...prev,
      imageUrl: newImageUrl
    }));
  };

  const handleCustomizationChange = (newCustomization) => {
    setCourseData(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        ...newCustomization
      }
    }));
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Add fallback components in case imports fail
  const SafeAnnouncementsModal = AnnouncementsModal || (() => null);
  const SafeAssignmentsModal = AssignmentsModal || (() => null);
  const SafeModulesModal = ModulesModal || (() => null);
  const SafeSyllabusModal = SyllabusModal || (() => null);
  const SafeGradesModal = GradesModal || (() => null);

  if (pageLoading) {
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {/* Header Skeleton */}
        <div className="h-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Skeleton */}
          <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Course Header Skeleton - Removed gradient, made neutral */}
            <div className="h-80 bg-gray-50 dark:bg-gray-900 p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="p-4 bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl h-28">
                    <div className="space-y-2">
                      {Array.from({ length: 2 }).map((_, j) => (
                        <div key={j} className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="fixed bottom-6 right-6 bg-transparent rounded-full p-4">
                <div className="flex items-center space-x-3">
                  <Spinner size="sm" />
                  <span className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>Loading course...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {Header && (
        <Header 
          isEditMode={isEditMode} 
          setIsEditMode={setIsEditMode}
          onSaveLayout={handleSaveLayout}
          saveLoading={saveLoading}
        />
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {CustomizableSidebar && <CustomizableSidebar />}
        
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Back Button */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>

          {/* Course Header */}
          {CourseHeader && (
            <CourseHeader 
              courseData={courseData} 
              onImageChange={handleImageChange}
              onCustomizationChange={handleCustomizationChange}
              isEditMode={isEditMode}
            />
          )}
          
          <div className="max-w-7xl mx-auto p-6">
            {/* Edit Mode Indicator */}
            {isEditMode && (
              <div className="mb-8">
                <div className="text-center md:text-left flex-1">
                  <p 
                    className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Customize your learning experience by dragging and reorganizing the modules below
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>Edit Mode Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Actions Section */}
            <div className="mb-8">
              <h3 
                className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}
              >
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <button 
                  onClick={() => openModal('assignments')}
                  className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group shadow-sm"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-3 mx-auto" style={{ backgroundColor: '#16a34a' }}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div 
                    className="font-medium text-gray-900 dark:text-white text-sm mb-1"
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
                  >
                    View Assignments
                  </div>
                  <div 
                    className="text-xs text-gray-500 dark:text-gray-400"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    2 pending
                  </div>
                </button>
                
                <button 
                  onClick={() => openModal('announcements')}
                  className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group shadow-sm"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-3 mx-auto" style={{ backgroundColor: '#ea580c' }}>
                    <Megaphone className="w-6 h-6 text-white" />
                  </div>
                  <div 
                    className="font-medium text-gray-900 dark:text-white text-sm mb-1"
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
                  >
                    Announcements
                  </div>
                  <div 
                    className="text-xs text-gray-500 dark:text-gray-400"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    3 new updates
                  </div>
                </button>

                <button 
                  onClick={() => openModal('grades')}
                  className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group shadow-sm"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-3 mx-auto" style={{ backgroundColor: '#dc2626' }}>
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div 
                    className="font-medium text-gray-900 dark:text-white text-sm mb-1"
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
                  >
                    Check Grades
                  </div>
                  <div 
                    className="text-xs text-gray-500 dark:text-gray-400"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Current: A-
                  </div>
                </button>

                <button 
                  onClick={() => openModal('discussions')}
                  className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group shadow-sm"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-3 mx-auto" style={{ backgroundColor: '#0891b2' }}>
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div 
                    className="font-medium text-gray-900 dark:text-white text-sm mb-1"
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
                  >
                    Discussions
                  </div>
                  <div 
                    className="text-xs text-gray-500 dark:text-gray-400"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    5 new posts
                  </div>
                </button>
              </div>
            </div>

            {/* Course Materials Header */}
            <div className="mb-6">
              <h3 
                className="text-2xl font-semibold text-gray-900 dark:text-white mb-2"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}
              >
                Course Materials
              </h3>
              <p 
                className="text-gray-600 dark:text-gray-400"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Organize and access your learning resources efficiently
              </p>
            </div>
            
            {BentoGrid && (
              <BentoGrid 
                bentoItems={bentoItems}
                setBentoItems={setBentoItems}
                openModal={openModal}
                isEditMode={isEditMode}
              />
            )}
            
            {RecentActivity && <RecentActivity />}
          </div>

          {/* Modals with safe rendering */}
          {SafeAnnouncementsModal && (
            <SafeAnnouncementsModal 
              isOpen={activeModal === 'announcements'} 
              onClose={closeModal} 
            />
          )}
          {SafeAssignmentsModal && (
            <SafeAssignmentsModal 
              isOpen={activeModal === 'assignments'} 
              onClose={closeModal} 
            />
          )}
          {SafeModulesModal && (
            <SafeModulesModal 
              isOpen={activeModal === 'modules'} 
              onClose={closeModal} 
            />
          )}
          {SafeSyllabusModal && (
            <SafeSyllabusModal 
              isOpen={activeModal === 'syllabus'} 
              onClose={closeModal} 
            />
          )}
          {SafeGradesModal && (
            <SafeGradesModal 
              isOpen={activeModal === 'grades'} 
              onClose={closeModal} 
            />
          )}
        </main>
      </div>

      {saveLoading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 flex items-center space-x-3">
            <Spinner />
            <span 
              className="text-gray-900 dark:text-white"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
            >
              Saving your layout...
            </span>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Roboto:wght@300;400;500;600;700&display=swap');
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Custom scrollbar for better UX when needed */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </div>
  );
}