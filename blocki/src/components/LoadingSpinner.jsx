// LoadingSpinner.jsx - Hydration Safe Version
"use client";

import React, { useState, useEffect } from 'react';

// Basic Spinner Component
export const Spinner = ({ size = 'md', color = 'blue', className = '' }) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4', 
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600', 
    red: 'border-red-600',
    purple: 'border-purple-600',
    gray: 'border-gray-600',
    white: 'border-white'
  };

  return (
    <div 
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

// Dots Loading Animation
export const DotsLoader = ({ size = 'md', color = 'blue', className = '' }) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2', 
    lg: 'w-3 h-3'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600', 
    purple: 'bg-purple-600',
    gray: 'bg-gray-600',
    white: 'bg-white'
  };

  return (
    <div className={`flex space-x-1 ${className}`} role="status" aria-label="Loading">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

// Pulse Loading Animation  
export const PulseLoader = ({ size = 'md', color = 'blue', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600', 
    gray: 'bg-gray-600',
    white: 'bg-white'
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse ${className}`} role="status" aria-label="Loading" />
  );
};

// Hydration-safe Skeleton Loader
export const SkeletonLoader = ({ lines = 3, className = '', seed = 0 }) => {
  const [isClient, setIsClient] = useState(false);
  const [widths, setWidths] = useState([]);

  useEffect(() => {
    setIsClient(true);
    // Generate consistent widths based on seed for hydration safety
    const generatedWidths = Array.from({ length: lines }, (_, index) => {
      // Use a simple algorithm to generate consistent "random" widths
      const value = ((seed + index) * 9301 + 49297) % 233280;
      return 60 + (value / 233280) * 40; // Between 60% and 100%
    });
    setWidths(generatedWidths);
  }, [lines, seed]);

  // Show consistent widths on both server and client initially
  const fallbackWidths = Array.from({ length: lines }, (_, index) => {
    const value = ((seed + index) * 9301 + 49297) % 233280;
    return 60 + (value / 233280) * 40;
  });

  const actualWidths = isClient ? widths : fallbackWidths;

  return (
    <div className={`animate-pulse ${className}`} role="status" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index} 
          className="bg-gray-200 dark:bg-gray-700 rounded h-4 mb-3 last:mb-0" 
          style={{ width: `${actualWidths[index] || 75}%` }}
        />
      ))}
    </div>
  );
};

// Full Page Loading Overlay
export const LoadingOverlay = ({ 
  isVisible, 
  message = 'Loading...', 
  spinnerType = 'spinner',
  spinnerSize = 'xl',
  className = '' 
}) => {
  if (!isVisible) return null;

  const renderSpinner = () => {
    switch (spinnerType) {
      case 'dots':
        return <DotsLoader size={spinnerSize} color="white" />;
      case 'pulse':
        return <PulseLoader size={spinnerSize} color="white" />;
      default:
        return <Spinner size={spinnerSize} color="white" />;
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl flex flex-col items-center space-y-4 max-w-sm mx-4">
        {renderSpinner()}
        <p className="text-gray-700 dark:text-gray-300 font-medium text-center">{message}</p>
      </div>
    </div>
  );
};

// Inline Loading with Text
export const InlineLoader = ({ 
  text = 'Loading...', 
  spinnerType = 'spinner',
  size = 'sm',
  position = 'left',
  className = '' 
}) => {
  const renderSpinner = () => {
    switch (spinnerType) {
      case 'dots':
        return <DotsLoader size={size} />;
      case 'pulse':
        return <PulseLoader size={size} />;
      default:
        return <Spinner size={size} />;
    }
  };

  return (
    <div className={`flex items-center ${position === 'right' ? 'flex-row-reverse' : ''} space-x-2 ${className}`}>
      {renderSpinner()}
      <span className="text-gray-600 dark:text-gray-400">{text}</span>
    </div>
  );
};

// Button Loading State
export const LoadingButton = ({ 
  children, 
  loading = false, 
  disabled = false,
  onClick,
  className = '',
  spinnerSize = 'sm',
  ...props 
}) => {
  return (
    <button
      onClick={loading ? undefined : onClick}
      disabled={disabled || loading}
      className={`relative inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size={spinnerSize} color="white" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

// Hydration-safe Card Loading State
export const LoadingCard = ({ title, lines = 3, showAvatar = false, className = '', seed = 0 }) => {
  const [isClient, setIsClient] = useState(false);
  const [widths, setWidths] = useState([]);

  useEffect(() => {
    setIsClient(true);
    // Generate consistent widths based on seed for hydration safety
    const generatedWidths = Array.from({ length: lines }, (_, index) => {
      const value = ((seed + index) * 9301 + 49297) % 233280;
      return 70 + (value / 233280) * 30; // Between 70% and 100%
    });
    setWidths(generatedWidths);
  }, [lines, seed]);

  // Show consistent widths on both server and client initially
  const fallbackWidths = Array.from({ length: lines }, (_, index) => {
    const value = ((seed + index) * 9301 + 49297) % 233280;
    return 70 + (value / 233280) * 30;
  });

  const actualWidths = isClient ? widths : fallbackWidths;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="animate-pulse">
        {/* Header with optional avatar */}
        <div className="flex items-center space-x-3 mb-4">
          {showAvatar && (
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          )}
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            {title && <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>}
          </div>
        </div>
        
        {/* Content lines */}
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <div 
              key={index} 
              className="h-3 bg-gray-200 dark:bg-gray-700 rounded" 
              style={{ width: `${actualWidths[index] || 75}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Progress Bar Loading
export const ProgressLoader = ({ 
  progress = 0, 
  message = 'Loading...', 
  showPercentage = true,
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{message}</span>
        {showPercentage && (
          <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};

// Table Loading State
export const LoadingTable = ({ rows = 5, columns = 4, className = '', seed = 0 }) => {
  const [isClient, setIsClient] = useState(false);
  const [widths, setWidths] = useState([]);

  useEffect(() => {
    setIsClient(true);
    // Generate consistent widths for all cells
    const totalCells = rows * columns;
    const generatedWidths = Array.from({ length: totalCells }, (_, index) => {
      const value = ((seed + index) * 9301 + 49297) % 233280;
      return 60 + (value / 233280) * 40;
    });
    setWidths(generatedWidths);
  }, [rows, columns, seed]);

  // Fallback widths for SSR
  const fallbackWidths = Array.from({ length: rows * columns }, (_, index) => {
    const value = ((seed + index) * 9301 + 49297) % 233280;
    return 60 + (value / 233280) * 40;
  });

  const actualWidths = isClient ? widths : fallbackWidths;

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="animate-pulse">
        {/* Table Header */}
        <div className="grid gap-4 p-4 border-b border-gray-200 dark:border-gray-700" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
        
        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid gap-4 p-4 border-b border-gray-100 dark:border-gray-800" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => {
              const cellIndex = rowIndex * columns + colIndex;
              return (
                <div 
                  key={colIndex} 
                  className="h-3 bg-gray-200 dark:bg-gray-700 rounded" 
                  style={{ width: `${actualWidths[cellIndex] || 75}%` }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom Hook for Loading States
export const useLoading = (initialState = false) => {
  const [loading, setLoading] = React.useState(initialState);
  
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const toggleLoading = () => setLoading(prev => !prev);
  
  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
    setLoading
  };
};

// HOC for adding loading states to components
export const withLoading = (WrappedComponent, LoaderComponent = LoadingCard) => {
  return function WithLoadingComponent({ loading, ...props }) {
    if (loading) {
      return <LoaderComponent {...props} />;
    }
    return <WrappedComponent {...props} />;
  };
};