import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  ProfileAnalysis, 
  BusinessIdea, 
  DeepDivePlan,
  SparkIdea 
} from './types';
import { PRESET_PROFILES } from './data/presets';
import { Header } from './components/Header';
import { ProfileForm } from './components/ProfileForm';
import { AnalysisOverview } from './components/AnalysisOverview';
import { BusinessIdeaCard } from './components/BusinessIdeaCard';
import { DeepDiveModal } from './components/DeepDiveModal';
import { SparkGenerator } from './components/SparkGenerator';
import { SavedIdeasView } from './components/SavedIdeasView';
import { 
  Filter, 
  ArrowLeft, 
  RefreshCw, 
  Flame, 
  Clock, 
  Coins, 
  Sparkles,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY_SAVED_IDEAS = 'propulse_saved_ideas';
const STORAGE_KEY_PROFILE = 'propulse_user_profile';
const STORAGE_KEY_ANALYSIS = 'propulse_analysis_result';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'audit' | 'ideas' | 'incubator' | 'sparks' | 'saved'>('audit');

  // User Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    // Default starting state based on preset
    return PRESET_PROFILES[0].data;
  });

  // Analysis result
  const [analysisResult, setAnalysisResult] = useState<{
    profileAnalysis: ProfileAnalysis;
    businessIdeas: BusinessIdea[];
  } | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANALYSIS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return null;
  });

  // Saved ideas
  const [savedIdeas, setSavedIdeas] = useState<BusinessIdea[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SAVED_IDEAS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [];
  });

  // Filters for ideas view
  const [filterSpeed, setFilterSpeed] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // Loading states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgressMsg, setAnalysisProgressMsg] = useState('');

  // Deep dive modal
  const [selectedIdeaForDeepDive, setSelectedIdeaForDeepDive] = useState<BusinessIdea | null>(null);
  const [deepDivePlan, setDeepDivePlan] = useState<DeepDivePlan | null>(null);
  const [isDeepDiveLoading, setIsDeepDiveLoading] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_IDEAS, JSON.stringify(savedIdeas));
    } catch (e) {
      console.warn(e);
    }
  }, [savedIdeas]);

  useEffect(() => {
    if (analysisResult) {
      try {
        localStorage.setItem(STORAGE_KEY_ANALYSIS, JSON.stringify(analysisResult));
      } catch (e) {
        console.warn(e);
      }
    }
  }, [analysisResult]);

  // Handle Full Profile Analysis
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisProgressMsg("Cartographie de vos compétences et atouts...");

    const progressTimer = setTimeout(() => {
      setAnalysisProgressMsg("Calcul de l'Ikigaï et des angles créatifs...");
    }, 1500);

    const progressTimer2 = setTimeout(() => {
      setAnalysisProgressMsg("Ajustement aux contraintes de budget et temps...");
    }, 3200);

    try {
      const res = await fetch('/api/analyze-potential', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      clearTimeout(progressTimer);
      clearTimeout(progressTimer2);

      if (data && data.profileAnalysis && data.businessIdeas) {
        setAnalysisResult({
          profileAnalysis: data.profileAnalysis,
          businessIdeas: data.businessIdeas,
        });

        setActiveTab('ideas');

        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } catch (error) {
      console.error('Failed to analyze profile:', error);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgressMsg('');
    }
  };

  // Toggle Save Idea
  const handleToggleSave = (idea: BusinessIdea) => {
    setSavedIdeas((prev) => {
      const exists = prev.some((i) => i.id === idea.id);
      if (exists) {
        return prev.filter((i) => i.id !== idea.id);
      } else {
        return [...prev, idea];
      }
    });
  };

  // Handle saving spark as idea
  const handleSaveSparkAsIdea = (spark: SparkIdea) => {
    const newIdea: BusinessIdea = {
      id: `spark-${Date.now()}`,
      title: spark.title,
      tagline: spark.pitch.slice(0, 70) + '...',
      category: 'Projet Hybride Flash',
      creativityRating: 5,
      matchScore: 94,
      conceptDescription: spark.pitch,
      whyForYou: `Généré lors de votre session d'exploration créative.`,
      monetization: {
        model: "Monétisation agile",
        pricingExample: spark.potential,
        projectedMonthlyRevenueMonths3: spark.potential,
        projectedMonthlyRevenueMonths12: "4 000€ - 7 000€"
      },
      initialBudgetRequired: "0€ à 50€",
      first7DaysValidation: spark.firstStep,
      toolsNeeded: ["Réseaux sociaux", "Outils gratuits"],
      difficultyLevel: "Facile",
      speedToFirstRevenue: "Moins de 14 jours"
    };
    handleToggleSave(newIdea);
  };

  // Open Deep Dive Incubator
  const handleSelectForDeepDive = async (idea: BusinessIdea) => {
    setSelectedIdeaForDeepDive(idea);
    setIsDeepDiveLoading(true);

    try {
      const res = await fetch('/api/deep-dive-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea,
          profile,
        }),
      });
      const data = await res.json();
      setDeepDivePlan(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeepDiveLoading(false);
    }
  };

  // Filter ideas
  const filteredIdeas = (analysisResult?.businessIdeas || []).filter((idea) => {
    if (filterSpeed !== 'all') {
      if (filterSpeed === '14d' && !idea.speedToFirstRevenue.toLowerCase().includes('14')) {
        return false;
      }
      if (filterSpeed === '1m' && !idea.speedToFirstRevenue.toLowerCase().includes('1 mois')) {
        return false;
      }
    }
    if (filterDifficulty !== 'all') {
      if (idea.difficultyLevel !== filterDifficulty) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-400 selection:text-stone-950">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIdeas.length}
        hasAnalysis={!!analysisResult}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: PROFILE & CONDITIONS AUDIT */}
        {activeTab === 'audit' && (
          <ProfileForm
            profile={profile}
            setProfile={setProfile}
            onAnalyze={handleAnalyze}
            isLoading={isAnalyzing}
          />
        )}

        {/* TAB 2: IDEAS & POTENTIAL OVERVIEW */}
        {activeTab === 'ideas' && analysisResult && (
          <div className="space-y-12 animate-fadeIn">
            {/* Overview Section */}
            <AnalysisOverview
              analysis={analysisResult.profileAnalysis}
              onExploreIdeas={() => {
                const el = document.getElementById('ideas-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Ideas Section */}
            <div id="ideas-section" className="space-y-6 pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                    Vos 4 Modèles de Business Sur-Mesure
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1">
                    Conçus spécifiquement pour exploiter vos forces tout en respectant votre budget ({profile.budget}) et votre temps ({profile.weeklyHours}).
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center space-x-1 text-xs text-stone-400 mr-2">
                    <Filter className="w-3.5 h-3.5 text-stone-500" />
                    <span>Filtrer :</span>
                  </div>

                  {/* Filter by speed */}
                  <select
                    value={filterSpeed}
                    onChange={(e) => setFilterSpeed(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-300 focus:outline-none focus:border-amber-400"
                  >
                    <option value="all">Toutes les vitesses de revenu</option>
                    <option value="14d">Moins de 14 jours</option>
                    <option value="1m">1 mois</option>
                  </select>

                  {/* Filter by difficulty */}
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-300 focus:outline-none focus:border-amber-400"
                  >
                    <option value="all">Toutes les difficultés</option>
                    <option value="Facile">Facile</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                  </select>

                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-xs font-semibold text-amber-400 border border-stone-700 transition-all ml-1"
                    title="Régénérer de nouvelles variantes d'idées"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                    <span>Regénérer</span>
                  </button>
                </div>
              </div>

              {/* Grid of Ideas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredIdeas.map((idea) => {
                  const isSaved = savedIdeas.some((i) => i.id === idea.id);
                  return (
                    <BusinessIdeaCard
                      key={idea.id}
                      idea={idea}
                      isSaved={isSaved}
                      onToggleSave={handleToggleSave}
                      onSelectForDeepDive={handleSelectForDeepDive}
                    />
                  );
                })}
              </div>

              {filteredIdeas.length === 0 && (
                <div className="text-center py-12 text-stone-500 text-sm">
                  Aucun business ne correspond aux filtres sélectionnés.{' '}
                  <button
                    onClick={() => {
                      setFilterSpeed('all');
                      setFilterDifficulty('all');
                    }}
                    className="text-amber-400 underline font-medium"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SPARK MASHUP LAB */}
        {activeTab === 'sparks' && (
          <SparkGenerator onSaveSparkAsIdea={handleSaveSparkAsIdea} />
        )}

        {/* TAB 4: SAVED IDEAS */}
        {activeTab === 'saved' && (
          <SavedIdeasView
            savedIdeas={savedIdeas}
            onToggleSave={handleToggleSave}
            onSelectForDeepDive={handleSelectForDeepDive}
            onGoToDiagnostic={() => setActiveTab('audit')}
          />
        )}
      </main>

      {/* Deep Dive Incubator Modal */}
      {selectedIdeaForDeepDive && (
        <DeepDiveModal
          idea={selectedIdeaForDeepDive}
          plan={deepDivePlan}
          profile={profile}
          isLoading={isDeepDiveLoading}
          onClose={() => {
            setSelectedIdeaForDeepDive(null);
            setDeepDivePlan(null);
          }}
        />
      )}

      {/* Global Loading Overlay if analyzing */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
          <div className="relative w-20 h-20 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 animate-pulse flex items-center justify-center shadow-2xl shadow-amber-500/30">
              <Zap className="w-10 h-10 text-stone-950 animate-bounce" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-white font-display mb-2">
            Analyse de votre potentiel en cours...
          </h3>
          <p className="text-sm text-amber-300 font-medium max-w-md animate-pulse">
            {analysisProgressMsg || "Croisement de vos compétences et génération d'idées viables..."}
          </p>
          <div className="mt-6 flex items-center space-x-2 text-xs text-stone-400">
            <span>Optimisation mathématique du profil</span>
            <span>•</span>
            <span>Création sur-mesure</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-850 bg-stone-950/90 py-6 text-xs text-stone-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-tight text-stone-300">PROPULSE</span>
            <span>—</span>
            <span>Trouvez le business taillé pour qui vous êtes vraiment.</span>
          </div>
          <div className="flex items-center space-x-4 text-stone-400">
            <span>Aucune compétence n'est inutile</span>
            <span>•</span>
            <span>Bootstrap &amp; Agilité</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
