"use client";

import React, { useState, useEffect } from 'react';

// For prototyping WIP
const FiPlus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

const FiX = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const FiHome = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const FiBook = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const FiBell = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const FiCalendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const FiTrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const FiSettings = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// WIP
const renderIcon = (iconName, className) => {
  switch (iconName) {
    case 'home':
      return <FiHome className={className} />;
    case 'book':
      return <FiBook className={className} />;
    case 'bell':
      return <FiBell className={className} />;
    case 'calendar':
      return <FiCalendar className={className} />;
    case 'trending-up':
      return <FiTrendingUp className={className} />;
    case 'settings':
      return <FiSettings className={className} />;
    default:
      return <FiHome className={className} />;
  }
};

const defaultTabs = [
  { id: 'dashboard', name: 'Dashboard', icon: 'home', href: '#dashboard' },
  { id: 'courses', name: 'Courses', icon: 'book', href: '#courses', hasDropdown: true },
  { id: 'announcements', name: 'Announcements', icon: 'bell', href: '#announcements' },
];

const availableTabs = [
  { id: 'calendar', name: 'Calendar', icon: 'calendar', href: '#calendar' },
  { id: 'analytics', name: 'Analytics', icon: 'trending-up', href: '#analytics' },
  { id: 'settings', name: 'Settings', icon: 'settings', href: '#settings' },
];

export default function CustomizableSidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tabs, setTabs] = useState(defaultTabs);
  const [showAddMenu, setShowAddMenu] = useState(false);

  useEffect(() => {
    const savedTabs = localStorage.getItem('sidebarTabs');
    if (savedTabs) {
      setTabs(JSON.parse(savedTabs));
    }

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
    }
  }, []);

  const addTab = (tab) => {
    const newTabs = [...tabs, tab];
    setTabs(newTabs);
    localStorage.setItem('sidebarTabs', JSON.stringify(newTabs));
    setShowAddMenu(false);
  };

  const removeTab = (tabId) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    localStorage.setItem('sidebarTabs', JSON.stringify(newTabs));
  };

  const getAvailableTabs = () => {
    return availableTabs.filter(tab => !tabs.find(t => t.id === tab.id));
  };

  return (
    <aside className="group relative flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-16 hover:w-64 transition-all duration-200 ease-in-out overflow-visible">
      {/* NAVIGATION */}
      <nav className="flex-1 relative pt-4">
        <div className="scrollable-content overflow-y-auto overflow-x-hidden pl-2.5 pr-4 pb-20">
          <ul className="space-y-1">
            {tabs.map((tab) => (
              <li key={tab.id}>
                {tab.hasDropdown ? (
                  <details className="group/dropdown">
                    <summary className="flex items-center px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg cursor-pointer font-roboto">
                      {renderIcon(tab.icon, "flex-shrink-0 text-primary w-6 h-6")}
                      <span className="ml-3 text-base whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {tab.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (tab.id !== 'dashboard') removeTab(tab.id);
                        }}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                      >
                        {tab.id !== 'dashboard' && <FiX className="w-4 h-4" />}
                      </button>
                    </summary>
                    <ul className="mt-1 space-y-1 pl-8">
                      <li>
                        <a href="#course1" className="flex items-center px-2 py-2 text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg font-roboto">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">Course 1</span>
                        </a>
                      </li>
                      <li>
                        <a href="#course2" className="flex items-center px-2 py-2 text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg font-roboto">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">Course 2</span>
                        </a>
                      </li>
                    </ul>
                  </details>
                ) : (
                  <div className="flex items-center">
                    <a
                      href={tab.href}
                      className="flex items-center px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg font-roboto flex-1"
                    >
                      {renderIcon(tab.icon, "flex-shrink-0 text-primary w-6 h-6")}
                      <span className="ml-3 text-base whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {tab.name}
                      </span>
                    </a>
                    {tab.id !== 'dashboard' && (
                      <button
                        onClick={() => removeTab(tab.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 p-1 mr-2"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </li>
            ))}

            {/* Add Tab Button */}
            <li className="relative">
              <button
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="w-full flex items-center px-2 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-roboto transition-colors"
              >
                <FiPlus className="flex-shrink-0 w-6 h-6" />
                <span className="ml-3 text-base whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Add Tab
                </span>
              </button>

              {/* Add Tab Modal - Inside Sidebar */}
              {showAddMenu && getAvailableTabs().length > 0 && (
                <div className="mt-2 mx-1 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600 mb-2">
                    Available Tabs
                  </div>
                  {getAvailableTabs().map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => addTab(tab)}
                      className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      {renderIcon(tab.icon, "w-4 h-4 mr-3 text-primary")}
                      {tab.name}
                    </button>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {showAddMenu && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowAddMenu(false)}
        />
      )}
    </aside>
  );
}