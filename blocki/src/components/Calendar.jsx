import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Users, 
  Code, 
  CalendarDays,
  MessageSquare,
  Settings,
  Clock,
  Star
} from 'lucide-react';

// Task icon mapping
const TASK_ICONS = {
  meeting: Users,
  code: Code,
  planning: CalendarDays,
  demo: MessageSquare,
  default: Clock,
  settings: Settings,
  priority: Star
};

// Default task colors
const TASK_COLORS = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  gray: 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
};

// Day Component
const Day = ({ dayObj, isToday, isSelected, onClick, view, hasEvents = false }) => {
  const { date, isCurrentMonth } = dayObj;

  let dayClasses = `flex flex-col items-center justify-center rounded-md cursor-pointer transition-all duration-200 ease-in-out relative group`;
  let dateNumberClasses = "text-sm font-medium";
  let weekdayTextClasses = "text-xs font-medium";

  if (view === 'week') {
    dayClasses += ' h-16 w-auto min-w-[3rem] md:h-20 py-2';
  } else {
    dayClasses += ' h-10 w-full md:h-12 aspect-square py-1';
  }

  // Text color logic
  let textColorClass;
  if (isSelected) {
    textColorClass = 'text-white';
  } else if (isToday && (isCurrentMonth || view === 'week')) {
    textColorClass = 'text-blue-600 dark:text-blue-400 font-bold';
  } else if (!isCurrentMonth && view === 'month') {
    textColorClass = 'text-gray-400 dark:text-gray-600';
  } else {
    textColorClass = 'text-gray-900 dark:text-gray-100';
  }

  // Background and ring styles
  if (isSelected) {
    dayClasses += ' bg-blue-600 shadow-sm';
  } else if (isToday && (isCurrentMonth || view === 'week')) {
    dayClasses += ' bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-200 dark:ring-blue-800';
  } else if (isCurrentMonth || view === 'week') {
    dayClasses += ' hover:bg-gray-50 dark:hover:bg-gray-800';
  } else {
    dayClasses += ' hover:bg-gray-50 dark:hover:bg-gray-800/30';
  }

  return (
    <div
      className={`${dayClasses} ${textColorClass}`}
      onClick={onClick}
    >
      {view === 'week' && (
        <span className={`${weekdayTextClasses} ${isSelected ? 'opacity-90' : (!isCurrentMonth && view === 'month') ? 'opacity-60' : 'opacity-75'}`}>
          {date.toLocaleDateString('en-US', { weekday: 'short' })}
        </span>
      )}
      <span className={`${dateNumberClasses} ${isToday && !isSelected && (isCurrentMonth || view === 'week') ? 'font-bold' : ''}`}>
        {date.getDate()}
      </span>

      {/* Event indicator dot */}
      {hasEvents && (isCurrentMonth || view === 'week') && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
          <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white/80' : 'bg-blue-500 dark:bg-blue-400'}`}></div>
        </div>
      )}
    </div>
  );
};

// Task Component
const Task = ({ time, title, description, iconType = 'default', color = 'blue', onClick }) => {
  const IconComponent = TASK_ICONS[iconType] || TASK_ICONS.default;
  const colorClasses = TASK_COLORS[color] || TASK_COLORS.blue;

  return (
    <div 
      className="flex items-start space-x-3 py-3 px-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group mb-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 w-12 pt-1 text-right flex-shrink-0">
        {time}
      </div>
      <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center ${colorClasses} shadow-sm`}>
        <IconComponent className="w-4 h-4" />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

// Main Calendar Component
function CalendarComponent({ 
  tasks = [], 
  onDateSelect = () => {}, 
  onTaskClick = () => {}, 
  onAddTask = () => {},
  initialDate = new Date(),
  initialView = 'week'
}) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date(initialDate);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  
  const [currentDisplayDate, setCurrentDisplayDate] = useState(() => {
    const d = new Date(initialDate);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  
  const [view, setView] = useState(initialView);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Helper function to check if date has events
  const hasEventsForDate = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return tasks.some(task => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === normalizedDate.getTime();
    });
  };

  // Get week days
  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      return { date: day, isCurrentMonth: true };
    });
  };

  // Get month grid days
  const getMonthGridDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    
    const days = [];
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      day.setHours(0, 0, 0, 0);
      days.push({
        date: day,
        isCurrentMonth: day.getMonth() === month,
      });
    }
    return days;
  };

  const daysToDisplay = view === 'week' ? getWeekDays(currentDisplayDate) : getMonthGridDays(currentDisplayDate);

  // Navigation handlers
  const handlePrev = () => {
    const newDisplayDate = new Date(currentDisplayDate);
    if (view === 'week') {
      newDisplayDate.setDate(currentDisplayDate.getDate() - 7);
    } else {
      newDisplayDate.setMonth(currentDisplayDate.getMonth() - 1);
      newDisplayDate.setDate(1);
    }
    setCurrentDisplayDate(newDisplayDate);
    setSelectedDate(new Date(newDisplayDate));
  };

  const handleNext = () => {
    const newDisplayDate = new Date(currentDisplayDate);
    if (view === 'week') {
      newDisplayDate.setDate(currentDisplayDate.getDate() + 7);
    } else {
      newDisplayDate.setMonth(currentDisplayDate.getMonth() + 1);
      newDisplayDate.setDate(1);
    }
    setCurrentDisplayDate(newDisplayDate);
    setSelectedDate(new Date(newDisplayDate));
  };

  const handleDayClick = (dayObj) => {
    setSelectedDate(dayObj.date);
    onDateSelect(dayObj.date);
    
    if (view === 'month' && dayObj.date.getMonth() !== currentDisplayDate.getMonth()) {
      setCurrentDisplayDate(new Date(dayObj.date.getFullYear(), dayObj.date.getMonth(), 1));
    }
  };

  // Get tasks for selected date
  const getTasksForDate = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === normalizedDate.getTime();
    }).sort((a, b) => {
      // Sort by time
      const timeA = a.time.replace(':', '');
      const timeB = b.time.replace(':', '');
      return timeA.localeCompare(timeB);
    });
  };

  const tasksForSelectedDate = getTasksForDate(selectedDate);

  // Header text formatting
  const headerText = view === 'week'
    ? `${currentDisplayDate.toLocaleDateString('en-US', { month: 'long' })} ${currentDisplayDate.toLocaleDateString('en-US', { day: 'numeric' })}${currentDisplayDate.getFullYear() !== today.getFullYear() ? `, ${currentDisplayDate.getFullYear()}` : ''}`
    : currentDisplayDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const weekDayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{headerText}</h2>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center space-x-1">
          <button 
            onClick={handlePrev} 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={handleNext} 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* View Switcher */}
      <div className="mb-4 flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex-shrink-0">
        <button
          onClick={() => setView('week')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors text-center ${
            view === 'week'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setView('month')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors text-center ${
            view === 'month'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Month
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Days Grid */}
        <div className="mb-3 flex-shrink-0">
          {view === 'month' && (
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDayHeaders.map(header => (
                <div key={header} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
                  {header}
                </div>
              ))}
            </div>
          )}
          <div className={`grid ${view === 'week' ? 'grid-cols-7 gap-2' : 'grid-cols-7 gap-1'}`}>
            {daysToDisplay.map((dayObj) => (
              <Day
                key={dayObj.date.toISOString()}
                dayObj={dayObj}
                isToday={dayObj.date.toDateString() === today.toDateString()}
                isSelected={dayObj.date.toDateString() === selectedDate.toDateString()}
                onClick={() => handleDayClick(dayObj)}
                view={view}
                hasEvents={hasEventsForDate(dayObj.date)}
              />
            ))}
          </div>
        </div>

        {/* Tasks Panel */}
        <div className="flex-1 overflow-hidden min-h-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {tasksForSelectedDate.length} {tasksForSelectedDate.length === 1 ? 'task' : 'tasks'}
              </span>
              <button 
                onClick={() => onAddTask(selectedDate)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          <div className="h-full overflow-y-auto scrollbar-hide">
            {tasksForSelectedDate.length > 0 ? (
              tasksForSelectedDate.map((task, i) => (
                <Task 
                  key={`${task.id || i}`}
                  time={task.time}
                  title={task.title}
                  description={task.description}
                  iconType={task.iconType}
                  color={task.color}
                  onClick={() => onTaskClick(task)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 dark:text-gray-500 text-2xl mb-2">
                  <CalendarDays className="w-8 h-8 mx-auto" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">No tasks for this day</p>
                <button
                  aria-label="Add Task" 
                  onClick={() => onAddTask(selectedDate)}
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Add your first task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Example usage with sample data
export const CalendarExample = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      date: new Date(),
      time: '09:00',
      title: 'Morning Standup',
      description: 'Team sync meeting',
      iconType: 'meeting',
      color: 'orange'
    },
    {
      id: 2,
      date: new Date(),
      time: '14:00',
      title: 'Code Review',
      description: 'Review PR #123',
      iconType: 'code',
      color: 'blue'
    },
    {
      id: 3,
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: '10:00',
      title: 'Project Planning',
      description: 'Plan next sprint',
      iconType: 'planning',
      color: 'green'
    }
  ]);

  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
  };

  const handleTaskClick = (task) => {
    console.log('Clicked task:', task);
  };

  const handleAddTask = (date) => {
    console.log('Add task for date:', date);
    // Your task creation logic here
  };

  return (
    <div className="h-screen p-4">
      <CalendarComponent
        tasks={tasks}
        onDateSelect={handleDateSelect}
        onTaskClick={handleTaskClick}
        onAddTask={handleAddTask}
        initialView="week"
      />
    </div>
  );
};

// Export the main component as default
export default CalendarComponent;