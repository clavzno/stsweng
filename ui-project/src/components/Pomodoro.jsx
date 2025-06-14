import React, { useState, useEffect } from 'react';

export default function Pomodoro() {
  const [mode, setMode] = useState('pomodoro');
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
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
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
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

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="bg-monochrome p-4 rounded-lg shadow-md text-center">
      <div className="flex justify-center space-x-2 mb-4">
        <button onClick={() => setMode('pomodoro')} className={`py-1 px-3 rounded-lg ${mode === 'pomodoro' ? 'bg-primary text-white' : 'text-monochrome'}`}>Pomodoro</button>
        <button onClick={() => setMode('shortBreak')} className={`py-1 px-3 rounded-lg ${mode === 'shortBreak' ? 'bg-primary text-white' : 'text-monochrome'}`}>Short Break</button>
        <button onClick={() => setMode('longBreak')} className={`py-1 px-3 rounded-lg ${mode === 'longBreak' ? 'bg-primary text-white' : 'text-monochrome'}`}>Long Break</button>
      </div>
      <div className="text-6xl font-bold text-white mb-4">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="space-x-4 mb-4">
        <button onClick={toggle} className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#4059e8] transition-colors">
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} className="bg-red text-white py-2 px-4 rounded-lg hover:bg-[#ff4444] transition-colors">
          Reset
        </button>
      </div>
      <div className="flex justify-around text-white">
        <div>
          <label>Pomodoro</label>
          <input type="number" name="pomodoro" value={settings.pomodoro} onChange={handleSettingsChange} className="w-16 ml-2 bg-transparent border-b-2 border-gray-400" />
        </div>
        <div>
          <label>Short Break</label>
          <input type="number" name="shortBreak" value={settings.shortBreak} onChange={handleSettingsChange} className="w-16 ml-2 bg-transparent border-b-2 border-gray-400" />
        </div>
        <div>
          <label>Long Break</label>
          <input type="number" name="longBreak" value={settings.longBreak} onChange={handleSettingsChange} className="w-16 ml-2 bg-transparent border-b-2 border-gray-400" />
        </div>
      </div>
    </div>
  );
}
