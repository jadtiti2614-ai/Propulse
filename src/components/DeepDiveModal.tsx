import React, { useState } from 'react';
import { BusinessIdea, DeepDivePlan, UserProfile } from '../types';
import { 
  X, 
  CheckSquare, 
  Square, 
  Copy, 
  Check, 
  Download, 
  Target, 
  Layers, 
  Calendar, 
  MessageSquare, 
  Calculator, 
  Lightbulb, 
  Zap, 
  Coins,
  Share2
} from 'lucide-react';

interface DeepDiveModalProps {
  idea: BusinessIdea | null;
  plan: DeepDivePlan | null;
  profile: UserProfile;
  isLoading: boolean;
  onClose: () => void;
}

export const DeepDiveModal: React.FC<DeepDiveModalProps> = ({
  idea,
  plan,
  profile,
  isLoading,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'roadmap' | 'pitch' | 'calculator'>('roadmap');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [copiedText, setCopiedText] = useState(false);

  // Financial simulator states
  const [clientsPerMonth, setClientsPerMonth] = useState<number>(4);
  const [averagePrice, setAveragePrice] = useState<number>(350);

  if (!idea) return null;

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const copyFullPlan = () => {
    if (!plan) return;
    const roadmapText = plan.thirtyDayRoadmap
      .map((w) => `### Semaine ${w.week}: ${w.title}\nObjectif: ${w.focus}\n${w.tasks.map((t) => `- [ ] ${t}`).join('\n')}`)
      .join('\n\n');

    const fullSummary = `
# DOSSIER D'EXÉCUTION : ${idea.title}
Tagline : ${idea.tagline}
Catégorie : ${idea.category}
Budget initial : ${idea.initialBudgetRequired}

## PROPOSITION DE VALEUR
${plan.leanCanvas.uniqueValueProposition}

## PLAN D'ACTION 30 JOURS
${roadmapText}

## PITCH COMMERCIAL & PROSPECTION
${plan.salesPitch.elevatorPitch}

Message d'approche :
${plan.salesPitch.outreachMessage}
    `.trim();

    navigator.clipboard.writeText(fullSummary);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const monthlyRev = clientsPerMonth * averagePrice;
  const yearlyRev = monthlyRev * 12;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-800 bg-stone-950/50 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider">
                Incubateur de Lancement & Plan d'Action
              </span>
              <span className="text-stone-600">·</span>
              <span className="text-xs text-stone-400">{idea.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {idea.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 italic">
              « {idea.tagline} »
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {plan && (
              <button
                onClick={copyFullPlan}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-xs font-semibold text-stone-200 border border-stone-700 transition-all"
                title="Copier le plan complet en Markdown"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copier le plan</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Subnav */}
        <div className="flex items-center px-6 border-b border-stone-800 bg-stone-900/90 overflow-x-auto gap-2 py-2">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'roadmap'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Feuille de Route 30 Jours</span>
          </button>

          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'canvas'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Lean Canvas Stratégique</span>
          </button>

          <button
            onClick={() => setActiveTab('pitch')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'pitch'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Pitch & Prospection</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Simulateur Financier</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-stone-300 font-medium">
                Génération de votre dossier d'exécution et Lean Canvas...
              </p>
            </div>
          )}

          {!isLoading && plan && (
            <>
              {/* TAB 1: ROADMAP 30 DAYS */}
              {activeTab === 'roadmap' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-stone-950/60 border border-stone-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        Votre plan d'attaque étape par étape (Semaine 1 à 4)
                      </h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Cochez chaque micro-victoire au fur et à mesure pour garder le rythme sans surcharge mentale.
                      </p>
                    </div>
                    <div className="text-xs text-stone-400 bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-800">
                      Tâches accomplies :{' '}
                      <span className="text-amber-400 font-bold">
                        {Object.values(completedTasks).filter(Boolean).length} / {plan.thirtyDayRoadmap.reduce((acc, w) => acc + w.tasks.length, 0)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {plan.thirtyDayRoadmap.map((week) => (
                      <div
                        key={week.week}
                        className="bg-stone-950/40 border border-stone-800 rounded-2xl p-5 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-stone-800/80 pb-3">
                          <div className="flex items-center space-x-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-amber-400/10 text-amber-400 font-extrabold text-xs border border-amber-400/20">
                              Semaine {week.week}
                            </span>
                            <span className="font-bold text-white text-sm sm:text-base">
                              {week.title}
                            </span>
                          </div>
                          <span className="text-xs text-stone-400 italic">
                            Focus : {week.focus}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {week.tasks.map((task, idx) => {
                            const taskId = `w${week.week}-t${idx}`;
                            const isDone = !!completedTasks[taskId];
                            return (
                              <button
                                key={idx}
                                onClick={() => toggleTask(taskId)}
                                className={`flex items-start space-x-3 p-3 rounded-xl border text-left transition-all text-xs ${
                                  isDone
                                    ? 'bg-emerald-950/30 border-emerald-500/40 text-stone-300 line-through'
                                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 text-stone-200 hover:text-white'
                                }`}
                              >
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                                )}
                                <span className="leading-snug">{task}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Growth hacks section */}
                  {plan.growthHacks && plan.growthHacks.length > 0 && (
                    <div className="bg-gradient-to-r from-amber-950/20 to-stone-950 border border-amber-500/30 rounded-2xl p-5 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4" />
                        3 Astuces de Croissance Rapide ("Growth Hacks")
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {plan.growthHacks.map((hack, i) => (
                          <div
                            key={i}
                            className="bg-stone-900/80 border border-stone-800 rounded-xl p-3 text-xs text-stone-300 leading-relaxed"
                          >
                            <span className="text-amber-400 font-bold block mb-1">
                              Astuce #{i + 1}
                            </span>
                            {hack}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: LEAN CANVAS */}
              {activeTab === 'canvas' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Problème */}
                    <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                        1. Problèmes Clés
                      </h4>
                      <ul className="space-y-1.5 text-xs text-stone-300">
                        {plan.leanCanvas.problem.map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-400">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solution */}
                    <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        2. Solutions Offertes
                      </h4>
                      <ul className="space-y-1.5 text-xs text-stone-300">
                        {plan.leanCanvas.solution.map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Proposition de valeur */}
                    <div className="bg-stone-950/60 border border-amber-500/30 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        3. Proposition Unique
                      </h4>
                      <p className="text-xs text-stone-200 leading-relaxed font-medium">
                        {plan.leanCanvas.uniqueValueProposition}
                      </p>
                    </div>

                    {/* Segments Clients */}
                    <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
                        4. Clients Idéaux
                      </h4>
                      <ul className="space-y-1.5 text-xs text-stone-300">
                        {plan.leanCanvas.customerSegments.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-sky-400">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Canaux d'acquisition */}
                    <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        5. Canaux d'Acquisition
                      </h4>
                      <ul className="space-y-1.5 text-xs text-stone-300">
                        {plan.leanCanvas.channels.map((ch, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-indigo-400">•</span>
                            <span>{ch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Avantage Injuste */}
                    <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                        6. Avantage Injuste
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {plan.leanCanvas.unfairAdvantage}
                      </p>
                    </div>

                    {/* Structure de coûts */}
                    <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-2 md:col-span-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        7. Coûts Incompressibles
                      </h4>
                      <ul className="space-y-1.5 text-xs text-stone-300">
                        {plan.leanCanvas.costStructure.map((cost, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-stone-500">•</span>
                            <span>{cost}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Flux de revenus */}
                    <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 space-y-2 md:col-span-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        8. Flux de Revenus & Monétisation
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                        {plan.leanCanvas.revenueStreams.map((rev, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">€</span>
                            <span>{rev}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PITCH & SCRIPTS */}
              {activeTab === 'pitch' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Elevator Pitch */}
                  <div className="bg-stone-950/60 border border-stone-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        Pitch Oral de 30 Secondes (Réseautage, Présentation)
                      </h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(plan.salesPitch.elevatorPitch);
                          setCopiedText(true);
                          setTimeout(() => setCopiedText(false), 2000);
                        }}
                        className="text-xs text-stone-400 hover:text-white flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier</span>
                      </button>
                    </div>
                    <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-200 leading-relaxed font-serif italic">
                      « {plan.salesPitch.elevatorPitch} »
                    </div>
                  </div>

                  {/* Outreach Message */}
                  <div className="bg-stone-950/60 border border-stone-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
                        Message d'Approche Directe (LinkedIn / Email à froid)
                      </h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(plan.salesPitch.outreachMessage);
                          setCopiedText(true);
                          setTimeout(() => setCopiedText(false), 2000);
                        }}
                        className="text-xs text-stone-400 hover:text-white flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier</span>
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 whitespace-pre-wrap font-sans leading-relaxed">
                      {plan.salesPitch.outreachMessage}
                    </pre>
                  </div>

                  {/* Objection Handling */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                      Gestion des 3 Objections Majeures
                    </h4>
                    <div className="space-y-3">
                      {plan.salesPitch.objectionHandling.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-stone-950/40 border border-stone-800 rounded-xl p-4 space-y-1.5"
                        >
                          <div className="text-xs font-bold text-amber-400">
                            Objection : « {item.objection} »
                          </div>
                          <p className="text-xs text-stone-300 leading-relaxed">
                            <span className="font-semibold text-emerald-400">Votre réponse : </span>
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CALCULATOR */}
              {activeTab === 'calculator' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-stone-950/60 border border-stone-800 rounded-2xl p-6 space-y-6">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Coins className="w-5 h-5 text-amber-400" />
                        Simulateur de Revenus pour : {idea.title}
                      </h4>
                      <p className="text-xs text-stone-400 mt-1">
                        Ajustez vos volumes et tarifs pour visualiser le potentiel mensuel et annuel selon votre temps ({profile.weeklyHours}).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-stone-300 font-semibold">Clients / Ventes par mois :</span>
                          <span className="text-amber-400 font-bold text-sm">{clientsPerMonth}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={30}
                          value={clientsPerMonth}
                          onChange={(e) => setClientsPerMonth(parseInt(e.target.value, 10))}
                          className="w-full accent-amber-400"
                        />
                        <div className="flex justify-between text-[11px] text-stone-500">
                          <span>1 client</span>
                          <span>15 clients</span>
                          <span>30 clients</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-stone-300 font-semibold">Prix moyen unitaire / forfait :</span>
                          <span className="text-amber-400 font-bold text-sm">{averagePrice} €</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={3000}
                          step={50}
                          value={averagePrice}
                          onChange={(e) => setAveragePrice(parseInt(e.target.value, 10))}
                          className="w-full accent-amber-400"
                        />
                        <div className="flex justify-between text-[11px] text-stone-500">
                          <span>50 €</span>
                          <span>1 500 €</span>
                          <span>3 000 €</span>
                        </div>
                      </div>
                    </div>

                    {/* Results Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-800">
                      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 text-center">
                        <div className="text-xs uppercase font-bold text-stone-400">
                          Chiffre d'Affaires Mensuel Estimé
                        </div>
                        <div className="text-3xl font-extrabold text-amber-400 mt-1">
                          {monthlyRev.toLocaleString('fr-FR')} € <span className="text-xs text-stone-400">/ mois</span>
                        </div>
                      </div>

                      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 text-center">
                        <div className="text-xs uppercase font-bold text-stone-400">
                          Chiffre d'Affaires Annuel Estimé
                        </div>
                        <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                          {yearlyRev.toLocaleString('fr-FR')} € <span className="text-xs text-stone-400">/ an</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4 text-xs text-stone-300">
                      💡 <span className="font-semibold text-amber-300">Rappel sur les marges :</span> Pour ce type d'activité de service produitisé ou digital, les coûts fixes sont minimes (en général &lt; 10% du CA). Vos gains réels sont donc très proches du chiffre d'affaires !
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
