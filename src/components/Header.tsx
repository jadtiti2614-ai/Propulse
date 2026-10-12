import React from 'react';
import { Sparkles, Bookmark, Lightbulb, Compass, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: 'audit' | 'ideas' | 'incubator' | 'sparks' | 'saved';
  setActiveTab: (tab: 'audit' | 'ideas' | 'incubator' | 'sparks' | 'saved') => void;
  savedCount: number;
  hasAnalysis: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  hasAnalysis,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-800 bg-stone-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('audit')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-stone-950 font-black">
              <Zap className="w-5 h-5 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  PROPULSE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  Studio Créatif
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                Révélateur de potentiel & générateur de business sur-mesure
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'audit'
                  ? 'bg-stone-800 text-amber-400 border border-stone-700 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span className="hidden md:inline">Mon Profil & Conditions</span>
              <span className="md:hidden">Profil</span>
            </button>

            <button
              onClick={() => setActiveTab('ideas')}
              disabled={!hasAnalysis}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ideas'
                  ? 'bg-stone-800 text-amber-400 border border-stone-700 shadow-sm'
                  : hasAnalysis
                  ? 'text-stone-300 hover:text-white hover:bg-stone-900'
                  : 'text-stone-600 cursor-not-allowed opacity-50'
              }`}
              title={hasAnalysis ? 'Voir mes idées générées' : 'Complétez votre profil d’abord'}
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden md:inline">Idées sur-Mesure</span>
              <span className="md:hidden">Idées</span>
              {hasAnalysis && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('sparks')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'sparks'
                  ? 'bg-stone-800 text-amber-400 border border-stone-700 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden md:inline">Lab Mashup Flash</span>
              <span className="md:hidden">Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === 'saved'
                  ? 'bg-stone-800 text-amber-400 border border-stone-700 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden md:inline">Favoris</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-stone-950 bg-amber-400 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
