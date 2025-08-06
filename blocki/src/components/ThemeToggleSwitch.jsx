import { useEffect, useState } from 'react';

const ThemeToggleSwitch = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="px-4 py-2 rounded-full bg-primary text-white dark:bg-accent transition"
    >
      {isDark ? '☀ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggleSwitch;
