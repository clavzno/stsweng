import React, { useState } from 'react';
import { Book, Clipboard, Megaphone, BarChart3, FileText, MessageSquare } from 'lucide-react';
import BentoGridItem from './BentoGridItem';

const BentoGrid = ({ bentoItems, setBentoItems, openModal, isEditMode }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, item) => {
    if (!isEditMode) return;
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetItem.id || !isEditMode) return;

    const newItems = [...bentoItems];
    const draggedIndex = newItems.findIndex(item => item.id === draggedItem.id);
    const targetIndex = newItems.findIndex(item => item.id === targetItem.id);
    
    // Swap the items
    [newItems[draggedIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[draggedIndex]];
    
    setBentoItems(newItems);
    setDraggedItem(null);
  };

  const sizeClasses = {
    small: 'col-span-1 row-span-1 aspect-square',
    medium: 'col-span-1 md:col-span-2 row-span-1',
    large: 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2'
  };

  const itemConfigs = {
    modules: {
      title: 'Modules',
      subtitle: 'Course content & lessons',
      icon: Book,
      color: '#526CF4', // Blue
      stats: '4 modules available',
      onClick: () => openModal('modules')
    },
    assignments: {
      title: 'Assignments',
      subtitle: 'Tasks & submissions',
      icon: Clipboard,
      color: '#F38735', // Orange
      stats: '2 pending assignments',
      onClick: () => openModal('assignments')
    },
    announcements: {
      title: 'Announcements',
      subtitle: 'Latest updates',
      icon: Megaphone,
      color: '#4AD147', // Green
      stats: '3 new announcements',
      onClick: () => openModal('announcements')
    },
    grades: {
      title: 'Grades',
      subtitle: 'Your performance',
      icon: BarChart3,
      color: '#FF5757', // Red
      stats: 'Current Grade: 2.5',
      onClick: () => openModal('grades')
    },
    syllabus: {
      title: 'Syllabus',
      subtitle: 'Course outline',
      icon: FileText,
      color: '#7c3aed', // Purple
      stats: 'Download PDF',
      onClick: () => openModal('syllabus')
    },
    discussions: {
      title: 'Discussions',
      subtitle: 'Class forum',
      icon: MessageSquare,
      color: '#0891b2', // Teal
      stats: '5 new posts',
      onClick: () => {}
    }
  };

  const renderBentoItem = (item) => {
    const config = itemConfigs[item.type];
    if (!config) return null;

    return (
      <BentoGridItem
        key={item.id}
        className={sizeClasses[item.size]}
        isDragging={draggedItem?.id === item.id}
        draggable={isEditMode}
        onDragStart={(e) => handleDragStart(e, item)}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, item)}
      >
        <div 
          onClick={config.onClick} 
          className={`h-full flex flex-col cursor-pointer overflow-hidden p-4 md:p-6 transition-colors duration-200 bg-gray-800/50 hover:bg-gray-700/50`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: config.color }}
              >
                <config.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white truncate" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>
                  {config.title}
                </h3>
                <p className="text-sm text-gray-400 truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {config.subtitle}
                </p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 mb-4 min-h-0">
            {item.size === 'large' && item.type === 'modules' ? (
              <div className="space-y-3 h-full flex flex-col">
                <div style={{backgroundColor: 'rgba(82, 108, 244, 0.1)'}} className="rounded-lg p-4 flex-1">
                  <h4 className="font-medium text-blue-300 mb-2 text-sm">Recent Modules</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-300">
                      <div className="w-2 h-2 mr-2 rounded-full" style={{backgroundColor: config.color}}></div>
                      02 Integration Testing and TDD
                    </div>
                    <div className="flex items-center text-gray-300">
                      <div className="w-2 h-2 mr-2 rounded-full" style={{backgroundColor: config.color}}></div>
                      01 Unit Testing and CI
                    </div>
                     <div className="flex items-center text-gray-300">
                      <div className="w-2 h-2 mr-2 rounded-full" style={{backgroundColor: config.color}}></div>
                      00 Course Introduction
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>12</div>
                    <div className="text-xs text-gray-400">Total Lessons</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-green-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>8</div>
                    <div className="text-xs text-gray-400">Completed</div>
                  </div>
                </div>
              </div>
            ) : item.size === 'large' ? (
                 <div className="bg-gray-800 rounded-lg p-4 h-full flex items-center justify-center">
                    <div className="text-center">
                        <config.icon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-400">Click to view details</p>
                    </div>
                 </div>
            ) : null}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-400 mt-auto flex-shrink-0">
            <span className="truncate mr-2 flex-1">{config.stats}</span>
            <svg 
              className="w-4 h-4 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </BentoGridItem>
    );
  };

  return (
    <div className="w-full">
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full ${isEditMode ? 'cursor-move' : ''}`}>
        {bentoItems.map(item => renderBentoItem(item))}
      </div>
    </div>
  );
};

export default BentoGrid;