import React, { useState, useEffect } from 'react';
import { SkeletonLoader } from './LoadingComponents';
import { BarChart3, TrendingUp, Award, FileText, Calculator, Eye, Filter, Download, Calendar, CheckCircle, AlertCircle, Clock, X, Search, ArrowDown, ArrowUp, Edit2, RotateCcw } from 'lucide-react';

const GradesModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('assignments');
  const [showWhatIfMode, setShowWhatIfMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [whatIfScores, setWhatIfScores] = useState({});
  const [showCalculation, setShowCalculation] = useState(false);

  const [gradesData, setGradesData] = useState({
    student: { name: "Almira Zabrina Alyson Querubin" },
    course: { code: "STSWENG" },
    overall: { currentGrade: 2.5, percentage: 80.0, letterGrade: 'B', trend: 'stable', totalPoints: 815, earnedPoints: 652 },
    categories: [
      { id: 'seatworks', name: 'Seatworks/Homeworks', weight: 15 },
      { id: 'midterm', name: 'Midterm Exam', weight: 20 },
      { id: 'final', name: 'Final Exam', weight: 20 },
      { id: 'multitasking', name: 'Multi-tasking OS', weight: 45 },
    ],
    assignments: [
      { id: 1, name: 'Week 1 - Homework - Introductory Quiz', category: 'seatworks', type: 'Seatworks/Homeworks', score: 13, maxScore: 15, dueDate: '2025-05-10', submittedDate: '2025-05-08', status: 'graded', feedback: 'Good start! Review OS history concepts.' },
      { id: 2, name: 'Week 2 - Group Homework - Setting up your OS emulator', category: 'seatworks', type: 'Seatworks/Homeworks', score: 22, maxScore: 25, dueDate: '2025-05-17', submittedDate: '2025-05-15', status: 'graded', feedback: 'Excellent setup documentation.' },
      { id: 4, name: 'Week 6 - Group Homework - FCFS scheduler in OS emulator', category: 'seatworks', type: 'Seatworks/Homeworks', score: null, maxScore: 40, dueDate: '2025-06-14', status: 'missing' },
      { id: 6, name: 'Week 11 - Homework - Paging problems (v2)', category: 'seatworks', type: 'Seatworks/Homeworks', score: null, maxScore: 20, dueDate: '2025-07-25', status: 'upcoming' },
    ]
  });
  
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    }
  }, [isOpen]);

  const calculateWeightedGrade = (useWhatIf = false) => {
    let totalWeightedPoints = 0;
    let totalWeightUsed = 0;

    gradesData.categories.forEach(category => {
      const categoryAssignments = gradesData.assignments.filter(a => a.category === category.id);
      const gradedAssignments = categoryAssignments.filter(a => (useWhatIf && whatIfScores[a.id] !== undefined) || a.score !== null);
      
      if (gradedAssignments.length > 0) {
        let categoryEarned = 0;
        let categoryTotal = 0;

        gradedAssignments.forEach(assignment => {
            categoryTotal += assignment.maxScore;
            categoryEarned += (useWhatIf && whatIfScores[assignment.id] !== undefined) ? whatIfScores[assignment.id] : assignment.score;
        });

        if (categoryTotal > 0) {
          const categoryPercentage = (categoryEarned / categoryTotal) * 100;
          totalWeightedPoints += categoryPercentage * (category.weight / 100);
          totalWeightUsed += category.weight;
        }
      }
    });

    return totalWeightUsed > 0 ? (totalWeightedPoints / totalWeightUsed) * 100 : 0;
  };

  const handleWhatIfScoreChange = (assignmentId, newScore) => {
    const assignment = gradesData.assignments.find(a => a.id === assignmentId);
    let score = parseFloat(newScore);
    if (isNaN(score)) score = 0;
    if (assignment && score > assignment.maxScore) score = assignment.maxScore;
    if (score < 0) score = 0;
    setWhatIfScores(prev => ({ ...prev, [assignmentId]: score }));
  };
  
  const resetWhatIfScores = () => setWhatIfScores({});
  
  const sortAssignments = (assignments) => {
    return [...assignments].sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'name') { aVal = a.name; bVal = b.name; }
      else if (sortBy === 'dueDate') { aVal = new Date(a.dueDate); bVal = new Date(b.dueDate); }
      else { aVal = a.score ?? -1; bVal = b.score ?? -1; }
      
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortOrder('asc'); }
  };

  const getStatusIcon = (status) => {
    const style = {
      graded: { icon: CheckCircle, color: '#4AD147' },
      missing: { icon: AlertCircle, color: '#FF5757' },
      upcoming: { icon: Clock, color: '#F38735' },
    }[status];
    if (!style) return <div className="w-4 h-4 bg-gray-500 rounded-full" />;
    const Icon = style.icon;
    return <Icon className="w-4 h-4" style={{ color: style.color }} />;
  };

  const filteredAssignments = sortAssignments(
    gradesData.assignments.filter(a => 
      (selectedCategory === 'all' || a.category === selectedCategory) &&
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const calculateCategoryTotals = () => {
    return gradesData.categories.map(category => {
      const categoryAssignments = gradesData.assignments.filter(a => a.category === category.id);
      const totalPoints = categoryAssignments.reduce((sum, a) => sum + (a.maxScore || 0), 0);
      const earnedPoints = categoryAssignments.reduce((sum, a) => sum + (a.score || 0), 0);
      const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : null;
      return { ...category, totalPoints, earnedPoints, percentage };
    });
  };

  if (!isOpen) return null;
  const whatIfGrade = calculateWeightedGrade(true);
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className="p-6 border-b border-gray-700" style={{ backgroundColor: '#0D122C' }}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: '600' }}>Grades for {gradesData.student.name}</h2>
                    <p className="text-gray-300 text-sm">{gradesData.course.code}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                            Total: {showWhatIfMode ? whatIfGrade.toFixed(1) : gradesData.overall.percentage}% ({gradesData.overall.currentGrade})
                        </div>
                        <div className="text-sm text-gray-300">
                            {gradesData.overall.earnedPoints}/{gradesData.overall.totalPoints} points
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg text-gray-300"><X className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <button onClick={() => setViewMode('assignments')} className={`px-4 py-2 rounded-lg text-sm font-medium ${viewMode === 'assignments' ? 'text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`} style={{ backgroundColor: viewMode === 'assignments' ? '#4AD147' : undefined }}>Assignments</button>
                    <button onClick={() => setViewMode('categories')} className={`px-4 py-2 rounded-lg text-sm font-medium ${viewMode === 'categories' ? 'text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`} style={{ backgroundColor: viewMode === 'categories' ? '#4AD147' : undefined }}>Learning Mastery</button>
                    <button onClick={() => setShowCalculation(!showCalculation)} className={`px-4 py-2 rounded-lg text-sm font-medium ${showCalculation ? 'text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`} style={{ backgroundColor: showCalculation ? '#526CF4' : undefined }}><Calculator className="w-4 h-4 inline mr-1" />Show Calculation</button>
                </div>
                {viewMode === 'assignments' && (
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm w-56 focus:outline-none" style={{borderColor: '#526CF4'}}/>
                        </div>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none" style={{borderColor: '#526CF4'}}>
                            <option value="all">All Categories</option>
                            {gradesData.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <button onClick={() => setShowWhatIfMode(!showWhatIfMode)} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${showWhatIfMode ? 'text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`} style={{ backgroundColor: showWhatIfMode ? '#F38735' : undefined }}><Edit2 className="w-4 h-4" />What-If</button>
                        {showWhatIfMode && <button onClick={resetWhatIfScores} className="p-2 hover:bg-gray-700 rounded-lg text-gray-300"><RotateCcw className="w-4 h-4" /></button>}
                    </div>
                )}
            </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
          <style jsx>{`.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="p-4 bg-gray-800/50 rounded-lg"><SkeletonLoader lines={2} /></div>)}
            </div>
          ) : (
             <>
                {viewMode === 'assignments' ? (
                  <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg overflow-hidden">
                    <div className="bg-gray-800/50">
                      <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-300">
                        <button onClick={() => handleSort('name')} className="col-span-5 text-left flex items-center gap-1 hover:text-white">Name {sortBy === 'name' && (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}</button>
                        <button onClick={() => handleSort('dueDate')} className="col-span-2 text-left flex items-center gap-1 hover:text-white">Due {sortBy === 'dueDate' && (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}</button>
                        <div className="col-span-2">Status</div>
                        <button onClick={() => handleSort('score')} className="col-span-3 text-right flex items-center justify-end gap-1 hover:text-white">Score {sortBy === 'score' && (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}</button>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-600/30">
                      {filteredAssignments.map((assignment) => (
                        <div key={assignment.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-700/30">
                          <div className="col-span-5 font-medium text-white text-sm">{assignment.name}</div>
                          <div className="col-span-2 text-sm text-gray-400">{assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}</div>
                          <div className="col-span-2">{getStatusIcon(assignment.status)}</div>
                          <div className="col-span-3 text-right text-sm">
                            {showWhatIfMode && assignment.maxScore ? (
                              <div className="flex items-center justify-end gap-2">
                                <input type="number" min="0" max={assignment.maxScore} value={whatIfScores[assignment.id] ?? (assignment.score ?? '')} onChange={(e) => handleWhatIfScoreChange(assignment.id, e.target.value)} className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-center text-white" />
                                <span>/ {assignment.maxScore}</span>
                              </div>
                            ) : (
                              <span className="font-medium text-white">{assignment.score ?? '-'} / {assignment.maxScore ?? '-'}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                      {calculateCategoryTotals().map((category) => (
                        <div key={category.id} className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                                    <p className="text-sm text-gray-400">Weight: {category.weight}%</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white">{category.percentage?.toFixed(1) ?? 'N/A'}%</div>
                                    <div className="text-sm text-gray-400">{category.earnedPoints.toFixed(1)} / {category.totalPoints} pts</div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3">
                                <div className="h-3 rounded-full" style={{ width: `${category.percentage ?? 0}%`, backgroundColor: '#4AD147' }}/>
                            </div>
                        </div>
                      ))}
                  </div>
                )}
                {showCalculation && (
                    <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6 mt-6">
                        <h3 className="text-lg font-semibold mb-4 text-white"><Calculator className="w-5 h-5 inline mr-2"/>Grade Calculation</h3>
                        <div className="text-sm space-y-2">
                           {gradesData.categories.map(c => {
                               const catTotals = calculateCategoryTotals().find(ct => ct.id === c.id);
                               return (
                                   <div key={c.id} className="flex justify-between">
                                       <span className="text-gray-400">{c.name} ({c.weight}%):</span>
                                       <span className="font-medium text-white">{catTotals.percentage?.toFixed(1) ?? 'N/A'}%</span>
                                   </div>
                               );
                           })}
                           <div className="border-t border-gray-600 pt-2 flex justify-between font-bold">
                               <span className="text-white">Total Grade:</span>
                               <span className="text-green-400">{calculateWeightedGrade().toFixed(1)}%</span>
                           </div>
                        </div>
                    </div>
                )}
             </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradesModal;