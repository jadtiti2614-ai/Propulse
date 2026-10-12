import React from 'react';
import { ProfileAnalysis } from '../types';
import { 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  Trophy, 
  Heart, 
  Target, 
  Globe, 
  DollarSign, 
  ArrowRight,
  Zap
} from 'lucide-react';

interface AnalysisOverviewProps {
  analysis: ProfileAnalysis;
  onExploreIdeas: () => void;
}

export const AnalysisOverview: React.FC<AnalysisOverviewProps> = ({
  analysis,
  onExploreIdeas,
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Archetype Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 border border-stone-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Votre Archétype Entrepreneurial Révélé</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              {analysis.archetype}
            </h2>
            <p className="text-stone-300 text-base leading-relaxed italic">
              « {analysis.archetypeTagline} »
            </p>
          </div>

          {/* Readiness gauge */}
          <div className="flex items-center gap-4 bg-stone-950/80 border border-stone-800/80 p-4 rounded-2xl sm:self-start">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-stone-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400 transition-all duration-1000 ease-out"
                  strokeDasharray={`${analysis.readinessScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-black text-white">
                {analysis.readinessScore}%
              </span>
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-stone-400 tracking-wider">
                Indice d'adéquation
              </div>
              <div className="text-sm font-semibold text-amber-400">
                Prêt pour le lancement
              </div>
            </div>
          </div>
        </div>

        {/* Superpowers Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800/80">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-3">
            <Zap className="w-4 h-4 fill-amber-400" />
            Vos 4 Super-Pouvoirs Détectés
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {analysis.superpowers.map((power, idx) => (
              <div
                key={idx}
                className="bg-stone-950/60 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 leading-snug flex items-start space-x-2"
              >
                <span className="text-amber-400 font-bold shrink-0">#{idx + 1}</span>
                <span>{power}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ikigai Quadrants */}
      <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 sm:p-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h3 className="text-xl font-bold text-white font-display">
            Votre Ikigaï Entrepreneurial
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            L'intersection sacrée où passion, talent, demande réelle et rentabilité s'alignent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Ce que vous aimez */}
          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-4 space-y-2 hover:border-rose-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4" />
              <span>1. Ce qui vous anime (Passion)</span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              {analysis.ikigaiSynthesis.whatYouLove}
            </p>
          </div>

          {/* 2. Ce pour quoi vous êtes doué */}
          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-4 space-y-2 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>2. Vos forces éprouvées (Talent)</span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              {analysis.ikigaiSynthesis.whatYouAreGoodAt}
            </p>
          </div>

          {/* 3. Ce dont le marché a besoin */}
          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-4 space-y-2 hover:border-sky-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-sky-400 font-semibold text-xs uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>3. Besoins prioritaires du marché (Impact)</span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              {analysis.ikigaiSynthesis.whatTheWorldNeeds}
            </p>
          </div>

          {/* 4. Ce pour quoi on vous paiera */}
          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-4 space-y-2 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <DollarSign className="w-4 h-4" />
              <span>4. Proposition rentable (Monétisation)</span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              {analysis.ikigaiSynthesis.whatYouCanBePaidFor}
            </p>
          </div>
        </div>
      </div>

      {/* Strategic Advantages vs Blindspots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Atouts */}
        <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            <span>Vos Avantages Stratégiques Uniques</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
            {analysis.strategicAdvantages.map((adv, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Angles morts */}
        <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Angles Morts & Pièges à Éviter</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
            {analysis.potentialBlindspots.map((spot, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-amber-400 mt-1">!</span>
                <span>{spot}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button to scroll to ideas */}
      <div className="text-center pt-2">
        <button
          onClick={onExploreIdeas}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
        >
          <span>Découvrir les 4 idées de business taillées pour vous</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
