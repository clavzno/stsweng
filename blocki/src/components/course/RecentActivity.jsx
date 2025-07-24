import React from 'react';
import { Calendar, Clock, TrendingUp, Award, AlertCircle, CheckCircle2 } from 'lucide-react';

const RecentActivity = () => {
  const upcomingDeadlines = [
    {
      id: 1,
      title: 'MCO1 - Project Proposal',
      description: 'Submit your project proposal with detailed requirements and team composition.',
      dueDate: 'Aug 1, 2025',
      daysLeft: 7,
      priority: 'urgent',
      type: 'assignment',
      points: 100
    },
    {
      id: 2,
      title: 'Quiz 2 - Integration Testing',
      description: 'Online quiz covering integration testing strategies and TDD.',
      dueDate: 'Aug 5, 2025',
      daysLeft: 11,
      priority: 'medium',
      type: 'quiz',
      points: 50
    },
    {
      id: 3,
      title: 'Final Project - Code Freeze',
      description: 'All major features for the final project must be implemented and pushed.',
      dueDate: 'Aug 10, 2025',
      daysLeft: 16,
      priority: 'low',
      type: 'discussion',
      points: 25
    }
  ];

  const recentGrades = [
    {
      id: 1,
      title: 'MC04. Automation Test Plan',
      description: 'Comprehensive test automation plan for your project.',
      score: 93,
      maxScore: 100,
      submittedDate: 'July 22, 2025',
      feedback: 'Excellent work on the test case definitions!',
      grade: 'A'
    },
    {
      id: 2,
      title: 'Midpoint Project Presentation',
      description: 'Presented project progress and challenges.',
      score: 88,
      maxScore: 100,
      submittedDate: 'July 18, 2025',
      feedback: 'Good presentation, work on clarifying the CI/CD pipeline.',
      grade: 'B+'
    },
  ];
  
  // Defines styles for different priority levels
  const priorityStyles = {
    urgent: { color: '#FF5757', icon: <AlertCircle className="w-4 h-4" /> },
    medium: { color: '#F38735', icon: <Clock className="w-4 h-4" /> },
    low: { color: '#526CF4', icon: <Calendar className="w-4 h-4" /> },
  };

  // Determines the color and style based on the grade percentage
  const getGradeStyle = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { color: '#4AD147', textColor: 'text-green-300', bgColor: 'bg-green-500/20' };
    if (percentage >= 80) return { color: '#526CF4', textColor: 'text-blue-300', bgColor: 'bg-blue-500/20' };
    if (percentage >= 70) return { color: '#F38735', textColor: 'text-orange-300', bgColor: 'bg-orange-500/20' };
    return { color: '#FF5757', textColor: 'text-red-300', bgColor: 'bg-red-500/20' };
  };

  return (
    <div className="mt-16" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Component Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <TrendingUp className="w-8 h-8 text-green-400" />
          <div>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>Recent Activity</h2>
            <p className="text-lg text-gray-400 mt-1">Stay on top of your coursework.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Upcoming Deadlines Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-500/20 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Upcoming Deadlines</h3>
                  <p className="text-sm text-gray-400">Don't miss these important dates</p>
                </div>
              </div>
              <span className="bg-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full">
                {upcomingDeadlines.length} items
              </span>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {upcomingDeadlines.map((item) => {
              const style = priorityStyles[item.priority];
              return (
                <div key={item.id} className="bg-gray-800/60 p-4 rounded-xl border-l-4 hover:bg-gray-700/60 transition-colors" style={{ borderLeftColor: style.color }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1" style={{ color: style.color }}>{style.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-base text-white mb-1 truncate">{item.title}</h4>
                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {item.dueDate}</span>
                          <span className="flex items-center gap-1.5"><Award className="w-3 h-3" /> {item.points} pts</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="font-bold text-xl" style={{ color: style.color }}>{item.daysLeft}</div>
                      <div className="text-xs text-gray-400">days left</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Grades Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-500/20 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Recent Grades</h3>
                  <p className="text-sm text-gray-400">Your latest academic performance</p>
                </div>
              </div>
              <span className="bg-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full">
                Avg: 90.5%
              </span>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {recentGrades.map((grade) => {
              const style = getGradeStyle(grade.score, grade.maxScore);
              return (
                // The key ensures React can efficiently update the list
                <div key={grade.id} className="bg-gray-800/60 p-4 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-base text-white truncate">{grade.title}</h4>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.bgColor} ${style.textColor}`}>
                          {grade.grade}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{grade.description}</p>
                      <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" /> Graded: {grade.submittedDate}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className={`font-bold text-2xl ${style.textColor}`}>{grade.score}</div>
                      <div className="text-sm text-gray-400">/ {grade.maxScore}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
