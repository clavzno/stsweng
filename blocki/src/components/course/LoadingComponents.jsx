import React from 'react';

export const Spinner = ({ 
  size = "md", 
  variant = "circular",
  className = "",
}) => {
  const sizeClasses = {
    xs: "w-3 h-3", sm: "w-4 h-4", md: "w-6 h-6",
    lg: "w-8 h-8", xl: "w-12 h-12"
  };

  const ringSpinner = (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-600 border-t-gray-400 ${className}`} />
  );

  const dotsSpinner = (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`bg-gray-500 rounded-full animate-pulse ${sizeClasses[size].replace('w-','w-').replace('h-','h-')}`}
          style={{ animationDelay: `${i * 0.2}s`, animationDuration: '1.4s' }}
        />
      ))}
    </div>
  );

  if (variant === "ring") return ringSpinner;
  if (variant === "dots") return dotsSpinner;

  // Default circular spinner
  return (
    <div className={`${sizeClasses[size]} animate-spin text-gray-400 ${className}`}>
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-25" />
        <path d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z" fill="currentColor" className="opacity-75" />
      </svg>
    </div>
  );
};

// Enhanced Skeleton Loader
export const SkeletonLoader = ({ 
  lines = 1, 
  className = "",
  variant = "default",
}) => {
  const baseClasses = "bg-gray-700 rounded animate-pulse";
  
  if (variant === "card") {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className={`${baseClasses} h-32 rounded-xl mb-3`}></div>
            <div className="space-y-2">
              <div className={`${baseClasses} h-4 w-3/4`}></div>
              <div className={`${baseClasses} h-3 w-1/2`}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`${baseClasses} h-4 ${i > 0 ? 'w-5/6' : 'w-full'}`} />
      ))}
    </div>
  );
};


// Loading Overlay
export const LoadingOverlay = ({ isVisible = false, message = "Loading..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 flex flex-col items-center space-y-4">
        <Spinner size="lg" variant="ring" />
        <p className="text-lg font-medium text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {message}
        </p>
      </div>
    </div>
  );
};

// Loading Button
export const LoadingButton = ({
  loading = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" variant="ring" className="mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};