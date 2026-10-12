import React from 'react';
import { BusinessIdea } from '../types';
import { BusinessIdeaCard } from './BusinessIdeaCard';
import { Bookmark, Download, Trash2, ArrowRight } from 'lucide-react';

interface SavedIdeasViewProps {
  savedIdeas: BusinessIdea[];
  onToggleSave: (idea: BusinessIdea) => void;
  onSelectForDeepDive: (idea: BusinessIdea) => void;
  onGoToDiagnostic: () => void;
}

export const SavedIdeasView: React.FC<SavedIdeasViewProps> = ({
  savedIdeas,
  onToggleSave,
  onSelectForDeepDive,
  onGoToDiagnostic,
}) => {
  const exportAllAsMarkdown = () => {
    if (savedIdeas.length === 0) return;

    let md = `# MES IDÉES DE BUSINESS SÉLECTIONNÉES\nDate d'export : ${new Date().toLocaleDateString('fr-FR')}\n\n`;

    savedIdeas.forEach((idea, index) => {
      md += `## ${index + 1}. ${idea.title}\n`;
      md += `*${idea.tagline}*\n\n`;
      md += `- **Catégorie :** ${idea.category}\n`;
      md += `- **Score de compatibilité :** ${idea.matchScore}%\n`;
      md += `- **Budget requis :** ${idea.initialBudgetRequired}\n`;
      md += `- **Vitesse des premiers revenus :** ${idea.speedToFirstRevenue}\n`;
      md += `- **Potentiel CA 3 mois :** ${idea.monetization.projectedMonthlyRevenueMonths3}\n`;
      md += `- **Potentiel CA 12 mois :** ${idea.monetization.projectedMonthlyRevenueMonths12}\n\n`;
      md += `### Description\n${idea.conceptDescription}\n\n`;
      md += `### Pourquoi c'est taillé pour vous\n${idea.whyForYou}\n\n`;
      md += `### Action de validation en 7 jours\n${idea.first7DaysValidation}\n\n`;
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mes-idees-business-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (savedIdeas.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-stone-900 border border-stone-800 text-stone-500 flex items-center justify-center mx-auto">
          <Bookmark className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white font-display">
          Aucune idée sauvegardée pour l'instant
        </h2>
        <p className="text-sm text-stone-400 max-w-md mx-auto">
          Explorez les idées générées sur-mesure ou visitez le Laboratoire Flash, puis cliquez sur le signet pour conserver vos coups de cœur ici.
        </p>
        <button
          onClick={onGoToDiagnostic}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm transition-all"
        >
          <span>Faire mon bilan de potentiel</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-400 fill-amber-400" />
            Mes Business Coups de Cœur ({savedIdeas.length})
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Retrouvez vos projets favoris et débloquez leur feuille de route 30 jours à tout moment.
          </p>
        </div>

        <button
          onClick={exportAllAsMarkdown}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-semibold self-start sm:self-auto transition-all"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Exporter tout le dossier (.MD)</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedIdeas.map((idea) => (
          <BusinessIdeaCard
            key={idea.id}
            idea={idea}
            isSaved={true}
            onToggleSave={onToggleSave}
            onSelectForDeepDive={onSelectForDeepDive}
          />
        ))}
      </div>
    </div>
  );
};
