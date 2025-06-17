import React from 'react';

const FocusRecordItem = ({ day, minutes }) => (
  <div className="flex flex-col items-center space-y-1">
    <div className="w-12 h-24 bg-pink-100 dark:bg-pink-700 rounded-full overflow-hidden">
      <div
        className="bg-pink-300 dark:bg-pink-500"
        style={{ height: `${(minutes / 60) * 100}%` }}
      ></div>
    </div>
    <span className="text-sm text-gray-600 dark:text-gray-400">{day}</span>
  </div>
);

export default function StudyTracker() {
  const focusData = [
    { day: '03', minutes: 20 },
    { day: '04', minutes: 18 },
    { day: '05', minutes: 25 },
    { day: '06', minutes: 15 },
    { day: '07', minutes: 35 },
    { day: '08', minutes: 10 },
    { day: '09', minutes: 0 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Focus Record</h3>
      <div className="flex justify-between">
        {focusData.map((item) => (
          <FocusRecordItem key={item.day} day={item.day} minutes={item.minutes} />
        ))}
      </div>
    </div>
  );
}