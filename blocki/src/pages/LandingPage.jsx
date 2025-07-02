"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

// Component Imports
import FormButton from '../components/FormButton';

// Asset Imports
import logoDark from '../assets/images/logo_full.png';
import logoLight from '../assets/images/logo_full_light.png';
import logoSingle from '../assets/images/logo_single.png';
import bgImage from '../assets/images/landingpage_bg.png';

// Icon Imports
import {
  FiSun,
  FiMoon,
  FiSettings,
  FiCalendar,
  FiTrendingUp,
  FiCheckSquare,
  FiLink,
  FiZap,
  FiArrowRight,
} from 'react-icons/fi';

export default function LandingPage() {
  // State Management
  const [theme, setTheme] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // WIP: Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }

    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Scroll listener 
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // WIP: Theme toggle
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // typography
  const headingClasses = `
    text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-orbitron text-white
    leading-tight
  `;

  const subheadingClasses = `
    text-lg md:text-xl text-gray-200/90 mb-10 font-roboto max-w-2xl mx-auto leading-relaxed
  `;

  // Background
  const backgroundStyle = {
    backgroundImage: `url(${bgImage.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };

  // Scroll reveal animationz
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Features
  const features = [
    {
      title: 'Customizable Workspace',
      desc: 'Drag & drop blocks to create your perfect dashboard. Personalize colors, layouts, and widgets.',
      color: '#0D122C',
      textColor: 'text-white',
      icon: <FiSettings className="w-8 h-8" />,
    },
    {
      title: 'Smart Calendar',
      desc: 'Sync with Canvas automatically. View assignments, deadlines, and events in one unified timeline.',
      color: '#F38735',
      textColor: 'text-white',
      icon: <FiCalendar className="w-8 h-8" />,
    },
    {
      title: 'Progress Tracking',
      desc: 'Visual analytics for your academic performance. Track grades, completion rates, and study patterns.',
      color: '#4F46E5',
      textColor: 'text-white',
      icon: <FiTrendingUp className="w-8 h-8" />,
    },
    {
      title: 'Task Management',
      desc: 'Intelligent to-do lists with priority sorting, due date reminders, and progress indicators.',
      color: '#059669',
      textColor: 'text-white',
      icon: <FiCheckSquare className="w-8 h-8" />,
    },
    {
      title: 'Canvas Integration',
      desc: 'One-click login connects all your courses, assignments, and grades seamlessly.',
      color: '#DC2626',
      textColor: 'text-white',
      icon: <FiLink className="w-8 h-8" />,
    },
    {
      title: 'Instant Sync',
      desc: 'Real-time updates across all devices. Never miss an assignment or important deadline again.',
      color: '#7C3AED',
      textColor: 'text-white',
      icon: <FiZap className="w-8 h-8" />,
    },
  ];

  // Benefits
  const benefits = [
    {
      title: "Save 5+ Hours Weekly",
      description: "Streamline your workflow and eliminate context switching between multiple apps.",
      icon: <FiZap className="w-6 h-6" />
    },
    {
      title: "Never Miss Deadlines",
      description: "Smart notifications and visual timeline keep you ahead of all assignments.",
      icon: <FiCalendar className="w-6 h-6" />
    },
    {
      title: "Boost Your Productivity",
      description: "Students report better academic performance with organized workflow and clear visibility.",
      icon: <FiTrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-white transition-colors duration-300 relative overflow-x-hidden" style={backgroundStyle}>
      <div className="fixed inset-0 bg-dark-bg/60 z-0"></div>
      
      {/* Animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-1">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-accent/5 rounded-full blur-lg animate-pulse delay-300"></div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 w-full p-4 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-bg/90 backdrop-blur-lg shadow-2xl border-b border-primary/20' 
          : 'bg-dark-bg/50 backdrop-blur-sm'
      }`}>
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <img
            src={logoLight.src}
            alt="Blocki Logo"
            className="h-10 transition-transform duration-300 hover:scale-105 filter drop-shadow-lg"
          />
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-white"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <Link href="/login">
              <FormButton variant="outline" type="button" className="px-8 py-3 text-sm font-medium border-primary/30 text-white transition-all duration-300 ease-out transform hover:scale-105">
                Login
              </FormButton>
            </Link>
            <Link href="/signup">
              <FormButton variant="primary" type="button" className="px-8 py-3 text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105">
                Try Blocki Now
              </FormButton>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-grow relative z-20">
        <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Hero Section */}
          <section
            ref={heroRef}
            className={`text-center py-8 md:py-12 lg:py-16 transition-all duration-700 ease-out ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-4">
                <img
                  src={logoSingle.src}
                  alt="Blocki Logo"
                  className={`mx-auto h-40 w-40 object-contain mb-2 transition-all duration-1000 ease-out
                    ${isLoaded
                      ? 'opacity-100 translate-y-0 rotate-0'
                      : 'opacity-0 -translate-y-12 rotate-12'
                    }
                    hover:scale-110 hover:rotate-6 cursor-pointer filter drop-shadow-lg
                  `}
                />
              </div>

              <h1 className={headingClasses}>
                Take control of your productivity with Blocki
              </h1>
              
              <p className={subheadingClasses}>
                The all-in-one productivity platform designed specifically for students. 
                Connect with Canvas, track your progress, and never miss a deadline again.
              </p>
              
            </div>
          </section>

          {/* Benefits */}
          <section
            ref={benefitsRef}
            className={`py-16 md:py-20 transition-all duration-700 ease-out ${
              benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className={`text-center p-8 bg-dark-bg/80 border border-primary/20 backdrop-blur-md rounded-2xl shadow-2xl hover:bg-dark-bg/90 hover:border-primary/40 hover:scale-105 transition-all duration-500 ease-out ${
                      benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mb-4">
                      <div className="text-primary">
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white font-orbitron">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-200/90 font-roboto text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section
            ref={featuresRef}
            className={`py-16 md:py-20 transition-all duration-700 ease-out ${
              featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-orbitron text-white mb-4 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                  Everything you need to succeed
                </h2>
                <p className="text-xl text-gray-200/90 font-roboto max-w-3xl mx-auto">
                  Powerful features designed to streamline your academic workflow and boost productivity.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`group p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-sm border border-white/10 ${
                      featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ 
                      backgroundColor: `${feature.color}dd`,
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-white/20 rounded-lg mr-3">
                        <div className={feature.textColor}>
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className={`text-xl font-bold font-orbitron ${feature.textColor}`}>
                        {feature.title}
                      </h3>
                    </div>
                    <p className={`${feature.textColor} opacity-90 leading-relaxed font-roboto text-sm`}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section
            ref={ctaRef}
            className={`py-16 md:py-20 transition-all duration-700 ease-out ${
              ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="max-w-4xl mx-auto text-center px-6">
              <div className="bg-dark-bg/80 border border-primary/30 backdrop-blur-lg rounded-2xl shadow-2xl p-12 hover:bg-dark-bg/90 hover:border-primary/40 transition-all duration-500">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-orbitron text-white mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                  Ready to transform your academic life?
                </h2>
                <p className="text-xl text-gray-200/90 mb-8 font-roboto max-w-2xl mx-auto">
                  Experience the power of organized productivity and seamless Canvas integration.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/signup">
                    <FormButton 
                      variant="primary" 
                      size="lg" 
                      className="px-10 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
                    >
                      Try Blocki Now
                    </FormButton>
                  </Link>
                  <Link href="/login">
                    <FormButton 
                      variant="outline" 
                      size="lg" 
                      className="px-10 py-4 text-lg font-semibold border-primary/30 text-white hover:bg-primary/10"
                    >
                      Login
                    </FormButton>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* WIP: Footer */}
      <footer className="w-full py-12 bg-dark-bg/80 backdrop-blur-lg border-t border-primary/20 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <img
                src={logoLight.src}
                alt="Blocki Logo"
                className="h-8 mb-4 filter drop-shadow-lg"
              />
              <p className="text-gray-200/90 text-sm leading-relaxed">
                The productivity platform designed specifically for students and Canvas integration.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 font-orbitron">Links</h4>
              <ul className="space-y-2 text-sm text-gray-200/90">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/help" className="hover:text-primary transition-colors">Help</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 font-orbitron">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-200/90">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-200/90 text-sm">
              &copy; {new Date().getFullYear()} Blocki. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-200/90 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-200/90 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}