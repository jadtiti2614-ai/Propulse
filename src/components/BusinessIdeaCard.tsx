import React from 'react';
import { BusinessIdea } from '../types';
import { 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Coins, 
  Rocket, 
  CheckCircle2, 
  TrendingUp, 
  Wrench, 
  Flame,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BusinessIdeaCardProps {
  idea: BusinessIdea;
  isSaved: boolean;
  onToggleSave: (idea: BusinessIdea) => void;
  onSelectForDeepDive: (idea: BusinessIdea) => void;
}

export const BusinessIdeaCard: React.FC<BusinessIdeaCardProps> = ({
  idea,
  isSaved,
  onToggleSave,
  onSelectForDeepDive,
}) => {
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(idea);
    if (!isSaved) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  return (
    <div className="group relative bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-amber-400/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-amber-500/5">
      {/* Card Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                {idea.category}
              </span>
              <span className="text-stone-600">·</span>
              <span className="text-[11px] text-stone-400">
                Niveau : {idea.difficultyLevel}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors font-display">
              {idea.title}
            </h3>
          </div>

          {/* Bookmark & Match badge */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{idea.matchScore}% Match</span>
            </div>

            <button
              onClick={handleSave}
              className={`p-2 rounded-xl transition-all ${
                isSaved
                  ? 'bg-amber-400 text-stone-950'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800 hover:border-stone-700'
              }`}
              title={isSaved ? 'Retirer des favoris' : 'Enregistrer cette idée'}
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 fill-stone-950" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm font-medium text-amber-200/90 italic">
          « {idea.tagline} »
        </p>

        {/* Creativity meter */}
        <div className="flex items-center space-x-2 text-xs text-stone-400">
          <span>Indice d'originalité :</span>
          <div className="flex items-center text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Flame
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < (idea.creativityRating || 4)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-stone-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Concept Description */}
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          {idea.conceptDescription}
        </p>

        {/* Why for you box */}
        <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-3.5 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Pourquoi ce business est parfait pour vos conditions :
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            {idea.whyForYou}
          </p>
        </div>

        {/* Financial & Operational Specs */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-2.5">
            <div className="text-[10px] uppercase font-semibold text-stone-400 flex items-center gap-1">
              <Coins className="w-3 h-3 text-amber-400" />
              Budget de départ
            </div>
            <div className="font-bold text-stone-200 mt-0.5 truncate">
              {idea.initialBudgetRequired}
            </div>
          </div>

          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-2.5">
            <div className="text-[10px] uppercase font-semibold text-stone-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              1ers revenus sous
            </div>
            <div className="font-bold text-stone-200 mt-0.5 truncate">
              {idea.speedToFirstRevenue}
            </div>
          </div>

          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-2.5">
            <div className="text-[10px] uppercase font-semibold text-stone-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              Potentiel à 3 mois
            </div>
            <div className="font-bold text-emerald-300 mt-0.5 truncate">
              {idea.monetization.projectedMonthlyRevenueMonths3}
            </div>
          </div>

          <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-2.5">
            <div className="text-[10px] uppercase font-semibold text-stone-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              Potentiel à 12 mois
            </div>
            <div className="font-bold text-emerald-400 mt-0.5 truncate">
              {idea.monetization.projectedMonthlyRevenueMonths12}
            </div>
          </div>
        </div>

        {/* 7-day validation prompt */}
        <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-3 text-xs space-y-1">
          <span className="font-semibold text-amber-400 flex items-center gap-1">
            <Rocket className="w-3.5 h-3.5" />
            Votre test en 7 jours (zéro risque) :
          </span>
          <p className="text-stone-300 text-[11px] leading-relaxed">
            {idea.first7DaysValidation}
          </p>
        </div>

        {/* Tools needed */}
        {idea.toolsNeeded && idea.toolsNeeded.length > 0 && (
          <div className="flex items-center space-x-1.5 text-[11px] text-stone-400">
            <Wrench className="w-3 h-3 text-stone-500 shrink-0" />
            <span className="truncate">
              Outils recommandés : {idea.toolsNeeded.join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Card Action */}
      <div className="mt-6 pt-4 border-t border-stone-800">
        <button
          onClick={() => onSelectForDeepDive(idea)}
          className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-amber-400 text-stone-200 hover:text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all duration-200 border border-stone-700 hover:border-amber-400 shadow-sm"
        >
          <span>Ouvrir l'Incubateur & Plan 30 Jours</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
