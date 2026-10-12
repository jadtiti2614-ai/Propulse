export interface UserProfile {
  skills: string[];
  softSkills: string[];
  passions: string[];
  budget: string;
  weeklyHours: string;
  workStyle: string;
  riskTolerance: string;
  incomeGoal: string;
  additionalContext: string;
}

export interface IkigaiData {
  whatYouLove: string;
  whatYouAreGoodAt: string;
  whatTheWorldNeeds: string;
  whatYouCanBePaidFor: string;
}

export interface ProfileAnalysis {
  archetype: string;
  archetypeTagline: string;
  superpowers: string[];
  ikigaiSynthesis: IkigaiData;
  strategicAdvantages: string[];
  potentialBlindspots: string[];
  readinessScore: number;
}

export interface MonetizationModel {
  model: string;
  pricingExample: string;
  projectedMonthlyRevenueMonths3: string;
  projectedMonthlyRevenueMonths12: string;
}

export interface BusinessIdea {
  id: string;
  title: string;
  tagline: string;
  category: string;
  creativityRating: number; // 1-5
  matchScore: number; // 0-100
  conceptDescription: string;
  whyForYou: string;
  monetization: MonetizationModel;
  initialBudgetRequired: string;
  first7DaysValidation: string;
  toolsNeeded: string[];
  difficultyLevel: 'Facile' | 'Intermédiaire' | 'Avancé' | string;
  speedToFirstRevenue: 'Moins de 14 jours' | '1 mois' | '2-3 mois' | string;
}

export interface LeanCanvas {
  problem: string[];
  solution: string[];
  uniqueValueProposition: string;
  unfairAdvantage: string;
  customerSegments: string[];
  channels: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export interface RoadmapWeek {
  week: number;
  title: string;
  focus: string;
  tasks: string[];
}

export interface SalesPitch {
  elevatorPitch: string;
  outreachMessage: string;
  objectionHandling: Array<{
    objection: string;
    answer: string;
  }>;
}

export interface DeepDivePlan {
  leanCanvas: LeanCanvas;
  thirtyDayRoadmap: RoadmapWeek[];
  salesPitch: SalesPitch;
  growthHacks: string[];
}

export interface SparkIdea {
  title: string;
  pitch: string;
  firstStep: string;
  potential: string;
}
