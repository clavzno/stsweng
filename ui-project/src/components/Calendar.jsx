import React, { useState } from 'react';

const Day = ({ day, tasks, isToday, isSelected, onClick }) => (
  <div
    className={`flex flex-col items-center justify-center h-16 w-12 rounded-lg cursor-pointer ${
      isSelected ? 'bg-red-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
    } ${isToday ? 'font-bold' : ''}`}
    onClick={onClick}
  >
    <span className="text-sm">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
    <span className="text-lg">{day.getDate()}</span>
    <div className="flex space-x-1 mt-1">
      {tasks.map((task, i) => (
        <div key={i} className={`h-1 w-1 rounded-full ${task.color}`}></div>
      ))}
    </div>
  </div>
);

const Task = ({ time, title, description, icon, color }) => (
  <div className="flex items-start space-x-4 py-4 border-b border-gray-200 dark:border-gray-700">
    <div className="text-sm text-gray-500 dark:text-gray-400 w-16">{time}</div>
    <div className={`h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
    <div className="w-6 h-6 border-2 border-red-500 rounded-full ml-auto"></div>
  </div>
);

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();

  const getWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      return day;
    });
  };

  const week = getWeek(selectedDate);

  const tasks = [
    { time: '12:35', title: 'Add Your First Task', description: '0/5', icon: '+', color: 'bg-red-200' },
    { time: '12:40', title: 'Fill Your Inbox', description: '', icon: '📥', color: 'bg-red-200' },
    { time: '12:50', title: 'Make It Your Own', description: '0/5', icon: '⚙️', color: 'bg-red-200' },
    { time: '8:00 AM', title: 'Rise and Shine', description: '', icon: '⏰', color: 'bg-red-200' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
      </div>
      <div className="flex justify-between mb-6">
        {week.map((day) => (
          <Day
            key={day}
            day={day}
            tasks={[{ color: 'bg-blue-500' }, { color: 'bg-red-500' }]}
            isToday={day.toDateString() === today.toDateString()}
            isSelected={day.toDateString() === selectedDate.toDateString()}
            onClick={() => setSelectedDate(day)}
          />
        ))}
      </div>
      <div>
        {tasks.map((task, i) => (
          <Task key={i} {...task} />
        ))}
      </div>
    </div>
  );
}