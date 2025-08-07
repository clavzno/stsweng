"use client";

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Layout, Users, BarChart3, Settings, Calendar, MessageSquare, FileText, Clock, Target, TrendingUp, GripVertical } from 'lucide-react';

const WelcomeModal = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pages = [
    // Page 1: Welcome
    {
      title: "Welcome to Blocki",
      content: (
        <div className="text-center py-6">
          <div className="mb-8">
            <h2 className="text-4xl font-semibold text-[#0D122C] dark:text-white mb-6 animate-fade-in" style={{ fontFamily: 'Orbitron, monospace' }}>
              Starting today, let's get productive
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto animate-fade-in-delay" style={{ fontFamily: 'Roboto, sans-serif' }}>
              See how we curate the perfect dashboard experience just for you
            </p>
          </div>
          <div className="bg-[#526CF4]/10 border border-[#526CF4]/20 rounded-2xl p-6 max-w-sm mx-auto transform transition-all duration-300 animate-slide-up">
            <Sparkles className="h-10 w-10 text-[#526CF4] mx-auto mb-4 animate-pulse" />
            <p className="text-[#0D122C] dark:text-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Transform your workflow with customizable blocks and intelligent insights
            </p>
          </div>
        </div>
      )
    },
    
    // Page 2: Dashboard Components
    {
      title: "Add Component",
      content: (
        <div className="py-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-[#0D122C] dark:text-white mb-3 animate-fade-in" style={{ fontFamily: 'Orbitron, monospace' }}>
              Add Component
            </h3>
            <p className="text-gray-600 dark:text-gray-300 animate-fade-in-delay" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Choose a component to add to your dashboard
            </p>
          </div>
          
          <div className="grid grid-cols-4 grid-rows-3 gap-3 h-56">
            <div className="col-span-2 row-span-2 p-3 bg-white/70 dark:bg-[#0D122C]/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-sm transition-all duration-300 group cursor-pointer animate-slide-up">
              <div className="flex items-start justify-between mb-2">
                <FileText className="h-7 w-7 text-[#526CF4] transition-colors duration-200" />
                <GripVertical className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </div>
              <h4 className="font-semibold text-[#526CF4] mb-2 text-sm" style={{ fontFamily: 'Orbitron, monospace' }}>
                Courses List
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Manage your course schedule and track your academic progress
              </p>
            </div>
            
            <div className="col-span-2 row-span-1 p-2 bg-white/70 dark:bg-[#0D122C]/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-sm transition-all duration-300 group cursor-pointer animate-slide-up-delay-1">
              <div className="flex items-center justify-between mb-1">
                <Calendar className="h-5 w-5 text-[#4AD147] transition-colors duration-200" />
                <GripVertical className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </div>
              <h4 className="font-semibold text-[#4AD147] text-xs mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>
                Calendar
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Track important dates
              </p>
            </div>
            
            <div className="col-span-1 row-span-1 p-2 bg-white/70 dark:bg-[#0D122C]/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-sm transition-all duration-300 group cursor-pointer animate-slide-up-delay-2">
              <div className="flex items-center justify-between mb-1">
                <BarChart3 className="h-4 w-4 text-[#F38735] transition-colors duration-200" />
                <GripVertical className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </div>
              <h4 className="font-semibold text-[#F38735] text-xs mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>
                Study Tracker
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Monitor progress
              </p>
            </div>
            
            <div className="col-span-1 row-span-1 p-2 bg-white/70 dark:bg-[#0D122C]/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-sm transition-all duration-300 group cursor-pointer animate-slide-up-delay-3">
              <div className="flex items-center justify-between mb-1">
                <Clock className="h-4 w-4 text-[#FF5757] transition-colors duration-200" />
                <GripVertical className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </div>
              <h4 className="font-semibold text-[#FF5757] text-xs mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>
                Pomodoro
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Time blocks
              </p>
            </div>
            
            <div className="col-span-4 row-span-1 p-3 bg-gradient-to-r from-[#F38735]/20 to-[#FF5757]/20 backdrop-blur-sm border border-[#F38735]/30 rounded-2xl shadow-sm transition-all duration-300 group cursor-pointer animate-slide-up-delay-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-[#F38735] transition-colors duration-200" />
                  <div>
                    <h4 className="font-semibold text-[#F38735] text-sm" style={{ fontFamily: 'Orbitron, monospace' }}>
                      Pixel Tracker
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Reveal an image by completing tasks
                    </p>
                  </div>
                </div>
                <GripVertical className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Page 3: Key Features
    {
      title: "Everything you need to succeed",
      content: (
        <div className="py-4">
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-300 text-lg animate-fade-in" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Powerful features designed to streamline your academic workflow and boost productivity.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-4 p-4 bg-white/70 dark:bg-[#0D122C]/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl transition-all duration-300 animate-slide-up">
              <div className="bg-[#526CF4] p-3 rounded-xl shadow-lg">
                <Layout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#0D122C] dark:text-white mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Customizable Workspace
                </h4>
                <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Drag & drop blocks to create your perfect dashboard. Personalize colors, layouts, and widgets.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-white/70 dark:bg-[#0D122C]/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl transition-all duration-300 animate-slide-up-delay-1">
              <div className="bg-[#4AD147] p-3 rounded-xl shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#0D122C] dark:text-white mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Smart Calendar
                </h4>
                <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Sync with Canvas automatically. View assignments, deadlines, and events in one unified timeline.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-white/70 dark:bg-[#0D122C]/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl transition-all duration-300 animate-slide-up-delay-2">
              <div className="bg-[#F38735] p-3 rounded-xl shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-[#0D122C] dark:text-white mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Progress Tracking
                </h4>
                <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Visual analytics for your academic performance. Track grades, completion rates, and study patterns.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start space-x-3 p-3 bg-white/70 dark:bg-[#0D122C]/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl transition-all duration-300 animate-slide-up-delay-3">
                <div className="bg-[#FF5757] p-2 rounded-lg shadow-md">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0D122C] dark:text-white text-sm mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>
                    Task Management
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Intelligent to-do lists with priority sorting
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-white/70 dark:bg-[#0D122C]/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl transition-all duration-300 animate-slide-up-delay-4">
                <div className="bg-[#0D122C] dark:bg-white p-2 rounded-lg shadow-md">
                  <Users className="h-5 w-5 text-white dark:text-[#0D122C]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0D122C] dark:text-white text-sm mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>
                    Canvas Integration
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    One-click login connects all courses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Page 4: Get Started
    {
      title: "You're All Set!",
      content: (
        <div className="text-center py-4">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-[#4AD147] rounded-full flex items-center justify-center mb-6 shadow-lg transform transition-all duration-300 animate-bounce-in">
              <Sparkles className="h-10 w-10 text-white animate-pulse" />
            </div>
            <h3 className="text-2xl font-semibold text-[#0D122C] dark:text-white mb-3 animate-fade-in" style={{ fontFamily: 'Orbitron, monospace' }}>
              Ready to boost your productivity?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 animate-fade-in-delay" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Here's how to get the most out of Blocki
            </p>
          </div>

          <div className="bg-[#526CF4]/10 border border-[#526CF4]/20 rounded-2xl p-5 mb-6 text-left transform transition-all duration-300 animate-slide-up">
            <h4 className="font-semibold text-[#526CF4] mb-4 text-center" style={{ fontFamily: 'Orbitron, monospace' }}>
              🚀 Quick Start Guide
            </h4>
            <ul className="text-[#0D122C] dark:text-gray-300 space-y-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
              <li className="flex items-center space-x-3 animate-fade-in-step-1">
                <span className="w-6 h-6 bg-[#526CF4] text-white text-sm rounded-full flex items-center justify-center font-semibold shadow-md">1</span>
                <span>Click "edit icon" button to enter customization mode</span>
              </li>
              <li className="flex items-center space-x-3 animate-fade-in-step-2">
                <span className="w-6 h-6 bg-[#F38735] text-white text-sm rounded-full flex items-center justify-center font-semibold shadow-md">2</span>
                <span>"+" button to Add blocks to your dashboard</span>
              </li>
              <li className="flex items-center space-x-3 animate-fade-in-step-3">
                <span className="w-6 h-6 bg-[#4AD147] text-white text-sm rounded-full flex items-center justify-center font-semibold shadow-md">3</span>
                <span>Drag and resize to create your perfect layout</span>
              </li>
              <li className="flex items-center space-x-3 animate-fade-in-step-4">
                <span className="w-6 h-6 bg-[#FF5757] text-white text-sm rounded-full flex items-center justify-center font-semibold shadow-md">4</span>
                <span>Save and start being more productive!</span>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 0.6s ease-out 0.2s both;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        
        .animate-slide-up-delay-1 {
          animation: slideUp 0.6s ease-out 0.1s both;
        }
        
        .animate-slide-up-delay-2 {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
        
        .animate-slide-up-delay-3 {
          animation: slideUp 0.6s ease-out 0.3s both;
        }
        
        .animate-slide-up-delay-4 {
          animation: slideUp 0.6s ease-out 0.4s both;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out;
        }
        
        .animate-fade-in-step-1 {
          animation: fadeIn 0.5s ease-out 0.1s both;
        }
        
        .animate-fade-in-step-2 {
          animation: fadeIn 0.5s ease-out 0.3s both;
        }
        
        .animate-fade-in-step-3 {
          animation: fadeIn 0.5s ease-out 0.5s both;
        }
        
        .animate-fade-in-step-4 {
          animation: fadeIn 0.5s ease-out 0.7s both;
        }
      `}</style>
      
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
      >
        <div className="bg-white/95 dark:bg-[#0D122C]/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-white/30 dark:border-gray-700/50 relative transform scale-100 animate-fade-in">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-[#0D122C] dark:hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 hover:scale-110"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-6 min-h-[450px]">
            {pages[currentPage].content}
          </div>

          <div className="flex items-center justify-between px-6 py-4 bg-white/50 dark:bg-[#0D122C]/50 backdrop-blur-sm">
            <div className="flex space-x-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage 
                      ? 'bg-[#526CF4] scale-110 shadow-lg' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                  currentPage === 0
                    ? 'text-gray-400 bg-gray-100/50 dark:bg-gray-700/50 cursor-not-allowed'
                    : 'text-[#0D122C] dark:text-white bg-white/70 dark:bg-gray-700/70 border border-gray-300/50 dark:border-gray-600/50 shadow-sm backdrop-blur-sm'
                }`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              
              {currentPage === pages.length - 1 ? (
                <button
                  onClick={handleClose}
                  className="px-8 py-3 text-sm font-medium text-white bg-[#526CF4] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#526CF4] focus:ring-offset-2 transition-all duration-300 shadow-lg"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Get Started
                </button>
              ) : (
                <button
                  onClick={nextPage}
                  className="px-6 py-3 text-sm font-medium text-white bg-[#526CF4] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#526CF4] focus:ring-offset-2 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeModal;