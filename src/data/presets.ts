import { UserProfile } from '../types';

export const COMMON_HARD_SKILLS = [
  "Gestion de projet",
  "Rédaction & Copywriting",
  "Design graphique & UI",
  "Développement web / No-code",
  "Comptabilité & Gestion",
  "Vente & Négociation B2B",
  "Marketing digital & Réseaux sociaux",
  "Pédagogie & Formation",
  "Montage vidéo & Création audio",
  "Logistique & E-commerce",
  "Bricolage & Artisanat",
  "Coaching sportif & Nutrition",
  "Droit & Contrats",
  "Relation client & Support",
  "Traduction & Langues",
  "Data & Tableaux Excel/Notion",
];

export const COMMON_SOFT_SKILLS = [
  "Écoute active & Empathie",
  "Résolution de conflits",
  "Rigueur & Organisation",
  "Créativité & Storytelling",
  "Capacité de vulgarisation",
  "Adaptabilité rapide",
  "Leadership & Mobilisation",
  "Patience & Diplomatie",
  "Sens de l'esthétique",
  "Persévérance & Résilience",
];

export const COMMON_PASSIONS = [
  "Productivité & Organisation personelle",
  "Santé, sport & Longévité",
  "Écologie & Zéro déchet",
  "Psychologie & Développement personnel",
  "Gastronomie & Cuisine artisanale",
  "Voyages & Nomadisme",
  "Art, illustration & Design",
  "Technologies & Intelligence Artificielle",
  "Animaux & Soins animaliers",
  "Finances personnelles & Investissement",
  "Architecture & Décoration d'intérieur",
  "Parentalité & Enfance",
];

export const BUDGET_OPTIONS = [
  "0€ - 200€ (Bootstrap total, zéro risque)",
  "200€ - 1 000€ (Petit budget outillage/site)",
  "1 000€ - 5 000€ (Capital d'amorçage modéré)",
  "5 000€ - 20 000€+ (Investissement significatif)",
];

export const HOURS_OPTIONS = [
  "5 à 10h / semaine (Side-project en soirée / weekend)",
  "15 à 20h / semaine (Mi-temps dédié)",
  "35h+ / semaine (Plein temps immédiat)",
];

export const WORKSTYLE_OPTIONS = [
  "100% à distance & Nomade digital",
  "Local & Physique (commerces, proximité, terrain)",
  "Hybride (remote + rencontres clients ponctuelles)",
  "Atelier / Artisanal / Manuel",
];

export const RISK_OPTIONS = [
  "Très prudent (Rentabilité rapide, zéro stock, coûts fixes nuls)",
  "Équilibré (Investissement de temps, validation progressive)",
  "Audacieux (Grand potentiel de croissance & scalabilité)",
];

export const INCOME_GOALS = [
  "Complément de revenus (500€ - 1 500€ / mois)",
  "Remplacement de salaire (2 500€ - 4 500€ / mois)",
  "Ambition élevée (6 000€ - 12 000€+ / mois)",
];

export interface PresetProfile {
  id: string;
  name: string;
  description: string;
  badge: string;
  data: UserProfile;
}

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: "preset-salaried",
    name: "Alexandre - Cadre en reconversion",
    description: "Salarié avec bon bagage d'organisation, peu de temps le soir mais forte rigueur.",
    badge: "Side-Project 8h/sem",
    data: {
      skills: ["Gestion de projet", "Data & Tableaux Excel/Notion", "Comptabilité & Gestion"],
      softSkills: ["Rigueur & Organisation", "Capacité de vulgarisation", "Adaptabilité rapide"],
      passions: ["Productivité & Organisation personelle", "Finances personnelles & Investissement"],
      budget: "200€ - 1 000€ (Petit budget outillage/site)",
      weeklyHours: "5 à 10h / semaine (Side-project en soirée / weekend)",
      workStyle: "100% à distance & Nomade digital",
      riskTolerance: "Très prudent (Rentabilité rapide, zéro stock, coûts fixes nuls)",
      incomeGoal: "Complément de revenus (500€ - 1 500€ / mois)",
      additionalContext: "Cadre depuis 8 ans, je veux créer une source de revenus autonome sans démissionner dans l'immédiat."
    }
  },
  {
    id: "preset-creative",
    name: "Léa - Créative sans capital",
    description: "Talents visuels et d'écriture, zéro budget de départ, passionnée par l'éco-responsabilité.",
    badge: "Bootstrap 0€",
    data: {
      skills: ["Design graphique & UI", "Rédaction & Copywriting", "Marketing digital & Réseaux sociaux"],
      softSkills: ["Sens de l'esthétique", "Créativité & Storytelling", "Écoute active & Empathie"],
      passions: ["Écologie & Zéro déchet", "Art, illustration & Design"],
      budget: "0€ - 200€ (Bootstrap total, zéro risque)",
      weeklyHours: "15 à 20h / semaine (Mi-temps dédié)",
      workStyle: "100% à distance & Nomade digital",
      riskTolerance: "Équilibré (Investissement de temps, validation progressive)",
      incomeGoal: "Remplacement de salaire (2 500€ - 4 500€ / mois)",
      additionalContext: "Graphiste freelance frustrée par les missions sous-payées, je veux un modèle de produit ou d'abonnement récurrent."
    }
  },
  {
    id: "preset-field",
    name: "Marc - Commercial de terrain",
    description: "Aisance relationnelle phénoménale, cherche un business local rentable rapidement.",
    badge: "Plein temps / Local",
    data: {
      skills: ["Vente & Négociation B2B", "Relation client & Support", "Logistique & E-commerce"],
      softSkills: ["Persévérance & Résilience", "Leadership & Mobilisation", "Écoute active & Empathie"],
      passions: ["Gastronomie & Cuisine artisanale", "Technologies & Intelligence Artificielle"],
      budget: "1 000€ - 5 000€ (Capital d'amorçage modéré)",
      weeklyHours: "35h+ / semaine (Plein temps immédiat)",
      workStyle: "Hybride (remote + rencontres clients ponctuelles)",
      riskTolerance: "Audacieux (Grand potentiel de croissance & scalabilité)",
      incomeGoal: "Ambition élevée (6 000€ - 12 000€+ / mois)",
      additionalContext: "Ancien responsable commercial terrain, j'adore le contact direct et signer des contrats."
    }
  },
  {
    id: "preset-coach",
    name: "Sarah - Pédagogue & Maman",
    description: "Sens du partage, cherche un modèle flexible respectant son rythme de vie familial.",
    badge: "Temps flexible",
    data: {
      skills: ["Pédagogie & Formation", "Coaching sportif & Nutrition", "Montage vidéo & Création audio"],
      softSkills: ["Patience & Diplomatie", "Écoute active & Empathie", "Capacité de vulgarisation"],
      passions: ["Parentalité & Enfance", "Santé, sport & Longévité", "Psychologie & Développement personnel"],
      budget: "0€ - 200€ (Bootstrap total, zéro risque)",
      weeklyHours: "5 à 10h / semaine (Side-project en soirée / weekend)",
      workStyle: "100% à distance & Nomade digital",
      riskTolerance: "Très prudent (Rentabilité rapide, zéro stock, coûts fixes nuls)",
      incomeGoal: "Complément de revenus (500€ - 1 500€ / mois)",
      additionalContext: "Je veux aider les parents épuisés à retrouver de l'énergie avec des micro-programmes faciles à suivre."
    }
  }
];

export const MASHUP_DOMAINS_1 = [
  "Menuiserie & Bois",
  "Psychologie & Émotions",
  "Cuisine & Pâtisserie",
  "Gestion du sommeil",
  "Jardinage urbain",
  "Comptabilité & Factures",
  "Mode vintage & Seconde main",
  "Éducation canine",
  "Organisation d'espaces / Désencombrement"
];

export const MASHUP_DOMAINS_2 = [
  "Intelligence Artificielle & Automatisation",
  "Abonnement récurrent mensuel (SaaS / Box)",
  "Micro-communautés payantes",
  "Contenus courts & Vidéos virales",
  "B2B Grands comptes & PME",
  "Templates Notion & Outils No-Code",
  "Événements immersifs & Ateliers flash",
  "Services à domicile haut de gamme"
];
