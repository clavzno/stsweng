    // MainContent.jsx
import React from 'react';

export default function MainContent() {
    return (
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-orbitron font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Hello, Almira Velasquez!
        </h1>
        <h3 className="text-2xl font-orbitron text-gray-800 dark:text-gray-200 mb-6">
            Today is March 30, 2025 10:21 PM
        </h3>

        <section>
            <div
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
        </section>
        </main>
);
}
