"use client";

import React, { useState, useEffect } from 'react';
import { Settings, SkipForward, RotateCcw } from 'lucide-react';

export default function Pomodoro() {
  const [mode, setMode] = useState('pomodoro');
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  useEffect(() => {
    setTime(settings[mode] * 60);
  }, [settings, mode]);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    } else if (time === 0) {
      handleNextSession();
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggle = () => setIsActive(!isActive);

  const reset = () => {
    setTime(settings[mode] * 60);
    setIsActive(false);
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: parseInt(value) });
  };

  const handleNextSession = () => {
    let nextMode = 'pomodoro';
    if (mode === 'pomodoro') {
      nextMode = 'shortBreak';
    } else if (mode === 'shortBreak') {
      nextMode = 'pomodoro';
    }
    
    setMode(nextMode);
    setIsActive(false);
    setTime(settings[nextMode] * 60);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const getModeDisplayName = () => {
    switch(mode) {
      case 'pomodoro':
        return 'FOCUS';
      case 'shortBreak':
        return 'SHORT BREAK';
      case 'longBreak':
        return 'LONG BREAK';
      default:
        return 'FOCUS';
    }
  };

  const totalTimeForMode = settings[mode] * 60;
  const progressPercentage = totalTimeForMode > 0 ? ((totalTimeForMode - time) / totalTimeForMode) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md text-center max-w-md mx-auto text-gray-900 dark:text-gray-100 h-full flex flex-col relative">
      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-6 left-6 right-6 z-10 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-gray-900 dark:text-gray-100 text-lg font-medium mb-4">Timer Settings</h3>
          <div className="grid grid-cols-3 gap-4 text-gray-900 dark:text-gray-100">
            <div>
              <label className="block mb-1 text-sm">Focus</label>
              <input 
                type="number" 
                name="pomodoro" 
                value={settings.pomodoro} 
                onChange={handleSettingsChange} 
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 text-center text-gray-900 dark:text-gray-100" 
                min="1"
                max="60"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">minutes</span>
            </div>
            <div>
              <label className="block mb-1 text-sm">Short Break</label>
              <input 
                type="number" 
                name="shortBreak" 
                value={settings.shortBreak} 
                onChange={handleSettingsChange} 
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 text-center text-gray-900 dark:text-gray-100" 
                min="1"
                max="30"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">minutes</span>
            </div>
            <div>
              <label className="block mb-1 text-sm">Long Break</label>
              <input 
                type="number" 
                name="longBreak" 
                value={settings.longBreak} 
                onChange={handleSettingsChange} 
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 text-center text-gray-900 dark:text-gray-100" 
                min="1"
                max="60"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">minutes</span>
            </div>
          </div>
          <button 
            onClick={toggleSettings}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors w-full"
          >
            Apply
          </button>
        </div>
      )}
      
      <div>
        {/* Mode Selection Tabs */}
        <div className="flex justify-center space-x-2 mb-6">
          <button 
            onClick={() => setMode('pomodoro')} 
            className={`py-1 px-3 rounded-lg transition-colors 
                        ${mode === 'pomodoro' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-transparent text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-blue-900/30'}`}
          >
            Pomodoro
          </button>
          <button 
            onClick={() => setMode('shortBreak')} 
            className={`py-1 px-3 rounded-lg transition-colors 
                        ${mode === 'shortBreak' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-transparent text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-blue-900/30'}`}
          >
            Short Break
          </button>
          <button 
            onClick={() => setMode('longBreak')} 
            className={`py-1 px-3 rounded-lg transition-colors 
                        ${mode === 'longBreak' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-transparent text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-blue-900/30'}`}
          >
            Long Break
          </button>
        </div>

        {/* Main Timer Display */}
        <div className="mb-6">
          <div className="text-7xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-3">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-4">
            {getModeDisplayName()}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <button 
            onClick={reset} 
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 p-3 rounded-full transition-colors"
            title="Reset current session"
          >
            <RotateCcw size={20} />
          </button>
          
          <button 
            onClick={toggle} 
            className={`
              py-3 px-8 rounded-lg text-lg font-medium transition-colors
              ${isActive 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
              }
            `}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          
          <button 
            onClick={handleNextSession} 
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 p-3 rounded-full transition-colors"
            title="Skip to next session"
          >
            <SkipForward size={20} />
          </button>
          
          <button 
            onClick={toggleSettings} 
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 p-3 rounded-full transition-colors"
            title="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}