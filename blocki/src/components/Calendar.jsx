"use client";
import React, { useState } from 'react';

// Day Component
const Day = ({ dayObj, isToday, isSelected, onClick, view }) => {
  const { date, isCurrentMonth } = dayObj;

  let dayClasses = `flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 ease-in-out relative`;
  let dateNumberClasses = "text-lg";
  let weekdayTextClasses = "text-xs"; // Only for week view text

  if (view === 'week') {
    dayClasses += ' h-20 w-auto min-w-[3.5rem] md:h-24 py-1'; // w-auto allows grid to size based on 7 cols
  } else { // month view
    dayClasses += ' h-12 w-full md:h-16 aspect-square py-1'; // aspect-square for month cells
  }

  // Determine text color based on state
  let textColorClass;
  if (isSelected) {
    textColorClass = 'text-white dark:text-gray-100';
  } else if (isToday && (isCurrentMonth || view === 'week')) {
    textColorClass = 'text-primary dark:text-primary-light font-semibold';
  } else if (!isCurrentMonth && view === 'month') {
    textColorClass = 'text-gray-400 dark:text-gray-500'; // Muted for non-current month days
  } else {
    textColorClass = 'text-gray-700 dark:text-gray-300'; // Default
  }

  // Apply background and ring styles
  if (isSelected) {
    dayClasses += ' bg-primary dark:bg-primary-dark shadow-md';
  } else if (isToday && (isCurrentMonth || view === 'week')) {
    // Highlight for today if it's in the current month (month view) or any day (week view)
    dayClasses += ' bg-blue-100 dark:bg-blue-900/60 ring-1 ring-primary dark:ring-primary-light';
  } else if (isCurrentMonth || view === 'week') { 
    // Default hover for active days (current month or any day in week view)
    dayClasses += ' hover:bg-gray-200 dark:hover:bg-gray-700';
  } else { 
    // Muted hover for non-current month days (if they are clickable to change month)
     dayClasses += ' hover:bg-gray-100 dark:hover:bg-gray-800/50';
  }

  return (
    <div
      className={`${dayClasses} ${textColorClass}`} // Apply determined text color to the whole div
      onClick={onClick}
    >
      {view === 'week' && (
         <span className={`${weekdayTextClasses} ${isSelected ? 'opacity-80' : (!isCurrentMonth && view === 'month') ? 'opacity-70' : ''}`}>
            {date.toLocaleDateString('en-US', { weekday: 'short' })}
         </span>
      )}
      <span className={`${dateNumberClasses} ${isToday && !isSelected && (isCurrentMonth || view === 'week') ? 'font-bold' : ''}`}>{date.getDate()}</span>

      {/* Task Indicators - This is a placeholder. In a real app, fetch tasks for each day. */}
      { (isCurrentMonth || view === 'week') && (date.getDate() % 4 === 0 || date.getDate() % 7 === 1) &&
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex space-x-1">
            <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white/60' : 'bg-green-500 dark:bg-green-400'}`}></div>
            {date.getDate() % 3 === 0 && <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white/60' : 'bg-yellow-500 dark:bg-yellow-400'}`}></div>}
        </div>
      }
    </div>
  );
};

const Task = ({ time, title, description, icon, color }) => ( // color prop should include bg and text colors e.g. "bg-blue-200 text-blue-700 dark:bg-blue-700 dark:text-blue-200"
  <div className="flex items-start space-x-3 sm:space-x-4 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 w-12 sm:w-16 pt-1 text-right flex-shrink-0">{time}</div>
    <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm sm:text-base ${color}`}>
      {icon}
    </div>
    <div className="flex-grow min-w-0"> {/* min-w-0 for proper truncation in flex */}
      <h4 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white truncate">{title}</h4>
      {description && <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{description}</p>}
    </div>
    {/* Optional: Action button or indicator can be added here */}
  </div>
);

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [currentDisplayDate, setCurrentDisplayDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [view, setView] = useState('week'); // 'week' or 'month'
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date for accurate comparison

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0,0,0,0);
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      return { date: day, isCurrentMonth: true }; // For week view, all days are "current"
    });
  };

  const getMonthGridDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    
    const days = [];
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday of the first week

    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days = 42 cells for a typical month grid
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      day.setHours(0,0,0,0);
      days.push({
        date: day,
        isCurrentMonth: day.getMonth() === month,
      });
    }
    return days;
  };

  const daysToDisplay = view === 'week' ? getWeekDays(currentDisplayDate) : getMonthGridDays(currentDisplayDate);

  const handlePrev = () => {
    const newDisplayDate = new Date(currentDisplayDate);
    if (view === 'week') {
      newDisplayDate.setDate(currentDisplayDate.getDate() - 7);
    } else { // month view
      newDisplayDate.setMonth(currentDisplayDate.getMonth() - 1);
      newDisplayDate.setDate(1); // Go to the 1st of the prev month
    }
    setCurrentDisplayDate(newDisplayDate);
    setSelectedDate(new Date(newDisplayDate)); // Select the first day of the new view period
  };

  const handleNext = () => {
    const newDisplayDate = new Date(currentDisplayDate);
    if (view === 'week') {
      newDisplayDate.setDate(currentDisplayDate.getDate() + 7);
    } else { // month view
      newDisplayDate.setMonth(currentDisplayDate.getMonth() + 1);
      newDisplayDate.setDate(1); // Go to the 1st of the next month
    }
    setCurrentDisplayDate(newDisplayDate);
    setSelectedDate(new Date(newDisplayDate)); // Select the first day of the new view period
  };

  const handleDayClick = (dayObj) => {
    setSelectedDate(dayObj.date);
    // If in month view and clicked day is not in current month, switch month view to that day's month
    if (view === 'month' && dayObj.date.getMonth() !== currentDisplayDate.getMonth()) {
        setCurrentDisplayDate(new Date(dayObj.date.getFullYear(), dayObj.date.getMonth(), 1));
    }
  };

  // Mock tasks - replace with actual data fetching
  const getTasksForDate = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0,0,0,0);

    if (normalizedDate.getDate() === today.getDate() && normalizedDate.getMonth() === today.getMonth()) {
        return [
            { time: '09:00', title: 'Morning Standup', description: 'Team sync', icon: '🤝', color: 'bg-yellow-200 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200' },
            { time: '14:00', title: 'Code Review', description: 'Review PR #123', icon: '💻', color: 'bg-purple-200 text-purple-700 dark:bg-purple-700 dark:text-purple-200' },
        ];
    }
    if (normalizedDate.getDate() % 5 === 0) {
      return [
        { time: '10:00', title: 'Project Planning', description: 'Plan next sprint.', icon: '📅', color: 'bg-blue-200 text-blue-700 dark:bg-blue-700 dark:text-blue-200' },
      ];
    }
    if (normalizedDate.getDate() % 3 === 0) {
        return [
            { time: '16:30', title: 'Client Demo', description: 'Showcase new features.', icon: '🗣️', color: 'bg-green-200 text-green-700 dark:bg-green-700 dark:text-green-200' },
        ];
    }
    return [ // Default tasks if no specific logic matches for demonstration
        { time: '12:35', title: 'Add Your First Task', description: '0/5', icon: '➕', color: 'bg-red-200 text-red-700 dark:bg-red-700 dark:text-red-200' },
    ];
  };

  const tasksForSelectedDate = getTasksForDate(selectedDate);

  const headerText = view === 'week'
    ? `${currentDisplayDate.toLocaleDateString('en-US', { month: 'long' })} ${currentDisplayDate.toLocaleDateString('en-US', { day: 'numeric' })}${currentDisplayDate.getFullYear() !== today.getFullYear() ? `, ${currentDisplayDate.getFullYear()}` : ''}`
    : currentDisplayDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const weekDayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow text-gray-900 dark:text-white h-full flex flex-col">
      {/* Header: Month/Year, Prev/Next, View Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 order-1 sm:order-none">
          {headerText}
        </h2>
        <div className="flex items-center space-x-1 sm:space-x-2 mt-2 sm:mt-0 order-none sm:order-1">
          <div className="flex rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 p-0.5">
            <button
              onClick={() => setView('week')}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-md transition-colors ${view === 'week' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              Week
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-md transition-colors ${view === 'month' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              Month
            </button>
          </div>
          <button onClick={handlePrev} title="Previous" className="p-1.5 sm:p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button onClick={handleNext} title="Next" className="p-1.5 sm:p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      {/* Days Grid / Week Strip */}
      {view === 'month' && (
        <div className="grid grid-cols-7 gap-1 mb-1 sm:mb-2">
          {weekDayHeaders.map(header => (
            <div key={header} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
              {header}
            </div>
          ))}
        </div>
      )}
      <div className={`grid ${view === 'week' ? 'grid-cols-7 gap-1 sm:gap-2' : 'grid-cols-7 gap-px sm:gap-1'} ${view === 'month' ? 'bg-gray-200 dark:bg-gray-700/50 p-px sm:p-0.5 rounded-md' : ''}`}>
        {daysToDisplay.map((dayObj) => (
          <Day
            key={dayObj.date.toISOString()}
            dayObj={dayObj}
            isToday={dayObj.date.toDateString() === today.toDateString()}
            isSelected={dayObj.date.toDateString() === selectedDate.toDateString()}
            onClick={() => handleDayClick(dayObj)}
            view={view}
          />
        ))}
      </div>

      {/* Tasks List for Selected Date */}
      <div className="mt-4 sm:mt-6 flex-grow overflow-y-auto">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
          Tasks for {selectedDate.toLocaleDateString('en-US', { weekday:'short', month: 'short', day: 'numeric' })}
        </h3>
        {tasksForSelectedDate.length > 0 ? (
          tasksForSelectedDate.map((task, i) => (
            <Task key={i} {...task} />
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No tasks for this day.</p>
        )}
      </div>
    </div>
  );
}
