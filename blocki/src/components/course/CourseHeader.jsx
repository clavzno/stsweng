import React, { useState, useRef, useEffect } from 'react';
import { Palette, Image as ImageIcon, X, Sliders, BookOpen, Book, GraduationCap, Users, Calendar, Award, Target, Zap, Star, Heart, Coffee, Lightbulb, Rocket, Globe, Camera, Music, Gamepad2, Cpu, Code, Briefcase, Home, Settings } from 'lucide-react';
import Image from 'next/image';
import placeholderImage from '../../assets/images/placeholder.png';

const overlayOptions = [
  { label: 'None', value: 'rgba(0, 0, 0, 0)' },
  { label: 'Light', value: 'rgba(0, 0, 0, 0.2)' },
  { label: 'Medium', value: 'rgba(0, 0, 0, 0.4)' },
  { label: 'Dark', value: 'rgba(0, 0, 0, 0.6)' },
  { label: 'Very Dark', value: 'rgba(0, 0, 0, 0.8)' }
];

const accentColorOptions = [
  { label: 'Blue', value: '#526CF4' },
  { label: 'Green', value: '#4AD147' },
  { label: 'Orange', value: '#F38735' },
  { label: 'Purple', value: '#7c3aed' },
  { label: 'Red', value: '#FF5757' },
  { label: 'Pink', value: '#e11d48' },
  { label: 'Indigo', value: '#4f46e5' },
  { label: 'Teal', value: '#0891b2' },
];

const iconOptions = [
  { label: 'Book', icon: Book }, { label: 'Graduation Cap', icon: GraduationCap },
  { label: 'Users', icon: Users }, { label: 'Calendar', icon: Calendar },
  { label: 'Award', icon: Award }, { label: 'Target', icon: Target },
  { label: 'Zap', icon: Zap }, { label: 'Star', icon: Star }, { label: 'Heart', icon: Heart },
  { label: 'Coffee', icon: Coffee }, { label: 'Lightbulb', icon: Lightbulb },
  { label: 'Rocket', icon: Rocket }, { label: 'Globe', icon: Globe },
  { label: 'Camera', icon: Camera }, { label: 'Music', icon: Music },
  { label: 'Gamepad', icon: Gamepad2 }, { label: 'CPU', icon: Cpu },
  { label: 'Code', icon: Code }, { label: 'Briefcase', icon: Briefcase },
  { label: 'Home', icon: Home }, { label: 'Settings', icon: Settings }
];

const CourseHeader = ({ courseData, onImageChange, onCustomizationChange, isEditMode = false }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [activeTab, setActiveTab] = useState('image');
  const [isHovered, setIsHovered] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isSaving, setIsSaving] = useState(false);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  if (!courseData) return null;

  const customization = courseData.customization || {
    imageOverlay: 'rgba(0, 0, 0, 0.4)',
    accentColor: '#526CF4',
    headerIcon: 'Book'
  };

  useEffect(() => {
    if (isCustomizing && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const modalWidth = 400;
      let left = buttonRect.right - modalWidth;
      if (left < 16) left = 16;
      setModalPosition({ top: buttonRect.bottom + 8, left });
    }
  }, [isCustomizing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCustomizing && modalRef.current && !modalRef.current.contains(event.target) && !buttonRef.current?.contains(event.target)) {
        setIsCustomizing(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCustomizing]);

  const saveChanges = async (changes) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (onCustomizationChange) onCustomizationChange(changes);
    const existing = JSON.parse(localStorage.getItem('courseCustomizations') || '{}');
    existing[courseData.id] = { ...existing[courseData.id], ...changes };
    localStorage.setItem('courseCustomizations', JSON.stringify(existing));
    setIsSaving(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (onImageChange) onImageChange(result);
        saveChanges({ imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOverlayChange = (overlay) => saveChanges({ imageOverlay: overlay });
  const handleAccentColorChange = (color) => saveChanges({ accentColor: color });
  const handleIconChange = (iconName) => saveChanges({ headerIcon: iconName });

  const CurrentIcon = iconOptions.find(opt => opt.label === customization.headerIcon)?.icon || Book;

  return (
    <>
      <div 
        className="bg-gray-900 overflow-hidden relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute top-6 right-6 z-20 transition-all duration-300 ${isHovered || isCustomizing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            ref={buttonRef}
            onClick={() => setIsCustomizing(!isCustomizing)}
            className={`transition-all duration-300 p-3 rounded-xl shadow-lg ${isCustomizing ? 'bg-gray-800 text-gray-300 scale-105 ring-2 ring-blue-500' : 'bg-gray-800/90 text-gray-400 backdrop-blur-sm hover:bg-gray-800 hover:scale-105'}`}
          >
            <Palette className="w-5 h-5" />
          </button>
        </div>

        <div className="relative h-80">
          <Image
            src={courseData.imageUrl || placeholderImage}
            alt={courseData.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div 
            className="absolute inset-0 transition-all duration-300"
            style={{ backgroundColor: customization.imageOverlay }}
          />
          <div className="absolute inset-0 p-8 text-white flex items-center bg-gradient-to-t from-black/50 via-transparent to-transparent">
            <div className="w-full max-w-6xl mx-auto">
              <div className="flex items-center space-x-6">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg flex-shrink-0"
                  style={{ backgroundColor: customization.accentColor }}
                >
                  <CurrentIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-4xl font-bold text-white mb-3 truncate" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {courseData.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/90 text-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium truncate">{courseData.instructor}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                      <BookOpen className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium truncate">{courseData.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCustomizing && (
        <div 
          ref={modalRef}
          className="fixed z-50 w-96"
          style={{ top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}
        >
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Customize Header</h3>
              {isSaving && <div className="text-sm text-blue-400">Saving...</div>}
              <button onClick={() => setIsCustomizing(false)} className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex border-b border-gray-700">
              {[{ id: 'image', icon: ImageIcon }, { id: 'icon', icon: Star }, { id: 'overlay', icon: Sliders }, { id: 'colors', icon: Palette }].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-900/20' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="capitalize">{tab.id}</span>
                </button>
              ))}
            </div>
            
            <div className="p-4 max-h-80 overflow-y-auto scrollbar-hide">
              {/* Image Tab */}
              {activeTab === 'image' && (
                <div className="text-center space-y-4">
                  <div className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-700">
                    <Image src={courseData.imageUrl || placeholderImage} alt={courseData.title} fill className="object-cover" />
                  </div>
                  <label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="sr-only" disabled={isSaving} />
                    <div className={`cursor-pointer text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors ${isSaving ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                      {isSaving ? 'Uploading...' : 'Upload Image'}
                    </div>
                  </label>
                </div>
              )}
              {/* Icon Tab */}
              {activeTab === 'icon' && (
                  <div className="grid grid-cols-6 gap-2">
                    {iconOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => handleIconChange(option.label)}
                        disabled={isSaving}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${customization.headerIcon === option.label ? 'border-blue-500 bg-blue-900/20 text-blue-400 scale-105' : `border-gray-700 text-gray-400 hover:border-gray-600 hover:bg-gray-700`} ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={option.label}
                      >
                        <option.icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
              )}
              {/* Overlay Tab */}
              {activeTab === 'overlay' && (
                  <div className="space-y-2">
                    {overlayOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOverlayChange(option.value)}
                        disabled={isSaving}
                        className={`w-full p-3 rounded-lg border-2 text-sm transition-all duration-200 flex items-center gap-3 ${customization.imageOverlay === option.value ? 'border-blue-500 bg-blue-900/20 text-blue-400' : `border-gray-700 text-gray-400 hover:border-gray-600 hover:bg-gray-700`} ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                         <div className="w-8 h-8 rounded border border-gray-600 flex-shrink-0" style={{background: `linear-gradient(${option.value}, ${option.value}), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="%23e5e7eb"><rect width="4" height="4"/><rect x="4" y="4" width="4" height="4"/></svg>')`}}/>
                         <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
              )}
              {/* Colors Tab */}
              {activeTab === 'colors' && (
                  <div className="grid grid-cols-6 gap-2">
                    {accentColorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleAccentColorChange(color.value)}
                        disabled={isSaving}
                        className={`aspect-square p-3 rounded-lg border-2 transition-all duration-200 ${customization.accentColor === color.value ? 'border-gray-200 scale-110 shadow-lg' : `border-gray-700 hover:scale-105 hover:border-gray-600`} ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={color.label}
                      >
                        <div className="w-full h-full rounded-md" style={{ backgroundColor: color.value }} />
                      </button>
                    ))}
                  </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-700 bg-gray-800/50">
              <button
                onClick={() => setIsCustomizing(false)}
                disabled={isSaving}
                className={`w-full px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${isSaving ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isSaving ? 'Saving...' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`.scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </>
  );
};

export default CourseHeader;