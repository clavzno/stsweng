"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

// Component Imports
import FormButton from '../components/FormButton'; // Make sure this path is correct

// Asset Imports (ensure these paths point correctly to your public folder)
import logoDark from '../assets/images/logo_full.png'; //
import logoLight from '../assets/images/logo_full_light.png'; //
import footerBg from '../assets/images/footer_bg.png'; //
import footerBgLight from '../assets/images/footer_bglight.png'; //
import landingPageBg from '../assets/images/landingpage_bg.png'; //

// Icon Imports
import {
  FiSun,
  FiMoon,
  FiSettings,
  FiCalendar,
  FiTrendingUp,
  FiCheckSquare,
  FiLink,
} from 'react-icons/fi'; //

export default function LandingPage() {
  // State Management
  const [theme, setTheme] = useState('dark'); //
  const [isLoaded, setIsLoaded] = useState(false); //

  // Theme Management Effects
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme'); //
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; //

    if (savedTheme) {
      setTheme(savedTheme); //
    } else if (systemPrefersDark) {
      setTheme('dark'); //
    } else {
      setTheme('light'); //
    }

    const loadTimer = setTimeout(() => {
      setIsLoaded(true); //
    }, 100);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark'); //
      localStorage.setItem('theme', 'dark'); //
    } else {
      document.documentElement.classList.remove('dark'); //
      localStorage.setItem('theme', 'light'); //
    }
  }, [theme]);

  // Theme Toggle Function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark'); //
  };

  // CSS Classes for Typography
  const headingClasses =
    'text-5xl md:text-7xl font-bold mb-6 font-orbitron text-gray-900 dark:text-white'; //
  const subheadingClasses =
    'text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 font-roboto max-w-3xl mx-auto'; //

  // Scroll Reveal Hooks
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 }); //
  const { ref: whyRef, inView: whyInView } = useInView({ triggerOnce: true, threshold: 0.1 }); //
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 }); //

  return (
    <div
      className={`min-h-screen flex flex-col justify-between text-gray-800 dark:text-white transition-colors duration-300 relative overflow-x-hidden`}
    >
      {/* Static Background Image Layer */}
      <div
        className="fixed inset-0 z-[-1]"
        style={{
          backgroundImage: `url(${landingPageBg.src})`, //
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      ></div>

      {/* Header */}
      <header className="sticky top-0 w-full p-4 bg-off-white/50 dark:bg-dark-bg/50 backdrop-blur-sm z-10">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <img
            src={theme === 'dark' ? logoLight.src : logoDark.src} //
            alt="Logo"
            className="h-10"
          />
          <div className="space-x-6 flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-gray-800 dark:text-white"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} //
            >
              {theme === 'dark' ? <FiSun size={24} /> : <FiMoon size={24} />}
            </button>
            <Link href="/login">
              <FormButton variant="dark" type="button" className="w-auto py-2 px-4">Login</FormButton>
            </Link>
            <Link href="/signup">
              <FormButton variant="primary" type="button" className="w-auto py-2 px-4">Get Started</FormButton>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow z-0">
        <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Hero Section */}
          <section
            ref={heroRef}
            className={`text-center py-20 md:py-32 transition-all duration-700 ease-out ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="max-w-4xl mx-auto px-6">
              <h1 className={headingClasses}>Take control of your productivity with blocki.</h1>
              <p className={`${subheadingClasses} leading-relaxed`}>
                The all-in-one productivity tool designed around Canvas LMS. Build your perfect
                workspace with customizable building blocks, track your academic progress, and stay
                organized.
              </p>
              <Link href="/signup">
                <FormButton variant="primary" size="lg" className="px-10 py-4 text-lg">
                  Try Blocki Today
                </FormButton>
              </Link>
            </div>
          </section>

          {/* "Why Blocki?" Section */}
          <section
            ref={whyRef}
            className={`py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50 ${
              whyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
             <div className="max-w-6xl mx-auto px-6">
               <div className="text-center mb-16 md:mb-20">
                <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-gray-900 dark:text-white">
                  Why blocki?
                </h2>
                <p className="mt-4 text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-roboto">
                  Your workflow, reimagined with Blocki.
                </p>
               </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Customizable Interface', //
                    desc: 'Drag & drop blocks, customize colors, and create your perfect workspace with dark mode.', //
                    color: '#0D122C', //
                    textColor: 'text-gray-100', //
                    icon: <FiSettings className="w-10 h-10" />,
                  },
                  {
                    title: 'Interactive Calendar', //
                    desc: 'View tasks and assignments in one place. Drag to reschedule, never miss a deadline.', //
                    color: '#F38735', //
                    textColor: 'text-gray-900', //
                    icon: <FiCalendar className="w-10 h-10" />,
                  },
                  // ... Add other features here from your original code
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className={`p-8 rounded-xl shadow-xl flex flex-col items-start ${feature.textColor}`} //
                    style={{ backgroundColor: feature.color }} //
                  >
                    <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 font-roboto">{feature.title}</h3>
                    <p className="text-sm leading-relaxed opacity-90">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section
            ref={ctaRef}
            className={`py-20 md:py-28 transition-all duration-700 ease-out ${
              ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="max-w-3xl mx-auto text-center px-6">
              <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-gray-900 dark:text-white mb-6">
                Ready to Elevate Your Productivity?
              </h2>
              <Link href="/signup">
                <FormButton variant="primary" size="lg" className="px-12 py-4 text-xl">
                  Sign Up for Free
                </FormButton>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="w-full p-16 bg-gray-50 dark:bg-gray-900 bg-cover bg-center bg-no-repeat border-t border-gray-200 dark:border-gray-700/50 z-0"
        style={{
          backgroundImage: `url(${theme === 'dark' ? footerBgLight.src : footerBg.src})`, //
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Footer content from your original file */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 font-roboto">
            &copy; {new Date().getFullYear()} Blocki
          </div>
        </div>
      </footer>
    </div>
  );
}