import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Helper to get Gemini Client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Safe generate content with timeout
async function safeGenerateContent(ai: GoogleGenAI, options: any, timeoutMs = 8000): Promise<any> {
  const callPromise = ai.models.generateContent(options);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('AI generation timed out')), timeoutMs)
  );
  return Promise.race([callPromise, timeoutPromise]);
}

// Fallback generator when API key is missing or calls encounter limits
function generateFallbackAnalysis(profile: any) {
  const skillsStr = (profile.skills || []).join(', ') || 'polyvalence & créativité';
  const passionsStr = (profile.passions || []).join(', ') || 'innovation et autonomie';
  const hours = profile.weeklyHours || '10h/semaine';
  const budget = profile.budget || '< 1 000€';

  return {
    profileAnalysis: {
      archetype: "L'Architecte d'Offres Hybrides",
      archetypeTagline: `Un profil rare capable de combiner ${skillsStr.slice(0, 40)} avec une sensibilité pour ${passionsStr.slice(0, 35)}.`,
      superpowers: [
        `Capacité de synthèse rapide appliquée à ${skillsStr.split(',')[0] || 'vos compétences'}`,
        "Sens aigu de la valeur client et écoute empathique",
        `Agilité d'exécution optimale avec un format adapté à ${hours}`,
        "Création de solutions à haute marge sans investissement lourd"
      ],
      ikigaiSynthesis: {
        whatYouLove: `Ce qui vous anime au quotidien : ${passionsStr}`,
        whatYouAreGoodAt: `Vos atouts distinctifs : ${skillsStr}`,
        whatTheWorldNeeds: "Des solutions concrètes, simplifiées et immédiatement applicables par les pros et particuliers",
        whatYouCanBePaidFor: "Des accompagnements sur-mesure, des micro-systèmes et des produits à ROI mesurable"
      },
      strategicAdvantages: [
        "Positionnement sans friction de démarrage (démarrage à budget quasi nul)",
        "Modèle axé sur les compétences directes évitant les stocks physiques",
        "Différenciation forte par la personnalisation humaine vs outils génériques"
      ],
      potentialBlindspots: [
        "Vouloir perfectionner l'offre avant de faire le premier appel client",
        "Sous-tarifer ses premières prestations par syndrome de l'imposteur"
      ],
      readinessScore: 88
    },
    businessIdeas: [
      {
        id: "idea-1",
        title: "Studio de Micro-Systèmes Clé en Main",
        tagline: "Automatisez et simplifiez les opérations des indépendants et PME locales",
        category: "Productivité & Conseil B2B",
        creativityRating: 5,
        matchScore: 97,
        conceptDescription: `Concevez et installez des flux de travail automatisés et des tableaux de bord no-code pour des professionnels débordés. En capitalisant sur vos talents en ${skillsStr}, vous vendez un résultat concret plutôt que du temps passé.`,
        whyForYou: `Parfait pour votre budget (${budget}) et réalisable en ${hours}. Pas besoin de locaux ni d'équipe.`,
        monetization: {
          model: "Forfait d'implémentation (800€ à 1 800€) + Maintenance récurrente (150€/mois)",
          pricingExample: "Pack Audit & Setup Express : 1 200€",
          projectedMonthlyRevenueMonths3: "2 400€ - 3 600€",
          projectedMonthlyRevenueMonths12: "6 000€ - 8 500€"
        },
        initialBudgetRequired: "0€ à 150€ (logiciels existants, site vitrine gratuit)",
        first7DaysValidation: "Interviewez 3 indépendants de votre entourage sur leur tâche la plus chronophage et proposez de la régler manuellement pour 150€.",
        toolsNeeded: ["Notion", "Make / Zapier", "Google Workspace", "Loom"],
        difficultyLevel: "Intermédiaire",
        speedToFirstRevenue: "Moins de 14 jours"
      },
      {
        id: "idea-2",
        title: "Agence de Contenus Spécialisés & Curations Payantes",
        tagline: "Transformez votre veille et expertise métier en newsletters et dossiers à forte valeur",
        category: "Média & Formation",
        creativityRating: 4,
        matchScore: 92,
        conceptDescription: `Créez une ressource d'information bimensuelle ultra-pointue dans votre domaine de passion (${passionsStr}). Les professionnels et passionnés paient pour gagner du temps et obtenir des insights confidentiels.`,
        whyForYou: `S'intègre aisément dans vos créneaux du soir/weekend, valorise vos centres d'intérêt profonds.`,
        monetization: {
          model: "Abonnement mensuel privé (19€/mois/membre) + Sponsoring de marques ciblées",
          pricingExample: "100 abonnés à 19€ = 1 900€/mois récurrent",
          projectedMonthlyRevenueMonths3: "800€ - 1 500€",
          projectedMonthlyRevenueMonths12: "3 500€ - 5 500€"
        },
        initialBudgetRequired: "0€ (Substack ou Beehiiv gratuit)",
        first7DaysValidation: "Rédigez un récapitulatif de 3 pépites introuvables et partagez-le sur LinkedIn pour récolter 25 adresses emails qualifiées.",
        toolsNeeded: ["Substack / Beehiiv", "LinkedIn", "Canva"],
        difficultyLevel: "Facile",
        speedToFirstRevenue: "1 mois"
      },
      {
        id: "idea-3",
        title: "Service d'Onboarding & Accompagnement VIP 'Done-With-You'",
        tagline: "Guidez pas à pas vos clients vers un résultat garanti en 4 sessions intensives",
        category: "Coaching Opérationnel",
        creativityRating: 4,
        matchScore: 90,
        conceptDescription: `Plutôt que du coaching abstrait, proposez un atelier immersif individuel pour résoudre un problème critique dans la vie ou le métier de vos clients.`,
        whyForYou: `Plein contrôle sur votre calendrier : vous fixez les rendez-vous selon vos disponibilités (${hours}).`,
        monetization: {
          model: "Programme individuel 4 semaines : 750€ à 1 500€ par client",
          pricingExample: "3 clients par mois = 2 250€ à 4 500€",
          projectedMonthlyRevenueMonths3: "1 500€ - 3 000€",
          projectedMonthlyRevenueMonths12: "4 500€ - 7 000€"
        },
        initialBudgetRequired: "0€ (Visio, Calendly gratuit)",
        first7DaysValidation: "Publiez un post proposant un diagnostic offert de 20 minutes à 3 personnes avec recommandation personnalisée.",
        toolsNeeded: ["Google Meet", "Calendly", "Stripe"],
        difficultyLevel: "Intermédiaire",
        speedToFirstRevenue: "Moins de 14 jours"
      },
      {
        id: "idea-4",
        title: "Micro-Boutique de Produits Digitaux & Templates de Niche",
        tagline: "Créez une fois, vendez à l'infini avec 95% de marge nette",
        category: "E-Commerce Digital",
        creativityRating: 5,
        matchScore: 89,
        conceptDescription: `Concevez des modèles prêts à l'emploi (contrats types, templates de gestion, guides pratiques, prompts métiers) pour un public très ciblé relié à ${passionsStr}.`,
        whyForYou: `Asynchrone à 100%, idéal pour bâtir un flux de revenus passifs sans contrainte horaire directe.`,
        monetization: {
          model: "Ventes unitaires (29€ - 99€) + Pack bundle complet (149€)",
          pricingExample: "50 ventes/mois à 49€ = 2 450€ net",
          projectedMonthlyRevenueMonths3: "600€ - 1 200€",
          projectedMonthlyRevenueMonths12: "3 000€ - 6 000€"
        },
        initialBudgetRequired: "20€ à 50€",
        first7DaysValidation: "Créez une maquette ou version simplifiée du template et pré-vendez-la avec -50% à 5 contacts de confiance.",
        toolsNeeded: ["Gumroad / LemonSqueezy", "Figma ou Canva"],
        difficultyLevel: "Facile",
        speedToFirstRevenue: "1 mois"
      }
    ]
  };
}

// Fallback deep dive plan
function generateFallbackDeepDive(idea: any, profile: any) {
  const ideaTitle = idea?.title || "Votre Business";
  return {
    leanCanvas: {
      problem: [
        "Processus chronophages et manque de temps pour les clients cibles",
        "Solutions actuelles soit trop chères soit trop complexes",
        "Manque d'accompagnement humain pragmatique et rassurant"
      ],
      solution: [
        "Offre packagée claire avec livrable garanti",
        "Mise en place rapide en moins de 7 jours",
        "Support personnalisé et documentation limpide"
      ],
      uniqueValueProposition: `L'efficacité et la tranquillité d'esprit : ${idea?.tagline || "une solution sur-mesure"}.`,
      unfairAdvantage: "Approche ultra-personnalisée, réactivité et expertise combinée de terrain.",
      customerSegments: [
        "Indépendants et freelances saturés",
        "TPE et PME de 1 à 15 salariés",
        "Particuliers en transition cherchant une solution rapide"
      ],
      channels: [
        "Réseaux pro (LinkedIn, Twitter/X)",
        "Recommandations directes et bouche-à-oreille qualifié",
        "Partenariats croisés avec prestataires complémentaires"
      ],
      costStructure: [
        "Abonnements logiciels légers (< 60€/mois)",
        "Frais bancaires et transactions Stripe (~2%)",
        "Statut juridique / cotisations selon chiffre d'affaires effectif"
      ],
      revenueStreams: [
        "Prestations forfaitaires d'entrée de gamme",
        "Packs premium et accompagnement sur-mesure",
        "Abonnements mensuels de suivi / maintenance"
      ]
    },
    thirtyDayRoadmap: [
      {
        week: 1,
        title: "Validation terrain & Découverte",
        focus: "Confirmer la douleur et le besoin sans dépenser un centime",
        tasks: [
          "Lister 15 contacts idéaux correspondant à la cible",
          "Mener 5 interviews exploratoires sans rien vendre (comprendre leurs vrais blocages)",
          "Formuler une promesse irrésistible en une seule phrase",
          "Définir le tarif pilote (bêta-test) à prix préférentiel"
        ]
      },
      {
        week: 2,
        title: "Création de l'Offre & Supports Minimum",
        focus: "Rendre l'offre concrète et facile à acheter",
        tasks: [
          "Rédiger un PDF ou document Notion de présentation d'une page",
          "Configurer le moyen de paiement (Stripe ou virement bancaire)",
          "Préparer un modèle d'accord simple / devis clair",
          "Concevoir la trame de livraison de la prestation"
        ]
      },
      {
        week: 3,
        title: "Campagne Pilote & Premiers Clients",
        focus: "Signer le client n°1 et le client n°2",
        tasks: [
          "Contacter les personnes interviewées en semaine 1 avec l'offre pilote",
          "Publier 3 partages de valeur sur vos réseaux sociaux illustrant la solution",
          "Réaliser les premiers rendez-vous de découverte",
          "Encaisser le premier acompte"
        ]
      },
      {
        week: 4,
        title: "Livraison d'Excellence & Témoignages",
        focus: "Créer un effet 'Whaou' et amorcer le bouche-à-oreille",
        tasks: [
          "Délivrer la promesse avec 1 bonus inattendu",
          "Recueillir un témoignage vidéo ou écrit avec chiffres à l'appui",
          "Ajuster le prix vers le tarif régulier plus élevé",
          "Demander à chaque client satisfait 1 recommandation qualifiée"
        ]
      }
    ],
    salesPitch: {
      elevatorPitch: `J'aide les professionnels à ${idea?.tagline || 'gagner du temps'} grâce à ${ideaTitle}, sans les coûts d'une agence classique et avec des résultats visibles dès la première semaine.`,
      outreachMessage: `Bonjour [Prénom],\n\nJ'ai remarqué que beaucoup de [profession/secteur] perdent plusieurs heures par semaine sur [problème identifié].\n\nJ'ai développé une approche légère permettant de régler ça en quelques jours sans perturber votre activité.\n\nSeriez-vous ouvert à échanger 10 minutes cette semaine pour voir si cela pourrait vous soulager ?\n\nBien à vous,\n[Votre Nom]`,
      objectionHandling: [
        {
          objection: "C'est trop cher pour moi en ce moment.",
          answer: "Je comprends tout à fait. C'est justement conçu pour vous faire économiser ou rapporter 3x son coût dès le premier mois. Que diriez-vous de démarrer par le module express à coût réduit ?"
        },
        {
          objection: "Je n'ai pas le temps de m'en occuper.",
          answer: "C'est l'essence même de mon offre : 95% du travail est pris en charge par mes soins. Votre implication ne demande que 30 minutes au lancement."
        },
        {
          objection: "Je peux le faire moi-même.",
          answer: "Certainement ! Mais en combien de temps et avec quelle charge mentale ? Mon rôle est de vous éviter 3 semaines d'essais-erreurs."
        }
      ]
    },
    growthHacks: [
      "Offrir un micro-audit gratuit de 5 minutes sous forme de vidéo Loom personnalisée : taux de conversion supérieur à 40%",
      "Créer un partenariat gagnant-gagnant avec un prestataire non-concurrent touchant la même cible",
      "Proposer une garantie satisfait ou remboursé sous 14 jours pour faire sauter le moindre frein"
    ]
  };
}

// POST: /api/analyze-potential
app.post('/api/analyze-potential', async (req: Request, res: Response) => {
  const profile = req.body || {};

  try {
    const ai = getGeminiClient();
    if (!ai) {
      console.warn('No GEMINI_API_KEY available, using intelligent fallback analysis');
      return res.json(generateFallbackAnalysis(profile));
    }

    const prompt = `
Tu es un stratège business d'élite, coach en entrepreneuriat créatif et analyste de potentiel humain.
Ta mission est d'analyser le profil, les compétences uniques et les conditions réelles de vie d'une personne pour lui révéler son potentiel et inventer 4 idées de business CRÉATIVES, AUDACIEUSES, mais ULTRA-RÉALISTES et ADAPTÉES à ses contraintes.

Évite absolument les idées génériques ou éculées ("agence de dropshipping", "devenir influenceur", "faire du print-on-demand basique").
Propose des concepts originaux, hybrides, modernes (solopreneuriat, micro-agences, services produitisés, économie de la création, B2B haute valeur, micro-communautés, outils pratiques).

Voici les données de la personne :
- Compétences professionnelles / Hard skills : ${Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills || 'Non renseigné'}
- Talents relationnels & Soft skills : ${Array.isArray(profile.softSkills) ? profile.softSkills.join(', ') : profile.softSkills || 'Non renseigné'}
- Passions, centres d'intérêt, hobbies : ${Array.isArray(profile.passions) ? profile.passions.join(', ') : profile.passions || 'Non renseigné'}
- Budget financier de départ : ${profile.budget || 'Inférieur à 500€'}
- Temps disponible : ${profile.weeklyHours || '10h par semaine'}
- Mode de travail souhaité : ${profile.workStyle || '100% à distance / nomade'}
- Tolérance au risque : ${profile.riskTolerance || 'Modéré'}
- Objectif de revenus : ${profile.incomeGoal || '2 000€ - 4 000€ / mois'}
- Contexte additionnel / Parcours / Atouts : ${profile.additionalContext || 'Aucun'}

Génère une réponse STRICTEMENT au format JSON valide selon cette structure :
{
  "profileAnalysis": {
    "archetype": "Nom évocateur et valorisant du profil (ex: L'Architecte de Systèmes Hybrides, Le Catalyseur de Proximité, etc.)",
    "archetypeTagline": "Phrase percutante résumant la force de frappe de cette personne",
    "superpowers": ["3 ou 4 super-pouvoirs uniques résultant du croisement de ses compétences et passions"],
    "ikigaiSynthesis": {
      "whatYouLove": "Synthèse de ce qu'elle aime",
      "whatYouAreGoodAt": "Synthèse de ses talents prouvés",
      "whatTheWorldNeeds": "Ce dont le marché a besoin dans sa zone d'impact",
      "whatYouCanBePaidFor": "Ce pour quoi les clients paieront sans hésiter"
    },
    "strategicAdvantages": ["3 avantages comparatifs majeurs liés à sa situation"],
    "potentialBlindspots": ["2 pièges ou angles morts à surveiller"],
    "readinessScore": 88
  },
  "businessIdeas": [
    {
      "id": "idea-1",
      "title": "Nom de marque ou titre fort du business",
      "tagline": "Une phrase d'accroche irrésistible",
      "category": "ex: Micro-Conseil B2B / Service Produitisé / Média de Niche / Artisanat Digital",
      "creativityRating": 5,
      "matchScore": 96,
      "conceptDescription": "Description claire et innovante du service ou produit (3-4 phrases détaillées).",
      "whyForYou": "Explication sur-mesure de pourquoi c'est idéal compte tenu de ses compétences et de son temps/budget.",
      "monetization": {
        "model": "Modèle économique clair (forfait, abonnement, commission...)",
        "pricingExample": "Exemple de tarif appliqué",
        "projectedMonthlyRevenueMonths3": "Ex: 1 500€ - 2 500€",
        "projectedMonthlyRevenueMonths12": "Ex: 5 000€ - 8 000€"
      },
      "initialBudgetRequired": "Budget réel pour démarrer (ex: 50€, 300€)",
      "first7DaysValidation": "Action concrète et rapide pour tester la demande en 7 jours sans coder ni dépenser",
      "toolsNeeded": ["Nom d'outils concrets"],
      "difficultyLevel": "Facile | Intermédiaire | Avancé",
      "speedToFirstRevenue": "Moins de 14 jours | 1 mois | 2-3 mois"
    }
  ]
}
Fournis exactement 4 idées variées et captivantes en français.
`;

    const response = await safeGenerateContent(ai, {
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    }, 9000);

    const text = response.text || '';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating analysis with Gemini:', error);
    return res.json(generateFallbackAnalysis(profile));
  }
});

// POST: /api/deep-dive-plan
app.post('/api/deep-dive-plan', async (req: Request, res: Response) => {
  const { idea, profile } = req.body || {};

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json(generateFallbackDeepDive(idea, profile));
    }

    const prompt = `
Tu es un directeur de cabinet de stratégie startup et incubateur de haut niveau.
Génère le dossier d'exécution complet et ultra-précis pour lancer cette idée de business :

IDÉE SÉLECTIONNÉE :
Titre : ${idea?.title}
Tagline : ${idea?.tagline}
Description : ${idea?.conceptDescription}
Modèle : ${idea?.monetization?.model}
Budget de démarrage : ${idea?.initialBudgetRequired}

PROFIL DE L'ENTREPRENEUR :
Compétences : ${Array.isArray(profile?.skills) ? profile.skills.join(', ') : profile?.skills}
Temps disponible : ${profile?.weeklyHours || '10h/semaine'}
Budget : ${profile?.budget || '< 1 000€'}

Génère une réponse STRICTEMENT au format JSON avec cette structure :
{
  "leanCanvas": {
    "problem": ["3 problèmes urgents rencontrés par la cible"],
    "solution": ["3 solutions majeures apportées"],
    "uniqueValueProposition": "La proposition de valeur unique et différenciante",
    "unfairAdvantage": "L'avantage difficile à copier",
    "customerSegments": ["3 profils de clients idéaux précis"],
    "channels": ["3 canaux d'acquisition les plus rentables"],
    "costStructure": ["Les coûts incompressibles pour opérer"],
    "revenueStreams": ["Les sources exactes de revenus"]
  },
  "thirtyDayRoadmap": [
    {
      "week": 1,
      "title": "Titre semaine 1",
      "focus": "Objectif central",
      "tasks": ["4 tâches précises et actionnables"]
    },
    {
      "week": 2,
      "title": "Titre semaine 2",
      "focus": "Objectif central",
      "tasks": ["4 tâches précises et actionnables"]
    },
    {
      "week": 3,
      "title": "Titre semaine 3",
      "focus": "Objectif central",
      "tasks": ["4 tâches précises et actionnables"]
    },
    {
      "week": 4,
      "title": "Titre semaine 4",
      "focus": "Objectif central",
      "tasks": ["4 tâches précises et actionnables"]
    }
  ],
  "salesPitch": {
    "elevatorPitch": "Le pitch oral percutant de 30 secondes",
    "outreachMessage": "Le message type pour approcher un prospect en message direct (LinkedIn / Email / Instagram)",
    "objectionHandling": [
      {
        "objection": "C'est trop cher",
        "answer": "Réponse élégante et imparable"
      },
      {
        "objection": "Je n'ai pas le temps",
        "answer": "Réponse élégante et imparable"
      },
      {
        "objection": "Je dois y réfléchir",
        "answer": "Réponse élégante et imparable"
      }
    ]
  },
  "growthHacks": [
    "3 astuces de croissance non conventionnelles pour trouver des clients rapidement"
  ]
}
`;

    const response = await safeGenerateContent(ai, {
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    }, 9000);

    const parsed = JSON.parse(response.text || '');
    return res.json(parsed);
  } catch (error) {
    console.error('Error generating deep dive:', error);
    return res.json(generateFallbackDeepDive(idea, profile));
  }
});

// POST: /api/generate-sparks (Idées flash inattendues)
app.post('/api/generate-sparks', async (req: Request, res: Response) => {
  const { keyword1, keyword2, trend } = req.body || {};

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        sparks: [
          {
            title: `Service Hybride ${keyword1 || 'Créatif'} & ${keyword2 || 'Tech'}`,
            pitch: "Combiner l'analyse de données avec la narration émotionnelle pour doubler l'engagement des commerçants locaux.",
            firstStep: "Proposer un diagnostic pilote à 3 boutiques du quartier.",
            potential: "3 000€/mois"
          },
          {
            title: "Micro-Académie Privée Asynchrone",
            pitch: "Vendre des mini-défis audio de 5 minutes par jour sur Telegram ou WhatsApp avec abonnement récurrent.",
            firstStep: "Créer un canal gratuit de 20 personnes pour tester le format.",
            potential: "1 500€/mois récurrent"
          }
        ]
      });
    }

    const prompt = `
En tant qu'innovateur de modèles d'affaires, invente 3 micro-idées d'entreprise ultra-créatives et décalées qui croisent ces deux univers :
1. Domaine/Compétence A : "${keyword1 || 'Artisanat / Créativité'}"
2. Domaine/Compétence B : "${keyword2 || 'Nouvelles technologies / IA'}"
3. Tendance de fond : "${trend || 'Économie de la proximité et sobriété'}"

Format JSON attendu :
{
  "sparks": [
    {
      "title": "Nom accrocheur",
      "pitch": "En 2 phrases, l'idée novatrice et pourquoi c'est rentable",
      "firstStep": "L'action à 0€ pour tester en 48h",
      "potential": "Estimation de revenu mensuel atteignable"
    }
  ]
}
`;

    const response = await safeGenerateContent(ai, {
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    }, 6000);

    const parsed = JSON.parse(response.text || '');
    return res.json(parsed);
  } catch (err) {
    return res.json({
      sparks: [
        {
          title: "Audit Éclair & Transformation Express",
          pitch: "Une formule choc en demi-journée pour débloquer un goulot d'étranglement chez les pros.",
          firstStep: "Créer une fiche Notion et contacter 5 prospects chauds.",
          potential: "2 500€/mois"
        }
      ]
    });
  }
});

// Setup Vite middleware in dev or static serving in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.resolve(__dirname, 'dist'))
      ? path.resolve(__dirname, 'dist')
      : path.resolve(process.cwd(), 'dist');

    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      console.warn(`[WARN] Production dist directory not found at ${distPath}`);
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Propulse Business Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
