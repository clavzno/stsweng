import React, { useState, useEffect } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw, Expand, FileText } from 'lucide-react';

// Skeleton Loader Component
const SkeletonLoader = ({ className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-600/30 rounded-lg h-full w-full" />
  </div>
);

const SyllabusModal = ({ isOpen, onClose, syllabusImageUrl }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate loading time for the document
      setTimeout(() => setLoading(false), 800);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Simulate PDF download from the image URL
    const link = document.createElement('a');
    link.href = syllabusImageUrl; // Use the image URL for download
    link.download = 'STSWENG_Syllabus.png'; // Set a default filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] flex flex-col overflow-hidden border border-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-700" style={{ backgroundColor: '#0D122C' }}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}>
                Course Syllabus
              </h2>
              <p className="text-gray-300 text-sm" style={{ fontFamily: 'Roboto, sans-serif' }}>
                STSWENG - Advanced Software Engineering
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Document Viewer */}
        <div className="flex-1 p-6 bg-gray-900/50 flex flex-col min-h-0">
          {loading ? (
            <SkeletonLoader className="w-full h-full" />
          ) : (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl flex-1 flex flex-col overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between p-2.5 border-b border-gray-700 bg-gray-800 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white font-medium">STSWENG_Syllabus.docx</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>Page</span>
                    <input 
                      type="text" 
                      defaultValue="1" 
                      className="w-10 text-center bg-gray-700 border border-gray-600 rounded p-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span>of 10</span>
                  </div>
                  <span className="border-l border-gray-600 h-6 mx-2"></span>
                  <button className="p-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"><ZoomOut className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"><ZoomIn className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"><RotateCw className="w-4 h-4" /></button>
                  <span className="border-l border-gray-600 h-6 mx-2"></span>
                  <button onClick={handleDownload} className="p-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                   <button className="p-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors" title="Fullscreen">
                    <Expand className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Content */}
              <div className="flex-1 overflow-auto p-4 scrollbar-hide">
                 <style jsx>{`.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
                <img 
                  src={syllabusImageUrl} 
                  alt="Syllabus Document Preview" 
                  className="max-w-full mx-auto shadow-lg rounded"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default SyllabusModal;