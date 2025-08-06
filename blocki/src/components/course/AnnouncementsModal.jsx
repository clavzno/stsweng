import React, { useState, useEffect } from 'react';
import { X, Megaphone } from 'lucide-react';

// Skeleton Loader Component
const SkeletonLoader = ({ lines = 1, className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="bg-gray-600/30 rounded h-4 mb-2 last:mb-0" />
    ))}
  </div>
);

const AnnouncementsModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate data fetching
      setTimeout(() => setLoading(false), 800);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const announcements = [
    {
      id: 2,
      title: 'Assignment 1 Due Soon',
      content: 'Please submit your MCO1 by this Friday, July 25th. Late submissions will be penalized.',
      date: 'July 22, 2025',
      priority: 'urgent'
    },
    {
      id: 1,
      title: 'Welcome to the STSWENG Course!',
      content: 'We are excited to have you here. Please familiarize yourself with the syllabus and check the upcoming assignments in the course modules.',
      date: 'July 20, 2025',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Office Hours Update',
      content: 'Regular office hours will be held every Wednesday from 2-4 PM via Google Meet. Please send an email if you need to schedule a different time.',
      date: 'July 18, 2025',
      priority: 'medium'
    },
  ];

  const priorityColors = {
    urgent: '#FF5757', // Red
    high: '#526CF4',   // Blue
    medium: '#F38735' // Orange
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700" style={{ backgroundColor: '#0D122C' }}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Megaphone className="w-8 h-8 text-green-400" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}>
                  Course Announcements
                </h2>
                <p className="text-gray-300 text-sm" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Stay updated with the latest course news and updates.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
          <style jsx>{`.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 bg-gray-800/50 border border-gray-600/30 rounded-lg">
                  <SkeletonLoader lines={3} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-gray-800/50 p-4 rounded-lg border-l-4 transition-all hover:bg-gray-700/50"
                  style={{ borderLeftColor: priorityColors[announcement.priority] }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white text-base" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>{announcement.title}</h3>
                    <span className="text-sm text-gray-400 flex-shrink-0 ml-4">{announcement.date}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm">{announcement.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsModal;