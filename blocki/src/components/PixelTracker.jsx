"use client";

import React, { useState, useMemo, useRef } from 'react';
import { Upload, Image, Settings, X, RotateCcw, Trash2 } from 'lucide-react';

export default function PixelTracker({ progress = 7, total = 25 }) {
  const [gridSize] = useState(20);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  // Calculate how many blocks to reveal based on progress
  const revealedBlocks = useMemo(() => {
    if (total === 0) return 0;
    const percentage = (progress / total);
    const totalBlocks = gridSize * gridSize;
    return Math.floor(percentage * totalBlocks);
  }, [progress, total, gridSize]);

  // Create an array representing the grid cells
  const gridItems = useMemo(() => Array.from({ length: gridSize * gridSize }, (_, i) => i), [gridSize]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setUploadedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSettingsClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeImage = () => {
    fileInputRef.current?.click();
    setShowModal(false);
  };

  const handleResetProgress = () => {
    // You can add logic to reset progress here if needed
    setShowModal(false);
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setUploadedImage(null);
    setShowModal(false);
  };

  const UploadArea = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
      <div className="text-center space-y-2">
        <Upload className="w-6 h-6 text-gray-400 mx-auto" />
        <div className="space-y-1">
          <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>Upload Image</div>
          <div className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Complete tasks to reveal
          </div>
        </div>
        <button
          onClick={handleUploadClick}
          className="px-3 py-1.5 text-white rounded text-xs font-medium transition-colors"
          style={{ backgroundColor: '#526CF4', fontFamily: 'Roboto, sans-serif' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4A5FE7'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#526CF4'}
        >
          Choose
        </button>
      </div>
    </div>
  );

  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-80 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
            Settings
          </h3>
          <button
            onClick={handleCloseModal}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleChangeImage}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors text-left"
          >
            <Upload className="w-5 h-5 text-white" />
            <div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Change Image
              </div>
              <div className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Upload a different image
              </div>
            </div>
          </button>
          
          <button
            onClick={handleResetProgress}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors text-left"
          >
            <RotateCcw className="w-5 h-5" style={{ color: '#F38735' }} />
            <div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Reset Progress
              </div>
              <div className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Start over from the beginning
              </div>
            </div>
          </button>
          
          <button
            onClick={handleDeleteImage}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors text-left"
          >
            <Trash2 className="w-5 h-5" style={{ color: '#FF5757' }} />
            <div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Delete Image
              </div>
              <div className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Remove current image
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-700 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
              Pixel Tracker
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {progress}/{total}
            </span>
            {uploadedImage && (
              <button
                onClick={handleSettingsClick}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
                title="Settings"
              >
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="text-center p-2 bg-gray-800 rounded-lg">
            <div className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
              {Math.round((progress / total) * 100) || 0}%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>Complete</div>
          </div>
          <div className="text-center p-2 bg-gray-800 rounded-lg">
            <div className="text-lg font-bold" style={{ color: '#4AD147', fontFamily: 'Orbitron, monospace' }}>
              {revealedBlocks}
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>Revealed</div>
          </div>
          <div className="text-center p-2 bg-gray-800 rounded-lg">
            <div className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
              {total - progress}
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>Left</div>
          </div>
        </div>

        {/* Image and Grid Container */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-800 flex-1 mb-3">
          {!imagePreview ? (
            <UploadArea />
          ) : (
            <>
              {/* Pixelated background image that's always visible */}
              <img
                src={imagePreview}
                alt="Reward image being revealed"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  imageRendering: 'pixelated',
                  imageRendering: '-moz-crisp-edges',
                  imageRendering: 'crisp-edges',
                  filter: 'blur(8px) brightness(0.3)'
                }}
              />
              
              {/* Clear pixelated image that gets revealed */}
              <img
                src={imagePreview}
                alt="Clear reward image"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  imageRendering: 'pixelated',
                  imageRendering: '-moz-crisp-edges',
                  imageRendering: 'crisp-edges',
                  clipPath: `polygon(0 0, ${Math.min(100, (revealedBlocks / (gridSize * gridSize)) * 100)}% 0, ${Math.min(100, (revealedBlocks / (gridSize * gridSize)) * 100)}% 100%, 0 100%)`
                }}
              />
              
              {/* Subtle grid overlay for pixelated effect */}
              <div 
                className="absolute inset-0 grid pointer-events-none"
                style={{ 
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`, 
                  gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                  gap: '1px'
                }}
              >
                {gridItems.map(index => (
                  <div
                    key={index}
                    className="border border-black border-opacity-10"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {imagePreview ? 'Complete tasks to reveal pixels!' : 'Upload an image to start'}
        </p>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Modal */}
      {showModal && <Modal />}
    </>
  );
}