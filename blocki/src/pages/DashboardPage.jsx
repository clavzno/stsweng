"use client";

import React, { useState, useEffect } from 'react';
import CustomizableSidebar from '../components/Sidebar';
import Header from '../components/Header';
import UpdatedMainContent from '../components/MainContent';
import { LoadingOverlay, LoadingCard, Spinner } from '../components/LoadingSpinner';

export default function UpdatedDashboardPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    // Simulate dashboard initialization
    const initDashboard = async () => {
      try {
        // Simulate loading user data, preferences, layout, etc.
        await new Promise(resolve => setTimeout(resolve, 2000));
        setDashboardLoading(false);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
        setDashboardLoading(false);
      }
    };

    initDashboard();
  }, []);

  const handleSaveLayout = async () => {
    setSaveLoading(true);
    try {
      // Simulate saving layout
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Layout saved successfully');
    } catch (error) {
      console.error('Failed to save layout:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  // Show loading screen while dashboard initializes
  if (dashboardLoading) {
    return (
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        {/* Header Skeleton */}
        <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Skeleton */}
          <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
              <div className="flex space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Component Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <LoadingCard key={i} lines={4} showAvatar className="h-64" />
              ))}
            </div>

            {/* Loading indicator */}
            <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Spinner size="sm" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Loading dashboard...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Header 
        isEditMode={isEditMode} 
        setIsEditMode={setIsEditMode}
        onSaveLayout={handleSaveLayout}
        saveLoading={saveLoading}
      />
      <div className="flex flex-1 overflow-hidden">
        <CustomizableSidebar />
        <UpdatedMainContent 
          isEditMode={isEditMode} 
          setIsEditMode={setIsEditMode} 
        />
      </div>

      {/* Save Loading Overlay */}
      <LoadingOverlay 
        isVisible={saveLoading}
        message="Saving your layout..."
        spinnerType="spinner"
      />
    </div>
  );
}