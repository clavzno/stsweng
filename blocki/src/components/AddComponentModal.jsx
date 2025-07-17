import React from 'react';

export default function AddComponentModal({ isOpen, onClose, onAddComponent }) {
  if (!isOpen) return null;

  const components = [
    { 
      id: 'courses', 
      name: 'Courses List',
      description: 'Manage your course schedule',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          <path d="M8 7h8M8 11h6"/>
        </svg>
      ),
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'calendar', 
      name: 'Calendar',
      description: 'Track important dates',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
          <line x1="16" x2="16" y1="2" y2="6"/>
          <line x1="8" x2="8" y1="2" y2="6"/>
          <line x1="3" x2="21" y1="10" y2="10"/>
          <rect width="4" height="4" x="8" y="14" rx="1"/>
        </svg>
      ),
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 'tracker', 
      name: 'Study Tracker',
      description: 'Monitor your progress',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/>
          <path d="m19 9-5 5-4-4-3 3"/>
          <circle cx="9" cy="9" r="1"/>
          <circle cx="14" cy="14" r="1"/>
          <circle cx="19" cy="9" r="1"/>
        </svg>
      ),
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'pomodoro', 
      name: 'Pomodoro Timer',
      description: 'Focus with time blocks',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
          <path d="M8 2h8"/>
        </svg>
      ),
      color: 'from-red-500 to-red-600'
    },
    { 
      id: 'pixeltracker', // Changed from 'PixelTracker' to 'pixeltracker' to match the component mapping
      name: 'Pixel Tracker',
      description: 'Reveal an image by completing tasks.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="6" height="6" rx="1"></rect>
          <rect x="14" y="4" width="6" height="6" rx="1"></rect>
          <rect x="4" y="14" width="6" height="6" rx="1"></rect>
          <rect x="14" y="14" width="6" height="6" rx="1"></rect>
        </svg>
      ),
      color: 'from-yellow-500 to-orange-600'
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-roboto font-bold text-gray-800 dark:text-gray-100 mb-1">
              Add Component
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose a component to add to your dashboard
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors duration-200 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {components.map((component) => (
              <button
                key={component.id}
                onClick={() => onAddComponent(component.id)}
                className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-transparent dark:hover:border-transparent transition-all duration-300 hover:shadow-xl hover:scale-105 text-left p-6"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${component.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative flex flex-col items-start">
                  {/* Icon container with gradient background */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${component.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                    <div className="text-white">
                      {component.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-roboto font-semibold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    {component.name}
                  </h3>
                  <p className="text-sm font-roboto text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {component.description}
                  </p>
                </div>
                
                {/* Plus icon that appears on hover */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-lg border border-gray-200 dark:border-gray-600">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-400">
                    <line x1="12" x2="12" y1="5" y2="19"/>
                    <line x1="5" x2="19" y1="12" y2="12"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-lg font-roboto font-medium transition-colors duration-200 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}