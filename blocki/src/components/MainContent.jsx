"use client";

import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import CoursesList from './CoursesList';
import Calendar from './Calendar';
import StudyTracker from './StudyTracker';
import Pomodoro from './Pomodoro';
import AddComponentModal from './AddComponentModal';
import Settings from './Settings';
import SaveLayoutButton from './SaveLayoutButton';

// Added by Jack on 2025-07-09
import { useSession } from 'next-auth/react';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function UpdatedMainContent({ isEditMode, setIsEditMode }) {
    // Added by Jack on 2025-07-09
    const { data: session, status } = useSession()

    const [layout, setLayout] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const savedLayout = localStorage.getItem('dashboardLayout');
        if (savedLayout) {
            setLayout(JSON.parse(savedLayout));
        }
    }, []);

    useEffect(() => {
        if (layout.length > 0) {
            localStorage.setItem('dashboardLayout', JSON.stringify(layout));
        }
    }, [layout]);

    const handleAddComponent = (componentId) => {
        // Generates unique ID to prevent duplicates of the components/widgets
        const timestamp = Date.now();
        const uniqueId = `${componentId}_${timestamp}`;
        const newItem = {
            i: uniqueId,
            x: (layout.length * 4) % 12,
            y: Infinity,
            w: 4,
            h: 2,
            component: componentId,
        };
        setLayout([...layout, newItem]);
        setIsModalOpen(false);
    };

    const handleRemoveComponent = (componentId) => {
        setLayout(layout.filter((item) => item.i !== componentId));
    };

    const renderComponent = (item) => {
        const componentMap = {
            courses: <CoursesList />,
            calendar: <Calendar />,
            tracker: <StudyTracker />,
            pomodoro: <Pomodoro />,
        };

        const componentType = item.component || item.i.split('_')[0];

        return (
            <div key={item.i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md relative overflow-hidden">
                {isEditMode && (
                    <div className="absolute top-0 right-0 z-50" style={{ pointerEvents: 'auto' }}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemoveComponent(item.i);
                            }}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-bl-lg rounded-tr-lg h-8 w-8 flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                            title="Remove component"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
                {/* Updated: Added hide-scrollbar-keep-scroll class and better overflow handling */}
                <div className={`h-full w-full hide-scrollbar-keep-scroll ${isEditMode ? 'pt-8 pr-8 pl-2 pb-4' : 'p-4'}`}>
                    {componentMap[componentType]}
                </div>
            </div>
        );
    };

    const handleSaveLayout = () => {
        localStorage.setItem('dashboardLayout', JSON.stringify(layout));
        alert('Layout saved!');
    };

    return (
        // Updated: Enhanced hide-scrollbar class usage
        <main className="flex-1 overflow-y-auto hide-scrollbar bg-gray-50 dark:bg-gray-900">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="max-w-4xl">
                    <h1 className="text-2xl font-orbitron font-bold text-gray-900 dark:text-white mb-2">
                        {/*Hi, Almira Velasquez!*/}
                        {session?.accessToken
                            ? <>Welcome, {session?.user?.name || 'User'}!<br />Access Token: {session.accessToken}</>
                            : "Welcome, Guest!"}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 font-roboto">
                        Today is {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })} • {new Date().toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
            </div>

            <div className="p-6">
                {/* Settings panel */}
                {isEditMode && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-center justify-between">
                            <SaveLayoutButton onSave={handleSaveLayout} />
                        </div>
                        <Settings />
                    </div>
                )}

                {/* Updated: Added hide-scrollbar class to grid layout */}
                <ResponsiveGridLayout
                    className={`layout hide-scrollbar ${isEditMode ? 'border-2 border-dashed border-blue-400 dark:border-blue-500 rounded-lg p-4' : ''}`}
                    layouts={{ lg: layout }}
                    onLayoutChange={(newLayout) => setLayout(newLayout)}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={100}
                    isDraggable={isEditMode}
                    isResizable={isEditMode}
                >
                    {layout.map(renderComponent)}
                </ResponsiveGridLayout>

                {layout.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-orbitron">
                            Hi, I'm your first block!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 font-roboto max-w-md mx-auto">
                            Let's get productive! Click the + button below to add your first component and start building your perfect dashboard.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Add Your First Component
                        </button>
                    </div>
                )}

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg transition-colors z-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                <AddComponentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAddComponent={handleAddComponent}
                />
            </div>
        </main>
    );
}