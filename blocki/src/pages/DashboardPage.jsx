"use client";

import React, { useState } from 'react';
import CustomizableSidebar from '../components/Sidebar';
import Header from '../components/Header';
import UpdatedMainContent from '../components/MainContent';

// Testing by Jack on 2025-07-09
import UserInfo from '../components/OauthComponents';
import { SessionProvider } from "next-auth/react"

export default function UpdatedDashboardPage() {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSaveLayout = () => {
    // This will be handled by the MainContent component :D
    console.log('Layout saved from header');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <SessionProvider>
        <UserInfo />
        {/* Testing by Jack on 2025-07-09 */}
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
      </SessionProvider>
    </div>
  );
}