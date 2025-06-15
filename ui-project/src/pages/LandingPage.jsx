import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormButton from '../components/FormButton';
import bgImage from '../assets/images/background.png';
import logoDark from '../assets/images/logo_full.png';
import logoLight from '../assets/images/logo_full_light.png';

/**
 * LandingPage component
 */
export default function LandingPage() {
  const [hasLoadedAnimation, setHasLoadedAnimation] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setHasLoadedAnimation(true);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const landingContainerBaseClasses =
    'min-h-screen flex flex-col justify-between login-container bg-cover bg-center';
  const landingContainerClasses = hasLoadedAnimation
    ? `${landingContainerBaseClasses} loaded`
    : landingContainerBaseClasses;

  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
  };

  const glassCardClasses =
    'p-10 shadow-2xl bg-dark-bg/80 border border-primary/20 backdrop-blur-md rounded-xl text-center';

  const headingClasses =
    'text-5xl md:text-7xl text-white font-bold mb-4 font-orbitron';

  const subheadingClasses = 'text-lg md:text-xl text-gray-300 mb-8 font-roboto max-w-3xl mx-auto';

  const featureIconClasses = "h-12 w-12 text-orange mx-auto mb-4";

  return (
    <div className={`${landingContainerClasses} bg-off-white dark:bg-dark-bg text-gray-800 dark:text-white`} style={backgroundStyle}>
      <header className="sticky top-0 w-full p-4 bg-off-white/50 dark:bg-dark-bg/50 backdrop-blur-sm z-10">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <img src={theme === 'dark' ? logoLight : logoDark} alt="Logo" className="h-10" />
          <div className="space-x-6 flex items-center">
            <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-gray-800 dark:text-white">
              {theme === 'dark' ?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              }
            </button>
            <Link to="/login" className="hover:text-orange transition-colors">Login</Link>
            <Link to="/signup">
              <FormButton variant="blue">Get Started</FormButton>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-center py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className={`${headingClasses} text-gray-900 dark:text-white`}>Introducing blocki.</h1>
            <p className={`${subheadingClasses} text-gray-600 dark:text-gray-300`}>
              The all-in-one productivity tool designed around Canvas LMS. Build your perfect workspace with customizable building blocks, track your academic progress, and stay organized.
            </p>
            <Link to="/signup">
              <FormButton variant="blue" size="lg">Start Building Today</FormButton>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-100 dark:bg-dark-bg/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 font-orbitron text-gray-900 dark:text-white">Building Blocks for Academic Success</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className={`${glassCardClasses} bg-white/80 dark:bg-dark-bg/80`}>
                <svg className={featureIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Customizable Interface</h3>
                <p className="text-gray-600 dark:text-gray-300">Drag and drop building blocks, customize colors, rename courses, and create your perfect workspace with dark mode support.</p>
              </div>
              <div className={`${glassCardClasses} bg-white/80 dark:bg-dark-bg/80`}>
                <svg className={featureIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Interactive Calendar</h3>
                <p className="text-gray-600 dark:text-gray-300">View all your tasks and assignments in one place. Drag and drop to reschedule, and never miss a deadline again.</p>
              </div>
              <div className={`${glassCardClasses} bg-white/80 dark:bg-dark-bg/80`}>
                <svg className={featureIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Academic Tracker</h3>
                <p className="text-gray-600 dark:text-gray-300">Track your progress with visual graphs and the unique blocki tracker that fills up pixel images as you complete tasks.</p>
              </div>
            </div>
            
            {/* Additional Features Row */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className={`${glassCardClasses} bg-white/80 dark:bg-dark-bg/80`}>
                <svg className={featureIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Advanced Todo</h3>
                <p className="text-gray-600 dark:text-gray-300">Create priority-tagged to-do lists that carry over daily. Set due dates, organize by priority levels, and watch overdue tasks turn red.</p>
              </div>
              <div className={`${glassCardClasses} bg-white/80 dark:bg-dark-bg/80`}>
                <svg className={featureIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Canvas Integration</h3>
                <p className="text-gray-600 dark:text-gray-300">Seamlessly connect with Canvas LMS through API integration. Enhance your AnimoSpace experience with better customization and organization.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full p-8 bg-off-white/50 dark:bg-dark-bg/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Product</h4>
            <ul>
              <li className="mb-2"><Link to="#" className="hover:text-orange">Building Blocks</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-orange">Canvas Integration</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-orange">Academic Tools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Support</h4>
            <ul>
              <li className="mb-2"><Link to="#" className="hover:text-orange">Getting Started</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-orange">Canvas Setup</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-orange">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Resources</h4>
            <ul>
              <li className="mb-2"><Link to="#" className="hover:text-orange">User Guide</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-orange">Help Center</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-orange">API Docs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Legal</h4>
            <ul>
              <li className="mb-2"><Link to="#" className="hover:text-orange">Privacy Policy</Link></li>
              <li className="mb-2"><Link to="#" className="hover:text-orange">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
          <p>&copy; 2025 blocki. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}