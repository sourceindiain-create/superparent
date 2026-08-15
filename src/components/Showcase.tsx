import React, { useState } from 'react';
import { SHOWCASE_ITEMS } from '../data/mockData';
import { StudentShowcaseItem } from '../types';
import { 
  Trophy, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  PlusCircle, 
  CheckCircle2 
} from 'lucide-react';

export const Showcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [items, setItems] = useState<StudentShowcaseItem[]>(SHOWCASE_ITEMS);
  const [showNominateModal, setShowNominateModal] = useState(false);
  const [nominateSuccess, setNominateSuccess] = useState(false);

  const categories = [
    'All',
    'Best Robot',
    'Best Drone Project',
    'Best Circuit',
    'Best Story',
    'Best Coding Project',
    'Best Cultural Activity'
  ];

  const filteredItems = items.filter(i =>
    selectedCategory === 'All' || i.category === selectedCategory
  );

  const handleLike = (id: string) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, likes: i.likes + 1 } : i)
    );
  };

  const handleNominateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNominateSuccess(true);
    setTimeout(() => {
      setNominateSuccess(false);
      setShowNominateModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <Trophy className="w-4 h-4 text-amber-200" />
            <span>Young Innovators Gallery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            🏆 Student Showcase Gallery
          </h2>
          <p className="text-sm text-orange-50 font-medium">
            Celebrating best student robots, drone innovations, circuit models, coding games, stories, and cultural art.
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-500 mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white shadow-xs font-black'
                  : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowNominateModal(true)}
          className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-black px-4 py-2 rounded-xl text-xs shrink-0 transition-all shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Nominate My Project</span>
        </button>
      </div>

      {/* Showcase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                <Trophy className="w-3 h-3 text-slate-950" />
                <span>{item.badge}</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Parent Approved</span>
              </div>
            </div>

            <div className="p-4 pt-1 space-y-2">
              <span className="text-[10px] font-extrabold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                {item.category}
              </span>

              <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-500 font-medium">
                By <strong className="text-slate-800">{item.studentName}</strong> ({item.grade}, {item.city})
              </p>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleLike(item.id)}
                  className="flex items-center gap-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>{item.likes} Applauds</span>
                </button>

                <span className="text-[10px] text-slate-400 font-mono">
                  {item.createdAt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nominate Project Modal */}
      {showNominateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Nominate for Young Innovators Gallery</span>
              </h3>
              <button onClick={() => setShowNominateModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            {nominateSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
                <h4 className="font-bold text-base">Nomination Submitted!</h4>
                <p className="text-xs">Your parent will receive an approval request to feature your innovation.</p>
              </div>
            ) : (
              <form onSubmit={handleNominateSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Project Title:</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Smart Water Level Alarm Circuit"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category:</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500 font-medium">
                    <option>Best Robot</option>
                    <option>Best Drone Project</option>
                    <option>Best Circuit</option>
                    <option>Best Story</option>
                    <option>Best Coding Project</option>
                    <option>Best Cultural Activity</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Description:</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Explain what your project does and how you built it..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-semibold">
                  🛡️ Safe Gurukul Rule: Project will be featured after Parent Approval.
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors"
                >
                  Submit Nomination for Parent Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
