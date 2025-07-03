"use client";

import React, { useState } from 'react';
import CustomizableSidebar from '../components/Sidebar';
import Header from '../components/Header';
import UpdatedMainContent from '../components/MainContent';

export default function UpdatedDashboardPage() {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSaveLayout = () => {
    // This will be handled by the MainContent component :D
    console.log('Layout saved from header');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Header 
        isEditMode={isEditMode} 
        setIsEditMode={setIsEditMode}
        onSaveLayout={handleSaveLayout}
      />
      <div className="flex flex-1 overflow-hidden">
        <CustomizableSidebar />
        <UpdatedMainContent 
          isEditMode={isEditMode} 
          setIsEditMode={setIsEditMode} 
        />
      </div>
    </div>
  );
}