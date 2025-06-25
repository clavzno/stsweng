"use client"; 

import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import CoursesList from './CoursesList';
import Calendar from './Calendar';
import StudyTracker from './StudyTracker';
import Pomodoro from './Pomodoro';
import AddComponentModal from './AddComponentModal';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function MainContent() {
    // 1. Initialize state with a default, non-browser value (an empty array).
    const [layout, setLayout] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // 2. Use useEffect to safely access localStorage only on the client-side.
    useEffect(() => {
        const savedLayout = localStorage.getItem('dashboardLayout');
        if (savedLayout) {
            setLayout(JSON.parse(savedLayout));
        }
    }, []); // The empty dependency array [] ensures this runs only once on mount.

    // This useEffect to save the layout is correct and can remain.
    useEffect(() => {
        // To avoid saving the initial empty layout, check if the layout has items.
        if (layout.length > 0) {
            localStorage.setItem('dashboardLayout', JSON.stringify(layout));
        }
    }, [layout]);

    const handleAddComponent = (componentId) => {
        const newItem = {
            i: componentId,
            x: (layout.length * 4) % 12,
            y: Infinity, // places item at the bottom
            w: 4,
            h: 2,
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

        return (
            <div key={item.i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 relative overflow-hidden">
                {isEditMode && (
                    <button
                        onClick={() => handleRemoveComponent(item.i)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center z-10"
                    >
                        &times;
                    </button>
                )}
                <div className="h-full w-full overflow-auto">
                    {componentMap[item.i]}
                </div>
            </div>
        );
    };

    return (
        <main className="flex-1 overflow-y-auto p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-orbitron font-semibold text-gray-800 dark:text-gray-100">
                        Hello, Almira Velasquez!
                    </h1>
                    <h3 className="text-2xl font-orbitron text-gray-800 dark:text-gray-200">
                        Today is March 30, 2025 10:21 PM
                    </h3>
                </div>
                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {isEditMode ? 'Done' : 'Edit Layout'}
                </button>
            </div>

            <ResponsiveGridLayout
                className={`layout ${isEditMode ? 'border-2 border-dashed border-gray-400' : ''}`}
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
                 <div
                    onClick={() => setIsModalOpen(true)}
                    className="
                        border-2 border-dashed border-gray-300 dark:border-gray-600
                        rounded-lg h-48 flex justify-center items-center cursor-pointer
                        hover:bg-gray-50 dark:hover:bg-gray-700
                        select-none font-roboto text-gray-400 dark:text-gray-300
                    "
                >
                    <div className="text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 mx-auto mb-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="block text-lg font-medium">Get Productive!</span>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
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
        </main>
    );
}