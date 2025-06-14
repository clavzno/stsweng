import React from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

export default function DashboardPage() {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-dark-bg">
      <Sidebar />
      <MainContent />
    </div>
  );
}
