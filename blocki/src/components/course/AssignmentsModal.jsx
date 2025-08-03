import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Calendar, Grid3X3, Search, Clock, CheckCircle, Lock, Upload, FileText } from 'lucide-react';

// Icons component
const Icons = {
  Assignment: ({ className, ...props }) => (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
    </svg>
  )
};

// Skeleton Loader Component
const SkeletonLoader = ({ lines = 1, className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="bg-gray-600/30 rounded h-4 mb-2 last:mb-0" />
    ))}
  </div>
);


// File Uploader Component
const FileUploader = ({ assignment, onUploadComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = (file) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      onUploadComplete();
    }, 2000);
  };

  return (
    <div className="space-y-0">
      <div className="border-b border-gray-600/30">
        <div className="text-sm text-gray-300 mb-4 font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Choose a submission type</div>
        <div className="flex">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'upload' 
                ? 'text-white border-green-400' 
                : 'text-gray-300 border-transparent hover:bg-gray-700/50 hover:text-white'
            }`}
            style={{ backgroundColor: activeTab === 'upload' ? '#4AD147' : 'transparent' }}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Upload
          </button>
           <button
            onClick={() => setActiveTab('arc')}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'arc' 
                ? 'text-white border-green-400'
                : 'text-gray-300 border-transparent hover:bg-gray-700/50 hover:text-white'
            }`}
             style={{ backgroundColor: activeTab === 'arc' ? '#4AD147' : 'transparent' }}
          >
            <svg className="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
            ARC
          </button>
          <button
            onClick={() => setActiveTab('more')}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'more' 
                ? 'text-white border-green-400'
                : 'text-gray-300 border-transparent hover:bg-gray-700/50 hover:text-white'
            }`}
            style={{ backgroundColor: activeTab === 'more' ? '#4AD147' : 'transparent' }}
          >
            <svg className="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
            More
          </button>
        </div>
      </div>

      {activeTab === 'upload' && (
        <div className="bg-gray-800/30 p-6">
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-blue-400 bg-blue-500/10 shadow-lg' 
                : 'border-gray-500/50 hover:border-gray-400/70 bg-gray-800/20'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-200 mb-2 font-semibold text-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>Drag a file here, or</p>
            <p className="text-blue-400 text-sm mb-4 underline cursor-pointer hover:text-blue-300" style={{ fontFamily: 'Roboto, sans-serif' }}>Choose a file to upload</p>
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => e.target.files[0] && handleUpload(e.target.files[0])} />
          </div>
        </div>
      )}
       {activeTab === 'arc' && (
        <div className="bg-gray-800/30 p-12 text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
          <p className="text-lg font-medium">ARC submission type not available for this assignment.</p>
        </div>
      )}
      {activeTab === 'more' && (
        <div className="bg-gray-800/30 p-12 text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
          </svg>
          <p className="text-lg font-medium">Additional submission options will appear here.</p>
        </div>
      )}
      {uploading && (
        <div className="flex items-center justify-center gap-3 text-blue-400 bg-blue-500/10 p-4 rounded-lg mt-4">
          <div className="animate-spin w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"></div>
          <span className="font-medium">Uploading your file...</span>
        </div>
      )}
    </div>
  );
};


// Assignment Item Component
const AssignmentItem = ({ assignment, onClick }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
      case 'graded':
        return <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />;
      case 'open':
        return <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-500 flex-shrink-0" />;
      default:
        return <Icons.Assignment className="text-gray-400 flex-shrink-0" />;
    }
  };

  const isClickable = assignment.status !== 'locked';

  return (
    <div 
      className={`flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-600/30 ${
        isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
      }`}
      onClick={() => isClickable && onClick(assignment)}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {getStatusIcon(assignment.status)}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white text-sm truncate" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>
            {assignment.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Due: {assignment.dueDate}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        {assignment.grade && (
          <span className="text-xs text-white px-2 py-1 rounded font-medium" style={{ backgroundColor: '#4AD147', fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>
            {assignment.grade}
          </span>
        )}
        <span className="text-xs text-white px-2 py-1 rounded font-medium" style={{ backgroundColor: '#526CF4', fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>
          {assignment.points} pts
        </span>
      </div>
    </div>
  );
};


// Assignment Detail View
const AssignmentDetail = ({ assignment, onBack, onUploadComplete }) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="p-6 border-b border-gray-700" style={{ backgroundColor: '#0D122C' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}>
                {assignment.title}
              </h2>
              <p className="text-gray-300 text-sm mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Due: {assignment.dueDate} • {assignment.points} Points Possible
              </p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
        <style jsx>{`
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>
        
        <div className="space-y-6">
          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Instructions</h3>
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30 text-gray-300 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {assignment.instructions}
            </div>
          </div>

          {/* Submission Status & Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Details</h3>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Status:</span> <span className="font-medium text-white capitalize">{assignment.status}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Points:</span> <span className="font-medium text-white">{assignment.points}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Submitting:</span> <span className="font-medium text-white capitalize">{assignment.submissionType}</span></div>
                {assignment.submittedDate && <div className="flex justify-between"><span className="text-gray-400">Submitted:</span> <span className="font-medium text-white">{assignment.submittedDate}</span></div>}
                {assignment.grade && <div className="flex justify-between"><span className="text-blue-300 font-semibold">Grade:</span> <span className="font-bold text-lg text-white">{assignment.grade}</span></div>}
              </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Availability</h3>
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30 space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-400">From:</span> <span className="font-medium text-white">Jul 16, 2025</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Until:</span> <span className="font-medium text-white">{assignment.dueDate}</span></div>
                </div>
             </div>
          </div>

          {/* Submission Section */}
          {assignment.status === 'open' && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Start Assignment</h3>
              <div className="bg-gray-800/50 rounded-lg border border-gray-600/30 overflow-hidden">
                <FileUploader assignment={assignment} onUploadComplete={onUploadComplete} />
              </div>
            </div>
          )}

          {assignment.status === 'submitted' && (
            <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-300" />
              <div>
                <span className="font-medium text-green-300">Assignment Submitted!</span>
                <p className="text-green-200 text-sm">Waiting for grade.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


// Main Modal Component
const AssignmentsModal = ({ isOpen, onClose }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setSelectedAssignment(null);
      setTimeout(() => setLoading(false), 800);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const assignmentsData = [
    { id: 1, title: 'MC05. Final Project Presentation', instructions: 'Present your final project to the class...', dueDate: 'Aug 1 at 11:59pm', points: 50, status: 'open', submissionType: 'presentation', category: 'upcoming' },
    { id: 2, title: 'MC06b. Final Reflection Paper (Individual)', instructions: 'Write a 5-page reflection...', dueDate: 'Aug 2 at 11:59pm', points: 30, status: 'open', submissionType: 'file', category: 'upcoming' },
    { id: 3, title: 'MC04. Automation Test Plan', instructions: 'Create a comprehensive test automation plan...', dueDate: 'Jul 22 at 11:59pm', points: 15, status: 'graded', submissionType: 'file', submittedDate: 'Jul 20 at 10:30pm', grade: '14/15', category: 'past' },
    { id: 4, title: 'Latest Robotframework Activity', instructions: 'Complete the Robot Framework exercises...', dueDate: 'Jul 22 at 11:59pm', points: 30, status: 'submitted', submissionType: 'file', submittedDate: 'Jul 21 at 9:15pm', category: 'past' },
    { id: 5, title: 'MC06a. Midpoint Reflection Paper (Individual)', instructions: 'Write a 3-page reflection...', dueDate: 'Jun 29 at 11:59pm', points: 25, status: 'open', submissionType: 'file', category: 'past' },
    { id: 6, title: 'MC03. Midpoint Project Presentation', instructions: 'Present your project progress...', dueDate: 'Jun 27 at 11:59pm', points: 60, status: 'graded', submissionType: 'presentation', submittedDate: 'Jun 27 at 8:45pm', grade: '55/60', category: 'past' },
    { id: 7, title: 'MC02 - Continuous Integration Plan', instructions: 'Design and implement a CI/CD pipeline...', dueDate: 'Jun 25 at 11:59pm', points: 40, status: 'locked', submissionType: 'file', category: 'past' },
    { id: 8, title: 'MC01 - Project Proposals and Standards', instructions: 'Submit your project proposal...', dueDate: 'Jun 2 at 11:59pm', points: 20, status: 'graded', submissionType: 'file', submittedDate: 'Jun 1 at 11:30pm', grade: '20/20', category: 'past' }
  ];

  const sortAssignments = (list) => {
    if (sortBy === 'type') return [...list].sort((a, b) => a.submissionType.localeCompare(b.submissionType));
    // Default to date sort
    return [...list].sort((a, b) => new Date(a.dueDate.replace(' at ', ' ')) - new Date(b.dueDate.replace(' at ', ' ')));
  };

  const filteredAssignments = assignmentsData.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const upcomingAssignments = sortAssignments(filteredAssignments.filter(a => a.category === 'upcoming'));
  const pastAssignments = sortAssignments(filteredAssignments.filter(a => a.category === 'past'));

  const handleUploadComplete = () => {
    setSelectedAssignment(prev => ({ ...prev, status: 'submitted', submittedDate: new Date().toLocaleString() }));
    // In a real app, you would refetch data here
  };
  
  if (selectedAssignment) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <AssignmentDetail assignment={selectedAssignment} onBack={() => setSelectedAssignment(null)} onUploadComplete={handleUploadComplete} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700" style={{ backgroundColor: '#0D122C' }}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}>
                Assignments
              </h2>
              <p className="text-gray-300 text-sm" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Track all your upcoming and past assignments.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
           {/* Search and Filter Bar */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search assignments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="text-sm font-medium text-gray-300">Sort by:</div>
            <button onClick={() => setSortBy('date')} className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${sortBy === 'date' ? 'text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`} style={{backgroundColor: sortBy === 'date' ? '#4AD147' : 'bg-gray-700/50'}} title="Sort by Date">
              <Calendar className="w-4 h-4" /> Date
            </button>
            <button onClick={() => setSortBy('type')} className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${sortBy === 'type' ? 'text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`} style={{backgroundColor: sortBy === 'type' ? '#4AD147' : 'bg-gray-700/50'}} title="Sort by Type">
              <Grid3X3 className="w-4 h-4" /> Type
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
          <style jsx>{`.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
          {loading ? (
             <div className="space-y-4">
                <SkeletonLoader lines={1} className="h-20 mb-6" />
                {[1, 2, 3].map(i => <SkeletonLoader key={i} lines={1} className="h-16" />)}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: '#F38735', fontFamily: 'Orbitron, sans-serif' }}>
                      {assignmentsData.filter(a => a.category === 'upcoming').length}
                    </div>
                    <div className="text-sm text-gray-400">Upcoming</div>
                </div>
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: '#4AD147', fontFamily: 'Orbitron, sans-serif' }}>
                      {assignmentsData.filter(a => a.status === 'submitted').length}
                    </div>
                    <div className="text-sm text-gray-400">Submitted</div>
                </div>
                 <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: '#526CF4', fontFamily: 'Orbitron, sans-serif' }}>
                      {assignmentsData.filter(a => a.status === 'graded').length}
                    </div>
                    <div className="text-sm text-gray-400">Graded</div>
                </div>
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {assignmentsData.length}
                    </div>
                    <div className="text-sm text-gray-400">Total</div>
                </div>
              </div>

              {/* Assignments List */}
              <div className="space-y-4">
                {upcomingAssignments.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-white text-base mb-2 p-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Upcoming Assignments</h3>
                    <div className="space-y-2">
                      {upcomingAssignments.map((a) => <AssignmentItem key={a.id} assignment={a} onClick={setSelectedAssignment} />)}
                    </div>
                  </div>
                )}
                {pastAssignments.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-white text-base mb-2 p-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Past Assignments</h3>
                    <div className="space-y-2">
                      {pastAssignments.map((a) => <AssignmentItem key={a.id} assignment={a} onClick={setSelectedAssignment} />)}
                    </div>
                  </div>
                )}
                {filteredAssignments.length === 0 && searchTerm && (
                  <div className="text-center py-10">
                    <p className="text-gray-400">No assignments found for "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsModal;