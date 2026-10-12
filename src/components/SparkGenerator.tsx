import React, { useState } from 'react';
import { SparkIdea, BusinessIdea } from '../types';
import { MASHUP_DOMAINS_1, MASHUP_DOMAINS_2 } from '../data/presets';
import { Sparkles, Shuffle, ArrowRight, Zap, CheckCircle2, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SparkGeneratorProps {
  onSaveSparkAsIdea: (spark: SparkIdea) => void;
}

export const SparkGenerator: React.FC<SparkGeneratorProps> = ({ onSaveSparkAsIdea }) => {
  const [domain1, setDomain1] = useState(MASHUP_DOMAINS_1[0]);
  const [domain2, setDomain2] = useState(MASHUP_DOMAINS_2[0]);
  const [trend, setTrend] = useState("Économie de la proximité & authenticité");
  const [sparks, setSparks] = useState<SparkIdea[]>([
    {
      title: "Studio de Recyclage & Restauration de Bois par IA",
      pitch: "Utiliser un modèle d'IA vision pour estimer la valeur de meubles anciens chinés et générer des plans de revalorisation vendus en kit.",
      firstStep: "Restaurer un meuble ce week-end et documenter le processus en vidéo de 45 secondes.",
      potential: "2 200€ / mois"
    },
    {
      title: "Club Privé : Micro-Retraites Urbaines Déconnectées",
      pitch: "Des après-midis sans téléphone dans des lieux secrets en ville pour créatifs en burn-out, avec ateliers de travail du bois et pleine conscience.",
      firstStep: "Créer une liste d'attente de 15 personnes sur WhatsApp et louer un atelier pour un samedi.",
      potential: "1 800€ par session mensuelle"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedTitles, setSavedTitles] = useState<Record<string, boolean>>({});

  const handleRandomize = () => {
    const rand1 = MASHUP_DOMAINS_1[Math.floor(Math.random() * MASHUP_DOMAINS_1.length)];
    const rand2 = MASHUP_DOMAINS_2[Math.floor(Math.random() * MASHUP_DOMAINS_2.length)];
    setDomain1(rand1);
    setDomain2(rand2);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-sparks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword1: domain1,
          keyword2: domain2,
          trend: trend,
        }),
      });
      const data = await res.json();
      if (data && data.sparks) {
        setSparks(data.sparks);
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.7 },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = (spark: SparkIdea) => {
    onSaveSparkAsIdea(spark);
    setSavedTitles((prev) => ({ ...prev, [spark.title]: true }));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 animate-fadeIn">
      {/* Intro */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Le Laboratoire d'Idées Flash & Mashup</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Provoquez des idées de business <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">hybrides et inattendues</span>
        </h2>
        <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto">
          Les opportunités les plus rentables naissent souvent au croisement improbable de deux compétences ou univers différents.
        </p>
      </div>

      {/* Control Box */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Domain 1 */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Univers ou Compétence A
            </label>
            <select
              value={domain1}
              onChange={(e) => setDomain1(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              {MASHUP_DOMAINS_1.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Domain 2 */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Levier ou Modèle B
            </label>
            <select
              value={domain2}
              onChange={(e) => setDomain2(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              {MASHUP_DOMAINS_2.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleRandomize}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-stone-700"
          >
            <Shuffle className="w-4 h-4" />
            <span>Combinaison aléatoire</span>
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                <span>Création de l'étincelle...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-stone-950" />
                <span>Fusionner et Générer l'Idée</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Sparks List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
          <Zap className="w-4 h-4 text-amber-400" />
          Concepts Hybrides Révélés
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sparks.map((spark, idx) => {
            const isSaved = !!savedTitles[spark.title];
            return (
              <div
                key={idx}
                className="bg-stone-900/60 border border-stone-800 hover:border-amber-400/40 rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-white text-base font-display">
                      {spark.title}
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-md whitespace-nowrap">
                      {spark.potential}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {spark.pitch}
                  </p>

                  <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-3 text-xs space-y-1">
                    <span className="font-semibold text-amber-400">
                      Test à 0€ en 48h :
                    </span>
                    <p className="text-stone-300 text-[11px]">
                      {spark.firstStep}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleSave(spark)}
                    disabled={isSaved}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                      isSaved
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : 'bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Enregistré dans vos favoris !</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Ajouter à mes idées retenues</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
