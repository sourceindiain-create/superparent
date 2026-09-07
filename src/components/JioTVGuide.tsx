import React, { useState } from 'react';
import { JIOTV_CHANNELS, JioTVChannel } from '../data/jiotvData';
import { 
  Tv, 
  Play, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Radio, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Share2, 
  Info,
  Maximize2,
  Bookmark,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface JioTVGuideProps {
  onAskAI?: (topic: string) => void;
  onOpenHomework?: () => void;
}

export const JioTVGuide: React.FC<JioTVGuideProps> = ({ onAskAI, onOpenHomework }) => {
  const [selectedChannel, setSelectedChannel] = useState<JioTVChannel>(JIOTV_CHANNELS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const categories = ['All', 'Education & Science', 'Regional Telugu', 'Kids & Animation', 'Vedic & Sanskar', 'Sports & Agility'];

  const filteredChannels = selectedCategory === 'All'
    ? JIOTV_CHANNELS
    : JIOTV_CHANNELS.filter(c => c.category === selectedCategory);

  return (
    <div className="bg-[#0B0E17] text-white min-h-[90vh] rounded-3xl p-4 sm:p-8 border border-[#23293D] shadow-2xl space-y-8 animate-fade-in">
      {/* JioTV Brand Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#23293D] pb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E50046] to-pink-600 flex items-center justify-center text-white font-black shadow-lg shadow-pink-900/40">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#E50046] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                JioTV Live
              </span>
              <span className="text-xs text-blue-400 font-bold">24x7 Educational Broadcast Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Live Gurukul TV & Doordarshan Channels
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3.5 py-1.5 rounded-full font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>6 Channels Broadcasting Live</span>
          </div>
        </div>
      </div>

      {/* Featured Channel Live Video Theater Billboard */}
      <div className="relative rounded-3xl overflow-hidden bg-black border border-neutral-800 shadow-2xl aspect-video sm:aspect-[21/9] max-h-[500px]">
        {/* Background Image / Stream Poster */}
        <img
          src={selectedChannel.banner}
          alt={selectedChannel.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Dark Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17] via-[#0B0E17]/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E17] via-transparent to-transparent w-full sm:w-2/3" />

        {/* Live Badges Top Left */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-10 flex items-center gap-2.5">
          <span className="bg-[#E50046] text-white text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>LIVE NOW</span>
          </span>
          <span className="bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-md border border-neutral-700">
            {selectedChannel.badge}
          </span>
          <span className="bg-black/70 backdrop-blur-md text-neutral-300 text-xs font-medium px-3 py-1 rounded-md border border-neutral-700 hidden sm:inline-block">
            {selectedChannel.language}
          </span>
        </div>

        {/* Audio / Control Buttons Top Right */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-10 flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-neutral-700 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Channel Details on Bottom Left */}
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-10 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={selectedChannel.logo}
              alt={selectedChannel.name}
              className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-md"
            />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-300">{selectedChannel.name}</h3>
              <p className="text-xs text-neutral-400">{selectedChannel.currentShow.episode}</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white max-w-3xl leading-tight">
            {selectedChannel.currentShow.title}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl line-clamp-2 leading-relaxed">
            {selectedChannel.currentShow.description}
          </p>

          {/* Broadcast Progress Bar */}
          <div className="max-w-md space-y-1 pt-1">
            <div className="flex justify-between text-[11px] text-neutral-400 font-semibold">
              <span>{selectedChannel.currentShow.timeRange}</span>
              <span>{selectedChannel.currentShow.progressPercent}% Elapsed</span>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#E50046] h-full rounded-full transition-all duration-500"
                style={{ width: `${selectedChannel.currentShow.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                if (onAskAI) onAskAI(`Explain key concepts from: ${selectedChannel.currentShow.title}`);
              }}
              className="flex items-center gap-2 bg-[#E50046] hover:bg-[#c2003b] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI About This Topic</span>
            </button>

            {onOpenHomework && (
              <button
                onClick={onOpenHomework}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-4 py-2.5 rounded-xl text-xs backdrop-blur-md border border-white/30 transition-all"
              >
                <span>Solve Homework For This Lesson</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#23293D]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#E50046] text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Live Channel Grid (JioTV EPG Style) */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <span>Live Electronic Program Guide (EPG)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChannels.map((channel) => {
            const isSelected = channel.id === selectedChannel.id;
            return (
              <div
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-[#151B2E] border-[#E50046] shadow-lg shadow-pink-950/30 ring-1 ring-[#E50046]'
                    : 'bg-[#121624] border-[#23293D] hover:border-neutral-700 hover:bg-[#181E32]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      className="w-12 h-12 rounded-xl object-cover border border-neutral-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-[#E50046] bg-pink-950/60 px-1.5 py-0.5 rounded border border-pink-800/40">
                          {channel.badge}
                        </span>
                        <span className="text-[10px] text-neutral-400">{channel.language}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate mt-1">{channel.name}</h4>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E50046] animate-pulse shrink-0" />
                  )}
                </div>

                <div className="bg-[#0B0E17]/80 p-3 rounded-xl border border-neutral-800/60 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400">
                    <span className="font-semibold text-pink-400">NOW STREAMING:</span>
                    <span>{channel.currentShow.timeRange}</span>
                  </div>
                  <p className="text-xs font-bold text-neutral-100 line-clamp-1">
                    {channel.currentShow.title}
                  </p>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {channel.currentShow.description}
                  </p>

                  <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden mt-2">
                    <div 
                      className="bg-[#E50046] h-full rounded-full"
                      style={{ width: `${channel.currentShow.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                  <span>Up Next: {channel.upcomingShows[0]?.title.substring(0, 24)}...</span>
                  <span className="text-[#E50046] font-bold flex items-center gap-1">
                    <span>Watch</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
