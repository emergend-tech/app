/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Copy, 
  ChevronLeft, 
  Video, 
  Layers, 
  Image as ImageIcon,
  Zap,
  Store,
  Calendar,
  BarChart3,
  PenLine
} from 'lucide-react';
import { NICHE_MAPPING, getFallbackContent, COMMON_NICHES } from './constants';
import { ContentIdea } from './types';

type AppState = 'welcome' | 'input' | 'loading' | 'result';

export default function App() {
  const [state, setState] = useState<AppState>('welcome');
  const [niche, setNiche] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<ContentIdea[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (selectedNiche?: string) => {
    const finalNiche = selectedNiche || niche;
    if (!finalNiche.trim() || !businessName.trim()) return;

    setNiche(finalNiche);
    setState('loading');
    setProgress(0);

    // Simulate loading progress
    const duration = 2500;
    const interval = 25;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    setTimeout(() => {
      const nicheIdeas = NICHE_MAPPING[finalNiche];
      let content: ContentIdea[] = [];

      if (nicheIdeas) {
        content = nicheIdeas.map(idea => ({
          ...idea,
          caption: idea.caption.replace(/your business/g, businessName)
        }));
      } else {
        // Generate 7 days of fallback
        content = Array.from({ length: 7 }, (_, i) => getFallbackContent(finalNiche, i));
      }

      setGeneratedContent(content);
      setSelectedDay(0);
      setState('result');
    }, duration + 200);
  };

  const handleCopy = () => {
    if (generatedContent[selectedDay]) {
      navigator.clipboard.writeText(generatedContent[selectedDay].caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const reset = () => {
    setState('welcome');
    setNiche('');
    setBusinessName('');
    setGeneratedContent([]);
    setSelectedDay(0);
  };

  const currentIdea = generatedContent[selectedDay];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-red-100 selection:text-red-600">
      {/* Instagram Gradient Style */}
      <style>{`
        .bg-instagram {
          background: #f09433;
          background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
          background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
        }
      `}</style>
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Zap className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Social Watch</h1>
          </div>
          {state === 'result' && (
            <button 
              onClick={() => setState('input')}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
            >
              <ChevronLeft size={20} />
              New Planning
            </button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {state === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center space-y-12 py-12"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                  Welcome to Social Watch
                </h2>
                <p className="text-slate-500 text-lg max-w-md mx-auto">
                  Analyze your performance or start creating new content today.
                </p>
              </div>

              <div className="w-full max-w-sm space-y-4">
                <motion.a
                  href="https://entreg-insta-report.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-full py-5 bg-instagram text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.05] transition-all shadow-lg text-lg"
                >
                  <BarChart3 size={24} />
                  Access your report
                </motion.a>

                <button
                  onClick={() => setState('input')}
                  className="w-full py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm text-lg"
                >
                  <PenLine size={24} />
                  Create your content
                </button>
              </div>
            </motion.div>
          )}

          {state === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                  Create your content calendar
                </h2>
                <p className="text-slate-500 text-lg max-w-md mx-auto">
                  Generate 7 days of strategic ideas personalized for your business.
                </p>
              </div>

              <div className="w-full max-w-2xl space-y-6">
                {/* Business Name Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500 transition-colors">
                    <Store size={22} />
                  </div>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your business name"
                    className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-2xl text-lg focus:outline-none focus:border-red-500 shadow-sm transition-all placeholder:text-slate-300"
                  />
                </div>

                {/* Niche Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500 transition-colors">
                    <Search size={22} />
                  </div>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="What's your niche? (Ex: Fashion, Fitness...)"
                    className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-2xl text-lg focus:outline-none focus:border-red-500 shadow-sm transition-all placeholder:text-slate-300"
                  />
                </div>

                <button
                  onClick={() => handleGenerate()}
                  disabled={!niche.trim() || !businessName.trim()}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Generate 7 Days of Content
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Popular Niches</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {COMMON_NICHES.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleGenerate(item)}
                      className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 hover:border-red-500 hover:text-red-500 transition-all shadow-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {state === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-8"
            >
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="552.92"
                    initial={{ strokeDashoffset: 552.92 }}
                    animate={{ strokeDashoffset: 552.92 - (552.92 * progress) / 100 }}
                    className="text-red-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-slate-900">{Math.round(progress)}%</span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Planning your week...</h3>
                <p className="text-slate-500">Custom strategy for {businessName}</p>
              </div>
            </motion.div>
          )}

          {state === 'result' && currentIdea && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
                    <Sparkles size={14} />
                    Weekly Planning
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900">{businessName}</h2>
                  <p className="text-slate-500">Niche: {niche}</p>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 font-bold text-sm self-start">
                  {currentIdea.type === 'Reels' && <Video size={16} />}
                  {currentIdea.type === 'Carrossel' && <Layers size={16} />}
                  {currentIdea.type === 'Estático' && <ImageIcon size={16} />}
                  {currentIdea.type}
                </div>
              </div>

              {/* Day Selection Tabs */}
              <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
                {generatedContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
                      selectedDay === index
                        ? 'bg-slate-900 text-white shadow-lg scale-105'
                        : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <Calendar size={16} />
                    Day {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hook Card */}
                <motion.div 
                  key={`hook-${selectedDay}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4"
                >
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Hook</h4>
                  <p className="text-2xl font-bold text-slate-900 leading-tight">
                    {currentIdea.hook}
                  </p>
                </motion.div>

                {/* Visual Idea Card */}
                <motion.div 
                  key={`visual-${selectedDay}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4"
                >
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Visual Idea</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {currentIdea.visualIdea}
                  </p>
                </motion.div>

                {/* Caption Card */}
                <motion.div 
                  key={`caption-${selectedDay}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2 bg-slate-900 p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Zap size={200} className="text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Full Caption</h4>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                        copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy Caption'}
                    </button>
                  </div>

                  <div className="relative z-10">
                    <pre className="text-white font-sans whitespace-pre-wrap leading-relaxed opacity-90">
                      {currentIdea.caption}
                    </pre>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
