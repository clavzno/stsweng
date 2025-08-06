import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, X, Download, FileText, Clipboard, FolderOpen, BookOpen } from 'lucide-react';

// Skeleton Loader Component
const SkeletonLoader = ({ lines = 1, className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="bg-gray-600/30 rounded h-4 mb-2 last:mb-0" />
    ))}
  </div>
);

// Individual Item Component
const ModuleItem = ({ item, onDownload }) => {
  const getItemIcon = (type) => {
    const icons = {
      pdf: <FileText className="w-5 h-5" style={{ color: '#FF5757' }} />,
      assignment: <Clipboard className="w-5 h-5" style={{ color: '#F38735' }} />,
      project: <FolderOpen className="w-5 h-5" style={{ color: '#4AD147' }} />,
      reading: <BookOpen className="w-5 h-5" style={{ color: '#526CF4' }} />,
    };
    return icons[type] || <FileText className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-600/30">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {getItemIcon(item.type)}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white text-sm truncate" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>
            {item.title}
          </h4>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        {item.points && (
          <span className="text-xs text-white px-2 py-1 rounded font-medium" style={{ backgroundColor: '#526CF4' }}>
            {item.points} pts
          </span>
        )}
        {item.downloadable && (
          <button
            onClick={(e) => { e.stopPropagation(); onDownload(item); }}
            className="p-1.5 hover:bg-gray-600 rounded text-gray-300"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Collapsible Section Component
const CollapsibleSection = ({ title, items, isExpanded, onToggle, onDownload, icon }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-3 bg-gray-800/30 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-600/30"
      >
        <div className="flex items-center gap-2">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {icon}
          <span className="font-medium text-white text-sm">{title}</span>
        </div>
        <span className="text-xs text-white px-2 py-1 rounded" style={{ backgroundColor: '#0D122C' }}>{items.length}</span>
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-1 pl-6">
          {items.map((item) => <ModuleItem key={item.id} item={item} onDownload={onDownload} />)}
        </div>
      )}
    </div>
  );
};

// Module Card Component
const ModuleCard = ({ module, expandedSections, onToggleSection, onDownload }) => {
  const isModuleExpanded = expandedSections.has(module.id);
  
  return (
    <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => onToggleSection(module.id)}
          className="flex items-center gap-3 flex-1 text-left"
        >
          {isModuleExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color: '#4AD147' }} />
          <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}>
            {module.title}
          </h3>
        </button>
      </div>

      {isModuleExpanded && (
        <div className="space-y-2 pl-8">
          <CollapsibleSection title="Materials" items={module.materials} isExpanded={expandedSections.has(`${module.id}-materials`)} onToggle={() => onToggleSection(`${module.id}-materials`)} onDownload={onDownload} icon={<FileText className="w-4 h-4" style={{ color: '#526CF4' }} />} />
          <CollapsibleSection title="Assignments" items={module.assignments} isExpanded={expandedSections.has(`${module.id}-assignments`)} onToggle={() => onToggleSection(`${module.id}-assignments`)} onDownload={onDownload} icon={<Clipboard className="w-4 h-4" style={{ color: '#F38735' }} />} />
          <CollapsibleSection title="Projects" items={module.projects} isExpanded={expandedSections.has(`${module.id}-projects`)} onToggle={() => onToggleSection(`${module.id}-projects`)} onDownload={onDownload} icon={<FolderOpen className="w-4 h-4" style={{ color: '#4AD147' }} />} />
        </div>
      )}
    </div>
  );
};


// Main Modal Component
const ModulesModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState(new Set());

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modulesData = [
    {
      id: 'module-0',
      title: '00 Course Introduction',
      materials: [
        { id: 1, title: 'STSWENG - 00a - Introduction.pdf', type: 'pdf', downloadable: true },
        { id: 2, title: 'STSWENG - 00b - SE Retrospect.pdf', type: 'pdf', downloadable: true },
      ],
      assignments: [{ id: 4, title: 'MC01 - Project Proposals', type: 'assignment', points: 20 }],
    },
    {
      id: 'module-1',
      title: '01 Unit Testing and CI',
      materials: [
        { id: 5, title: 'STSWENG - 02a - The Test Stack.pdf', type: 'pdf', downloadable: true },
        { id: 6, title: 'STSWENG - 02b - Unit Testing.pdf', type: 'pdf', downloadable: true },
      ],
      assignments: [{ id: 25, title: 'Unit Testing Workshop', type: 'assignment', points: 15 }],
    },
    {
      id: 'module-2',
      title: '02 Integration Testing and TDD',
      materials: [
        { id: 10, title: 'STSWENG - 04a - Integration Testing.pdf', type: 'pdf', downloadable: true },
      ],
      assignments: [{ id: 12, title: 'MC02 - Unit Testing Implementation', type: 'assignment', points: 25 }],
      projects: [{ id: 13, title: 'Project Phase 1 - Testing', type: 'project', points: 50 }],
    },
  ];

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    newExpanded.has(sectionId) ? newExpanded.delete(sectionId) : newExpanded.add(sectionId);
    setExpandedSections(newExpanded);
  };

  const handleDownload = (item) => console.log('Downloading:', item.title);
  const collapseAll = () => setExpandedSections(new Set());
  const expandAll = () => {
    const all = new Set();
    modulesData.forEach(m => {
      all.add(m.id);
      if (m.materials) all.add(`${m.id}-materials`);
      if (m.assignments) all.add(`${m.id}-assignments`);
      if (m.projects) all.add(`${m.id}-projects`);
    });
    setExpandedSections(all);
  };

  const totalItems = modulesData.reduce((acc, m) => acc + (m.materials?.length || 0) + (m.assignments?.length || 0) + (m.projects?.length || 0), 0);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className="p-6 border-b border-gray-700" style={{ backgroundColor: '#0D122C' }}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>Course Modules</h2>
              <p className="text-gray-300 text-sm">Access all course materials • {totalItems} items</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={expandAll} className="px-4 py-2 text-white rounded-lg text-sm font-medium" style={{ backgroundColor: '#4AD147' }}>Expand All</button>
              <button onClick={collapseAll} className="px-4 py-2 text-white rounded-lg text-sm font-medium" style={{ backgroundColor: '#526CF4' }}>Collapse All</button>
              <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg text-gray-300"><X className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
          <style jsx>{`.scrollbar-hide { scrollbar-width: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="p-4 bg-gray-800/50 rounded-xl"><SkeletonLoader lines={3} /></div>)}
            </div>
          ) : (
            <div className="space-y-3">
              {modulesData.map((module) => (
                <ModuleCard key={module.id} module={module} expandedSections={expandedSections} onToggleSection={toggleSection} onDownload={handleDownload} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModulesModal;