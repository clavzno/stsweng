"use client";

import React, { useState, useEffect } from 'react';

// Custom Icons using brand color (monochrome filled)
const Icons = {
  Book: () => (
    <svg className="w-6 h-6" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
    </svg>
  ),
  Assignment: () => (
    <svg className="w-6 h-6" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
    </svg>
  ),
  Announcement: () => (
    <svg className="w-6 h-6" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
    </svg>
  ),
  Chart: () => (
    <svg className="w-6 h-6" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>
  ),
  Document: () => (
    <svg className="w-6 h-6" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  ),
  Chat: () => (
    <svg className="w-6 h-6" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="#4AD147" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M6 18L18 6M6 6l12 12"/>
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  ),
  TrendUp: () => (
    <svg className="w-5 h-5" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
    </svg>
  ),
  Upload: () => (
    <svg className="w-12 h-12" fill="#0D122C" viewBox="0 0 24 24">
      <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
    </svg>
  ),
  GripVertical: () => (
    <svg className="w-5 h-5" fill="#0D122C" viewBox="0 0 24 24">
      <circle cx="9" cy="12" r="1"/>
      <circle cx="9" cy="5" r="1"/>
      <circle cx="9" cy="19" r="1"/>
      <circle cx="15" cy="12" r="1"/>
      <circle cx="15" cy="5" r="1"/>
      <circle cx="15" cy="19" r="1"/>
    </svg>
  )
};

// Spinner Component
const Spinner = ({ size = "md", color = "#526CF4" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#E5E7EB" strokeWidth="2"/>
        <path d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z" fill={color}/>
      </svg>
    </div>
  );
};

// Loading Components
const SkeletonLoader = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
    ))}
  </div>
);

const LoadingCard = ({ lines = 2, className = "" }) => (
  <div className={`p-6 bg-white rounded-xl border border-gray-200 ${className}`}>
    <SkeletonLoader lines={lines} />
  </div>
);

// Draggable Bento Grid Item
const BentoGridItem = ({ 
  children, 
  className = "", 
  isDragging = false, 
  onDragStart, 
  onDragEnd,
  draggable = true 
}) => {
  return (
    <div
      className={`
        group bg-white rounded-2xl shadow-lg hover:shadow-xl 
        transform transition-all duration-300 hover:-translate-y-1 
        cursor-pointer overflow-hidden border border-gray-100
        ${isDragging ? 'opacity-50 scale-95' : ''}
        ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}
        ${className}
      `}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {draggable && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Icons.GripVertical />
        </div>
      )}
      {children}
    </div>
  );
};

// Sidebar Component
const Sidebar = () => (
  <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
    <div className="p-6">
      <h2 className="text-xl font-bold" style={{ color: '#0D122C' }}>Learning Hub</h2>
    </div>
    <nav className="flex-1 p-4">
      <div className="space-y-2">
        {[
          { icon: Icons.Book, label: 'Dashboard', active: true },
          { icon: Icons.Assignment, label: 'Courses' },
          { icon: Icons.Chart, label: 'Progress' },
          { icon: Icons.Chat, label: 'Messages' },
          { icon: Icons.User, label: 'Profile' }
        ].map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active 
                ? 'text-white' 
                : 'hover:bg-gray-100'
            }`}
            style={item.active ? { backgroundColor: '#526CF4' } : { color: '#0D122C' }}
          >
            <item.icon />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  </div>
);

// Modal Components
const AnnouncementsModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const announcements = [
    { 
      id: 1, 
      title: 'Welcome to the course!', 
      content: 'We are excited to have you here. Please check the syllabus and upcoming assignments.',
      date: '2025-03-30',
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Assignment 1 Due Soon', 
      content: 'Please submit your MCO1 by April 5th. Late submissions will be penalized.',
      date: '2025-04-01',
      priority: 'urgent'
    },
    { 
      id: 3, 
      title: 'Office Hours Update', 
      content: 'Office hours this week will be moved to Thursday 2-4 PM instead of Tuesday.',
      date: '2025-04-03',
      priority: 'medium'
    },
  ];

  const priorityColors = {
    urgent: '#FF5757',
    high: '#526CF4',
    medium: '#F38735'
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold" style={{ color: '#0D122C' }}>Course Announcements</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icons.Close />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-96">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 border border-gray-200 rounded-xl">
                  <SkeletonLoader lines={3} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className="p-4 rounded-xl border-l-4 bg-gray-50"
                  style={{ borderLeftColor: priorityColors[announcement.priority] }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold" style={{ color: '#0D122C' }}>{announcement.title}</h3>
                    <span className="text-sm text-gray-500">{announcement.date}</span>
                  </div>
                  <p className="text-gray-600">{announcement.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-white rounded-xl hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#0D122C' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const AssignmentsModal = ({ isOpen, onClose }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const assignments = [
    { 
      id: 1, 
      title: 'MCO1 - Project Proposal', 
      instructions: 'Upload a PDF file outlining your project idea. Include problem statement, proposed solution, timeline, and expected deliverables. Maximum 5 pages.',
      dueDate: 'April 5, 2025',
      points: 100,
      status: 'pending',
      submissionType: 'file'
    },
    { 
      id: 2, 
      title: 'MCO2 - Project Update', 
      instructions: 'Upload a PDF file with an update on your progress. Include what has been completed, current challenges, and revised timeline if necessary.',
      dueDate: 'April 15, 2025',
      points: 150,
      status: 'not-available',
      submissionType: 'file'
    },
    { 
      id: 3, 
      title: 'Quiz 1 - Unit Testing', 
      instructions: 'Complete the online quiz about unit testing concepts, frameworks, and best practices. 20 questions, 30 minutes time limit.',
      dueDate: 'April 8, 2025',
      points: 50,
      status: 'completed',
      submissionType: 'quiz'
    },
  ];

  const FileUploader = ({ assignment }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setUploadedFile(e.dataTransfer.files[0]);
      }
    };

    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setUploadedFile(e.target.files[0]);
      }
    };

    const handleSubmit = async () => {
      if (!uploadedFile) return;
      
      setUploadLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        alert('Assignment submitted successfully!');
        setUploadedFile(null);
        setSelectedAssignment(null);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setUploadLoading(false);
      }
    };

    return (
      <div className="mt-4">
        <div 
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-[#526CF4] bg-blue-50' 
              : 'border-gray-300 hover:border-[#526CF4]'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <Icons.Upload />
              <p className="text-lg font-medium mb-2" style={{ color: '#0D122C' }}>
                {uploadedFile ? uploadedFile.name : 'Drop your file here or click to browse'}
              </p>
              <p className="text-sm text-gray-500">
                PDF, DOC, DOCX files only (Max: 10MB)
              </p>
            </div>
          </label>
        </div>
        
        {uploadedFile && (
          <div className="mt-4 flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#4AD147', color: 'white' }}>
            <div className="flex items-center">
              <Icons.Check />
              <span className="text-sm ml-2">{uploadedFile.name}</span>
            </div>
            <button
              onClick={() => setUploadedFile(null)}
              className="text-white hover:opacity-80 transition-colors"
            >
              <Icons.Close />
            </button>
          </div>
        )}

        <button 
          onClick={handleSubmit}
          disabled={!uploadedFile || uploadLoading}
          className={`w-full mt-4 px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center ${
            uploadedFile && !uploadLoading
              ? 'text-white hover:opacity-90' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={uploadedFile && !uploadLoading ? { backgroundColor: '#526CF4' } : {}}
        >
          {uploadLoading && <Spinner size="sm" color="white" className="mr-2" />}
          {uploadLoading ? 'Submitting Assignment...' : 'Submit Assignment'}
        </button>
      </div>
    );
  };

  if (selectedAssignment) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#0D122C' }}>{selectedAssignment.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>Due: {selectedAssignment.dueDate}</span>
                  <span>Points: {selectedAssignment.points}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icons.Close />
              </button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#0D122C' }}>Instructions</h3>
              <p className="text-gray-600 leading-relaxed">{selectedAssignment.instructions}</p>
            </div>

            {selectedAssignment.submissionType === 'file' && selectedAssignment.status !== 'completed' && (
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#0D122C' }}>Submit Your Work</h3>
                <FileUploader assignment={selectedAssignment} />
              </div>
            )}

            {selectedAssignment.status === 'completed' && (
              <div className="p-4 rounded-xl border" style={{ backgroundColor: '#4AD147', borderColor: '#4AD147', color: 'white' }}>
                <div className="flex items-center">
                  <Icons.Check />
                  <span className="ml-2 font-medium">Assignment Completed</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {uploadLoading && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-60">
            <div className="bg-white rounded-2xl p-6 flex items-center space-x-3">
              <Spinner />
              <span style={{ color: '#0D122C' }}>Uploading your assignment...</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  const statusColors = {
    completed: '#4AD147',
    pending: '#F38735',
    'not-available': '#0D122C'
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold" style={{ color: '#0D122C' }}>Course Assignments</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icons.Close />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-96">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <LoadingCard key={i} lines={2} className="h-28" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div 
                  key={assignment.id} 
                  className="p-4 bg-gray-50 rounded-2xl border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1" style={{ color: '#0D122C' }}>{assignment.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span>Due: {assignment.dueDate}</span>
                        <span>Points: {assignment.points}</span>
                      </div>
                    </div>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: statusColors[assignment.status] }}
                    >
                      {assignment.status === 'completed' ? 'Completed' : 
                       assignment.status === 'pending' ? 'Pending' : 'Not Available'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedAssignment(assignment)}
                    className={`w-full px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      assignment.status === 'not-available' 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'text-white hover:opacity-90'
                    }`}
                    style={assignment.status !== 'not-available' ? { backgroundColor: '#526CF4' } : {}}
                    disabled={assignment.status === 'not-available'}
                  >
                    {assignment.status === 'not-available' ? 'Not Available Yet' : 'View Assignment'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-white rounded-xl hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#0D122C' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Course Page Component
export default function CoursePage() {
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
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCourseData({
          id: 1,
          title: '1243 STSWENG SS1',
          description: 'Advanced Software Engineering with modern practices and methodologies',
          instructor: 'Jordan Aiko Deja',
          progress: 75
        });
      } catch (error) {
        console.error('Failed to load course data:', error);
      } finally {
        setPageLoading(false);
      }
    };

    loadCourseData();
  }, []);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetItem.id) return;

    const newItems = [...bentoItems];
    const draggedIndex = newItems.findIndex(item => item.id === draggedItem.id);
    const targetIndex = newItems.findIndex(item => item.id === targetItem.id);
    
    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    
    setBentoItems(newItems);
    setDraggedItem(null);
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderBentoItem = (item) => {
    const sizeClasses = {
      small: 'col-span-1 row-span-1',
      medium: 'col-span-1 md:col-span-2 row-span-1',
      large: 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2'
    };

    const itemConfigs = {
      modules: {
        title: 'Modules',
        subtitle: 'Course content & lessons',
        icon: Icons.Book,
        bgColor: '#526CF4',
        stats: '3 modules available',
        onClick: () => openModal('modules')
      },
      assignments: {
        title: 'Assignments',
        subtitle: 'Tasks & submissions',
        icon: Icons.Assignment,
        bgColor: '#4AD147',
        stats: '2 pending assignments',
        onClick: () => openModal('assignments')
      },
      announcements: {
        title: 'Announcements',
        subtitle: 'Latest updates',
        icon: Icons.Announcement,
        bgColor: '#F38735',
        stats: '3 new announcements',
        onClick: () => openModal('announcements')
      },
      grades: {
        title: 'Grades',
        subtitle: 'Your performance',
        icon: Icons.Chart,
        bgColor: '#FF5757',
        stats: 'Current Grade: A-',
        onClick: () => {}
      },
      syllabus: {
        title: 'Syllabus',
        subtitle: 'Course outline',
        icon: Icons.Document,
        bgColor: '#526CF4',
        stats: 'Download PDF',
        onClick: () => {}
      },
      discussions: {
        title: 'Discussions',
        subtitle: 'Class forum',
        icon: Icons.Chat,
        bgColor: '#F38735',
        stats: '5 new posts',
        onClick: () => {}
      }
    };

    const config = itemConfigs[item.type];
    if (!config) return null;

    return (
      <BentoGridItem
        key={item.id}
        className={`${sizeClasses[item.size]} ${item.size === 'large' ? 'p-8' : 'p-6'}`}
        isDragging={draggedItem?.id === item.id}
        onDragStart={(e) => handleDragStart(e, item)}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, item)}
      >
        <div onClick={config.onClick} className="h-full flex flex-col cursor-pointer">
          <div className="flex items-center mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ backgroundColor: config.bgColor }}
            >
              <config.icon />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-bold" style={{ color: '#0D122C' }}>{config.title}</h3>
              <p className="text-sm text-gray-600">{config.subtitle}</p>
            </div>
          </div>
          
          {item.size === 'large' && (
            <div className="flex-1 mb-4">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-center">
                  <div className="text-2xl font-bold" style={{ color: '#0D122C' }}>3</div>
                  <div className="text-sm text-gray-600">Active Modules</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-center">
                  <div className="text-2xl font-bold" style={{ color: '#4AD147' }}>75%</div>
                  <div className="text-sm text-gray-600">Progress</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <span>{config.stats}</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </BentoGridItem>
    );
  };

  if (pageLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="p-8" style={{ background: 'linear-gradient(135deg, #526CF4 0%, #0D122C 100%)' }}>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl animate-pulse"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-white/20 rounded w-1/2 animate-pulse"></div>
                  <div className="h-6 bg-white/20 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-white/20 rounded w-1/3 animate-pulse"></div>
                  <div className="h-3 bg-white/20 rounded-full w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <LoadingCard key={i} lines={2} className="h-32" />
              ))}
            </div>

            <div className="fixed bottom-6 right-6 bg-white rounded-full p-4 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Spinner size="sm" />
                <span className="text-sm text-gray-600">Loading course...</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Course Header */}
        <div className="p-8 text-white" style={{ background: 'linear-gradient(135deg, #526CF4 0%, #0D122C 100%)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <Icons.Book />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{courseData?.title}</h1>
                <p className="text-xl text-white/80 mb-4">{courseData?.description}</p>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center">
                    <Icons.User />
                    <span className="ml-2">{courseData?.instructor}</span>
                  </div>
                  <div className="flex items-center">
                    <Icons.TrendUp />
                    <span className="ml-2">{courseData?.progress}% Complete</span>
                  </div>
                </div>
                
                <div className="mt-4 w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${courseData?.progress}%`,
                      background: 'linear-gradient(90deg, #4AD147 0%, #F38735 100%)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="max-w-6xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#0D122C' }}>Course Dashboard</h2>
            <p className="text-gray-600">Drag and drop to customize your layout</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr mb-8">
            {bentoItems.map(item => renderBentoItem(item))}
          </div>

          {/* Recent Activity Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0D122C' }}>Recent Activity</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#0D122C' }}>
                  <Icons.Clock />
                  <span className="ml-2">Upcoming Deadlines</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#FF5757', color: 'white' }}>
                    <div>
                      <p className="font-medium">MCO1 - Project Proposal</p>
                      <p className="text-sm opacity-90">Due in 2 days</p>
                    </div>
                    <span className="font-bold">Apr 5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#F38735', color: 'white' }}>
                    <div>
                      <p className="font-medium">Quiz 1 - Unit Testing</p>
                      <p className="text-sm opacity-90">Due in 5 days</p>
                    </div>
                    <span className="font-bold">Apr 8</span>
                  </div>
                </div>
              </div>

              {/* Recent Grades */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#0D122C' }}>
                  <Icons.Check />
                  <span className="ml-2">Recent Grades</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#4AD147', color: 'white' }}>
                    <div>
                      <p className="font-medium">Midterm Exam</p>
                      <p className="text-sm opacity-90">Submitted Mar 28</p>
                    </div>
                    <span className="font-bold text-lg">92/100</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#526CF4', color: 'white' }}>
                    <div>
                      <p className="font-medium">Quiz 0 - Introduction</p>
                      <p className="text-sm opacity-90">Submitted Mar 25</p>
                    </div>
                    <span className="font-bold text-lg">85/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AnnouncementsModal isOpen={activeModal === 'announcements'} onClose={closeModal} />
        <AssignmentsModal isOpen={activeModal === 'assignments'} onClose={closeModal} />
      </main>
    </div>
  );
}