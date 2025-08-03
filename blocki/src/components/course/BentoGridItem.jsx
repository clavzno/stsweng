import React from 'react';
import { GripVertical } from 'lucide-react';

const BentoGridItem = ({ 
  children, 
  className = "", 
  isDragging = false, 
  draggable = false,
  onDragStart, 
  onDragEnd,
  onDragOver,
  onDrop
}) => {
  return (
    <div
      className={`
        group relative bg-gray-800/50 rounded-xl shadow-lg
        border border-gray-700
        transition-all duration-300 hover:shadow-xl hover:border-gray-600
        ${isDragging ? 'opacity-30 scale-95 border-blue-500 ring-2 ring-blue-500' : ''}
        ${draggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
        ${className}
      `}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{ minHeight: '0' }}
    >
      {draggable && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 p-1.5 rounded-md bg-gray-900/50">
            <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
      )}
      <div className="h-full w-full overflow-hidden relative z-0">
        {children}
      </div>
    </div>
  );
};

export default BentoGridItem;