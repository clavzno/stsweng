// s:\projects\stsweng\blocki\src\components\utils\Icons.jsx
// Custom Icons using brand color (monochrome filled)

const defaultIconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Icons = {
  Book: ({ className, ...props }) => (
    <svg className={`w-6 h-6 ${className}`} {...defaultIconProps} {...props} fill="currentColor" stroke="none">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
    </svg>
  ),
  BookOpen: ({ className, ...props }) => (
    <svg className={`w-6 h-6 ${className}`} {...defaultIconProps} {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Assignment: ({ className, ...props }) => (
    <svg className={`w-6 h-6 ${className}`} {...defaultIconProps} {...props} fill="currentColor" stroke="none">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
    </svg>
  ),
  Announcement: ({ className, ...props }) => (
    <svg className={`w-6 h-6 ${className}`} {...defaultIconProps} {...props} fill="currentColor" stroke="none">
      <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
    </svg>
  ),
  Chart: ({ className, ...props }) => (
    <svg className={`w-6 h-6 ${className}`} {...defaultIconProps} {...props} fill="currentColor" stroke="none">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>
  ),
  Document: ({ className, ...props }) => (
    <svg className={`w-6 h-6 ${className}`} {...defaultIconProps} {...props} fill="currentColor" stroke="none">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  ),
  Chat: ({ className, ...props }) => (
    <svg className={`w-6 h-6 ${className}`} {...defaultIconProps} {...props} fill="currentColor" stroke="none">
      <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
    </svg>
  ),
  Quiz: ({ className, ...props }) => (
    <svg className={`w-6 h-6 ${className}`} {...defaultIconProps} {...props} fill="currentColor" stroke="none">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      <path d="M12 8v4M12 16h.01"/>
    </svg>
  ),
  Clock: ({ className, ...props }) => (
    <svg className={`w-5 h-5 ${className}`} {...defaultIconProps} {...props} fill="currentColor" stroke="none">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  Check: ({ className, ...props }) => (
    <svg 
      className={`w-5 h-5 ${className}`} 
      {...defaultIconProps} 
      {...props}
      fill="currentColor"
      stroke="none"
    >
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  Close: ({ className, ...props }) => (
    <svg className={`w-6 h-6 ${className}`} {...defaultIconProps} {...props} stroke="currentColor" fill="none">
      <path d="M6 18L18 6M6 6l12 12"/>
    </svg>
  ),
  User: ({ className, ...props }) => (
    <svg 
      className={`w-5 h-5 ${className}`} 
      {...defaultIconProps} 
      {...props}
      fill="currentColor"
      stroke="none"
    >
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  ),
  TrendUp: ({ className, ...props }) => (
    <svg className={`w-5 h-5 ${className}`} {...defaultIconProps} {...props} fill="currentColor" stroke="none">
      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
    </svg>
  ),
  Upload: ({ className, ...props }) => (
    <svg className={`w-12 h-12 ${className}`} {...defaultIconProps} {...props} fill="currentColor" stroke="none">
      <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
    </svg>
  ),
  GripVertical: ({ className, ...props }) => (
    <svg 
      className={`w-5 h-5 ${className}`} 
      {...defaultIconProps} 
      {...props}
      fill="currentColor"
      stroke="none"
    >
      <circle cx="9" cy="12" r="1"/>
      <circle cx="9" cy="5" r="1"/>
      <circle cx="9" cy="19" r="1"/>
      <circle cx="15" cy="12" r="1"/>
      <circle cx="15" cy="5" r="1"/>
      <circle cx="15" cy="19" r="1"/>
    </svg>
  )
};