"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, 
  SkipForward, 
  RotateCcw, 
  Play, 
  Pause, 
  Coffee, 
  Brain, 
  Timer, 
  Volume2, 
  VolumeX, 
  Bell, 
  Target, 
  CheckCircle, 
  Circle, 
  Zap,
  Moon,
  Sun,
  Info,
  X
} from 'lucide-react';

export default function Pomodoro({ onSessionComplete }) {
  const [mode, setMode] = useState('pomodoro');
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(() => {
    // Load from localStorage or default to 0
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pomodoro-completed-sessions');
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });
  const [notificationPermission, setNotificationPermission] = useState('default');
  const audioRef = useRef(null);
  const [settings, setSettings] = useState(() => {
    // Load settings from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pomodoro-settings');
      return saved ? JSON.parse(saved) : {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
      };
    }
    return {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    };
  });

  // Save completed sessions to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pomodoro-completed-sessions', completedSessions.toString());
    }
  }, [completedSessions]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
    }
  }, [settings]);

  // Check notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Update time when settings or mode changes
  useEffect(() => {
    if (!isActive) {
      setTime(settings[mode] * 60);
    }
  }, [settings, mode]);

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      handleSessionComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  // Update document title
  useEffect(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeString = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    document.title = isActive ? `${timeString} - ${getModeDisplayName()}` : 'Pomodoro Timer';
  }, [time, isActive, mode]);

  const toggle = () => setIsActive(!isActive);

  const reset = () => {
    setTime(settings[mode] * 60);
    setIsActive(false);
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    const newValue = Math.max(1, Math.min(60, parseInt(value) || 1));
    setSettings({ 
      ...settings, 
      [name]: newValue 
    });
  };

  const playNotificationSound = () => {
    if (soundEnabled) {
      // Create a simple beep sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.log('Audio playback not supported');
      }
    }
  };

  const showNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: mode === 'pomodoro' ? '🍅' : mode === 'shortBreak' ? '☕' : '🌙',
        badge: '🍅'
      });
      
      // Auto close after 5 seconds
      setTimeout(() => notification.close(), 5000);
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  };

  const handleSessionComplete = () => {
    setIsActive(false);
    
    let newCompletedSessions = completedSessions;
    if (mode === 'pomodoro') {
      newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
    }
    
    // Play notification sound
    playNotificationSound();
    
    // Show notification
    const modeNames = {
      pomodoro: 'Focus Session',
      shortBreak: 'Short Break',
      longBreak: 'Long Break'
    };
    
    const nextModeNames = {
      pomodoro: 'Time for a break!',
      shortBreak: 'Back to work!',
      longBreak: 'Back to work!'
    };
    
    showNotification(
      `${modeNames[mode]} Complete!`,
      nextModeNames[mode]
    );

    // Call the parent callback to update StudyTracker
    if (onSessionComplete && mode === 'pomodoro') {
      onSessionComplete({
        mode,
        duration: settings[mode],
        timestamp: new Date().toISOString(),
        completedSessions: newCompletedSessions
      });
    }
    
    // Auto-switch to next session after 3 seconds
    setTimeout(() => {
      handleNextSession();
    }, 3000);
  };

  const handleNextSession = () => {
    let nextMode = 'pomodoro';
    
    if (mode === 'pomodoro') {
      // After every 4 pomodoros, take a long break
      nextMode = completedSessions % 4 === 0 ? 'longBreak' : 'shortBreak';
    } else {
      nextMode = 'pomodoro';
    }
    
    setMode(nextMode);
    setTime(settings[nextMode] * 60);
  };

  const switchMode = (newMode) => {
    if (newMode !== mode) {
      setMode(newMode);
      setTime(settings[newMode] * 60);
      setIsActive(false);
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        if (permission === 'granted') {
          showNotification('Notifications Enabled!', 'You\'ll now receive timer notifications.');
        }
      } catch (error) {
        console.log('Notification permission request failed');
      }
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const getModeDisplayName = () => {
    switch(mode) {
      case 'pomodoro':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Focus Time';
    }
  };

  const getModeIcon = () => {
    switch(mode) {
      case 'pomodoro':
        return <Brain className="w-5 h-5" />;
      case 'shortBreak':
        return <Coffee className="w-5 h-5" />;
      case 'longBreak':
        return <Moon className="w-5 h-5" />;
      default:
        return <Timer className="w-5 h-5" />;
    }
  };

  const getModeColor = () => {
    switch(mode) {
      case 'pomodoro':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'shortBreak':
        return 'bg-green-600 hover:bg-green-700';
      case 'longBreak':
        return 'bg-purple-600 hover:bg-purple-700';
      default:
        return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  const getProgressColor = () => {
    switch(mode) {
      case 'pomodoro':
        return '#2563eb'; // blue-600
      case 'shortBreak':
        return '#16a34a'; // green-600
      case 'longBreak':
        return '#9333ea'; // purple-600
      default:
        return '#2563eb'; // blue-600
    }
  };

  const totalTimeForMode = settings[mode] * 60;
  const progressPercentage = totalTimeForMode > 0 ? ((totalTimeForMode - time) / totalTimeForMode) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 h-full flex flex-col relative w-full">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute inset-2 z-20 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Settings</h3>
            </div>
            <button
              onClick={toggleSettings}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto min-h-0 scrollbar-hide" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {/* Timer Durations */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Timer className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">Timer Durations</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Brain className="w-3 h-3" />
                    Focus Time (min)
                  </label>
                  <input 
                    type="number" 
                    name="pomodoro" 
                    value={settings.pomodoro} 
                    onChange={handleSettingsChange} 
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm text-center text-gray-900 dark:text-white" 
                    min="1"
                    max="60"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Coffee className="w-3 h-3" />
                    Short Break (min)
                  </label>
                  <input 
                    type="number" 
                    name="shortBreak" 
                    value={settings.shortBreak} 
                    onChange={handleSettingsChange} 
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm text-center text-gray-900 dark:text-white" 
                    min="1"
                    max="30"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Moon className="w-3 h-3" />
                    Long Break (min)
                  </label>
                  <input 
                    type="number" 
                    name="longBreak" 
                    value={settings.longBreak} 
                    onChange={handleSettingsChange} 
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm text-center text-gray-900 dark:text-white" 
                    min="1"
                    max="60"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">Notifications</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Sound notifications
                  </label>
                  <button
                    onClick={toggleSound}
                    className={`p-1 rounded-md transition-colors ${
                      soundEnabled 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                </div>
                {notificationPermission !== 'granted' && (
                  <button
                    onClick={requestNotificationPermission}
                    className="w-full text-left text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Enable browser notifications
                  </button>
                )}
                {notificationPermission === 'granted' && (
                  <div className="text-xs text-green-600 dark:text-green-400">
                    ✓ Browser notifications enabled
                  </div>
                )}
              </div>
            </div>

            {/* Session Info */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">Session Info</h4>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <div>Completed focus sessions: {completedSessions}</div>
                <div>Next long break after: {4 - (completedSessions % 4)} more sessions</div>
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <button 
              onClick={toggleSettings}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md font-medium transition-colors text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Header with session counter */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          {getModeIcon()}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getModeDisplayName()}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Target className="w-4 h-4" />
            <span>{completedSessions}</span>
          </div>
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-full transition-colors ${
              soundEnabled 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
            }`}
            title={soundEnabled ? 'Disable sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="mb-4 flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex-shrink-0">
        <button 
          onClick={() => switchMode('pomodoro')} 
          className={`flex-1 py-2 px-2 rounded-md font-medium transition-colors text-center min-w-0 flex items-center justify-center gap-1 ${
            mode === 'pomodoro' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          style={{
            fontSize: 'min(2.5vw, 0.75rem)'
          }}
        >
          <Brain className="w-3 h-3" />
          <span className="truncate">Focus</span>
        </button>
        <button 
          onClick={() => switchMode('shortBreak')} 
          className={`flex-1 py-2 px-2 rounded-md font-medium transition-colors text-center min-w-0 flex items-center justify-center gap-1 ${
            mode === 'shortBreak' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          style={{
            fontSize: 'min(2.5vw, 0.75rem)'
          }}
        >
          <Coffee className="w-3 h-3" />
          <span className="truncate">Break</span>
        </button>
        <button 
          onClick={() => switchMode('longBreak')} 
          className={`flex-1 py-2 px-2 rounded-md font-medium transition-colors text-center min-w-0 flex items-center justify-center gap-1 ${
            mode === 'longBreak' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          style={{
            fontSize: 'min(2.5vw, 0.75rem)'
          }}
        >
          <Moon className="w-3 h-3" />
          <span className="truncate">Long</span>
        </button>
      </div>

      {/* Timer Display */}
      <div className="flex-1 flex flex-col justify-center items-center min-h-0 overflow-hidden">
        {/* Circular Progress */}
        <div className="relative flex-shrink-0 mb-4" style={{ 
          width: 'min(40vw, 40vh, 200px)', 
          height: 'min(40vw, 40vh, 200px)',
          maxWidth: '100%',
          maxHeight: '60%'
        }}>
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={getProgressColor()}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${progressPercentage * 2.83} 283`}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          
          {/* Time Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
            <div className="font-bold text-gray-900 dark:text-white font-mono text-center leading-none" style={{
              fontSize: 'min(4vw, 4vh, 2rem)'
            }}>
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-1 text-center flex items-center gap-1" style={{
              fontSize: 'min(2vw, 2vh, 0.75rem)'
            }}>
              <Circle className="w-2 h-2 fill-current" />
              {Math.round(progressPercentage)}%
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-2 flex-shrink-0 w-full px-2" style={{
          minHeight: '40px'
        }}>
          <button 
            onClick={reset} 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button 
            onClick={toggle} 
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-white shadow-md hover:shadow-lg flex-shrink-0 min-w-0 ${
              isActive 
                ? 'bg-red-500 hover:bg-red-600' 
                : getModeColor()
            }`}
            style={{
              fontSize: 'min(3vw, 0.875rem)'
            }}
          >
            {isActive ? <Pause className="w-4 h-4 flex-shrink-0" /> : <Play className="w-4 h-4 flex-shrink-0" />}
            <span className="truncate">{isActive ? 'Pause' : 'Start'}</span>
          </button>
          
          <button 
            onClick={handleNextSession} 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
            title="Skip to next session"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSettings}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}