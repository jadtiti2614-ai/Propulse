import React, { useState } from 'react';
import { 
  UserProfile 
} from '../types';
import { 
  COMMON_HARD_SKILLS, 
  COMMON_SOFT_SKILLS, 
  COMMON_PASSIONS, 
  BUDGET_OPTIONS, 
  HOURS_OPTIONS, 
  WORKSTYLE_OPTIONS, 
  RISK_OPTIONS, 
  INCOME_GOALS,
  PRESET_PROFILES,
  PresetProfile
} from '../data/presets';
import { 
  Sparkles, 
  Check, 
  Plus, 
  X, 
  Clock, 
  Coins, 
  ShieldCheck, 
  Laptop, 
  User, 
  Wand2,
  HelpCircle,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

interface ProfileFormProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  setProfile,
  onAnalyze,
  isLoading,
}) => {
  const [customSkill, setCustomSkill] = useState('');
  const [customSoftSkill, setCustomSoftSkill] = useState('');
  const [customPassion, setCustomPassion] = useState('');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Quick preset loader
  const handleLoadPreset = (preset: PresetProfile) => {
    setProfile(preset.data);
  };

  const toggleArrayItem = (key: 'skills' | 'softSkills' | 'passions', item: string) => {
    setProfile((prev) => {
      const current = prev[key];
      const exists = current.includes(item);
      return {
        ...prev,
        [key]: exists ? current.filter((i) => i !== item) : [...current, item],
      };
    });
  };

  const addCustomItem = (key: 'skills' | 'softSkills' | 'passions', value: string, setter: (val: string) => void) => {
    if (!value.trim()) return;
    if (!profile[key].includes(value.trim())) {
      setProfile((prev) => ({
        ...prev,
        [key]: [...prev[key], value.trim()],
      }));
    }
    setter('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Hero Intro */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Diagnostic de Potentiel & Générateur Sur-Mesure</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Quel business créatif correspond à <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">vos conditions réelles ?</span>
        </h1>
        <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Ne copiez plus les modèles des autres. Analysons vos compétences, vos passions et vos contraintes (budget, temps, mode de vie) pour révéler votre business idéal.
        </p>

        {/* Quick presets bar */}
        <div className="pt-2">
          <div className="text-xs uppercase font-semibold text-stone-400 tracking-wider mb-2">
            Ou commencez avec un profil type en 1 clic :
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESET_PROFILES.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleLoadPreset(preset)}
                className="group flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-400/50 hover:bg-stone-850 text-xs text-stone-300 hover:text-white transition-all text-left"
              >
                <span className="font-semibold text-amber-300">{preset.name.split(' - ')[0]}</span>
                <span className="text-stone-400 hidden sm:inline text-[11px]">({preset.badge})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stepper Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-stone-800 pb-4">
        <button
          onClick={() => setStep(1)}
          className={`flex items-center space-x-2 p-3 rounded-xl border text-left transition-all ${
            step === 1
              ? 'bg-amber-400/10 border-amber-400/50 text-white shadow-sm'
              : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${step === 1 ? 'bg-amber-400 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
            1
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold truncate">Compétences</div>
            <div className="text-[11px] text-stone-400 truncate">{profile.skills.length + profile.softSkills.length} sélectionnées</div>
          </div>
        </button>

        <button
          onClick={() => setStep(2)}
          className={`flex items-center space-x-2 p-3 rounded-xl border text-left transition-all ${
            step === 2
              ? 'bg-amber-400/10 border-amber-400/50 text-white shadow-sm'
              : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${step === 2 ? 'bg-amber-400 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
            2
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold truncate">Passions & Moteurs</div>
            <div className="text-[11px] text-stone-400 truncate">{profile.passions.length} sélectionnées</div>
          </div>
        </button>

        <button
          onClick={() => setStep(3)}
          className={`flex items-center space-x-2 p-3 rounded-xl border text-left transition-all ${
            step === 3
              ? 'bg-amber-400/10 border-amber-400/50 text-white shadow-sm'
              : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${step === 3 ? 'bg-amber-400 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
            3
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold truncate">Contraintes de vie</div>
            <div className="text-[11px] text-stone-400 truncate">Budget, temps, lieu</div>
          </div>
        </button>

        <button
          onClick={() => setStep(4)}
          className={`flex items-center space-x-2 p-3 rounded-xl border text-left transition-all ${
            step === 4
              ? 'bg-amber-400/10 border-amber-400/50 text-white shadow-sm'
              : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${step === 4 ? 'bg-amber-400 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
            4
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold truncate">Objectifs & Contexte</div>
            <div className="text-[11px] text-stone-400 truncate">Revenus & ambitions</div>
          </div>
        </button>
      </div>

      {/* Main Form Body */}
      <div className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
        {/* STEP 1: SKILLS */}
        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-amber-400" />
                Vos compétences professionnelles & techniques (Hard Skills)
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                Quels sont les savoir-faire concrets que vous maîtrisez ou que vous avez déjà pratiqués ?
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {COMMON_HARD_SKILLS.map((skill) => {
                  const selected = profile.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleArrayItem('skills', skill)}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selected
                          ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white border border-stone-700/50'
                      }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add custom hard skill */}
              <div className="mt-3 flex items-center space-x-2 max-w-md">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomItem('skills', customSkill, setCustomSkill))}
                  placeholder="Ajouter une autre compétence spécifique..."
                  className="bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 flex-1"
                />
                <button
                  type="button"
                  onClick={() => addCustomItem('skills', customSkill, setCustomSkill)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs font-medium flex items-center gap-1 border border-stone-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Ajouter
                </button>
              </div>
            </div>

            <div className="border-t border-stone-800 pt-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                Vos qualités humaines & talents relationnels (Soft Skills)
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                La façon dont vous interagissez, votre méthode de travail et vos forces naturelles.
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {COMMON_SOFT_SKILLS.map((skill) => {
                  const selected = profile.softSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleArrayItem('softSkills', skill)}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selected
                          ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white border border-stone-700/50'
                      }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add custom soft skill */}
              <div className="mt-3 flex items-center space-x-2 max-w-md">
                <input
                  type="text"
                  value={customSoftSkill}
                  onChange={(e) => setCustomSoftSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomItem('softSkills', customSoftSkill, setCustomSoftSkill))}
                  placeholder="Ajouter une autre qualité..."
                  className="bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 flex-1"
                />
                <button
                  type="button"
                  onClick={() => addCustomItem('softSkills', customSoftSkill, setCustomSoftSkill)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs font-medium flex items-center gap-1 border border-stone-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Ajouter
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-750 text-white rounded-xl text-sm font-semibold flex items-center gap-2 border border-stone-700"
              >
                Suivant : Passions & Moteurs →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PASSIONS */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Ce qui vous passionne ou vous captive vraiment
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                De quoi pourriez-vous parler pendant des heures sans vous lasser ? Les meilleurs business naissent là où compétence et passion se croisent.
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {COMMON_PASSIONS.map((passion) => {
                  const selected = profile.passions.includes(passion);
                  return (
                    <button
                      key={passion}
                      type="button"
                      onClick={() => toggleArrayItem('passions', passion)}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selected
                          ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-white border border-stone-700/50'
                      }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      <span>{passion}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add custom passion */}
              <div className="mt-3 flex items-center space-x-2 max-w-md">
                <input
                  type="text"
                  value={customPassion}
                  onChange={(e) => setCustomPassion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomItem('passions', customPassion, setCustomPassion))}
                  placeholder="Ajouter une autre passion (ex: apiculture, crypto, cinéma...)"
                  className="bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 flex-1"
                />
                <button
                  type="button"
                  onClick={() => addCustomItem('passions', customPassion, setCustomPassion)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs font-medium flex items-center gap-1 border border-stone-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Ajouter
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-stone-400 hover:text-white text-sm"
              >
                ← Retour aux compétences
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-750 text-white rounded-xl text-sm font-semibold flex items-center gap-2 border border-stone-700"
              >
                Suivant : Vos contraintes réelles →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONSTRAINTS & REAL CONDITIONS */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                Vos conditions réelles de vie & contraintes
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                La clé du succès est d'adopter un modèle adapté à votre réalité (budget, charge horaire et tolérance au risque).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Budget */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-400" />
                  Budget financier disponible pour démarrer
                </label>
                <div className="space-y-1.5">
                  {BUDGET_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        profile.budget === opt
                          ? 'bg-amber-400/10 border-amber-400/50 text-white'
                          : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={opt}
                        checked={profile.budget === opt}
                        onChange={() => setProfile((p) => ({ ...p, budget: opt }))}
                        className="mr-3 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Temps que vous pouvez investir
                </label>
                <div className="space-y-1.5">
                  {HOURS_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        profile.weeklyHours === opt
                          ? 'bg-amber-400/10 border-amber-400/50 text-white'
                          : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hours"
                        value={opt}
                        checked={profile.weeklyHours === opt}
                        onChange={() => setProfile((p) => ({ ...p, weeklyHours: opt }))}
                        className="mr-3 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Workstyle */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-amber-400" />
                  Format de travail privilégié
                </label>
                <div className="space-y-1.5">
                  {WORKSTYLE_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        profile.workStyle === opt
                          ? 'bg-amber-400/10 border-amber-400/50 text-white'
                          : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="workstyle"
                        value={opt}
                        checked={profile.workStyle === opt}
                        onChange={() => setProfile((p) => ({ ...p, workStyle: opt }))}
                        className="mr-3 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Risk tolerance */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  Tolérance au risque & délai d'encaissement
                </label>
                <div className="space-y-1.5">
                  {RISK_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        profile.riskTolerance === opt
                          ? 'bg-amber-400/10 border-amber-400/50 text-white'
                          : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="risk"
                        value={opt}
                        checked={profile.riskTolerance === opt}
                        onChange={() => setProfile((p) => ({ ...p, riskTolerance: opt }))}
                        className="mr-3 text-amber-400 focus:ring-amber-400"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-stone-400 hover:text-white text-sm"
              >
                ← Retour aux passions
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-750 text-white rounded-xl text-sm font-semibold flex items-center gap-2 border border-stone-700"
              >
                Suivant : Objectifs & Lancement →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GOALS & CONTEXT & SUBMIT */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                Votre ambition financière & Contexte personnel
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                Précisez ce que vous visez pour orienter les idées vers la bonne intensité commerciale.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Objectif de gains visé
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {INCOME_GOALS.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setProfile((p) => ({ ...p, incomeGoal: goal }))}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      profile.incomeGoal === goal
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                        : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Racontez votre parcours, vos atouts spécifiques ou vos doutes (facultatif mais puissant)
              </label>
              <textarea
                rows={4}
                value={profile.additionalContext}
                onChange={(e) => setProfile((p) => ({ ...p, additionalContext: e.target.value }))}
                placeholder="Exemple : J'ai 5 ans d'expérience en logistique mais je rêve de lancer une marque éco-responsable. J'ai un bon ordinateur, un réseau de collègues dans l'industrie, mais peur de me vendre..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Resume pills */}
            <div className="bg-stone-950/80 rounded-xl p-4 border border-stone-800/80 text-xs space-y-2">
              <div className="font-semibold text-stone-300 uppercase tracking-wider text-[11px]">
                Récapitulatif de vos paramètres :
              </div>
              <div className="flex flex-wrap gap-2 text-stone-400">
                <span className="text-amber-400 font-medium">Compétences :</span> {profile.skills.length > 0 ? profile.skills.join(', ') : 'Aucune renseignée'}
                <span className="text-stone-600">|</span>
                <span className="text-amber-400 font-medium">Budget :</span> {profile.budget}
                <span className="text-stone-600">|</span>
                <span className="text-amber-400 font-medium">Temps :</span> {profile.weeklyHours}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 text-stone-400 hover:text-white text-sm"
              >
                ← Modifier mes contraintes
              </button>

              <button
                type="button"
                onClick={onAnalyze}
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    <span>Analyse de votre potentiel en cours...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Révéler mon Potentiel & Trouver mes Business</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
