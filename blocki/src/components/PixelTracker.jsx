"use client";

import React, { useState, useMemo, useRef } from 'react';
import { Upload, Image, Settings } from 'lucide-react';

export default function PixelTracker({ progress = 7, total = 25 }) {
  const [gridSize] = useState(20); // Increased for more pixelated effect
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const UploadArea = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="text-center space-y-2">
        <Upload className="w-6 h-6 text-gray-400 dark:text-gray-500 mx-auto" />
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">Upload Image</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Complete tasks to reveal
          </div>
        </div>
        <button
          onClick={handleUploadClick}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
        >
          Choose
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pixel Tracker</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">{progress}/{total}</span>
          {uploadedImage && (
            <button
              onClick={handleChangeImage}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              title="Change image"
            >
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {Math.round((progress / total) * 100) || 0}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Complete</div>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{revealedBlocks}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Revealed</div>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{total - progress}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Left</div>
        </div>
      </div>

      {/* Image and Grid Container */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-1 mb-3">
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

      {/* Progress Bar */}
      <div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${total > 0 ? (progress / total) * 100 : 0}%` }}
          ></div>
        </div>
        <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-2">
          {imagePreview ? 'Complete tasks to reveal pixels!' : 'Upload an image to start'}
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}