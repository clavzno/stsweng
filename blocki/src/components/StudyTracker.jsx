"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, BarChart3, Target, Clock, Book, TrendingUp, Settings, X } from 'lucide-react';

export default function StudyTracker({ focusSessionData }) {
  const [viewMode, setViewMode] = useState('github'); // 'github', 'courses', 'focus'
  const [studyData, setStudyData] = useState({});
  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics', completed: 7, total: 15, color: 'bg-blue-500' },
    { id: 2, name: 'Physics', completed: 12, total: 20, color: 'bg-green-500' },
    { id: 3, name: 'Chemistry', completed: 3, total: 10, color: 'bg-purple-500' },
    { id: 4, name: 'Biology', completed: 8, total: 12, color: 'bg-orange-500' },
  ]);

  // Get real-time focus session data from localStorage and props
  const [focusSession, setFocusSession] = useState({
    currentStreak: 0,
    totalMinutes: 0,
    sessionsToday: 0,
    targetSessions: 8,
    completedSessions: 0,
  });

  // Load focus session data from localStorage on mount and update when focusSessionData changes
  useEffect(() => {
    const updateFocusData = () => {
      if (typeof window !== 'undefined') {
        // Get today's date
        const today = new Date().toISOString().split('T')[0];
        
        // Load completed sessions from localStorage (from Pomodoro component)
        const completedSessions = parseInt(localStorage.getItem('pomodoro-completed-sessions') || '0');
        
        // Load daily session data
        const dailyData = JSON.parse(localStorage.getItem('daily-focus-sessions') || '{}');
        const todaysSessions = dailyData[today] || 0;
        
        // Calculate streak
        const calculateStreak = () => {
          let streak = 0;
          const currentDate = new Date();
          
          for (let i = 0; i < 30; i++) { // Check last 30 days
            const checkDate = new Date(currentDate);
            checkDate.setDate(currentDate.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];
            
            if (dailyData[dateStr] > 0) {
              streak++;
            } else {
              break;
            }
          }
          return streak;
        };

        // Calculate total minutes from Pomodoro settings
        const settings = JSON.parse(localStorage.getItem('pomodoro-settings') || '{"pomodoro": 25}');
        const totalMinutes = completedSessions * settings.pomodoro;

        setFocusSession({
          currentStreak: calculateStreak(),
          totalMinutes: totalMinutes,
          sessionsToday: todaysSessions,
          targetSessions: 8,
          completedSessions: completedSessions,
        });
      }
    };

    // Update on mount
    updateFocusData();

    // Update when focusSessionData prop changes
    if (focusSessionData) {
      const today = new Date().toISOString().split('T')[0];
      const dailyData = JSON.parse(localStorage.getItem('daily-focus-sessions') || '{}');
      dailyData[today] = (dailyData[today] || 0) + 1;
      localStorage.setItem('daily-focus-sessions', JSON.stringify(dailyData));
      updateFocusData();
    }

    // Set up an interval to update data every minute
    const interval = setInterval(updateFocusData, 60000);
    
    return () => clearInterval(interval);
  }, [focusSessionData]);

  // Generate GitHub-style grid data (52 weeks * 7 days = 364 days)
  const generateGridData = () => {
    const data = [];
    const today = new Date();
    
    // Start from 52 weeks ago (364 days)
    for (let i = 363; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Get real study data from localStorage
      let studyMinutes = 0;
      if (studyData[dateStr] !== undefined) {
        studyMinutes = studyData[dateStr];
      } else {
        // Check if we have real focus session data for this date
        const dailyData = JSON.parse(localStorage.getItem('daily-focus-sessions') || '{}');
        const settings = JSON.parse(localStorage.getItem('pomodoro-settings') || '{"pomodoro": 25}');
        
        if (dailyData[dateStr]) {
          studyMinutes = dailyData[dateStr] * settings.pomodoro;
        } else {
          // Simulate historical data for dates before we started tracking
          const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const studyChance = isWeekend ? 0.3 : 0.7;
          
          if (Math.random() < studyChance) {
            studyMinutes = [30, 60, 90, 120, 180][Math.floor(Math.random() * 5)];
          }
        }
      }
      
      data.push({
        date: dateStr,
        displayDate: date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        minutes: studyMinutes,
        level: getIntensityLevel(studyMinutes),
      });
    }
    return data;
  };

  const getIntensityLevel = (minutes) => {
    if (minutes === 0) return 0;
    if (minutes <= 30) return 1;
    if (minutes <= 60) return 2;
    if (minutes <= 120) return 3;
    return 4;
  };

  const getIntensityColor = (level) => {
    const colors = {
      0: 'bg-gray-100 dark:bg-gray-800',
      1: 'bg-blue-200 dark:bg-blue-900/50',
      2: 'bg-blue-400 dark:bg-blue-700',
      3: 'bg-blue-600 dark:bg-blue-500',
      4: 'bg-blue-800 dark:bg-blue-400',
    };
    return colors[level] || colors[0];
  };

  const gridData = useMemo(() => generateGridData(), [studyData, focusSession]);

  const totalStudyDays = gridData.filter(day => day.minutes > 0).length;
  const currentStreak = useMemo(() => {
    let streak = 0;
    for (let i = gridData.length - 1; i >= 0; i--) {
      if (gridData[i].minutes > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }, [gridData]);

  const GitHubGrid = () => (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{totalStudyDays}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Study Days</div>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{focusSession.currentStreak}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Current Streak</div>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {Math.round(focusSession.totalMinutes / 60)}h
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Hours</div>
        </div>
      </div>

      {/* GitHub-style grid */}
      <div className="overflow-x-auto github-grid">
        <div className="grid grid-cols-53 gap-1 w-fit mx-auto min-w-max">
          {gridData.map((day, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-sm ${getIntensityColor(day.level)} hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer`}
              title={`${day.displayDate}: ${day.minutes} minutes studied`}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
        <span>Less</span>
        <div className="flex space-x-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );

  const CourseProgress = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="text-lg font-semibold text-gray-900 dark:text-white">Course Progress</div>
        <div className="text-xs text-gray-600 dark:text-gray-400">Track your progress across all subjects</div>
      </div>
      
      {courses.map(course => (
        <div key={course.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${course.color}`}></div>
              <span className="font-medium text-gray-900 dark:text-white text-sm">{course.name}</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {course.completed}/{course.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${course.color}`}
              style={{ width: `${(course.completed / course.total) * 100}%` }}
            ></div>
          </div>
          <div className="text-right text-xs text-gray-500 dark:text-gray-400">
            {Math.round((course.completed / course.total) * 100)}% complete
          </div>
        </div>
      ))}
      
      {/* Overall Progress */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Overall Progress
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {Math.round((courses.reduce((sum, course) => sum + course.completed, 0) / 
                        courses.reduce((sum, course) => sum + course.total, 0)) * 100)}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {courses.reduce((sum, course) => sum + course.completed, 0)} of {courses.reduce((sum, course) => sum + course.total, 0)} tasks completed
          </div>
        </div>
      </div>
    </div>
  );

  const FocusProgress = () => {
    // Get current week's dates
    const getThisWeeksDates = () => {
      const today = new Date();
      const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const monday = new Date(today);
      
      // Calculate days back to Monday (if today is Sunday, go back 6 days)
      const daysBackToMonday = currentDay === 0 ? 6 : currentDay - 1;
      monday.setDate(today.getDate() - daysBackToMonday);
      
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        weekDates.push(date);
      }
      return weekDates;
    };

    const weekDates = getThisWeeksDates();
    const today = new Date();

    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">Focus Sessions</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Track your Pomodoro sessions and focus time</div>
        </div>

        {/* Today's Progress */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Today's Sessions</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {focusSession.sessionsToday}/{focusSession.targetSessions}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((focusSession.sessionsToday / focusSession.targetSessions) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-xs text-gray-600 dark:text-gray-400">
            {Math.round((focusSession.sessionsToday / focusSession.targetSessions) * 100)}% of daily goal
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {focusSession.currentStreak}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {Math.round(focusSession.totalMinutes / 60)}h
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Focus</div>
          </div>
        </div>

        {/* Real-time Session Counter */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Total Completed Sessions</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {focusSession.completedSessions}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Next long break after {4 - (focusSession.completedSessions % 4)} more sessions
            </div>
          </div>
        </div>

        {/* Weekly Focus Chart */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-900 dark:text-white">This Week's Focus</div>
          <div className="grid grid-cols-7 gap-1">
            {weekDates.map((date, index) => {
              const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              const isToday = date.toDateString() === today.toDateString();
              const isPast = date < today;
              const isFuture = date > today;
              
              // Get real sessions data from localStorage
              const dateStr = date.toISOString().split('T')[0];
              const dailyData = JSON.parse(localStorage.getItem('daily-focus-sessions') || '{}');
              
              let sessions;
              if (isFuture) {
                sessions = 0; // Future days have no sessions
              } else if (isToday) {
                sessions = focusSession.sessionsToday;
              } else {
                // Past days - get real data or simulate
                sessions = dailyData[dateStr] || Math.floor(Math.random() * 9);
              }
              
              const maxHeight = 32;
              const height = (sessions / 8) * maxHeight;
              
              return (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div className={`text-xs ${isToday ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                    {dayNames[index]}
                  </div>
                  <div className={`text-xs ${isToday ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                    {date.getDate()}
                  </div>
                  <div className="w-6 bg-gray-200 dark:bg-gray-700 rounded-sm relative" style={{ height: `${maxHeight}px` }}>
                    <div
                      className={`${isToday ? 'bg-blue-600' : 'bg-blue-500'} rounded-sm absolute bottom-0 w-full transition-all duration-500 ${isFuture ? 'opacity-30' : ''}`}
                      style={{ height: `${height}px` }}
                      title={`${date.toLocaleDateString()}: ${sessions} sessions`}
                    ></div>
                  </div>
                  <div className={`text-xs ${isToday ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                    {sessions}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 h-full flex flex-col w-full">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .github-grid {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .github-grid::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Study Tracker</h2>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="mb-4 flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex-shrink-0">
        <button
          onClick={() => setViewMode('github')}
          className={`flex-1 py-2 px-2 rounded-md font-medium transition-colors text-center min-w-0 flex items-center justify-center gap-1 ${
            viewMode === 'github'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          style={{
            fontSize: 'min(2.5vw, 0.75rem)'
          }}
        >
          <Calendar className="w-3 h-3" />
          <span className="truncate">Activity</span>
        </button>
        <button
          onClick={() => setViewMode('courses')}
          className={`flex-1 py-2 px-2 rounded-md font-medium transition-colors text-center min-w-0 flex items-center justify-center gap-1 ${
            viewMode === 'courses'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          style={{
            fontSize: 'min(2.5vw, 0.75rem)'
          }}
        >
          <Book className="w-3 h-3" />
          <span className="truncate">Courses</span>
        </button>
        <button
          onClick={() => setViewMode('focus')}
          className={`flex-1 py-2 px-2 rounded-md font-medium transition-colors text-center min-w-0 flex items-center justify-center gap-1 ${
            viewMode === 'focus'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          style={{
            fontSize: 'min(2.5vw, 0.75rem)'
          }}
        >
          <Target className="w-3 h-3" />
          <span className="truncate">Focus</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden min-h-0">
        <div className="h-full overflow-y-auto scrollbar-hide">
          {viewMode === 'github' && <GitHubGrid />}
          {viewMode === 'courses' && <CourseProgress />}
          {viewMode === 'focus' && <FocusProgress />}
        </div>
      </div>
    </div>
  );
}