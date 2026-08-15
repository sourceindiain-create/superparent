import React, { useState } from 'react';
import { INITIAL_GROWTH_DATA } from '../data/mockData';
import { GrowthData } from '../types';
import { 
  BarChart3, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Brain, 
  Users, 
  GraduationCap, 
  Download 
} from 'lucide-react';

interface GrowthMapProps {
  onGenerateCertificate: () => void;
}

export const GrowthMap: React.FC<GrowthMapProps> = ({ onGenerateCertificate }) => {
  const [data] = useState<GrowthData>(INITIAL_GROWTH_DATA);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <BarChart3 className="w-4 h-4 text-amber-200" />
            <span>Parent Tracking Dashboard • Child Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            📊 Child Growth Map & Progress Map
          </h2>
          <p className="text-sm text-orange-50 font-medium">
            Comprehensive single-window tracking for academics, robotics skills, cultural values, and parent-child bonding achievements.
          </p>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white font-black text-2xl flex items-center justify-center shadow-xs">
            CR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900">{data.studentName}</h3>
              <span className="bg-orange-50 text-orange-800 text-xs font-black px-2.5 py-0.5 rounded-full border border-orange-200">
                {data.grade}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Digital ID: {data.idNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-orange-50/70 border border-orange-200 p-3 rounded-2xl text-center min-w-[100px]">
            <span className="text-[10px] font-black text-orange-700 uppercase tracking-wider block">Overall Rating</span>
            <span className="text-xl font-black text-slate-900">{data.overallScore}%</span>
          </div>

          <button
            onClick={onGenerateCertificate}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black px-5 py-3 rounded-xl text-xs shadow-xs transition-all"
          >
            <Award className="w-5 h-5 text-amber-200" />
            <span>Generate Gurukul Certificate</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Projects Completed</span>
          <div className="text-2xl font-black text-slate-900">{data.projectsCompleted} DIY Models</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Certificates Earned</span>
          <div className="text-2xl font-black text-orange-600">{data.certificatesEarned} Official Badges</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sanskar Score</span>
          <div className="text-2xl font-black text-amber-600">{data.valuesScore} / 100</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stories Read</span>
          <div className="text-2xl font-black text-slate-900">{data.storiesReadCount} Moral Books</div>
        </div>
      </div>

      {/* Progress Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Progress */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-600" />
            <span>Subject Academic Scores</span>
          </h3>

          <div className="space-y-3">
            {data.subjectProgress.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">{item.subject}</span>
                  <span className="text-orange-600">{item.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                  <div
                    className="bg-orange-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Development Progress */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
            <Brain className="w-5 h-5 text-orange-600" />
            <span>Future Skills & Values Matrix</span>
          </h3>

          <div className="space-y-3">
            {data.skillsProgress.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">{item.skill}</span>
                  <span className="text-amber-600">{item.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-600" />
          <span>Recent Activity & Achievement History</span>
        </h3>

        <div className="space-y-2.5">
          {data.recentActivities.map((act) => (
            <div
              key={act.id}
              className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">{act.title}</h4>
                  <p className="text-[10px] text-slate-500">{act.date} • Category: {act.type}</p>
                </div>
              </div>
              <span className="bg-orange-50 text-orange-700 font-black text-xs px-2.5 py-1 rounded-full border border-orange-200">
                +{act.points} Pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
