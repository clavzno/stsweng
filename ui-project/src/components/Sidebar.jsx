import React from 'react';
import singleLogo from '../assets/images/logo_single.png';
import blockiLogo from '../assets/images/logo_full.png';
import profilePic from '../assets/images/profilepic.png';

export default function Sidebar() {
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
          {/* Full logo (expanded) */}
          <img
            src={blockiLogo}
            alt="blocki full logo"
            className="h-8 w-auto hidden group-hover:block"
          />
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 relative">
        <div className="scrollable-content overflow-y-scroll pr-4 pt-4 pb-24">
          <ul className="space-y-1">
            {/* Dashboard Link */}
            <li>
              <a
                href="#!"
                className="
                  flex items-center px-4 py-2
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  rounded-lg font-roboto text-gray-700 dark:text-gray-200
                "
              >
                {/* Dashboard icon (fill changed to #526CF4) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#526CF4"
                  className="flex-shrink-0"
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
                  rounded-lg cursor-pointer font-roboto text-gray-700 dark:text-gray-200
                ">
                  {/* Courses icon (fill changed to #526CF4) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#526CF4"
                    className="flex-shrink-0"
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
                        rounded-lg font-roboto text-gray-600 dark:text-gray-300
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#526CF4"
                        className="flex-shrink-0"
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
                        rounded-lg font-roboto text-gray-600 dark:text-gray-300
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#526CF4"
                        className="flex-shrink-0"
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
                        rounded-lg font-roboto text-gray-600 dark:text-gray-300
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#526CF4"
                        className="flex-shrink-0"
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
          </ul>
        </div>

        {/* Profile Section */}
        <div className="
          absolute left-0 right-0 flex items-center px-4 py-3
          border-t border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-900
          bottom-3
        ">
          <img
            src={profilePic}
            alt="Profile"
            className="h-8 w-8 rounded-full flex-shrink-0 border-2 border-[#526CF4]"
          />
          <div className="ml-3 flex-1 font-roboto">
            <p className="text-gray-800 dark:text-gray-100 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Aza Velasquez
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              almira_velasquez@dlsu.edu.ph
            </p>
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
