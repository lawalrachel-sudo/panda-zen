import React, { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════
// PANDA ZEN — APP COMPLÈTE v2
// Intégration MODULE BREATHING V8
// 17/02/2026
// ═══════════════════════════════════════

// PNG pandas transparents dans /images/
const pi = (file, alt) => <img src={`/images/${file}`} alt={alt} className="panda-icon" loading="lazy" />;
const P = {
  logo:      pi('ORIGINAL.png', 'Panda Zen'),
  original:  pi('ORIGINAL.png', 'Panda'),
  hello:     pi('main_bonjour_bouche_ouverte.png', 'Hello'),
  breathe:   pi('souffle.png', 'Respire'),
  cards:     pi('Cartes.png', 'Cartes'),
  water:     pi('bois_de_leau.png', 'Eau'),
  mirror:    pi('miroir_positif.png', 'Miroir'),
  mirrorNeg: pi('miroir_ne_gatif.png', 'Miroir négatif'),
  relax:     pi('Relax.png', 'Relax'),
  meditate:  pi('me_ditant.png', 'Méditation'),
  thumbsUp:  pi('pouce_v2.png', 'Bravo'),
  couple:    pi('Relationnel.png', 'Relations'),
  galets:    pi('GALET_SEUL.png', 'Galet'),
  envelope:  pi('enveloppe.png', 'Enveloppe'),
  mudra:     pi('galets_zen_.png', 'Mudrâ'),
  bambou:    pi('HOME_bambou.png', 'Accueil'),
  pandaGalet: pi('panda_et_galet_gagne_.png', 'Galet gagné'),
  // BADGES PROFILS BREATHING
  badgeFeu: pi('BADGE_FEU.png', 'Feu'),
  badgeFeuEq: pi('Badge_FEU__equilibre_.png', 'Feu Équilibre'),
  badgeEau: pi('BAdge_eau.png', 'Eau'),
  badgeBois: pi('Mange.png', 'Bois'),
  badgeTerre: pi('Badge_TERRE.png', 'Terre'),
  badgeMetal: pi('Badge_METAL.png', 'Métal'),
  // ÉLÉMENTS
  elemFeu: pi('e_le_ment_feu.png', 'Élément Feu'),
  elemEau: pi('e_le_ment_eau.png', 'Élément Eau'),
  elemBois: pi('e_le_ment_bois.png', 'Élément Bois'),
  elemTerre: pi('e_le_ment_terre.png', 'Élément Terre'),
  elemMetal: pi('e_le_ment_me_tal.png', 'Élément Métal'),
};

// ═══════════════════════════════════════
// DONNÉES BREATHING — 18 EXERCICES
// ═══════════════════════════════════════
const BREATHING_DATA = {
  A: {
    id: "A",
    emoji: "🌊",
    label: "CALMER",
    element: "FEU 🔥",
    besoin: "Lâcher, ralentir",
    badge: P.badgeFeu,
    elemIcon: P.elemFeu,
    color: "#d35400",
    exercises: [
      {
        id: "M1a",
        name: "Soupir Cyclique",
        subtitle: "Double inspir + longue expir",
        principe: "Double inspiration courte + 1 longue expiration",
        duration: "1-5 min",
        steps: [
          { phase: "Inspir nez", time: 1, desc: "Court, remplir moitié poumons" },
          { phase: "Inspir nez", time: 2, desc: "Compléter, poumons pleins" },
          { phase: "Expir bouche", time: 6, desc: "Lent, joues légèrement gonflées" }
        ],
        reps: "En continu pendant la durée choisie",
        position: "Assis ou debout, yeux ouverts ou fermés",
        source: "Balban et al. (2023), Cell Reports Medicine, Stanford University — Le soupir cyclique surpasse la méditation pour l'amélioration de l'humeur (p<0.05)."
      },
      {
        id: "M1b",
        name: "Respiration 4-7-8",
        subtitle: "Inspir court, rétention longue, expir très longue",
        principe: "Inspir court, rétention longue, expir très longue",
        duration: "1-3 min",
        steps: [
          { phase: "Inspir nez", time: 4, desc: "Remplir les poumons" },
          { phase: "Rétention", time: 7, desc: "Poumons pleins, retenir" },
          { phase: "Expir bouche", time: 8, desc: "Son 'whoosh' léger" }
        ],
        reps: "4 cycles pour débuter, jusqu'à 8 cycles avec pratique",
        position: "Assis, bout de la langue derrière incisives supérieures",
        source: "Dr Andrew Weil, MD (University of Arizona) — Recommandée NHS UK pour anxiété et aide à l'endormissement."
      },
      {
        id: "M1c",
        name: "Expiration Prolongée",
        subtitle: "Expir = double de l'inspir",
        principe: "Expiration = double de l'inspiration",
        duration: "2-5 min",
        steps: [
          { phase: "Inspir nez", time: 4, desc: "Remplir naturellement" },
          { phase: "Expir nez/bouche", time: 8, desc: "Doucement, laisser aller" }
        ],
        reps: "En continu pendant la durée choisie",
        position: "Assis, allongé ou debout",
        source: "Principe fondamental cohérence cardiaque (HeartMath Institute) — Active le nerf vague et le système parasympathique."
      }
    ]
  },
  B: {
    id: "B",
    emoji: "⚖️",
    label: "ÉQUILIBRER",
    element: "FEU 🔥",
    besoin: "Structure, cadre",
    badge: P.badgeFeuEq,
    elemIcon: P.elemFeu,
    color: "#d35400",
    exercises: [
      {
        id: "M2a",
        name: "Box Breathing",
        subtitle: "Respiration Carrée — 4 temps égaux",
        principe: "4 temps strictement égaux (carré parfait)",
        duration: "2-5 min",
        steps: [
          { phase: "Inspir nez", time: 4, desc: "Remplir les poumons" },
          { phase: "Rétention", time: 4, desc: "Poumons pleins" },
          { phase: "Expir nez", time: 4, desc: "Vider les poumons" },
          { phase: "Rétention", time: 4, desc: "Poumons vides" }
        ],
        reps: "5 à 10 cycles (1 cycle = 16s)",
        position: "Assis, dos droit, mains sur cuisses",
        source: "Utilisé par US Navy SEALs (Mark Divine) — Effet stabilisant des ratios égaux confirmé (HeartMath)."
      },
      {
        id: "M2b",
        name: "Cohérence Cardiaque 5-5",
        subtitle: "Ratio 1:1 strict, 6 respirations/min",
        principe: "Ratio 1:1 strict, 6 respirations par minute",
        duration: "5 min",
        steps: [
          { phase: "Inspir nez", time: 5, desc: "Régulier et fluide" },
          { phase: "Expir nez/bouche", time: 5, desc: "Régulier et fluide" }
        ],
        reps: "30 cycles = 5 min (idéalement 3×/jour)",
        position: "Assis, relaxé",
        source: "Dr David O'Hare 'Cohérence Cardiaque 365' (2012), HeartMath Institute — Baisse cortisol, effet anxiolytique."
      },
      {
        id: "M2c",
        name: "Respiration Comptée Progressive",
        subtitle: "Comptage croissant = ancrage attention",
        principe: "Comptage mental croissant = ancrage attention",
        duration: "2-5 min",
        steps: [
          { phase: "Cycle 1", time: 2, desc: "Inspir 2s → Expir 2s" },
          { phase: "Cycle 2", time: 3, desc: "Inspir 3s → Expir 3s" },
          { phase: "Cycle 3", time: 4, desc: "Inspir 4s → Expir 4s" },
          { phase: "Cycle 4", time: 5, desc: "Inspir 5s → Expir 5s" },
          { phase: "Cycle 5", time: 6, desc: "Inspir 6s → Expir 6s" },
          { phase: "Redescendre", time: 0, desc: "5s… 4s… 3s… 2s" }
        ],
        reps: "1 montée + 1 descente = 1 série. 2-3 séries",
        position: "Assis ou allongé",
        source: "Tradition méditative (Vipassana, Zen) — Adapté aux profils ayant besoin de cadre."
      }
    ]
  },
  E: {
    id: "E",
    emoji: "⚡",
    label: "ÉNERGISER",
    element: "EAU 💧",
    besoin: "Faire circuler",
    badge: P.badgeEau,
    elemIcon: P.elemEau,
    color: "#3498db",
    exercises: [
      {
        id: "M3a",
        name: "Bhastrika",
        subtitle: "Soufflet du forgeron",
        principe: "Inspirations et expirations rapides et puissantes",
        duration: "1-3 min",
        steps: [
          { phase: "Phase 1", time: 25, desc: "25 inspir/expir rapides nez (≈1/sec)" },
          { phase: "Inspir profonde", time: 3, desc: "1 inspir profonde nez" },
          { phase: "Rétention", time: 20, desc: "Retenir 15-30s selon niveau" },
          { phase: "Expir lente", time: 5, desc: "1 expir lente nez" },
          { phase: "Repos", time: 30, desc: "30s repos → répéter" }
        ],
        reps: "3 rounds",
        position: "Assis dos droit, mains sur genoux",
        precaution: "⚠️ Ne pas pratiquer si grossesse, hypertension, épilepsie.",
        source: "Hatha Yoga Pradipika — Études PMC confirment activation sympathique et libération d'adrénaline."
      },
      {
        id: "M3b",
        name: "Kapalabhati",
        subtitle: "Crâne Brillant — Expir actives",
        principe: "Expirations saccadées actives, inspirations passives",
        duration: "1-3 min",
        steps: [
          { phase: "Expir nez", time: 0.5, desc: "Rapide, sec, abdomen rentre" },
          { phase: "Inspir nez", time: 0.5, desc: "Passive, automatique" },
          { phase: "Série", time: 0, desc: "30 expir → pause → inspir profonde → rétention 15s" }
        ],
        reps: "3 rounds de 30",
        position: "Assis dos droit",
        precaution: "⚠️ Mêmes précautions que Bhastrika. Plus doux.",
        source: "Hatha Yoga Pradipika — Amélioration capacité pulmonaire et éveil mental (PMC)."
      },
      {
        id: "M3c",
        name: "Respiration Dynamisante",
        subtitle: "Souffle + mouvement",
        principe: "Synchroniser souffle et geste pour activer circulation",
        duration: "1-2 min",
        steps: [
          { phase: "Inspir nez (2s)", time: 2, desc: "Debout, bras montent au-dessus tête" },
          { phase: "Expir bouche (2s)", time: 2, desc: "Bras redescendent" },
          { phase: "Accélérer", time: 0, desc: "Inspir 1s / Expir 1s, 10-20 fois" },
          { phase: "Terminer", time: 0, desc: "Inspir profonde → rétention 5s → expir lente" }
        ],
        reps: "1-2 séries",
        position: "Debout obligatoirement",
        source: "Qi gong et yoga dynamique — Mouvement + souffle = activation circulatoire."
      }
    ]
  },
  F: {
    id: "F",
    emoji: "🔄",
    label: "PURIFIER / RÉVÉLER",
    element: "BOIS 🌳",
    besoin: "Libérer, révéler",
    badge: P.badgeBois,
    elemIcon: P.elemBois,
    color: "#27ae60",
    exercises: [
      {
        id: "M4a",
        name: "Nadi Shodhana",
        subtitle: "Narines Alternées",
        principe: "Alternance narine gauche ↔ droite = équilibre hémisphères",
        duration: "3-5 min",
        steps: [
          { phase: "Fermer D", time: 4, desc: "Inspir narine G 4s" },
          { phase: "Fermer G", time: 2, desc: "Rétention 2s" },
          { phase: "Ouvrir D", time: 6, desc: "Expir narine D 6s" },
          { phase: "Inspir D", time: 4, desc: "Inspir narine D 4s" },
          { phase: "Fermer D", time: 2, desc: "Rétention 2s" },
          { phase: "Ouvrir G", time: 6, desc: "Expir narine G 6s" }
        ],
        reps: "5 à 10 cycles complets (G→D→G)",
        position: "Assis dos droit",
        source: "Pranayama classique (Yoga Sutras) — Équilibrage système nerveux confirmé (PMC)."
      },
      {
        id: "M4b",
        name: "Respiration 3 Parties",
        subtitle: "Dirga Pranayama",
        principe: "Remplissage complet progressif",
        duration: "3-5 min",
        steps: [
          { phase: "Partie 1", time: 3, desc: "Inspir → ventre gonfle (3s)" },
          { phase: "Partie 2", time: 2, desc: "Continuer → cage thoracique (2s)" },
          { phase: "Partie 3", time: 1, desc: "Terminer → haut poitrine (1s)" },
          { phase: "Expir", time: 8, desc: "Expir lente inverse : haut → milieu → bas (8s)" }
        ],
        reps: "5 à 8 cycles",
        position: "Assis ou allongé",
        source: "Yoga classique (Dirga = 'long/complet') — Technique fondamentale."
      },
      {
        id: "M4c",
        name: "Sithali",
        subtitle: "Souffle Rafraîchissant",
        principe: "Inspir bouche (langue enroulée), expir nez",
        duration: "2-3 min",
        steps: [
          { phase: "Inspir bouche", time: 4, desc: "Langue en U, sensation fraîche (4s)" },
          { phase: "Fermer bouche", time: 0, desc: "Fermer la bouche" },
          { phase: "Expir nez", time: 6, desc: "Expir nez 6s" }
        ],
        reps: "5 à 10 cycles",
        position: "Assis",
        precaution: "⚠️ ~35% ne peuvent enrouler la langue. Alternative : Sitkari (dents serrées).",
        source: "Hatha Yoga Pradipika — Effet rafraîchissant documenté."
      }
    ]
  },
  C: {
    id: "C",
    emoji: "🌍",
    label: "ANCRER / PROFONDEUR",
    element: "TERRE 🌍",
    besoin: "Profondeur",
    badge: P.badgeTerre,
    elemIcon: P.elemTerre,
    color: "#8b7355",
    exercises: [
      {
        id: "M5a",
        name: "Respiration Abdominale",
        subtitle: "Diaphragmatique",
        principe: "Respirer exclusivement par le ventre",
        duration: "3-5 min",
        steps: [
          { phase: "Inspir nez", time: 5, desc: "Ventre gonfle, poitrine immobile (5s)" },
          { phase: "Expir nez", time: 6, desc: "Ventre rentre doucement (6s)" }
        ],
        reps: "En continu pendant la durée choisie",
        position: "Assis ou allongé (allongé = plus facile)",
        source: "American Lung Association — Optimise oxygénation. NHS UK recommandée pour anxiété."
      },
      {
        id: "M5b",
        name: "Respiration en Vague",
        subtitle: "Body Scan Breath",
        principe: "Visualisation vague traversant le corps",
        duration: "3-5 min",
        steps: [
          { phase: "Inspir nez (5s)", time: 5, desc: "Vague monte : pieds → tête" },
          { phase: "Temps plein (2s)", time: 2, desc: "Vague au sommet" },
          { phase: "Expir nez (5s)", time: 5, desc: "Vague redescend : tête → pieds" },
          { phase: "Temps vide (2s)", time: 2, desc: "Vague se retire" }
        ],
        reps: "5 à 8 cycles",
        position: "Allongé de préférence",
        source: "Sophrologie (Alfonso Caycedo) + MBSR (Jon Kabat-Zinn) — Souffle + visualisation."
      },
      {
        id: "M5c",
        name: "Respiration Enracinement",
        subtitle: "Grounding Breath",
        principe: "Visualisation racines + connexion terre",
        duration: "2-3 min",
        steps: [
          { phase: "Inspir nez (4s)", time: 4, desc: "Énergie monte : pieds → colonne" },
          { phase: "Rétention (2s)", time: 2, desc: "Énergie au centre" },
          { phase: "Expir nez (6s)", time: 6, desc: "Racines descendent dans le sol" },
          { phase: "Rétention vide (2s)", time: 2, desc: "Sentir la stabilité" }
        ],
        reps: "5 à 8 cycles",
        position: "Assis pieds au sol",
        source: "Qi gong (Zhan Zhuang) — Grounding/earthing (Oschman et al., 2015)."
      }
    ]
  },
  D: {
    id: "D",
    emoji: "🔔",
    label: "EXPRIMER",
    element: "MÉTAL 🔩",
    besoin: "Exprimer",
    badge: P.badgeMetal,
    elemIcon: P.elemMetal,
    color: "#95a5a6",
    exercises: [
      {
        id: "M6a",
        name: "Bhramari",
        subtitle: "Abeille Bourdonnante",
        principe: "Hmmm grave — vibration crâne et corps",
        duration: "2-5 min",
        steps: [
          { phase: "Inspir nez", time: 5, desc: "Inspir profonde 5s" },
          { phase: "Expir 'HMMM'", time: 8, desc: "Bouche fermée, grave et continu (8s)" },
          { phase: "Vibration", time: 0, desc: "Sentir : lèvres → nez → crâne" },
          { phase: "Silence (3s)", time: 3, desc: "Écouter résonance" }
        ],
        reps: "3 à 7 cycles (commencer 3, +1/semaine)",
        position: "Assis dos droit",
        precaution: "⚠️ Ne pas appuyer fort sur oreilles. Estomac vide.",
        source: "Hatha Yoga Pradipika — Revue PMC 2024 (46 études) : effets confirmés anxiété, variabilité cardiaque."
      },
      {
        id: "M6b",
        name: "Ujjayi",
        subtitle: "Souffle de l'Océan",
        principe: "Gorge légèrement contractée = son vague",
        duration: "3-5 min",
        steps: [
          { phase: "Inspir nez (5s)", time: 5, desc: "Gorge contractée, son 'hhhhh'" },
          { phase: "Expir nez (6s)", time: 6, desc: "Son vague 'haaaah' doux" }
        ],
        reps: "En continu pendant la durée choisie",
        position: "Assis ou pendant activité douce",
        precaution: "⚠️ Son audible par soi, pas par quelqu'un à 2m.",
        source: "Ashtanga Yoga (K. Pattabhi Jois) — Régulation température + activation parasympathique."
      },
      {
        id: "M6c",
        name: "Om / Souffle Chanté",
        subtitle: "Vocal Breath",
        principe: "Vibration voyelle traversant le corps",
        duration: "2-3 min",
        steps: [
          { phase: "Inspir nez (5s)", time: 5, desc: "Inspir profonde" },
          { phase: "'OOOO' (2s)", time: 2, desc: "Expir bouche, vibration ventre" },
          { phase: "'UUUU' (2s)", time: 2, desc: "Vibration poitrine/cœur" },
          { phase: "'MMMM' (4s)", time: 4, desc: "Vibration crâne (bouche ferme)" },
          { phase: "Silence (3s)", time: 3, desc: "Écouter résonance" }
        ],
        reps: "5 à 10 cycles",
        position: "Assis dos droit",
        precaution: "⚠️ Variante simple : 'AAAAAHHHH' long = libérer sans structure.",
        source: "Tradition védique (5000+ ans) — Om chanting améliore fonction pulmonaire (2014, IJOY)."
      }
    ]
  }
};

// ═══════════════════════════════════════
// DONNÉES PROFIL (démo)
// ═══════════════════════════════════════
const DEMO_RELATIONS = [
  { id: 1, name: "Marc", type: "Partenaire", label: "Marc & Moi", profil: "C", animal: "🐢", animalName: "Tortue", date: "14/02/2026", complete: true, forceP: "Patience, Écoute", forceN: "Évitement, Repli", resume: "Avec Marc, j'active la Tortue : je me protège en me repliant dans ma carapace. Mes forces sont la patience et une écoute profonde — c'est ce qui nous a toujours tenus. Mais quand le stress monte, je fuis la confrontation au lieu d'exprimer ce que je ressens. Cette session m'a fait réaliser que ma carapace, qui me protège, m'empêche aussi de recevoir." },
  { id: 2, name: "Maman", type: "Mère", label: "Maman & Moi", profil: "A", animal: "🦊", animalName: "Renard", date: "10/02/2026", complete: false, forceP: "Adaptabilité, Intelligence", forceN: "Manipulation, Méfiance", resume: "Avec Maman, je suis le Renard : je m'adapte, je trouve des solutions créatives à chaque situation. Mon intelligence relationnelle me permet de naviguer les conversations compliquées. Mais en stress, je ruse au lieu de dire ce que je ressens vraiment. J'ai pris conscience que ma méfiance envers ses réactions m'empêche d'être authentique." },
  { id: 3, name: "Sophie", type: "Boss", label: "Sophie & Moi", profil: "E", animal: "🦔", animalName: "Hérisson", date: "05/02/2026", complete: true, forceP: "Sensibilité, Protection", forceN: "Piquants, Fermeture", resume: "Au travail avec Sophie, je suis le Hérisson : sensible à l'intérieur mais je sors les piquants dès que je me sens attaquée. Ma sensibilité est ma force — elle me rend empathique et intuitive. Mais en stress, je me ferme et mes piquants blessent sans que je le veuille. Cette prise de conscience m'a fait réaliser que mes protections sont aussi mes barrières." },
];

const DEMO_CARTES = [
  { num: 3, phrase: "Plus vous êtes heureux, plus vous êtes présent à ce qui est bon, maintenant." },
  { num: 7, phrase: "Trouvez des raisons de vous apprécier." },
  { num: 39, phrase: "Ayez des pensées qui vous apportent satisfaction." },
  { num: 22, phrase: "Ce que vous ressentez n'est jamais le problème, c'est la solution." },
];

const DEMO_FILLEULS = [
  { name: "Julie", date: "12/02/2026", type: "gratuit", galets: 1 },
  { name: "Amine", date: "08/02/2026", type: "payant", galets: 2 },
];

const MUDRAS_PALIERS = [
  { day: 3, num: 1 },
  { day: 5, num: 2 },
  { day: 7, num: 3 },
  { day: 14, num: 4 },
  { day: 19, num: 5 },
  { day: 24, num: 6 },
  { day: 30, num: 7 },
  { day: 32, num: 8 },
  { day: 33, num: 9, special: true },
  { day: 36, num: 10 },
  { day: 40, num: 11 },
  { day: 45, num: 12 },
  { day: 50, num: 13 },
  { day: 55, num: 14 },
  { day: 60, num: 15 },
  { day: 65, num: 16 },
  { day: 70, num: 17 },
  { day: 73, num: 18, final: true },
];

// ═══════════════════════════════════════
// COMPOSANT BREATHING — 3 ÉCRANS
// ═══════════════════════════════════════
const BreathScreen = ({ galets, setGalets, onNav }) => {
  const [view, setView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedExercises, setCompletedExercises] = useState({});
  const [showGuidePopup, setShowGuidePopup] = useState(false);
  const [showChoiceButtons, setShowChoiceButtons] = useState(false);

  useEffect(() => {
    if (!isTimerRunning || timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [isTimerRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isTimerRunning && selectedExercise) {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < selectedExercise.steps.length) {
        setCurrentStepIndex(nextIndex);
        setTimeLeft(selectedExercise.steps[nextIndex].time);
      } else {
        setIsTimerRunning(false);
        if (!completedExercises[selectedExercise.id]) {
          setGalets(g => g + 2);
          setCompletedExercises(prev => ({ ...prev, [selectedExercise.id]: true }));
        }
      }
    }
  }, [timeLeft, isTimerRunning, currentStepIndex, selectedExercise, completedExercises, setGalets]);

  const startExercise = (ex) => {
    setSelectedExercise(ex);
    setCurrentStepIndex(0);
    setTimeLeft(ex.steps[0].time);
    setIsTimerRunning(false);
    setView("exercise");
  };

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setCurrentStepIndex(0);
    setTimeLeft(selectedExercise.steps[0].time);
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setShowChoiceButtons(false);
    setView("list");
  };

  const handleGuideClick = () => {
    // TODO CONNEXION MODULES : Quand Miroir/Cartes/Relations seront prêts,
    // récupérer le profil (A/B/C/D/E/F) et sélectionner l'exercice auto
    setShowGuidePopup(true);
  };

  const handleChooseClick = () => {
    setShowChoiceButtons(true);
  };

  if (view === "categories") {
    return (
      <div className="screen">
        <div className="breath-header">
          <div className="breath-panda">{P.breathe}</div>
          <div>
            <h2 className="title-lg">Panda Respire</h2>
            <p className="tagline-sm">18 exercices sourcés scientifiquement</p>
          </div>
        </div>
        <p className="breath-intro fade-in">Choisis ton profil pour découvrir les exercices qui te correspondent.</p>
        <div className="breath-categories fade-in" style={{ animationDelay: "0.05s" }}>
          {Object.values(BREATHING_DATA).map((cat, i) => (
            <button
              key={cat.id}
              className="breath-cat-card fade-in"
              style={{ animationDelay: `${i * 0.05}s`, borderLeftColor: cat.color }}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className="breath-cat-badge">{cat.badge}</div>
              <div className="breath-cat-content">
                <div className="breath-cat-label">{cat.label}</div>
                <div className="breath-cat-element">{cat.element}</div>
                <div className="breath-cat-besoin">Ton profil demande de : {cat.besoin}</div>
                <div className="breath-cat-count">{cat.exercises.length} exercices →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === "list" && selectedCategory) {
    return (
      <div className="screen">
        <button className="breath-back" onClick={() => { setView("categories"); setShowChoiceButtons(false); }}>← Profils</button>
        
        <div className="breath-list-header">
          <div className="breath-list-badge">{selectedCategory.badge}</div>
          <h2 className="title-lg">{selectedCategory.label}</h2>
          <p className="breath-list-element">{selectedCategory.element}</p>
          <p className="breath-list-besoin">Ton profil demande de : {selectedCategory.besoin}</p>
        </div>

        <p className="breath-choice-intro">Choisis l'exercice qui te parle ou laisse Panda te guider</p>

        <div className="breath-choice-buttons">
          <button className="breath-choice-btn" onClick={handleChooseClick}>
            <span className="breath-choice-emoji">👆</span>
            <span className="breath-choice-label">Je choisis</span>
          </button>
          <button className="breath-choice-btn" onClick={handleGuideClick}>
            <span className="breath-choice-emoji">🐼</span>
            <span className="breath-choice-label">Panda me guide</span>
          </button>
        </div>

        {showChoiceButtons && (
          <div className="breath-exercises-list fade-in">
            {selectedCategory.exercises.map((ex, i) => (
              <button
                key={ex.id}
                className="breath-ex-card"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => startExercise(ex)}
              >
                <div className="breath-ex-top">
                  <div className="breath-ex-name">{ex.name}</div>
                  {completedExercises[ex.id] && <span className="breath-ex-done">✓</span>}
                </div>
                <div className="breath-ex-subtitle">{ex.subtitle}</div>
                <div className="breath-ex-duration">⏱️ {ex.duration}</div>
                <div className="breath-ex-cta">Commencer →</div>
              </button>
            ))}
          </div>
        )}

        {showGuidePopup && (
          <div className="popup-overlay" onClick={() => setShowGuidePopup(false)}>
            <div className="popup-card" onClick={e => e.stopPropagation()}>
              <div className="popup-panda">{P.meditate}</div>
              <h3 className="popup-title">Panda te guidera bientôt !</h3>
              <p className="popup-text">Pour que Panda te guide, fais d'abord ton Miroir du jour.</p>
              <p className="popup-text-small">En attendant, choisis l'exercice qui te parle !</p>
              <div className="popup-buttons">
                <button className="popup-btn secondary" onClick={() => setShowGuidePopup(false)}>
                  Choisir moi-même
                </button>
                <button className="popup-btn primary" onClick={() => { setShowGuidePopup(false); onNav(6); }}>
                  Aller au Miroir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === "exercise" && selectedExercise) {
    const currentStep = selectedExercise.steps[currentStepIndex];
    const progress = ((currentStepIndex + 1) / selectedExercise.steps.length) * 100;
    const isCompleted = !isTimerRunning && currentStepIndex === selectedExercise.steps.length - 1 && timeLeft === 0;

    return (
      <div className="screen">
        <button className="breath-back" onClick={() => setView("list")}>← Exercices</button>
        
        <div className="breath-ex-header">
          <h2 className="title-lg">{selectedExercise.name}</h2>
          <p className="breath-ex-subtitle">{selectedExercise.subtitle}</p>
        </div>

        <div className="breath-progress-bar">
          <div className="breath-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="breath-progress-label">Étape {currentStepIndex + 1} / {selectedExercise.steps.length}</p>

        <div className="breath-timer-zone">
          {!isCompleted ? (
            <>
              <div className="breath-timer-circle">
                <div className="breath-timer-time">{timeLeft}s</div>
                <div className="breath-timer-phase">{currentStep.phase}</div>
              </div>
              <p className="breath-timer-desc">{currentStep.desc}</p>
              <div className="breath-timer-btns">
                <button className="breath-timer-btn primary" onClick={toggleTimer}>
                  {isTimerRunning ? "⏸ Pause" : "▶ Démarrer"}
                </button>
                <button className="breath-timer-btn secondary" onClick={resetTimer}>↻ Recommencer</button>
              </div>
            </>
          ) : (
            <div className="breath-complete fade-in">
              <div className="breath-complete-panda">{P.thumbsUp}</div>
              <h3 className="breath-complete-title">Exercice terminé !</h3>
              {!completedExercises[selectedExercise.id] && (
                <div className="breath-complete-galets">
                  <span className="galet-inline">{P.galets}</span> +2 galets
                </div>
              )}
              <button className="breath-complete-btn" onClick={() => setView("list")}>
                Retour aux exercices
              </button>
            </div>
          )}
        </div>

        {!isCompleted && (
          <div className="breath-details">
            <div className="breath-detail-item">
              <strong>Principe :</strong> {selectedExercise.principe}
            </div>
            <div className="breath-detail-item">
              <strong>Répétitions :</strong> {selectedExercise.reps}
            </div>
            <div className="breath-detail-item">
              <strong>Position :</strong> {selectedExercise.position}
            </div>
            {selectedExercise.precaution && (
              <div className="breath-detail-item precaution">
                {selectedExercise.precaution}
              </div>
            )}
            
            <div className="breath-audio-section">
              <div className="breath-audio-header">
                <span className="breath-audio-icon">🎵</span>
                <span className="breath-audio-label">Musique de relaxation</span>
                <button className="breath-audio-toggle" disabled>
                  🔇
                </button>
              </div>
              <p className="breath-audio-text">Écouter de la musique douce permet une détente encore plus profonde.</p>
              <p className="breath-audio-soon">(bientôt disponible)</p>
            </div>

            <details className="breath-source">
              <summary>📚 Source scientifique</summary>
              <p>{selectedExercise.source}</p>
            </details>
          </div>
        )}
      </div>
    );
  }

  return null;
};

// ═══════════════════════════════════════
// ÉCRAN ACCUEIL
// ═══════════════════════════════════════
const HomeScreen = ({ galets, streak, onNav }) => {
  const actions = [
    { p: P.cards, t: "Carte VITA du jour", d: "Ton message VITA® quotidien", tab: 2, g: 1 },
    { p: P.relax, t: "Panda Relax", d: "16 animaux totems pour t'accompagner dans les 64 exercices", tab: 3, g: 3 },
    { p: P.breathe, t: "Respiration", d: "Des exercices adaptés selon ton profil", tab: 1, g: 2 },
    { p: P.couple, t: "Relations", d: "Découvre ton profil dans tes relations", tab: 5, g: 5 },
    { p: P.water, t: "Hydratation", d: "S'hydrater pour éliminer", tab: 4, g: 1 },
  ];
  return (
    <div className="screen">
      <div className="home-hero">
        <div className="home-hero-panda">{P.hello}</div>
        <div>
          <h2 className="home-greeting">Bienvenue !</h2>
          <p className="home-tagline">Mieux te comprendre et avancer en 3 minutes par jour.</p>
        </div>
      </div>
      <div className="home-stats">
        <div className="home-stat-card"><div className="home-stat-icon">{P.galets}</div><div className="home-stat-val gold">{galets}</div><div className="home-stat-label">galets récoltés</div></div>
        <div className="home-stat-card"><div className="home-stat-icon">🔥</div><div className="home-stat-val orange">{streak}</div><div className="home-stat-label">jours de suite</div></div>
      </div>
      <button className="miroir-cta-home" onClick={() => onNav(6)}>
        <div className="miroir-cta-panda">{P.mirror}</div>
        <div className="miroir-cta-title">Mon Miroir du jour</div>
        <div className="miroir-cta-desc">Découvre quel profil tu actives aujourd'hui · 3 min</div>
        <div className="miroir-cta-badge"><span className="galet-inline">{P.galets}</span> +5</div>
        <div className="miroir-cta-btn">C'est parti !</div>
      </button>
      <h3 className="home-section-title">Ton chemin zen</h3>
      {actions.map((a, i) => (
        <button key={i} className="home-action" onClick={() => a.tab !== null && onNav(a.tab)} style={{ animationDelay: `${i * 0.06}s` }}>
          <div className="home-action-panda">{a.p}</div>
          <div className="home-action-text">
            <div className="home-action-title">{a.t}</div>
            <div className="home-action-desc">{a.d}</div>
          </div>
          <div className="home-galet-badge"><span className="galet-inline">{P.galets}</span> +{a.g}</div>
        </button>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════
// ÉCRAN CARTE VITA
// ═══════════════════════════════════════
const CardScreen = () => (
  <div className="screen center-screen">
    <div className="module-card fade-in">
      <div className="module-panda big">{P.cards}</div>
      <h2 className="title-lg">Carte VITA du jour</h2>
      <p className="module-desc">72 cartes VITA®<br/>3 niveaux de lecture<br/>Bambou : Feuille, Nœud, Racine.</p>
      <div className="phase-badge">Tirage 1 ou 2 cartes VITA/jour à comprendre et intégrer.</div>
    </div>
  </div>
);

// ═══════════════════════════════════════
// ÉCRAN PANDA RELAX
// ═══════════════════════════════════════
const RelaxScreen = () => (
  <div className="screen center-screen">
    <div className="module-card fade-in">
      <div className="module-panda big">{P.relax}</div>
      <h2 className="title-lg">Panda Relax</h2>
      <p className="module-desc">16 animaux totems · 64 exercices corps & émotions.<br/>Découvre ton animal totem et laisse-toi guider.</p>
      <div className="phase-badge">⏳ 16 fiches exercices à intégrer</div>
    </div>
  </div>
);

// ═══════════════════════════════════════
// ÉCRAN HYDRATATION — FONCTIONNEL
// ═══════════════════════════════════════
const WaterScreen = ({ galets, setGalets }) => {
  const [glasses, setGlasses] = useState(0);
  const [goalMl, setGoalMl] = useState(1600);
  const glassSize = 200;
  const goal = Math.round(goalMl / glassSize);
  const [showInfo, setShowInfo] = useState(false);
  const pct = Math.min(100, Math.round((glasses / goal) * 100));
  const weekData = [5, 7, 8, 6, 4, 8];
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const [galetEarned, setGaletEarned] = useState({g70:false, g100:false});
  const [reminderStart, setReminderStart] = useState(8);
  const [reminderEnd, setReminderEnd] = useState(20);
  const goalOptions = [1000, 1200, 1400, 1600, 1800, 2000];
  const add = () => {
    if (glasses >= goal) return;
    const next = glasses + 1;
    setGlasses(next);
    const nextPct = Math.round((next / goal) * 100);
    if (nextPct >= 70 && !galetEarned.g70) { setGalets(g => g + 1); setGaletEarned(e => ({...e, g70:true})); }
    if (nextPct >= 100 && !galetEarned.g100) { setGalets(g => g + 2); setGaletEarned(e => ({...e, g100:true})); }
  };
  return (
    <div className="screen">
      <div className="water-header">
        <div className="water-panda">{pct >= 100 ? P.thumbsUp : P.water}</div>
        <div>
          <h2 className="title-lg">Hydratation</h2>
          <p className="tagline-sm">{pct >= 100 ? "Objectif atteint ! Bravo !" : "S'hydrater pour éliminer."}</p>
        </div>
      </div>
      <button className="water-info-toggle" onClick={() => setShowInfo(!showInfo)}>{showInfo ? "▼" : "▶"} Pourquoi c'est important ?</button>
      {showInfo && (
        <div className="water-info-text fade-in">
          L'eau représente 60% de ton corps. Une bonne hydratation améliore ta concentration, ton humeur et ta digestion. Adapte ton objectif à ta morphologie et tes activités. Le rappel te permet de répartir tes verres sur la journée.
        </div>
      )}
      <div className="water-main fade-in">
        <div className="circle-wrap">
          <svg className="circle-svg" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="78" className="circle-bg" />
            <circle cx="90" cy="90" r="78" className="circle-fill" strokeDasharray={`${2*Math.PI*78}`} strokeDashoffset={`${2*Math.PI*78*(1-pct/100)}`} />
          </svg>
          <div className="circle-center">
            <div className="circle-num">{glasses}</div>
            <div className="circle-label">/ {goal} verres</div>
          </div>
        </div>
        <div className="water-btns">
          <button className="water-minus" onClick={() => glasses > 0 && setGlasses(g => g - 1)}>−</button>
          <button className="water-plus" onClick={add}>+</button>
        </div>
      </div>

      <div className="card water-goal-card fade-in" style={{ animationDelay: "0.05s" }}>
        <span className="card-title-sm">Mon objectif : {goalMl/1000}L ({goal} verres de {glassSize}ml)</span>
        <div className="goal-options">
          {goalOptions.map(ml => (
            <button key={ml} className={`goal-btn ${goalMl===ml?"active":""}`} onClick={() => { setGoalMl(ml); setGlasses(0); setGaletEarned({g70:false,g100:false}); }}>{ml/1000}L</button>
          ))}
        </div>
        <div className="water-galet-rewards">
          <div className={`water-reward-row ${galetEarned.g70 ? "earned" : ""}`}>
            <span className="water-reward-label">Objectif 70%</span>
            <span className="water-reward-val"><span className="galet-inline">{P.galets}</span> ×1 {galetEarned.g70 && <span className="water-check">✓</span>}</span>
          </div>
          <div className={`water-reward-row ${galetEarned.g100 ? "earned" : ""}`}>
            <span className="water-reward-label">Objectif 100%</span>
            <span className="water-reward-val"><span className="galet-inline">{P.galets}</span> ×2 {galetEarned.g100 && <span className="water-check">✓</span>}</span>
          </div>
        </div>
      </div>

      <button className="water-module-cta fade-in" style={{ animationDelay: "0.1s" }}>
        💧 Mieux comprendre, mieux s'hydrater
      </button>

      <div className="card fade-in" style={{ animationDelay: "0.12s" }}>
        <span className="card-title-sm">🔔 Rappels hydratation</span>
        <p className="water-reminder-desc">Reçois un rappel pour boire régulièrement. On fragmente ton objectif sur ta journée.</p>
        <div className="water-reminder-config">
          <div className="reminder-row">
            <span className="reminder-label">De</span>
            <select className="reminder-select" value={reminderStart} onChange={e => setReminderStart(+e.target.value)}>
              {[6,7,8,9,10].map(h => <option key={h} value={h}>{h}h00</option>)}
            </select>
            <span className="reminder-label">à</span>
            <select className="reminder-select" value={reminderEnd} onChange={e => setReminderEnd(+e.target.value)}>
              {[18,19,20,21,22].map(h => <option key={h} value={h}>{h}h00</option>)}
            </select>
          </div>
          <p className="reminder-calc">
            {goal} verres en {reminderEnd - reminderStart}h = 1 rappel toutes les {Math.round((reminderEnd - reminderStart) * 60 / goal)} min
          </p>
        </div>
        <button className="water-reminder-btn" onClick={() => {
          const interval = Math.round((reminderEnd - reminderStart) * 60 / goal);
          const now = new Date();
          const y = now.getFullYear(), m = String(now.getMonth()+1).padStart(2,'0'), d = String(now.getDate()).padStart(2,'0');
          const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Panda Zen//Hydration//FR\nBEGIN:VEVENT\nUID:hydration-${now.getTime()}@pandazen.app\nDTSTART:${y}${m}${d}T${String(reminderStart).padStart(2,'0')}0000\nDURATION:PT${reminderEnd-reminderStart}H\nRRULE:FREQ=DAILY;INTERVAL=1\nEXDATE\nSUMMARY:💧 Panda Zen - Hydratation\nDESCRIPTION:C'est l'heure de boire un verre d'eau !\nEND:VEVENT\nEND:VCALENDAR`;
          const blob = new Blob([icsContent], { type: 'text/calendar' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `panda-zen-hydratation.ics`;
          link.click();
        }}>
          📥 Télécharger les rappels (.ics)
        </button>
      </div>

      <div className="card fade-in" style={{ animationDelay: "0.14s" }}>
        <span className="card-title-sm">📊 Ma semaine</span>
        <div className="week-graph">
          {weekData.map((v, i) => (
            <div key={i} className="week-col">
              <div className="week-bar-wrap">
                <div className="week-bar" style={{ height: `${(v / 8) * 100}%` }} />
              </div>
              <div className="week-day">{days[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// ÉCRAN RELATIONS
// ═══════════════════════════════════════
const RelationsScreen = () => (
  <div className="screen center-screen">
    <div className="module-card fade-in">
      <div className="module-panda big">{P.couple}</div>
      <h2 className="title-lg">Profil relationnel</h2>
      <p className="module-desc">Découvre ton animal totem dans chaque relation.<br/>6 profils · Comprends tes forces et tes blocages.</p>
      <div className="phase-badge">⏳ Module à intégrer</div>
    </div>
  </div>
);

// ═══════════════════════════════════════
// ÉCRAN PROFIL
// ═══════════════════════════════════════
const ProfileScreen = ({ galets, streak }) => {
  const [showParrainRules, setShowParrainRules] = useState(false);
  return (
    <div className="screen">
      <div className="profil-hero">
        <div className="profil-avatar">👤</div>
        <h2 className="profil-name">Ton Nom</h2>
        <p className="profil-email">email@exemple.com</p>
      </div>

      <div className="profil-box" style={{ animationDelay: "0.05s" }}>
        <div className="box-header"><div className="box-panda">{P.cards}</div><div><div className="box-title">Cartes VITA récentes</div><div className="box-subtitle">Tes 4 derniers tirages</div></div></div>
        {DEMO_CARTES.map((c, i) => (
          <div key={i} className="carte-item">
            <span className="carte-num">#{c.num}</span>
            <span className="carte-phrase">{c.phrase}</span>
          </div>
        ))}
      </div>

      <div className="profil-box" style={{ animationDelay: "0.1s" }}>
        <div className="box-header"><div className="box-panda">{P.couple}</div><div><div className="box-title">Mes relations</div><div className="box-subtitle">Profils enregistrés</div></div></div>
        {DEMO_RELATIONS.map((r, i) => (
          <div key={i} className="relation-item">
            <span className="relation-animal">{r.animal}</span>
            <div className="relation-content">
              <div className="relation-label">{r.label}</div>
              <div className="relation-date">{r.date}</div>
            </div>
            {r.complete && <span className="relation-badge">✓</span>}
          </div>
        ))}
        <button className="relation-add-btn">+ Nouvelle relation</button>
      </div>

      <div className="profil-box" style={{ animationDelay: "0.15s" }}>
        <div className="box-header"><div className="box-panda">{P.mirror}</div><div><div className="box-title">Miroir du jour</div><div className="box-subtitle">Historique</div></div></div>
        <div className="miroir-list">
          {[
            { date: "16/02/2026", profil: "E 💧 Eau", complete: true },
            { date: "15/02/2026", profil: "C 🌍 Terre", complete: true },
            { date: "14/02/2026", profil: "A 🔥 Feu", complete: true },
          ].map((m, i) => (
            <div key={i} className="miroir-history-item">
              <span className="miroir-history-date">{m.date}</span>
              <span className="miroir-history-profil">{m.profil}</span>
              {m.complete && <span className="miroir-history-badge">✓</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="profil-box" style={{ animationDelay: "0.2s" }}>
        <div className="box-header"><div className="box-panda">{P.mudra}</div><div><div className="box-title">Chemin des Mudrâs</div><div className="box-subtitle">73 jours · 18 mudrâs</div></div></div>
        <div className="path-visual">
          <div className="path-stones">
            {Array.from({ length: 73 }, (_, i) => {
              const day = i + 1;
              const walked = day <= streak;
              const palier = MUDRAS_PALIERS.find(p => p.day === day);
              let status = walked ? "walked" : "future";
              if (day === streak + 1) status = "current";
              if (palier) {
                if (palier.special) status += " special";
                if (palier.final) status += " final";
                return (<div key={day} className={`stone ${status} palier`} title={`Jour ${day} — Mudrâ ${palier.num}`}><span className="mudra-num">{palier.num}</span></div>);
              }
              return (<div key={day} className={`stone ${status}`} title={`Jour ${day}`}>{walked ? "·" : ""}</div>);
            })}
          </div>
          <div className="path-legend">
            <div className="legend-item"><div className="legend-dot green" /> Parcouru</div>
            <div className="legend-item"><div className="legend-dot gold" /> Aujourd'hui</div>
            <div className="legend-item"><div className="legend-dot gray" /> À venir</div>
          </div>
        </div>
        <div className="path-progress">
          <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: `${Math.round((streak/73)*100)}%` }} /></div>
          <div className="path-stats">
            <div className="path-stat"><div className="path-stat-v">{streak}/73</div><div className="path-stat-l">jours</div></div>
            <div className="path-stat"><div className="path-stat-v">{MUDRAS_PALIERS.filter(m => streak >= m.day).length}/18</div><div className="path-stat-l">mudrâs reçus</div></div>
            <div className="path-stat"><div className="path-stat-v">{P.galets} {streak}</div><div className="path-stat-l">galets du chemin</div></div>
          </div>
        </div>
        <div className="path-galet-hint">{P.galets} +1 galet pour chaque jour de pratique entre deux mudrâs</div>
        <button className="path-cta-violet">Voir mes mudrâs reçus</button>
      </div>

      <div className="profil-box" style={{ animationDelay: "0.25s" }}>
        <div className="box-header"><div className="box-panda">{P.galets}</div><div><div className="box-title">Mes galets gagnés</div><div className="box-subtitle">Construis ton équilibre, galet par galet</div></div></div>
        <div className="galets-summary"><div className="galets-big">{galets}</div><div className="galets-label">galets au total</div></div>
        <div className="galets-grid">
          <div className="galet-item"><div className="galet-item-val">+2</div><div className="galet-item-label">RESPIRATION</div></div>
          <div className="galet-item"><div className="galet-item-val">+1</div><div className="galet-item-label">CARTE VITA</div></div>
          <div className="galet-item"><div className="galet-item-val">+1</div><div className="galet-item-label">HYDRATATION</div></div>
          <div className="galet-item"><div className="galet-item-val">+5</div><div className="galet-item-label">MIROIR</div></div>
          <div className="galet-item"><div className="galet-item-val">+3</div><div className="galet-item-label">PANDA RELAX</div></div>
          <div className="galet-item"><div className="galet-item-val">+1</div><div className="galet-item-label">TÉMOIGNAGE</div></div>
        </div>
        <button className="galets-earn-btn">
          <div className="galets-earn-panda pulse">{P.pandaGalet}</div>
          <div className="galets-earn-text">Clique pour gagner encore des galets aujourd'hui !</div>
        </button>
        <div className="galets-explain">💡 Tes galets symbolisent ton engagement envers toi-même. Chaque action compte. Invite tes proches pour en gagner davantage !</div>
      </div>

      <div className="profil-box" style={{ animationDelay: "0.3s" }}>
        <div className="box-header"><div className="box-panda">{P.envelope}</div><div><div className="box-title">Parrainage</div><div className="box-subtitle">Invite tes proches, gagne des galets !</div></div></div>
        <div className="parrain-stats">
          <div className="parrain-stat"><div className="parrain-v">{DEMO_FILLEULS.length}</div><div className="parrain-l">filleuls</div></div>
          <div className="parrain-stat"><div className="parrain-v gold">{P.galets} {DEMO_FILLEULS.reduce((s,f) => s+f.galets,0)}</div><div className="parrain-l">galets gagnés</div></div>
        </div>
        <div className="parrain-rules">
          <div className="parrain-rules-title" onClick={() => setShowParrainRules(!showParrainRules)}>{showParrainRules ? "▼" : "▶"} Comment ça marche ?</div>
          {showParrainRules && (<>
            <div className="parrain-rule"><span className="rule-galets">+1</span><span className="rule-text">Ton filleul s'inscrit en version gratuite</span></div>
            <div className="parrain-rule"><span className="rule-galets">+2</span><span className="rule-text">Ton filleul passe à l'abonnement Premium</span></div>
          </>)}
        </div>
        {DEMO_FILLEULS.map((f,i) => (
          <div key={i} className="filleul-item">
            <span style={{fontSize:18}}>👤</span>
            <span className="filleul-name">{f.name}</span>
            <span className="filleul-date">{f.date}</span>
            <span className={`filleul-badge ${f.type}`}>{P.galets} +{f.type==="payant"?"2":"1"}</span>
          </div>
        ))}
        <button className="share-btn">✉️ Inviter un ami</button>
      </div>

      <div className="profil-box bonus-box" style={{ animationDelay: "0.35s" }}>
        <div className="box-header"><div className="box-panda" style={{fontSize:32}}>⭐</div><div><div className="box-title">Bonus</div><div className="box-subtitle">Ressources, contact & partenariats</div></div></div>
        <div className="bonus-links">
          <button className="bonus-link-btn"><span className="bonus-icon">📩</span> Nous contacter</button>
          <button className="bonus-link-btn"><span className="bonus-icon">🛒</span> Commander les cartes VITA®</button>
          <button className="bonus-link-btn"><span className="bonus-icon">🤝</span> Partenariats <span className="bonus-soon">(bientôt disponible)</span></button>
          <button className="bonus-link-btn"><span className="bonus-icon">📰</span> Actualités Centre VITA</button>
        </div>
      </div>

      <h3 className="section-title-profil">⚙️ Réglages</h3>
      <div className="menu-box" style={{ animationDelay: "0.35s" }}>
        {[
          { i: "🔔", l: "Notifications & rappels" },
          { i: "🌐", l: "Langue", v: "Français · English (bientôt)" },
          { i: "🕐", l: "Fuseau horaire", v: "UTC-4 (Martinique)" },
          { i: "📱", l: "Abonnement", v: "Early 2,99€/mois" },
          { i: "📋", l: "CGU / CGV" },
          { i: "🔒", l: "Confidentialité" },
          { i: "🚪", l: "Déconnexion", danger: true },
        ].map((m,i) => (
          <button key={i} className="menu-item">
            <span className="menu-i">{m.i}</span>
            <span className={`menu-l ${m.danger?"danger":""}`}>{m.l}</span>
            {m.v && <span className="menu-v">{m.v}</span>}
            <span className="menu-arrow">›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// SPLASH SCREEN
// ═══════════════════════════════════════
const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState(0);
  const doneRef = useRef(false);
  const finish = () => { if (!doneRef.current) { doneRef.current = true; onDone(); } };
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 4000);
    const t3 = setTimeout(finish, 4600);
    const safety = setTimeout(finish, 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(safety); };
  }, []);
  return (
    <div className={`splash-screen ${phase >= 2 ? "fade-out" : ""}`} onClick={finish}>
      <div className={`splash-phase1 ${phase >= 1 ? "hide" : ""}`}>
        <div className="splash-panda">{P.original}</div>
      </div>
      <div className={`splash-phase2 ${phase >= 1 && phase < 2 ? "show" : ""}`}>
        <div className="splash-panda-small">{P.original}</div>
        <div className="splash-title">PANDA ZEN</div>
        <div className="splash-sub">Mieux te comprendre, chaque jour.</div>
        <div className="splash-credit">Centre VITA®</div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// APP PRINCIPALE
// ═══════════════════════════════════════
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [tab, setTab] = useState(0);
  const [galets, setGalets] = useState(12);
  const [streak, setStreak] = useState(8);

  const goTab = (n) => setTab(n);

  const tabs = [
    { id: "home", label: "Accueil", icon: P.bambou },
    { id: "breath", label: "Respirer", icon: P.breathe },
    { id: "cards", label: "Cartes", icon: P.cards },
    { id: "relax", label: "Relax", icon: P.relax },
    { id: "water", label: "Eau", icon: P.water },
    { id: "relations", label: "Relations", icon: P.couple },
    { id: "profile", label: "Profil", icon: "👤" },
  ];

  const screens = [
    <HomeScreen galets={galets} streak={streak} onNav={goTab} />,
    <BreathScreen galets={galets} setGalets={setGalets} onNav={goTab} />,
    <CardScreen />,
    <RelaxScreen />,
    <WaterScreen galets={galets} setGalets={setGalets} />,
    <RelationsScreen />,
    <ProfileScreen galets={galets} streak={streak} />,
  ];

  return (
    <>
      <style>{`
      * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Nunito', sans-serif; background: #fafaf8; color: #2d2f2e; -webkit-font-smoothing: antialiased; }
        .app-shell { min-height: 100vh; display: flex; flex-direction: column; }
        .panda-icon { width: 100%; height: 100%; object-fit: contain; }
        .galet-inline { display: inline-block; width: 20px; height: 20px; vertical-align: middle; margin: 0 2px; }
        
        /* ═══ ÉCRANS ═══ */
        .screen { flex: 1; padding: 16px 16px 100px; max-width: 430px; margin: 0 auto; width: 100%; }
        .center-screen { display: flex; align-items: center; justify-content: center; min-height: 80vh; }
        
        /* ═══ TYPOGRAPHIE ═══ */
        .title-lg { font-family: 'Josefin Sans', sans-serif; font-size: 26px; font-weight: 700; color: #2d2f2e; margin: 0; }
        .tagline-sm { font-size: 13px; color: #6b7c6e; margin-top: 2px; }
        
        /* ═══ HEADER ═══ */
        .app-header { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(154,170,156,0.1); padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; max-width: 430px; margin: 0 auto; width: 100%; }
        .header-logo { display: flex; align-items: center; gap: 8px; }
        .header-panda { width: 32px; height: 32px; }
        .header-title { font-family: 'Josefin Sans', sans-serif; font-size: 16px; font-weight: 700; color: #34490a; letter-spacing: 0.5px; }
        .header-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #9aaa9c 0%, #6b7c6e 100%); border: none; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; }
        
        /* ═══ HOME ═══ */
        .home-hero { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
        .home-hero-panda { width: 80px; height: 80px; flex-shrink: 0; }
        .home-greeting { font-family: 'Josefin Sans', sans-serif; font-size: 26px; font-weight: 700; color: #2d2f2e; margin: 0; }
        .home-tagline { font-size: 14px; color: #6b7c6e; margin-top: 4px; }
        .home-stats { display: flex; gap: 12px; margin-bottom: 20px; }
        .home-stat-card { flex: 1; background: white; border-radius: 12px; padding: 16px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .home-stat-icon { font-size: 28px; margin-bottom: 8px; }
        .home-stat-val { font-family: 'Josefin Sans', sans-serif; font-size: 28px; font-weight: 700; margin-bottom: 4px; }
        .home-stat-val.gold { color: #c9a96e; }
        .home-stat-val.orange { color: #d35400; }
        .home-stat-label { font-size: 12px; color: #9aaa9c; }
        .miroir-cta-home { width: 100%; background: linear-gradient(135deg, #9aaa9c 0%, #6b7c6e 100%); border: none; border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; margin-bottom: 24px; box-shadow: 0 4px 16px rgba(107,124,110,0.3); transition: transform 0.2s; }
        .miroir-cta-home:active { transform: scale(0.98); }
        .miroir-cta-panda { width: 64px; height: 64px; margin: 0 auto 12px; }
        .miroir-cta-title { font-family: 'Josefin Sans', sans-serif; font-size: 20px; font-weight: 700; color: white; margin-bottom: 4px; }
        .miroir-cta-desc { font-size: 13px; color: rgba(255,255,255,0.9); margin-bottom: 12px; }
        .miroir-cta-badge { display: inline-flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; font-size: 13px; color: white; font-weight: 600; margin-bottom: 12px; }
        .miroir-cta-btn { background: white; color: #6b7c6e; padding: 12px 24px; border-radius: 24px; font-weight: 600; font-size: 15px; display: inline-block; }
        .home-section-title { font-family: 'Josefin Sans', sans-serif; font-size: 18px; font-weight: 700; color: #2d2f2e; margin: 24px 0 12px; }
        .home-action { width: 100%; background: white; border: none; border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 12px; text-align: left; cursor: pointer; margin-bottom: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.06); transition: transform 0.2s; animation: slideUp 0.4s ease both; }
        .home-action:active { transform: scale(0.98); }
        .home-action-panda { width: 48px; height: 48px; flex-shrink: 0; }
        .home-action-text { flex: 1; }
        .home-action-title { font-size: 15px; font-weight: 600; color: #2d2f2e; margin-bottom: 2px; }
        .home-action-desc { font-size: 12px; color: #9aaa9c; line-height: 1.3; }
        .home-galet-badge { display: flex; align-items: center; gap: 4px; background: #f5f0eb; padding: 6px 10px; border-radius: 16px; font-size: 12px; color: #c9a96e; font-weight: 600; flex-shrink: 0; }
        
        /* ═══ MODULE CARDS ═══ */
        .module-card { background: white; border-radius: 20px; padding: 32px 24px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-width: 360px; }
        .module-panda { width: 80px; height: 80px; margin: 0 auto 16px; }
        .module-panda.big { width: 100px; height: 100px; }
        .module-desc { font-size: 14px; color: #6b7c6e; line-height: 1.6; margin: 12px 0 20px; }
        .phase-badge { display: inline-block; background: #fff3cd; color: #856404; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        
        /* ═══ BREATHING MODULE ═══ */
        .breath-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
        .breath-panda { width: 70px; height: 70px; flex-shrink: 0; }
        .breath-intro { font-size: 14px; color: #6b7c6e; margin-bottom: 20px; line-height: 1.5; }
        .breath-categories { display: flex; flex-direction: column; gap: 12px; }
        .breath-cat-card { background: white; border: none; border-left: 4px solid #3a5a40; border-radius: 12px; padding: 14px; display: flex; align-items: center; gap: 12px; text-align: left; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: all 0.2s; }
        .breath-cat-card:active { transform: scale(0.98); }
        .breath-cat-badge { width: 56px; height: 56px; flex-shrink: 0; }
        .breath-cat-content { flex: 1; }
        .breath-cat-label { font-size: 17px; font-weight: 700; color: #2d2f2e; margin-bottom: 2px; }
        .breath-cat-element { font-size: 13px; color: #6b7c6e; margin-bottom: 2px; }
        .breath-cat-besoin { font-size: 12px; color: #9aaa9c; font-style: italic; margin-bottom: 6px; }
        .breath-cat-count { font-size: 13px; color: #3a5a40; font-weight: 600; }
        .breath-back { background: #f5f0eb; border: none; border-radius: 8px; padding: 10px 16px; font-size: 14px; color: #3a5a40; cursor: pointer; margin-bottom: 20px; font-weight: 500; }
        .breath-back:active { background: #e8dfd6; }
        .breath-list-header { text-align: center; margin-bottom: 20px; }
        .breath-list-badge { width: 80px; height: 80px; margin: 0 auto 12px; }
        .breath-list-element { font-size: 14px; color: #6b7c6e; margin: 8px 0 4px; }
        .breath-list-besoin { font-size: 13px; color: #9aaa9c; font-style: italic; }
        .breath-choice-intro { font-size: 14px; color: #6b7c6e; text-align: center; margin-bottom: 16px; line-height: 1.5; }
        .breath-choice-buttons { display: flex; gap: 12px; margin-bottom: 24px; }
        .breath-choice-btn { flex: 1; background: white; border: 2px solid #3a5a40; border-radius: 12px; padding: 16px 12px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: all 0.2s; }
        .breath-choice-btn:active { transform: scale(0.95); background: #f5f0eb; }
        .breath-choice-emoji { font-size: 28px; }
        .breath-choice-label { font-size: 14px; font-weight: 600; color: #3a5a40; }
        .breath-exercises-list { display: flex; flex-direction: column; gap: 12px; }
        .breath-ex-card { background: white; border: 1px solid #e0e0e0; border-radius: 12px; padding: 14px; text-align: left; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.06); transition: all 0.2s; }
        .breath-ex-card:active { transform: scale(0.98); }
        .breath-ex-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .breath-ex-name { font-size: 16px; font-weight: 600; color: #2d2d2d; }
        .breath-ex-done { background: #3a5a40; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }
        .breath-ex-subtitle { font-size: 13px; color: #6b7c6e; margin-bottom: 6px; line-height: 1.3; }
        .breath-ex-duration { font-size: 12px; color: #9aaa9c; margin-bottom: 8px; }
        .breath-ex-cta { font-size: 13px; color: #3a5a40; font-weight: 600; }
        .breath-ex-header { text-align: center; margin-bottom: 16px; }
        .breath-progress-bar { background: #e0e0e0; height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 6px; }
        .breath-progress-fill { background: linear-gradient(90deg, #3a5a40, #5b7a5e); height: 100%; transition: width 0.3s; }
        .breath-progress-label { font-size: 12px; color: #9aaa9c; text-align: center; margin-bottom: 20px; }
        .breath-timer-zone { text-align: center; margin-bottom: 20px; }
        .breath-timer-circle { width: 180px; height: 180px; border-radius: 50%; background: linear-gradient(135deg, #f5f0eb 0%, #e8dfd6 100%); margin: 0 auto 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .breath-timer-time { font-size: 44px; font-weight: 700; color: #3a5a40; font-family: 'Josefin Sans', sans-serif; }
        .breath-timer-phase { font-size: 14px; color: #6b7c6e; margin-top: 6px; font-weight: 500; }
        .breath-timer-desc { font-size: 14px; color: #6b7c6e; margin-bottom: 16px; line-height: 1.5; }
        .breath-timer-btns { display: flex; gap: 12px; justify-content: center; }
        .breath-timer-btn { border: none; border-radius: 12px; padding: 12px 20px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .breath-timer-btn.primary { background: #3a5a40; color: white; }
        .breath-timer-btn.primary:active { background: #2d4632; transform: scale(0.98); }
        .breath-timer-btn.secondary { background: #f5f0eb; color: #3a5a40; }
        .breath-timer-btn.secondary:active { background: #e8dfd6; transform: scale(0.98); }
        .breath-complete { text-align: center; padding: 30px 16px; }
        .breath-complete-panda { width: 100px; height: 100px; margin: 0 auto 16px; }
        .breath-complete-title { font-size: 22px; color: #3a5a40; margin-bottom: 12px; font-family: 'Josefin Sans', sans-serif; }
        .breath-complete-galets { font-size: 17px; color: #c9a96e; margin-bottom: 20px; font-weight: 600; }
        .breath-complete-btn { background: #3a5a40; color: white; border: none; border-radius: 12px; padding: 12px 28px; font-size: 15px; font-weight: 600; cursor: pointer; }
        .breath-complete-btn:active { background: #2d4632; transform: scale(0.98); }
        .breath-details { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .breath-detail-item { font-size: 14px; color: #6b7c6e; margin-bottom: 12px; line-height: 1.5; }
        .breath-detail-item strong { color: #2d2f2e; font-weight: 600; }
        .breath-detail-item.precaution { background: #fff3cd; border-left: 3px solid #ff9800; padding: 10px; border-radius: 6px; color: #856404; }
        .breath-audio-section { margin: 16px 0; padding: 14px; background: #f5f0eb; border-radius: 10px; }
        .breath-audio-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .breath-audio-icon { font-size: 20px; }
        .breath-audio-label { flex: 1; font-size: 14px; font-weight: 600; color: #2d2f2e; }
        .breath-audio-toggle { background: #e0e0e0; border: none; padding: 6px 12px; border-radius: 16px; font-size: 16px; cursor: not-allowed; opacity: 0.5; }
        .breath-audio-text { font-size: 13px; color: #6b7c6e; line-height: 1.5; margin-bottom: 4px; }
        .breath-audio-soon { font-size: 12px; color: #9aaa9c; font-style: italic; }
        .breath-source { margin-top: 14px; padding-top: 14px; border-top: 1px solid #e0e0e0; }
        .breath-source summary { font-size: 13px; color: #3a5a40; font-weight: 600; cursor: pointer; list-style: none; }
        .breath-source summary::-webkit-details-marker { display: none; }
        .breath-source p { font-size: 12px; color: #6b7c6e; margin-top: 8px; line-height: 1.5; }
        .popup-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .popup-card { background: white; border-radius: 20px; padding: 28px; max-width: 340px; text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
        .popup-panda { width: 80px; height: 80px; margin: 0 auto 16px; }
        .popup-title { font-family: 'Josefin Sans', sans-serif; font-size: 20px; font-weight: 700; color: #2d2f2e; margin-bottom: 12px; }
        .popup-text { font-size: 14px; color: #6b7c6e; line-height: 1.5; margin-bottom: 8px; }
        .popup-text-small { font-size: 13px; color: #9aaa9c; margin-bottom: 20px; }
        .popup-buttons { display: flex; gap: 10px; }
        .popup-btn { flex: 1; border: none; border-radius: 10px; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; }
        .popup-btn.primary { background: #3a5a40; color: white; }
        .popup-btn.secondary { background: #f5f0eb; color: #3a5a40; }
        
        /* ═══ WATER ═══ */
        .water-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
        .water-panda { width: 70px; height: 70px; flex-shrink: 0; }
        .water-info-toggle { background: #f5f0eb; border: none; padding: 10px 16px; border-radius: 8px; font-size: 13px; color: #6b7c6e; cursor: pointer; margin-bottom: 16px; width: 100%; text-align: left; font-weight: 500; }
        .water-info-toggle:active { background: #e8dfd6; }
        .water-info-text { background: white; padding: 14px; border-radius: 10px; font-size: 13px; color: #6b7c6e; line-height: 1.6; margin-bottom: 16px; }
        .water-main { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
        .circle-wrap { position: relative; width: 180px; height: 180px; flex-shrink: 0; }
        .circle-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        .circle-bg { fill: none; stroke: #e8dfd6; stroke-width: 12; }
        .circle-fill { fill: none; stroke: url(#waterGrad); stroke-width: 12; stroke-linecap: round; transition: stroke-dashoffset 0.5s; }
        .circle-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
        .circle-num { font-family: 'Josefin Sans', sans-serif; font-size: 42px; font-weight: 700; color: #3a5a40; }
        .circle-label { font-size: 13px; color: #9aaa9c; margin-top: 2px; }
        .water-btns { display: flex; flex-direction: column; gap: 12px; }
        .water-minus, .water-plus { width: 56px; height: 56px; border: none; border-radius: 50%; font-size: 28px; font-weight: 600; cursor: pointer; transition: transform 0.15s; }
        .water-minus { background: #f5f0eb; color: #6b7c6e; }
        .water-plus { background: #3a5a40; color: white; }
        .water-minus:active, .water-plus:active { transform: scale(0.9); }
        .card { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); animation: slideUp 0.4s ease both; }
        .card-title-sm { font-size: 14px; font-weight: 600; color: #2d2f2e; display: block; margin-bottom: 12px; }
        .water-goal-card { margin-bottom: 16px; }
        .goal-options { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
        .goal-btn { flex: 1; min-width: 60px; background: #f5f0eb; border: 2px solid transparent; border-radius: 8px; padding: 8px 12px; font-size: 13px; font-weight: 600; color: #6b7c6e; cursor: pointer; transition: all 0.2s; }
        .goal-btn.active { background: #3a5a40; color: white; border-color: #3a5a40; }
        .water-galet-rewards { display: flex; flex-direction: column; gap: 8px; }
        .water-reward-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #fafaf8; border-radius: 8px; }
        .water-reward-row.earned { background: #e8f5e9; }
        .water-reward-label { font-size: 13px; color: #6b7c6e; }
        .water-reward-val { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #c9a96e; }
        .water-check { color: #4caf50; font-size: 16px; }
        .water-module-cta { width: 100%; background: linear-gradient(135deg, #3a5a40 0%, #5b7a5e 100%); border: none; border-radius: 12px; padding: 16px; font-size: 15px; font-weight: 600; color: white; cursor: pointer; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(58,90,64,0.3); }
        .water-reminder-desc { font-size: 13px; color: #6b7c6e; line-height: 1.5; margin-bottom: 12px; }
        .water-reminder-config { margin-bottom: 12px; }
        .reminder-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .reminder-label { font-size: 13px; color: #6b7c6e; }
        .reminder-select { flex: 1; background: #f5f0eb; border: 1px solid #e0e0e0; border-radius: 6px; padding: 8px; font-size: 13px; color: #2d2f2e; cursor: pointer; }
        .reminder-calc { font-size: 12px; color: #9aaa9c; font-style: italic; }
        .water-reminder-btn { width: 100%; background: #3a5a40; color: white; border: none; border-radius: 8px; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; }
        .week-graph { display: flex; gap: 8px; justify-content: space-between; }
        .week-col { flex: 1; display: flex; flex-direction: column; align-items: center; }
        .week-bar-wrap { width: 100%; height: 100px; display: flex; align-items: flex-end; background: #f5f0eb; border-radius: 6px 6px 0 0; overflow: hidden; }
        .week-bar { width: 100%; background: linear-gradient(180deg, #5b7a5e 0%, #3a5a40 100%); border-radius: 6px 6px 0 0; transition: height 0.3s; }
        .week-day { font-size: 11px; color: #9aaa9c; margin-top: 6px; }
        
        /* ═══ PROFIL ═══ */
        .profil-hero { text-align: center; margin-bottom: 24px; }
        .profil-avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #9aaa9c 0%, #6b7c6e 100%); margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; font-size: 36px; }
        .profil-name { font-family: 'Josefin Sans', sans-serif; font-size: 22px; font-weight: 700; color: #2d2f2e; margin-bottom: 4px; }
        .profil-email { font-size: 13px; color: #9aaa9c; }
        .profil-box { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin-bottom: 16px; animation: slideUp 0.4s ease both; }
        .box-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .box-panda { width: 40px; height: 40px; flex-shrink: 0; }
        .box-title { font-size: 16px; font-weight: 700; color: #2d2f2e; }
        .box-subtitle { font-size: 12px; color: #9aaa9c; margin-top: 2px; }
        .carte-item { display: flex; gap: 12px; padding: 12px; background: #fafaf8; border-radius: 8px; margin-bottom: 8px; }
        .carte-num { font-family: 'Josefin Sans', sans-serif; font-size: 15px; font-weight: 700; color: #c9a96e; flex-shrink: 0; }
        .carte-phrase { font-size: 13px; color: #6b7c6e; line-height: 1.4; }
        .relation-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: #fafaf8; border-radius: 8px; margin-bottom: 8px; }
        .relation-animal { font-size: 24px; flex-shrink: 0; }
        .relation-content { flex: 1; }
        .relation-label { font-size: 14px; font-weight: 600; color: #2d2f2e; }
        .relation-date { font-size: 12px; color: #9aaa9c; margin-top: 2px; }
        .relation-badge { background: #4caf50; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }
        .relation-add-btn { width: 100%; background: #f5f0eb; color: #3a5a40; border: 2px dashed #c9a96e; border-radius: 8px; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; }
        .miroir-list { display: flex; flex-direction: column; gap: 8px; }
        .miroir-history-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: #fafaf8; border-radius: 8px; }
        .miroir-history-date { font-size: 13px; color: #9aaa9c; }
        .miroir-history-profil { font-size: 13px; font-weight: 600; color: #2d2f2e; flex: 1; text-align: center; }
        .miroir-history-badge { background: #4caf50; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; }
        .path-visual { margin-bottom: 16px; }
        .path-stones { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px; }
        .stone { width: 10px; height: 10px; border-radius: 50%; background: #e0e0e0; }
        .stone.walked { background: #5b7a5e; }
        .stone.current { background: #c9a96e; box-shadow: 0 0 0 3px rgba(201,169,110,0.3); }
        .stone.palier { width: 18px; height: 18px; background: #c9a96e; display: flex; align-items: center; justify-content: center; }
        .stone.palier.special { background: linear-gradient(135deg, #c9a96e 0%, #d4af37 100%); }
        .stone.palier.final { background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%); box-shadow: 0 0 0 4px rgba(255,215,0,0.4); }
        .mudra-num { font-size: 9px; color: white; font-weight: 700; }
        .path-legend { display: flex; gap: 16px; justify-content: center; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #9aaa9c; }
        .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
        .legend-dot.green { background: #5b7a5e; }
        .legend-dot.gold { background: #c9a96e; }
        .legend-dot.gray { background: #e0e0e0; }
        .path-progress { margin-bottom: 12px; }
        .progress-bar-track { background: #e0e0e0; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 12px; }
        .progress-bar-fill { background: linear-gradient(90deg, #5b7a5e 0%, #3a5a40 100%); height: 100%; transition: width 0.5s; }
        .path-stats { display: flex; gap: 12px; }
        .path-stat { flex: 1; text-align: center; }
        .path-stat-v { font-family: 'Josefin Sans', sans-serif; font-size: 20px; font-weight: 700; color: #2d2f2e; }
        .path-stat-l { font-size: 11px; color: #9aaa9c; margin-top: 2px; }
        .path-galet-hint { font-size: 12px; color: #9aaa9c; text-align: center; margin-bottom: 12px; font-style: italic; }
        .path-cta-violet { width: 100%; background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%); color: white; border: none; border-radius: 10px; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; }
        .galets-summary { text-align: center; margin-bottom: 16px; }
        .galets-big { font-family: 'Josefin Sans', sans-serif; font-size: 48px; font-weight: 700; color: #c9a96e; }
        .galets-label { font-size: 13px; color: #9aaa9c; margin-top: 4px; }
        .galets-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
        .galet-item { text-align: center; padding: 12px; background: #fafaf8; border-radius: 8px; }
        .galet-item-val { font-family: 'Josefin Sans', sans-serif; font-size: 22px; font-weight: 700; color: #c9a96e; }
        .galet-item-label { font-size: 10px; color: #9aaa9c; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
        .galets-earn-btn { width: 100%; background: linear-gradient(135deg, #ffd700 0%, #c9a96e 100%); border: none; border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 12px; box-shadow: 0 4px 16px rgba(201,169,110,0.3); }
        .galets-earn-panda { width: 48px; height: 48px; }
        .galets-earn-text { flex: 1; font-size: 14px; font-weight: 600; color: #2d2f2e; text-align: left; }
        .galets-explain { font-size: 12px; color: #9aaa9c; line-height: 1.5; }
        .parrain-stats { display: flex; gap: 12px; margin-bottom: 16px; }
        .parrain-stat { flex: 1; text-align: center; padding: 12px; background: #fafaf8; border-radius: 8px; }
        .parrain-v { font-family: 'Josefin Sans', sans-serif; font-size: 24px; font-weight: 700; color: #2d2f2e; }
        .parrain-v.gold { color: #c9a96e; }
        .parrain-l { font-size: 12px; color: #9aaa9c; margin-top: 4px; }
        .parrain-rules { margin-bottom: 16px; }
        .parrain-rules-title { font-size: 13px; font-weight: 600; color: #6b7c6e; cursor: pointer; margin-bottom: 8px; }
        .parrain-rule { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-top: 1px solid #f5f0eb; }
        .rule-galets { font-family: 'Josefin Sans', sans-serif; font-size: 18px; font-weight: 700; color: #c9a96e; }
        .rule-text { font-size: 13px; color: #6b7c6e; }
        .filleul-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; background: #fafaf8; border-radius: 8px; margin-bottom: 8px; }
        .filleul-name { flex: 1; font-size: 14px; font-weight: 600; color: #2d2f2e; }
        .filleul-date { font-size: 12px; color: #9aaa9c; }
        .filleul-badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 4px; }
        .filleul-badge.gratuit { background: #e8f5e9; color: #4caf50; }
        .filleul-badge.payant { background: #fff3cd; color: #c9a96e; }
        .share-btn { width: 100%; background: #3a5a40; color: white; border: none; border-radius: 10px; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; }
        .bonus-box { border: 2px solid #c9a96e; }
        .bonus-links { display: flex; flex-direction: column; gap: 8px; }
        .bonus-link-btn { width: 100%; background: #fafaf8; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 10px; font-size: 13px; color: #2d2f2e; font-weight: 500; cursor: pointer; text-align: left; }
        .bonus-icon { font-size: 18px; }
        .bonus-soon { font-size: 11px; color: #9aaa9c; font-style: italic; margin-left: auto; }
        .section-title-profil { font-family: 'Josefin Sans', sans-serif; font-size: 16px; font-weight: 700; color: #2d2f2e; margin: 24px 0 12px; }
        .menu-box { background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden; animation: slideUp 0.4s ease both; }
        .menu-item { width: 100%; background: transparent; border: none; padding: 14px 16px; display: flex; align-items: center; gap: 12px; cursor: pointer; font-size: 14px; text-align: left; transition: background 0.15s; }
        .menu-item:active { background: #f5f0eb; }
        .menu-item + .menu-item { border-top: 1px solid rgba(154,170,156,0.1); }
        .menu-i { font-size: 17px; }
        .menu-l { flex: 1; font-weight: 600; font-size: 14px; }
        .menu-l.danger { color: #c0392b; }
        .menu-v { font-size: 12px; color: #6b7c6e; }
        .menu-arrow { color: #9aaa9c; font-size: 16px; }
        
        /* ═══ SPLASH ═══ */
        .splash-screen { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #fafaf8 0%, #f5f0eb 100%); z-index: 9999; display: flex; align-items: center; justify-content: center; transition: opacity 0.6s; }
        .splash-screen.fade-out { opacity: 0; pointer-events: none; }
        .splash-phase1 { transition: opacity 0.6s; }
        .splash-phase1.hide { opacity: 0; }
        .splash-panda { width: 160px; height: 160px; animation: pulse 2s ease-in-out infinite; }
        .splash-phase2 { opacity: 0; text-align: center; transition: opacity 0.6s; }
        .splash-phase2.show { opacity: 1; }
        .splash-panda-small { width: 80px; height: 80px; margin: 0 auto 16px; }
        .splash-title { font-family: 'Josefin Sans', sans-serif; font-size: 32px; font-weight: 700; color: #34490a; letter-spacing: 1px; margin-bottom: 8px; }
        .splash-sub { font-size: 15px; color: #6b7c6e; margin-bottom: 24px; }
        .splash-credit { font-size: 13px; color: #9aaa9c; }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        
        /* ═══ FOOTER + NAV ═══ */
        .app-footer-legal { text-align: center; padding: 16px 0 80px; font-size: 10px; color: #9aaa9c; }
        .app-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); border-top: 1px solid rgba(154,170,156,0.1); display: flex; padding: 6px 0 max(6px, env(safe-area-inset-bottom)); z-index: 100; }
        .nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 4px 0; border: none; background: transparent; cursor: pointer; transition: transform 0.15s; font-family: 'Nunito'; }
        .nav-btn:active { transform: scale(0.9); }
        .nav-emoji { font-size: 20px; line-height: 1; }
        .nav-label { font-size: 10px; color: #2d2f2e; font-weight: 700; }
        .nav-btn.active .nav-label { color: #34490a; font-weight: 800; }
        .nav-dot { width: 4px; height: 4px; border-radius: 50%; background: #34490a; }
        
        /* ═══ ANIMATIONS ═══ */
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: slideUp 0.4s ease both; }
      `}</style>

      <div className="app-shell">
        {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
        <div className="app-header">
          <div style={{width: 36}} />
          <div className="header-logo">
            <div className="header-panda">{P.logo}</div>
            <div className="header-title">PANDA ZEN</div>
          </div>
          <button className="header-avatar" onClick={() => goTab(6)}>👤</button>
        </div>

        {screens[tab]}
        <div className="app-footer-legal">© Centre VITA – VITA® · Panda Zen™</div>

        <div className="app-nav">
          {tabs.filter(t => t.id !== "profile").map((t, i) => (
            <button key={t.id} className={`nav-btn ${tab===i?"active":""}`} onClick={() => goTab(i)}>
              <span className="nav-emoji">{t.icon}</span>
              <span className="nav-label">{t.label}</span>
              {tab===i && <div className="nav-dot" />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
