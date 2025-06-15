import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import singleLogo from '../assets/images/logo_single.png';
import blockiLogo from '../assets/images/logo_full.png';
import blockiLogoLight from '../assets/images/logo_full_light.png';
import profilePic from '../assets/images/profilepic.png';

export default function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { logout } = useAuth();

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <aside className="group relative flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-16 hover:w-64 transition-all duration-200 ease-in-out overflow-hidden">
      {/* LOGO */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <div className="relative flex items-center">
          {/* Blocki icon (collapsed) */}
          <img
            src={singleLogo}
            alt="blocki icon"
            className="h-8 w-auto block group-hover:hidden"
          />
          {/* Full logo (expanded) - changes based on dark/light mode */}
          <img
            src={isDarkMode ? blockiLogoLight : blockiLogo}
            alt="blocki full logo"
            className="h-8 w-auto hidden group-hover:block"
          />
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 relative">
        <div className="scrollable-content overflow-y-hidden overflow-x-hidden pr-4 pt-4 pb-20">
          <ul className="space-y-1">
            {/* Dashboard Link */}
            <li>
              <a
                href="#!"
                className="
                  flex items-center px-4 py-2
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  rounded-lg text-gray-700 dark:text-gray-200 font-roboto
                "
              >
                {/* Dashboard icon (fill changed to #526CF4) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="flex-shrink-0 text-primary"
                >
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                  <rect x="13" y="3" width="8" height="5" rx="1" />
                  <rect x="3" y="13" width="5" height="8" rx="1" />
                  <rect x="10" y="13" width="11" height="8" rx="1" />
                </svg>
                <span className="ml-3 text-base whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Dashboard
                </span>
              </a>
            </li>

            {/* Courses Dropdown */}
            <li>
              <details className="group">
                <summary className="
                  flex items-center px-4 py-2
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  rounded-lg cursor-pointer text-gray-700 dark:text-gray-200 font-roboto
                ">
                  {/* Courses icon (fill changed to #526CF4) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="flex-shrink-0 text-primary"
                  >
                    <rect x="3" y="16" width="18" height="3" rx="1" />
                    <rect x="3" y="11" width="18" height="3" rx="1" />
                    <rect x="3" y="6" width="18" height="3" rx="1" />
                  </svg>
                  <span className="ml-3 text-base whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Courses
                  </span>
                  <svg
                    className="ml-auto h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <ul className="mt-1 space-y-1 pl-12">
                  {/* Course 1 */}
                  <li>
                    <a
                      href="#!"
                      className="
                        flex items-center px-4 py-2
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        rounded-lg text-gray-600 dark:text-gray-300 font-roboto
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="flex-shrink-0 text-primary"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="1" />
                        <rect x="6" y="7" width="12" height="2" />
                        <rect x="6" y="11" width="10" height="2" />
                        <rect x="6" y="15" width="8" height="2" />
                      </svg>
                      <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        Course 1
                      </span>
                    </a>
                  </li>
                  {/* Course 2 */}
                  <li>
                    <a
                      href="#!"
                      className="
                        flex items-center px-4 py-2
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        rounded-lg text-gray-600 dark:text-gray-300 font-roboto
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="flex-shrink-0 text-primary"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="1" />
                        <rect x="6" y="7" width="12" height="2" />
                        <rect x="6" y="11" width="10" height="2" />
                        <rect x="6" y="15" width="8" height="2" />
                      </svg>
                      <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        Course 2
                      </span>
                    </a>
                  </li>
                  {/* Course 3 */}
                  <li>
                    <a
                      href="#!"
                      className="
                        flex items-center px-4 py-2
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        rounded-lg text-gray-600 dark:text-gray-300 font-roboto
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="flex-shrink-0 text-primary"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="1" />
                        <rect x="6" y="7" width="12" height="2" />
                        <rect x="6" y="11" width="10" height="2" />
                        <rect x="6" y="15" width="8" height="2" />
                      </svg>
                      <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        Course 3
                      </span>
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <a href="#!" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-200 font-roboto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 text-primary">
                  <path d="M19.5 12.5c0-5.24-4.26-9.5-9.5-9.5s-9.5 4.26-9.5 9.5 4.26 9.5 9.5 9.5 9.5-4.26 9.5-9.5zm-17 0c0-4.13 3.37-7.5 7.5-7.5s7.5 3.37 7.5 7.5-3.37 7.5-7.5 7.5-7.5-3.37-7.5-7.5z"/>
                  <path d="M12 10.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"/>
                </svg>
                <span className="ml-3 text-base whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Announcements
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Profile Section - Fixed positioning and spacing */}
        <div className="
          absolute left-0 right-0 bottom-0
          border-t border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-900
          px-4 py-3 pb-6
        ">
          <div className="flex items-center">
            <img
              src={profilePic}
              alt="Profile"
              className="h-8 w-8 rounded-full flex-shrink-0 border-2 border-primary"
            />
            <div className="ml-3 flex-1 font-roboto min-w-0">
              <p className="text-gray-800 dark:text-gray-100 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity truncate">
                Aza Velasquez
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity truncate">
                almira_velasquez@dlsu.edu.ph
              </p>
            </div>
            
            {/* Button container with proper spacing */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={toggleDarkMode}
                className="
                  flex items-center justify-center
                  w-8 h-8 rounded-lg text-gray-700 dark:text-gray-200
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  transition-colors
                "
                title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
              
              <button
                onClick={logout}
                className="
                  flex items-center justify-center
                  w-8 h-8 rounded-lg text-gray-700 dark:text-gray-200
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  transition-colors
                "
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom rolling blocks */}
        <div className="custom-scrollbar-bottom">
          <div className="block"></div>
          <div className="block"></div>
          <div className="block"></div>
          <div className="block"></div>
          <div className="block"></div>
          <div className="block"></div>
        </div>
      </nav>
    </aside>
  );
}