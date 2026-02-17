import React, { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════
// PANDA ZEN — APP COMPLÈTE v1
// Fusion skeleton-v3 + profil-v5
// 17/02/2026 — Fix boucle respiration 1min
// ═══════════════════════════════════════

// PNG pandas transparents dans /images/
const pi = (file, alt) => <img src={`/images/${file}`} alt={alt} className="panda-icon" loading="lazy" />;
const P = {
  logo:      pi('ORIGINAL.png', 'Panda Zen'),
  original:  pi('ORIGINAL.png', 'Panda'),
  hello:     pi('main_bonjour_bouche_ouverte.png', 'Hello'),
  breathe:   pi('souffle.png', 'Respire'),
  cards:     pi('Cartes.png', 'Cartes'),
  water:     pi('bois_de_leau.png', 'Eau'),
  mirror:    pi('miroir_positif.png', 'Miroir'),
  mirrorNeg: pi('miroir_ne_gatif.png', 'Miroir négatif'),
  relax:     pi('Relax.png', 'Relax'),
  meditate:  pi('me_ditant.png', 'Méditation'),
  thumbsUp:  pi('pouce_v2.png', 'Bravo'),
  couple:    pi('Relationnel.png', 'Relations'),
  galets:    pi('GALET_SEUL.png', 'Galet'),
  envelope:  pi('enveloppe.png', 'Enveloppe'),
  mudra:     pi('galets_zen_.png', 'Mudrâ'),
  bambou:    pi('HOME_bambou.png', 'Accueil'),
  pandaGalet: pi('panda_et_galet_gagne_.png', 'Galet gagné'),
    // BADGES PROFILS BREATHING
  badgeFeu: pi('BADGE_FEU.png', 'Feu'),
  badgeFeuEq: pi('Badge_FEU__equilibre_.png', 'Feu Équilibre'),
  badgeEau: pi('BAdge_eau.png', 'Eau'),
  badgeBois: pi('Mange.png', 'Bois'),
  badgeTerre: pi('Badge_TERRE.png', 'Terre'),
  badgeMetal: pi('Badge_METAL.png', 'Métal'),
  // ÉLÉMENTS DÉTOURÉS
  elemFeu: pi('e_le_ment_feu.png', 'Élément Feu'),
  elemEau: pi('e_le_ment_eau.png', 'Élément Eau'),
  elemBois: pi('e_le_ment_bois.png', 'Élément Bois'),
  elemTerre: pi('e_le_ment_terre.png', 'Élément Terre'),
  elemMetal: pi('e_le_ment_me_tal.png', 'Élément Métal'),
};

// ═══ DONNÉES PROFIL (démo) ═══
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
// ÉCRAN ACCUEIL v2
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
      {/* MIROIR DU JOUR — CTA PRINCIPAL */}
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
// ÉCRAN RESPIRER
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
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [exerciseDuration] = useState(60); // 1 minute par défaut
  const [userStopped, setUserStopped] = useState(false);

  // Scroll to top à chaque changement de view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

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
        // Fin de tous les steps → BOUCLE (recommence)
        setCurrentStepIndex(0);
        setTimeLeft(selectedExercise.steps[0].time);
        // Le timer continue de tourner (pas de setIsTimerRunning(false))
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
    // TODO CONNEXION MODULES : Quand Miroir/Cartes/Relations seront prêts
    setShowGuidePopup(true);
  };

  const handleChooseClick = () => {
    setShowChoiceButtons(true);
  };

  // ÉCRAN 1 : CATÉGORIES
  if (view === "categories") {
    return (
      <div className="screen">
        <div className="breath-header">
          <div className="breath-panda">{P.breathe}</div>
          <h2 className="title-lg">Panda Respire</h2>
          <p className="tagline-sm">18 exercices sourcés scientifiquement</p>
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

  // ÉCRAN 2 : LISTE EXERCICES
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

  // ÉCRAN 3 : EXERCICE + TIMER
  if (view === "exercise" && selectedExercise) {
    const currentStep = selectedExercise.steps[currentStepIndex];
    const progress = ((currentStepIndex + 1) / selectedExercise.steps.length) * 100;
    const isCompleted = userStopped;

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
             <div className="breath-timer-circle" style={{
                transform: currentStep.phase.toLowerCase().includes('inspir') 
                  ? `scale(${currentStepIndex > 0 && selectedExercise.steps[currentStepIndex - 1].phase.toLowerCase().includes('inspir') ? 1.1 + (1 - timeLeft / currentStep.time) * 0.1 : 1 + (1 - timeLeft / currentStep.time) * 0.2})`
                  : currentStep.phase.toLowerCase().includes('expir')
                  ? `scale(${1.2 - (1 - timeLeft / currentStep.time) * 0.2})`
                  : currentStep.phase.toLowerCase().includes('rétention') && currentStepIndex > 0 && selectedExercise.steps[currentStepIndex - 1].phase.toLowerCase().includes('inspir')
                  ? 'scale(1.2)'
                  : 'scale(1.0)',
                transition: 'transform 0.3s ease-out'
              }}>
              </div>
              <div className="breath-timer-info">
                <div className="breath-timer-main-text">
                  <span className="breath-timer-phase-big">{currentStep.phase}</span>
                  <span className="breath-timer-time-inline"> — {timeLeft}s</span>
                </div>
              </div>
              <p className="breath-timer-desc">{currentStep.desc}</p>
            </div>
            <div className="breath-timer-countdown">
              Temps restant : <strong>{exerciseDuration - totalTimeElapsed}s</strong>
            </div>
            <div className="breath-timer-btns">
              <button className="breath-timer-btn primary" onClick={toggleTimer}>
                {isTimerRunning ? "⏸ Pause" : "▶ Démarrer"}
              </button>
              <button className="breath-timer-btn secondary" onClick={resetTimer}>↻ Recommencer</button>
              <button className="breath-timer-btn stop" onClick={() => { setIsTimerRunning(false); setUserStopped(true); }}>⏹ Stop</button>
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
              <button className="breath-restart-btn" onClick={resetTimer}>
                ↻ Refaire cet exercice
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
  const [goalMl, setGoalMl] = useState(1600); // 1L à 2L par défaut 1.6L
  const glassSize = 200; // ml par verre
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

      {/* OBJECTIF + GALETS */}
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

      {/* CTA MODULE */}
      <button className="water-module-cta fade-in" style={{ animationDelay: "0.1s" }}>
        💧 Mieux comprendre, mieux s'hydrater
      </button>

      {/* RAPPELS */}
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
          let events = '';
          for (let i = 0; i < goal; i++) {
            const totalMin = reminderStart * 60 + i * interval;
            const hh = String(Math.floor(totalMin/60)).padStart(2,'0');
            const mm = String(totalMin%60).padStart(2,'0');
            events += `BEGIN:VEVENT\nDTSTART:${y}${m}${d}T${hh}${mm}00\nDTSTAMP:${y}${m}${d}T${hh}${mm}00\nDURATION:PT1M\nSUMMARY:💧 Verre ${i+1}/${goal} — Panda Zen\nDESCRIPTION:C'est l'heure de boire ! Objectif : ${goalMl/1000}L aujourd'hui.\nBEGIN:VALARM\nTRIGGER:PT0M\nACTION:DISPLAY\nDESCRIPTION:Bois un verre d eau\nEND:VALARM\nEND:VEVENT\n`;
          }
          const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//PandaZen//Hydratation//FR\nCALSCALE:GREGORIAN\n${events}END:VCALENDAR`;
          const blob = new Blob([ics], { type: 'text/calendar' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = `panda-zen-hydratation-${y}${m}${d}.ics`;
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }}>
          📲 Ajouter les rappels à mon calendrier
        </button>
        <p className="reminder-note">Fonctionne sur iPhone et Android. Les rappels s'ajoutent à ton calendrier avec notification sonore.</p>
      </div>

      {/* GRAPHIQUE SEMAINE */}
      <div className="card fade-in" style={{ animationDelay: "0.15s" }}>
        <span className="card-title-sm">Ma semaine</span>
        <div className="week-bars">
          {days.map((d, i) => {
            const val = i===6 ? glasses : (weekData[i]||0);
            const ratio = Math.min(1, val/goal);
            const today = i===6;
            return (
              <div key={d} className="week-col">
                <div className="bar-track"><div className={`bar-fill ${today?"today":""}`} style={{ height: `${ratio*100}%` }} /></div>
                <span className={`bar-label ${today?"today":""}`}>{d}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// ÉCRAN RELATIONS (placeholder)
// ═══════════════════════════════════════
const RelationsPlaceholder = () => (
  <div className="screen center-screen">
    <div className="module-card fade-in">
      <div className="module-panda big">{P.couple}</div>
      <h2 className="title-lg">Mon profil en Relation</h2>
      <p className="module-desc">Découvre quel profil tu actives avec chaque personne de ton entourage.</p>
      <div className="phase-badge">⏳ Module profil relationnel v6 à intégrer</div>
    </div>
  </div>
);

// ═══════════════════════════════════════
// ÉCRAN PROFIL — COMPLET v5
// ═══════════════════════════════════════
const ProfileScreen = ({ galets, streak }) => {
  const [name, setName] = useState("Rachel");
  const [editing, setEditing] = useState(false);
  const [mirrorProfile] = useState({ letter: "B", animal: "🐙", name: "Pieuvre", date: "16/02/2026", forceP: "Multi-tâches, Créativité, Vision globale", forceN: "Dispersion, Contrôle, Sur-adaptation" });
  const [openRelation, setOpenRelation] = useState(null);
  const [showTestimonial, setShowTestimonial] = useState(null);
  const [testimonials, setTestimonials] = useState({});
  const [openCard, setOpenCard] = useState(null);
  const [showParrainRules, setShowParrainRules] = useState(false);

  return (
    <div className="screen profil-screen">
      {/* BOX 1 — MON PROFIL */}
      <div className="profil-box" style={{ animationDelay: "0.05s" }}>
        <div className="avatar-zone">
          <div className="avatar-circle" title="Changer ma photo">
            {P.meditate}
            <div className="avatar-edit-hint">📷</div>
          </div>
          {editing ? (
            <div className="name-edit-row">
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="p-name-input" autoFocus />
              <button className="btn-sm" onClick={() => setEditing(false)}>OK</button>
            </div>
          ) : (
            <div className="profil-name" onClick={() => setEditing(true)}>
              {name}<span className="edit-pen">✏️</span>
            </div>
          )}
          <div className="profil-stats-row">
            <div className="pstat"><div className="pstat-v gold">{P.galets} {galets}</div><div className="pstat-l">galets</div></div>
            <div className="pstat-div" />
            <div className="pstat"><div className="pstat-v orange">🔥 {streak}</div><div className="pstat-l">jours</div></div>
            <div className="pstat-div" />
            <div className="pstat"><div className="pstat-v">⭐ {streak + 2}</div><div className="pstat-l">record</div></div>
          </div>
        </div>
      </div>

      {/* BOX 2 — MIROIR DU JOUR */}
      <div className="profil-box" style={{ animationDelay: "0.1s" }}>
        <div className="box-header"><div className="box-panda">{P.mirror}</div><div><div className="box-title">Mon Miroir du jour</div><div className="box-subtitle">Découvre quel profil tu actives aujourd'hui</div></div></div>
        <div className="miroir-result">
          <div className="miroir-date">📅 {mirrorProfile.date}</div>
          <div className="miroir-animal">{mirrorProfile.animal}</div>
          <div className="miroir-name">{mirrorProfile.name}</div>
          <div className="miroir-letter">Profil {mirrorProfile.letter}</div>
          <div className="miroir-insight" style={{ marginTop: 14 }}>
            <div className="miroir-insight-header"><span className="miroir-insight-panda-lg">{P.mirror}</span><div className="miroir-insight-title up">✨ Ce qui te tire vers le haut aujourd'hui</div></div>
            <div className="miroir-tags">{mirrorProfile.forceP.split(", ").map((f,i) => <span key={`p${i}`} className="tag-plus">✨ {f}</span>)}</div>
          </div>
          <div className="miroir-insight" style={{ marginTop: 8 }}>
            <div className="miroir-insight-header"><span className="miroir-insight-panda-lg">{P.mirrorNeg}</span><div className="miroir-insight-title down">🌒 En stress, attention à...</div></div>
            <div className="miroir-tags">{mirrorProfile.forceN.split(", ").map((f,i) => <span key={`n${i}`} className="tag-minus">🌒 {f}</span>)}</div>
          </div>
        </div>
        <div className="miroir-btns-5050">
          <button className="miroir-cta-half">Découvrir<br/>mon Miroir — 3 min</button>
          <button className="miroir-share-half">{P.envelope} Je partage !</button>
        </div>
      </div>

      {/* BOX 3 — RELATIONS */}
      <div className="profil-box" style={{ animationDelay: "0.15s" }}>
        <div className="box-header"><div className="box-panda">{P.couple}</div><div><div className="box-title">Mon profil en Relation</div><div className="box-subtitle">{DEMO_RELATIONS.length} relations explorées</div></div></div>
        {DEMO_RELATIONS.map(r => {
          const isOpen = openRelation === r.id;
          const showTest = showTestimonial === r.id;
          return (
            <div key={r.id} className="relation-item">
              <button className="relation-top" onClick={() => setOpenRelation(isOpen ? null : r.id)}>
                <span className="rel-animal">{r.animal}</span>
                <div className="rel-info"><div className="rel-label">{r.label}</div><div className="rel-meta">{r.animalName} ({r.profil}) · {r.date}</div></div>
                {r.complete && <span className="rel-star">⭐</span>}
                <span className={`rel-arrow ${isOpen?"open":""}`}>›</span>
              </button>
              {isOpen && (
                <div className="relation-detail">
                  <p>{r.resume}</p>
                  <div className="tags-row">
                    {r.forceP.split(", ").map((f,i) => <span key={`p${i}`} className="tag-plus">✨ {f}</span>)}
                    {r.forceN.split(", ").map((f,i) => <span key={`n${i}`} className="tag-minus">🌒 {f}</span>)}
                  </div>
                  <div className="rel-actions">
                    {r.complete ? (
                      <button className="rel-btn share" onClick={() => setShowTestimonial(showTest ? null : r.id)}>⭐ Partager mon évolution</button>
                    ) : (
                      <button className="rel-btn continue">Continuer la session →</button>
                    )}
                  </div>
                  {showTest && r.complete && (
                    <div className="testimonial-zone">
                      <h4>⭐ Mon évolution : Avant → Après</h4>
                      <textarea className="testimonial-input" placeholder="Qu'est-ce qui a changé pour toi dans cette relation ?" value={testimonials[r.id]||""} onChange={e => setTestimonials({...testimonials,[r.id]:e.target.value})} />
                      <button className="testimonial-submit">Partager + gagner {P.galets} 1 galet</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BOX 4 — CARTES */}
      <div className="profil-box" style={{ animationDelay: "0.2s" }}>
        <div className="box-header"><div className="box-panda">{P.cards}</div><div><div className="box-title">Les cartes déjà sorties pour moi</div><div className="box-subtitle">{DEMO_CARTES.length} cartes tirées</div></div></div>
        {DEMO_CARTES.map(c => {
          const isOpen = openCard === c.num;
          return (
            <div key={c.num}>
              <div className="carte-item" onClick={() => setOpenCard(isOpen ? null : c.num)}>
                <div className="carte-dos">{c.num}</div>
                <div className="carte-phrase"><em><strong>"{c.phrase}"</strong></em></div>
                <span className={`rel-arrow ${isOpen?"open":""}`}>›</span>
              </div>
              {isOpen && (
                <div className="carte-expand">
                  <div className="carte-level"><div className="carte-level-name">🌿 Feuille</div><div className="carte-level-text">{c.phrase}</div></div>
                  <div className="carte-level"><div className="carte-level-name">🎋 Nœud</div><div className="carte-level-text" style={{color:"#6b7c6e",fontStyle:"italic"}}>Lecture approfondie à charger...</div></div>
                  <div className="carte-level"><div className="carte-level-name">🌱 Racine</div><div className="carte-level-text" style={{color:"#6b7c6e",fontStyle:"italic"}}>Lecture profonde à charger...</div></div>
                </div>
              )}
            </div>
          );
        })}
        <button className="carte-buy-btn">🎴 Bientôt disponible : le jeu complet de 72 cartes en coffret</button>
      </div>

      {/* BOX 5 — CHEMIN MUDRÂS */}
      <div className="profil-box" style={{ animationDelay: "0.22s" }}>
        <div className="box-header-vertical">
          <div className="box-panda-lg">{P.mudra}</div>
          <div className="box-title">Mon chemin Mudrâs</div>
          <div className="box-subtitle">73 pas · 18 mudrâs · Un chemin vers soi.</div>
        </div>
        <div className="path-container">
          <div className="stepping-stones">
            {Array.from({ length: 73 }, (_, i) => {
              const day = i + 1;
              const mudra = MUDRAS_PALIERS.find(m => m.day === day);
              const walked = day <= streak;
              const isCurrent = day === streak + 1;
              const status = walked ? "walked" : isCurrent ? "current" : "upcoming";
              if (mudra) {
                return (<div key={day} className={`stone mudra-stone ${status} ${mudra.special?"special":""} ${mudra.final?"final":""}`} title={`Jour ${day} — Mudrâ ${mudra.num}`}>{walked ? "🙏" : mudra.final ? "🌟" : mudra.num}</div>);
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

      {/* BOX 6 — GALETS */}
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

      {/* BOX 7 — PARRAINAGE */}
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

      {/* BOX BONUS */}
      <div className="profil-box bonus-box" style={{ animationDelay: "0.35s" }}>
        <div className="box-header"><div className="box-panda" style={{fontSize:32}}>⭐</div><div><div className="box-title">Bonus</div><div className="box-subtitle">Ressources, contact & partenariats</div></div></div>
        <div className="bonus-links">
          <button className="bonus-link-btn"><span className="bonus-icon">📩</span> Nous contacter</button>
          <button className="bonus-link-btn"><span className="bonus-icon">🛒</span> Commander les cartes VITA®</button>
          <button className="bonus-link-btn"><span className="bonus-icon">🤝</span> Partenariats <span className="bonus-soon">(bientôt disponible)</span></button>
          <button className="bonus-link-btn"><span className="bonus-icon">📰</span> Actualités Centre VITA</button>
        </div>
      </div>

      {/* RÉGLAGES */}
      <h3 className="section-title-profil">⚙️ Réglages</h3>
      <div className="menu-box" style={{ animationDelay: "0.35s" }}>
        {[
          { i: "🔔", l: "Notifications & rappels" },
          { i: "🌍", l: "Langue", v: "Français · English (bientôt)" },
          { i: "🕐", l: "Fuseau horaire", v: "UTC-4 (Martinique)" },
          { i: "📝", l: "Abonnement", v: "Early 2,99€/mois" },
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
// SPLASH SCREEN (style Duolingo)
// ═══════════════════════════════════════
const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState(0); // 0=panda, 1=titre, 2=fade-out
  const doneRef = useRef(false);
  const finish = () => { if (!doneRef.current) { doneRef.current = true; onDone(); } };
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 4000);
    const t3 = setTimeout(finish, 4600);
    // Fallback de sécurité — si rien ne se passe après 6s, on ferme quand même
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
export default function PandaZenApp() {
  const [tab, setTab] = useState(0);
  const [galets, setGalets] = useState(12);
  const [streak] = useState(3);
  const [showSplash, setShowSplash] = useState(true);

  const goTab = (t) => { setTab(t); window.scrollTo(0, 0); };

  const tabs = [
    { id: "home", label: "Accueil", icon: P.bambou },
    { id: "breathe", label: "Respirer", icon: P.breathe },
    { id: "card", label: "Carte", icon: P.cards },
    { id: "relax", label: "Relax", icon: P.relax },
    { id: "water", label: "Eau", icon: P.water },
    { id: "relations", label: "Relations", icon: P.couple },
    { id: "profile", label: "_hidden_", icon: null },
  ];

  const screens = [
    <HomeScreen galets={galets} streak={streak} onNav={goTab} />,
    <BreathScreen galets={galets} setGalets={setGalets} onNav={goTab} />,
    <CardScreen />,
    <RelaxScreen />,
    <WaterScreen galets={galets} setGalets={setGalets} />,
    <RelationsPlaceholder />,
    <ProfileScreen galets={galets} streak={streak} />
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&family=Nunito:wght@400;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }

        /* ═══ APP SHELL ═══ */
        .panda-icon {
          display: inline-block;
          object-fit: contain;
          vertical-align: middle;
        }
        /* Tailles par contexte — agrandies */
        .header-panda .panda-icon { width: 38px; height: 38px; }
        .home-hero-panda .panda-icon { width: 80px; height: 80px; }
        .home-stat-icon .panda-icon { width: 28px; height: 28px; }
        .home-action-panda .panda-icon { width: 54px; height: 54px; }
        .home-galet-badge .panda-icon { width: 18px; height: 18px; }
        .galet-inline .panda-icon { width: 18px; height: 18px; }
        .module-panda .panda-icon { width: 100px; height: 100px; }
        .module-panda.big .panda-icon { width: 120px; height: 120px; }
        .water-panda .panda-icon { width: 60px; height: 60px; }
        .box-panda .panda-icon { width: 50px; height: 50px; }
        .miroir-animal .panda-icon { width: 56px; height: 56px; }
        .miroir-insight-panda .panda-icon { width: 34px; height: 34px; }
        .avatar-circle .panda-icon { width: 52px; height: 52px; }
        .nav-emoji .panda-icon { width: 26px; height: 26px; }
        .miroir-cta-panda .panda-icon { width: 64px; height: 64px; }
        .galets-big .panda-icon { width: 36px; height: 36px; }
        .pstat-v .panda-icon { width: 18px; height: 18px; }
        .parrain-v .panda-icon { width: 18px; height: 18px; }
        .filleul-badge .panda-icon { width: 14px; height: 14px; }
        .splash-panda .panda-icon { width: 160px; height: 160px; }
        .splash-panda-small .panda-icon { width: 80px; height: 80px; }
        .miroir-share .panda-icon { width: 20px; height: 20px; }
        .galets-earn-panda .panda-icon { width: 80px; height: 80px; }
        .path-galet-hint .panda-icon { width: 16px; height: 16px; }
        .path-stat-v .panda-icon { width: 16px; height: 16px; }

        /* ═══ SPLASH SCREEN 2 PHASES (Duolingo style) ═══ */
        .splash-screen {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999;
          background: #3a5a40;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.6s ease;
        }
        .splash-screen.fade-out { opacity: 0; pointer-events: none; }
        .splash-phase1 {
          position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .splash-phase1.hide { opacity: 0; transform: scale(0.8); }
        .splash-panda { animation: splashBounce 0.8s ease 0.2s both; filter: drop-shadow(0 4px 20px rgba(0,0,0,0.3)); }
        .splash-phase2 {
          position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center;
          opacity: 0; transform: translateY(20px);
        }
        .splash-phase2.show { opacity: 1; transform: translateY(0); transition: opacity 0.6s ease, transform 0.6s ease; }
        .splash-panda-small { filter: drop-shadow(0 3px 12px rgba(0,0,0,0.2)); }
        .splash-title { font-family: 'Josefin Sans', sans-serif; font-weight: 700; font-size: 38px; color: #ffffff; margin-top: 16px; letter-spacing: 2px; text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
        .splash-sub { font-size: 15px; color: rgba(255,255,255,0.75); margin-top: 8px; font-weight: 600; }
        .splash-credit { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 24px; }
        @keyframes splashBounce { 0% { opacity: 0; transform: scale(0.4); } 60% { transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }

        /* ═══ MIROIR CTA HOME (fond blanc, bord doré) ═══ */
        .miroir-cta-home {
          width: 100%; display: flex; flex-direction: column; align-items: center; gap: 8px;
          background: white;
          border: 2.5px solid #c9a96e;
          border-radius: 20px; padding: 20px 16px 16px;
          margin-bottom: 20px; cursor: pointer;
          box-shadow: 0 4px 20px rgba(201,169,110,0.15);
          text-align: center; font-family: 'Nunito', sans-serif;
          transition: transform 0.2s, box-shadow 0.2s;
          animation: slideUp 0.5s ease 0.15s both;
        }
        .miroir-cta-home:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(201,169,110,0.25); }
        .miroir-cta-home:active { transform: scale(0.98); }
        .miroir-cta-panda { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.1)); }
        .miroir-cta-title { font-weight: 800; font-size: 18px; color: #1e270c; }
        .miroir-cta-desc { font-size: 13px; color: #3a5a40; margin-top: 2px; font-weight: 600; }
        .miroir-cta-badge { background: #f5eedd; border: 1.5px solid #d4b87a; border-radius: 20px; padding: 4px 12px; font-weight: 700; font-size: 12px; color: #8a7040; white-space: nowrap; display: flex; align-items: center; gap: 4px; margin-top: 4px; }
        .miroir-cta-btn { margin-top: 8px; background: #3a5a40; color: white; border: none; border-radius: 12px; padding: 10px 32px; font-weight: 800; font-size: 14px; letter-spacing: 0.3px; }
        .app-shell {
          max-width: 430px; margin: 0 auto; min-height: 100vh;
          background: linear-gradient(180deg, #f5f0eb 0%, #f0ede8 40%, #e8f0e4 100%);
          font-family: 'Nunito', sans-serif; color: #2d2f2e;
          position: relative; overflow-x: hidden;
        }

        /* ═══ HEADER ═══ */
        .app-header {
          position: sticky; top: 0; z-index: 100;
          background: rgba(245,240,235,0.92);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          padding: 10px 16px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(154,170,156,0.1);
        }
        .header-logo { display: flex; align-items: center; gap: 10px; }
        .header-panda { font-size: 32px; line-height: 1; }
        .header-title { font-family: 'Josefin Sans', sans-serif; font-weight: 700; font-size: 21px; color: #1e270c; letter-spacing: 0.4px; }
        .header-avatar { width: 38px; height: 38px; border-radius: 50%; border: 2px solid rgba(91,122,94,0.4); background: linear-gradient(135deg,#e8f0e4,#f5f0eb); font-size: 19px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 2px 8px rgba(30,39,12,0.1); }
        .header-avatar:hover { transform: scale(1.1); box-shadow: 0 3px 12px rgba(30,39,12,0.15); }
        .header-avatar:active { transform: scale(0.95); }

        /* ═══ SCREENS ═══ */
        .screen { padding: 20px 16px 20px; }
        .center-screen { text-align: center; }

        /* ═══ TYPOGRAPHY ═══ */
        .title-lg { font-family: 'Josefin Sans', sans-serif; font-weight: 700; font-size: 24px; color: #1e270c; }
        .section-title { font-family: 'Josefin Sans', sans-serif; font-weight: 700; font-size: 18px; color: #1e270c; margin-bottom: 14px; }
        .tagline-sm { font-size: 15px; color: #3a5a40; margin-top: 4px; line-height: 1.4; font-weight: 600; }

        /* ═══ HOME v2 ═══ */
        .home-hero { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; animation: slideUp 0.5s ease both; }
        .home-hero-panda { font-size: 60px; line-height: 1; }
        .home-greeting { font-family: 'Josefin Sans', sans-serif; font-weight: 700; font-size: 26px; color: #1e270c; }
        .home-tagline { font-size: 15px; font-weight: 700; color: #3a3d3b; margin-top: 4px; line-height: 1.4; }
        .home-stats { display: flex; gap: 12px; margin-bottom: 24px; animation: slideUp 0.5s ease 0.1s both; }
        .home-stat-card { flex: 1; background: rgba(255,255,255,0.93); border-radius: 16px; padding: 16px; box-shadow: 0 2px 12px rgba(30,39,12,0.06); text-align: center; }
        .home-stat-icon { font-size: 22px; margin-bottom: 4px; }
        .home-stat-val { font-weight: 800; font-size: 28px; }
        .home-stat-val.gold { color: #c9a96e; }
        .home-stat-val.orange { color: #d4845a; }
        .home-stat-label { font-size: 13px; color: #2d3a2e; margin-top: 2px; font-weight: 700; }
        .home-section-title { font-family: 'Josefin Sans', sans-serif; font-weight: 700; font-size: 20px; color: #1e270c; margin-bottom: 14px; }
        .home-action { width: 100%; display: flex; align-items: center; gap: 14px; background: rgba(255,255,255,0.93); border: none; border-radius: 16px; padding: 16px; margin-bottom: 10px; cursor: pointer; box-shadow: 0 2px 10px rgba(30,39,12,0.05); text-align: left; font-family: 'Nunito', sans-serif; transition: transform 0.2s, box-shadow 0.2s; animation: slideUp 0.4s ease both; }
        .home-action:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(30,39,12,0.1); }
        .home-action:active { transform: scale(0.98); }
        .home-action-panda { font-size: 40px; line-height: 1; }
        .home-action-text { flex: 1; }
        .home-action-title { font-weight: 800; font-size: 16px; color: #1e270c; }
        .home-action-desc { font-size: 13px; color: #2d3a2e; margin-top: 3px; font-weight: 600; line-height: 1.4; }
        .home-galet-badge { background: #f5f0eb; border: 1.5px solid #c9a96e; border-radius: 20px; padding: 5px 12px; font-weight: 800; font-size: 12px; color: #8a7040; white-space: nowrap; display: flex; align-items: center; gap: 4px; }

/* ═══ BREATHING MODULE ═══ */
        .breath-header { text-align: center; margin-bottom: 20px; }
        .breath-panda { width: 80px; height: 80px; margin: 0 auto 12px; }
        .breath-intro { font-size: 14px; color: #6b7c6e; margin-bottom: 20px; line-height: 1.5; text-align: center; }
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
        .breath-timer-time { font-size: 24px; font-weight: 600; color: #9aaa9c; font-family: 'Nunito', sans-serif; margin-top: 8px; }
        .breath-timer-phase { font-size: 32px; color: #3a5a40; margin-bottom: 0; font-weight: 700; font-family: 'Josefin Sans', sans-serif; }
        .breath-ex-cta { font-size: 13px; color: #3a5a40; font-weight: 600; }
        .breath-ex-header { text-align: center; margin-bottom: 16px; }
        .breath-progress-bar { background: #e0e0e0; height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 6px; }
        .breath-progress-fill { background: linear-gradient(90deg, #3a5a40, #5b7a5e); height: 100%; transition: width 0.3s; }
        .breath-progress-label { font-size: 12px; color: #9aaa9c; text-align: center; margin-bottom: 20px; }
        .breath-timer-zone { text-align: center; margin-bottom: 20px; }
        .breath-timer-info { margin-bottom: 20px; }
        .breath-timer-main-text { display: flex; align-items: baseline; justify-content: center; gap: 8px; margin-bottom: 8px; }
        .breath-timer-phase-big { font-size: 28px; font-weight: 700; color: #3a5a40; font-family: 'Josefin Sans', sans-serif; }
        .breath-timer-time-inline { font-size: 24px; font-weight: 600; color: #9aaa9c; font-family: 'Nunito', sans-serif; }
        .breath-timer-desc { font-size: 14px; color: #6b7c6e; margin-bottom: 20px; line-height: 1.5; text-align: center; }
        .breath-timer-circle { width: 180px; height: 180px; border-radius: 50%; background: linear-gradient(135deg, #d1e7f0 0%, #b8dae8 100%); margin: 0 auto 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
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
        .breath-complete-btn { background: #3a5a40; color: white; border: none; border-radius: 12px; padding: 12px 28px; font-size: 15px; font-weight: 600; cursor: pointer; margin-bottom: 12px; display: block; width: 100%; }
        .breath-complete-btn:active { background: #2d4632; transform: scale(0.98); }
        .breath-restart-btn { background: #f5f0eb; color: #3a5a40; border: none; border-radius: 12px; padding: 12px 28px; font-size: 15px; font-weight: 600; cursor: pointer; display: block; width: 100%; }
        .breath-restart-btn:active { background: #e8dfd6; transform: scale(0.98); }
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
       
        /* ═══ CARDS GENERIC ═══ */
        .card { background: rgba(255,255,255,0.93); border-radius: 16px; padding: 16px; box-shadow: 0 2px 10px rgba(30,39,12,0.05); margin-bottom: 12px; }
        .card-header { display: flex; justify-content: space-between; align-items: center; }
        .card-title-sm { font-weight: 800; font-size: 15px; color: #1e270c; margin-bottom: 10px; }
        .link-btn { background: none; border: none; color: #5b7a5e; font-weight: 600; font-size: 13px; cursor: pointer; font-family: 'Nunito', sans-serif; }

        /* ═══ MODULE PLACEHOLDER ═══ */
        .module-card { background: rgba(255,255,255,0.93); border-radius: 24px; padding: 40px 24px; box-shadow: 0 4px 20px rgba(30,39,12,0.07); }
        .module-panda { font-size: 80px; line-height: 1; margin-bottom: 16px; }
        .module-panda.big { font-size: 100px; }
        .module-desc { font-size: 15px; color: #2d3a2e; line-height: 1.6; margin: 10px 0 20px; font-weight: 600; }
        .phase-badge { background: rgba(91,122,94,0.08); border-radius: 12px; padding: 14px 18px; font-size: 13px; color: #5b7a5e; font-weight: 600; }

        /* ═══ WATER ═══ */
        .water-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; animation: slideUp 0.4s ease both; }
        .water-panda { font-size: 48px; line-height: 1; }
        .water-main { background: rgba(255,255,255,0.93); border-radius: 24px; padding: 28px 20px; box-shadow: 0 4px 20px rgba(30,39,12,0.07); text-align: center; margin-bottom: 14px; }
        .water-info-toggle { display: block; width: 100%; background: none; border: none; font-family: 'Nunito'; font-size: 13px; font-weight: 700; color: #3a7a94; cursor: pointer; text-align: left; padding: 6px 0; margin-bottom: 10px; }
        .water-info-text { background: rgba(74,143,168,0.08); border-radius: 12px; padding: 14px; font-size: 13px; color: #2d3a2e; line-height: 1.6; font-weight: 600; margin-bottom: 14px; }
        .circle-wrap { position: relative; width: 180px; height: 180px; margin: 0 auto 20px; }
        .circle-svg { transform: rotate(-90deg); width: 100%; height: 100%; }
        .circle-bg { fill: none; stroke: rgba(107,163,190,0.2); stroke-width: 12; }
        .circle-fill { fill: none; stroke: #4a8fa8; stroke-width: 12; stroke-linecap: round; transition: stroke-dashoffset 0.6s ease; }
        .circle-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); text-align: center; }
        .circle-num { font-weight: 800; font-size: 36px; color: #4a8fa8; }
        .circle-label { font-size: 13px; color: #6b7c6e; }
        .water-btns { display: flex; justify-content: center; gap: 16px; align-items: center; }
        .water-minus { width: 48px; height: 48px; border-radius: 50%; border: 2px solid #9aaa9c; background: transparent; font-size: 22px; color: #6b7c6e; cursor: pointer; font-family: 'Nunito'; font-weight: 700; transition: background 0.2s; }
        .water-minus:hover { background: rgba(154,170,156,0.1); }
        .water-plus { width: 72px; height: 72px; border-radius: 50%; border: none; background: linear-gradient(135deg,#6ba3be,#4a8fa8); font-size: 28px; color: white; cursor: pointer; font-family: 'Nunito'; font-weight: 700; box-shadow: 0 4px 16px rgba(107,163,190,0.35); transition: transform 0.15s, box-shadow 0.15s; }
        .water-plus:hover { transform: scale(1.05); }
        .water-plus:active { transform: scale(0.95); }
        .goal-options { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
        .goal-btn { padding: 8px 16px; border-radius: 12px; border: 1px solid #9aaa9c; background: transparent; font-family: 'Nunito'; font-size: 14px; color: #2d2f2e; cursor: pointer; transition: all 0.15s; }
        .goal-btn.active { border: 2px solid #34490a; background: rgba(52,73,10,0.08); font-weight: 700; color: #34490a; }
        .goal-btn:hover { background: rgba(52,73,10,0.05); }
        .water-goal-card { padding-bottom: 20px; }
        .water-galet-rewards { margin-top: 16px; border-top: 1px solid rgba(154,170,156,0.15); padding-top: 14px; }
        .water-reward-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: 10px; margin-bottom: 6px; }
        .water-reward-row.earned { background: rgba(91,122,94,0.08); }
        .water-reward-label { font-weight: 700; font-size: 14px; color: #2d3a2e; }
        .water-reward-val { display: flex; align-items: center; gap: 4px; font-weight: 800; font-size: 14px; color: #c9a96e; }
        .water-check { color: #3a5a40; font-weight: 800; font-size: 16px; }
        .water-module-cta { display: block; width: 100%; background: white; border: 2px solid #4a8fa8; border-radius: 16px; padding: 14px; font-family: 'Nunito'; font-weight: 800; font-size: 15px; color: #3a7a94; cursor: pointer; text-align: center; margin-bottom: 12px; transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 2px 10px rgba(74,143,168,0.1); animation: waterPulse 2.5s ease-in-out infinite; }
        .water-module-cta:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(74,143,168,0.2); animation: none; }
        .water-module-cta:active { transform: scale(0.98); animation: none; }
        @keyframes waterPulse { 0%,100% { box-shadow: 0 2px 10px rgba(74,143,168,0.1); } 50% { box-shadow: 0 2px 20px rgba(74,143,168,0.35); border-color: #3a7a94; } }
        .water-reminder-desc { font-size: 13px; color: #2d3a2e; font-weight: 600; line-height: 1.5; margin-bottom: 12px; }
        .water-reminder-config { background: rgba(74,143,168,0.06); border-radius: 12px; padding: 12px; margin-bottom: 12px; }
        .reminder-row { display: flex; align-items: center; gap: 10px; justify-content: center; }
        .reminder-label { font-weight: 700; font-size: 14px; color: #2d3a2e; }
        .reminder-select { padding: 8px 12px; border: 1.5px solid #4a8fa8; border-radius: 10px; font-family: 'Nunito'; font-size: 14px; font-weight: 700; color: #3a7a94; background: white; cursor: pointer; }
        .reminder-calc { text-align: center; margin-top: 8px; font-size: 13px; font-weight: 700; color: #4a8fa8; }
        .water-reminder-btn { display: block; width: 100%; background: linear-gradient(135deg, #4a8fa8, #3a7a94); color: white; border: none; border-radius: 14px; padding: 14px; font-family: 'Nunito'; font-weight: 800; font-size: 15px; cursor: pointer; box-shadow: 0 3px 12px rgba(74,143,168,0.3); transition: transform 0.15s, box-shadow 0.15s; }
        .water-reminder-btn:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(74,143,168,0.4); }
        .water-reminder-btn:active { transform: scale(0.98); }
        .reminder-note { font-size: 11px; color: #6b7c6e; text-align: center; margin-top: 8px; font-style: italic; }
        .week-bars { display: flex; justify-content: space-between; margin-top: 14px; }
        .week-col { text-align: center; flex: 1; }
        .bar-track { width: 28px; height: 56px; background: rgba(107,163,190,0.15); border-radius: 14px; margin: 0 auto 6px; position: relative; overflow: hidden; }
        .bar-fill { position: absolute; bottom: 0; width: 100%; background: rgba(74,143,168,0.6); border-radius: 14px; transition: height 0.4s ease; }
        .bar-fill.today { background: #3a7a94; }
        .bar-label { font-size: 12px; color: #3a5a40; font-weight: 600; }
        .bar-label.today { color: #3a7a94; font-weight: 800; }

        /* ═══ PROFIL v5 ═══ */
        .profil-screen { padding-top: 10px; }
        .profil-box { background: rgba(255,255,255,0.93); border-radius: 20px; margin-bottom: 14px; padding: 20px; box-shadow: 0 2px 14px rgba(30,39,12,0.06); animation: slideUp 0.4s ease both; }
        .box-header { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .box-panda { font-size: 40px; line-height: 1; }
        .box-title { font-family: 'Josefin Sans'; font-weight: 700; font-size: 18px; color: #1e270c; }
        .box-subtitle { font-size: 13px; color: #3a5a40; margin-top: 2px; font-weight: 600; }
        .avatar-zone { display: flex; flex-direction: column; align-items: center; }
        .avatar-circle { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg,#e8f0e4,#f5f0eb); border: 3px solid rgba(91,122,94,0.2); display: flex; align-items: center; justify-content: center; font-size: 44px; margin-bottom: 10px; cursor: pointer; position: relative; transition: transform 0.2s; }
        .avatar-circle:hover { transform: scale(1.05); }
        .avatar-edit-hint { position: absolute; bottom: -2px; right: -2px; background: #34490a; color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; }
        .profil-name { font-family: 'Josefin Sans'; font-weight: 700; font-size: 22px; color: #1e270c; cursor: pointer; margin-bottom: 4px; }
        .edit-pen { font-size: 14px; color: #9aaa9c; margin-left: 4px; }
        .name-edit-row { display: flex; gap: 8px; justify-content: center; margin: 6px 0; }
        .p-name-input { font-family: 'Josefin Sans'; font-weight: 700; font-size: 18px; color: #1e270c; border: 2px solid #5b7a5e; border-radius: 12px; padding: 6px 14px; text-align: center; background: #f5f0eb; outline: none; width: 140px; }
        .btn-sm { background: #34490a; color: white; border: none; border-radius: 10px; padding: 8px 14px; font-family: 'Nunito'; font-weight: 700; font-size: 13px; cursor: pointer; }
        .profil-stats-row { display: flex; justify-content: center; gap: 20px; margin-top: 14px; align-items: center; }
        .pstat { text-align: center; }
        .pstat-v { font-weight: 800; font-size: 18px; }
        .pstat-v.gold { color: #c9a96e; }
        .pstat-v.orange { color: #d4845a; }
        .pstat-l { font-size: 12px; color: #3a5a40; font-weight: 600; }
        .pstat-div { width: 1px; height: 28px; background: rgba(154,170,156,0.2); }

        /* MIROIR */
        .miroir-result { background: linear-gradient(135deg,#f5f0eb,#e8f0e4); border-radius: 16px; padding: 20px; text-align: center; }
        .miroir-date { font-size: 12px; color: #6b7c6e; margin-bottom: 8px; font-weight: 600; }
        .miroir-animal { font-size: 48px; margin-bottom: 6px; }
        .miroir-name { font-family: 'Josefin Sans'; font-weight: 700; font-size: 20px; color: #1e270c; }
        .miroir-letter { font-size: 13px; color: #6b7c6e; margin-top: 2px; }
        .miroir-insight { margin-top: 14px; padding: 14px; background: rgba(255,255,255,0.7); border-radius: 12px; text-align: left; font-size: 14px; line-height: 1.6; color: #2d2f2e; font-weight: 600; }
        .miroir-insight-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .miroir-insight-panda { font-size: 28px; line-height: 1; }
        .miroir-insight-title { font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
        .miroir-insight-title.up { color: #3a5a40; }
        .miroir-insight-title.down { color: #a0604a; }
        .miroir-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
        .tag-plus { flex: 1; min-width: calc(50% - 4px); background: rgba(91,122,94,0.12); color: #3a5a40; border-radius: 14px; padding: 8px 14px; font-size: 13px; font-weight: 700; text-align: center; }
        .tag-minus { flex: 1; min-width: calc(50% - 4px); background: rgba(192,120,90,0.12); color: #a0604a; border-radius: 14px; padding: 8px 14px; font-size: 13px; font-weight: 700; text-align: center; }
        .miroir-btns { display: flex; gap: 8px; margin-top: 16px; }
        .miroir-cta { flex: 1; background: #34490a; color: white; border: none; border-radius: 14px; padding: 14px; font-family: 'Nunito'; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; }
        .miroir-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(52,73,10,0.2); }
        .miroir-cta:active { transform: scale(0.98); }
        .miroir-share { width: 48px; background: linear-gradient(135deg,#c9a96e,#b89860); color: white; border: none; border-radius: 14px; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.15s; box-shadow: 0 2px 8px rgba(201,169,110,0.3); }
        .miroir-share:hover { transform: translateY(-1px); }

        /* RELATIONS */
        .relation-item { border-bottom: 1px solid rgba(154,170,156,0.1); padding: 12px 0; }
        .relation-item:last-child { border-bottom: none; }
        .relation-top { display: flex; align-items: center; gap: 10px; cursor: pointer; width: 100%; background: none; border: none; font-family: 'Nunito'; text-align: left; padding: 0; }
        .relation-top:hover { opacity: 0.85; }
        .rel-animal { font-size: 28px; }
        .rel-info { flex: 1; }
        .rel-label { font-weight: 800; font-size: 16px; color: #1e270c; }
        .rel-meta { font-size: 13px; color: #3a5a40; font-weight: 600; margin-top: 2px; }
        .rel-star { font-size: 18px; }
        .rel-arrow { font-size: 14px; color: #9aaa9c; transition: transform 0.2s; }
        .rel-arrow.open { transform: rotate(90deg); }
        .relation-detail { margin-top: 10px; padding: 16px; background: rgba(245,240,235,0.6); border-radius: 12px; font-size: 13px; color: #2d2f2e; line-height: 1.7; }
        .relation-detail .tags-row { display: flex; gap: 6px; flex-wrap: wrap; margin: 10px 0; }
        .rel-actions { display: flex; gap: 8px; margin-top: 12px; }
        .rel-btn { flex: 1; padding: 10px; border-radius: 10px; border: none; font-family: 'Nunito'; font-weight: 600; font-size: 12px; cursor: pointer; transition: transform 0.15s; }
        .rel-btn:active { transform: scale(0.96); }
        .rel-btn.continue { background: #34490a; color: white; }
        .rel-btn.share { background: rgba(91,122,94,0.12); color: #3a5a40; }
        .testimonial-zone { margin-top: 10px; padding: 12px; background: rgba(201,169,110,0.08); border-radius: 12px; }
        .testimonial-zone h4 { font-size: 13px; font-weight: 700; color: #c9a96e; margin-bottom: 8px; }
        .testimonial-input { width: 100%; border: 1px solid rgba(154,170,156,0.3); border-radius: 10px; padding: 10px; font-family: 'Nunito'; font-size: 13px; resize: vertical; min-height: 60px; background: white; outline: none; }
        .testimonial-input:focus { border-color: #5b7a5e; }
        .testimonial-submit { margin-top: 8px; background: #c9a96e; color: white; border: none; border-radius: 10px; padding: 8px 16px; font-family: 'Nunito'; font-weight: 700; font-size: 12px; cursor: pointer; }

        /* CARTES */
        .carte-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(154,170,156,0.1); cursor: pointer; }
        .carte-item:last-child { border-bottom: none; }
        .carte-item:hover { opacity: 0.85; }
        .carte-dos { width: 40px; height: 54px; border-radius: 8px; background: linear-gradient(135deg,#a8d8ea,#82c4d8); border: 2px solid #5ba0b5; display: flex; align-items: center; justify-content: center; color: white; font-family: 'Josefin Sans'; font-weight: 700; font-size: 16px; box-shadow: 0 2px 6px rgba(91,160,181,0.25); flex-shrink: 0; text-shadow: 0 1px 3px rgba(0,0,0,0.2); }
        .carte-phrase { flex: 1; font-size: 13px; color: #2d2f2e; line-height: 1.4; font-style: italic; }
        .carte-expand { padding: 12px; margin: 4px 0 8px; background: rgba(245,240,235,0.6); border-radius: 12px; }
        .carte-level { margin-bottom: 8px; padding: 8px 0; border-bottom: 1px solid rgba(154,170,156,0.08); }
        .carte-level:last-child { border-bottom: none; }
        .carte-level-name { font-weight: 700; font-size: 12px; color: #5b7a5e; margin-bottom: 4px; }
        .carte-level-text { font-size: 13px; line-height: 1.5; }
        .carte-buy-btn { display: block; width: 100%; margin-top: 14px; background: rgba(168,216,234,0.15); border: 2px solid #82c4d8; color: #4a8fa8; border-radius: 14px; padding: 12px; font-family: 'Nunito'; font-weight: 700; font-size: 13px; cursor: pointer; text-align: center; transition: background 0.15s; }
        .carte-buy-btn:hover { background: rgba(168,216,234,0.25); }

        /* CHEMIN MUDRÂS */
        .path-container { position: relative; padding: 14px 10px; background: rgba(107,163,190,0.12); border-radius: 14px; }
        .stepping-stones { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; padding: 10px 0; }
        .stone { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; transition: all 0.3s ease; }
        .stone.walked { background: linear-gradient(135deg,#5b7a5e,#3a5a40); color: white; box-shadow: 0 2px 6px rgba(58,90,64,0.3); }
        .stone.current { background: linear-gradient(135deg,#c9a96e,#b89860); color: white; box-shadow: 0 2px 8px rgba(201,169,110,0.4); animation: pulse 2s ease infinite; }
        .stone.upcoming { background: rgba(154,170,156,0.15); color: #9aaa9c; }
        .stone.mudra-stone { width: 38px; height: 38px; font-size: 16px; border: 2px solid; }
        .stone.mudra-stone.walked { border-color: #3a5a40; }
        .stone.mudra-stone.current { border-color: #c9a96e; }
        .stone.mudra-stone.upcoming { border-color: rgba(154,170,156,0.2); }
        .stone.mudra-stone.special { border-color: #5a5aa0; }
        .stone.mudra-stone.special.walked { background: linear-gradient(135deg,#5a5aa0,#7a6ab0); box-shadow: 0 2px 8px rgba(90,90,160,0.35); }
        .stone.mudra-stone.final { border-color: #3a2a6e; border-width: 2px; }
        .stone.mudra-stone.final.upcoming { background: rgba(90,90,160,0.35); }
        .path-legend { display: flex; gap: 14px; justify-content: center; margin-top: 10px; font-size: 10px; color: #6b7c6e; }
        .legend-item { display: flex; align-items: center; gap: 4px; }
        .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
        .legend-dot.green { background: #3a5a40; }
        .legend-dot.gold { background: #c9a96e; }
        .legend-dot.gray { background: rgba(154,170,156,0.3); }
        .path-progress { margin-top: 14px; text-align: center; }
        .progress-bar-track { height: 6px; background: rgba(154,170,156,0.15); border-radius: 3px; margin: 8px 0; }
        .progress-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg,#5b7a5e,#c9a96e); transition: width 0.6s ease; }
        .path-stats { display: flex; gap: 12px; justify-content: center; margin-top: 8px; }
        .path-stat { text-align: center; }
        .path-stat-v { font-weight: 800; font-size: 16px; color: #3a5a40; display: flex; align-items: center; gap: 4px; }
        .path-stat-l { font-size: 11px; color: #3a5a40; font-weight: 600; }
        .path-cta { display: block; width: 100%; margin-top: 14px; background: #34490a; color: white; border: none; border-radius: 14px; padding: 14px; font-family: 'Nunito'; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform 0.15s; }
        .path-cta:hover { transform: translateY(-1px); }
        .path-cta:active { transform: scale(0.98); }
        .path-galet-hint { margin-top: 10px; padding: 12px; background: rgba(201,169,110,0.1); border-radius: 10px; font-size: 13px; color: #3a5a40; text-align: center; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .path-credit { margin-top: 10px; font-size: 11px; color: #9aaa9c; text-align: center; font-style: italic; }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }

        /* GALETS */
        .galets-summary { text-align: center; padding: 10px 0; }
        .galets-big { font-size: 36px; font-weight: 800; color: #c9a96e; }
        .galets-label { font-size: 14px; color: #3a5a40; margin-top: 2px; font-weight: 600; }
        .galets-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 14px; }
        .galet-item { background: rgba(201,169,110,0.12); border-radius: 12px; padding: 12px; text-align: center; border: 1px solid rgba(201,169,110,0.2); }
        .galet-item-val { font-weight: 800; font-size: 16px; color: #c9a96e; }
        .galet-item-label { font-size: 11px; color: #5a4a3a; margin-top: 3px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
        .galets-earn-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 100%; margin-top: 12px; background: transparent; border: none; padding: 10px; font-family: 'Nunito'; cursor: pointer; transition: transform 0.15s; }
        .galets-earn-btn:hover { transform: translateY(-2px); }
        .galets-earn-btn:active { transform: scale(0.98); }
        .galets-earn-panda { filter: drop-shadow(0 3px 8px rgba(0,0,0,0.1)); }
        .galets-earn-text { font-weight: 700; font-size: 14px; color: #3a5a40; line-height: 1.4; }
        .galets-explain { margin-top: 14px; padding: 12px; background: rgba(160,130,90,0.12); border-radius: 12px; font-size: 13px; color: #5a4a3a; line-height: 1.5; }

        /* PARRAINAGE */
        .parrain-stats { display: flex; gap: 12px; margin-bottom: 14px; }
        .parrain-stat { flex: 1; background: rgba(201,169,110,0.12); border-radius: 12px; padding: 14px; text-align: center; border: 1px solid rgba(201,169,110,0.2); }
        .parrain-v { font-weight: 800; font-size: 20px; color: #34490a; }
        .parrain-v.gold { color: #c9a96e; }
        .parrain-l { font-size: 11px; color: #5a4a3a; margin-top: 2px; }
        .parrain-rules { margin-bottom: 14px; padding: 14px; background: rgba(245,240,235,0.6); border-radius: 12px; }
        .parrain-rules-title { font-weight: 700; font-size: 13px; color: #2d2f2e; margin-bottom: 10px; cursor: pointer; }
        .parrain-rule { display: flex; align-items: center; gap: 10px; padding: 6px 0; font-size: 13px; }
        .parrain-rule + .parrain-rule { border-top: 1px solid rgba(154,170,156,0.1); padding-top: 8px; }
        .rule-galets { background: rgba(201,169,110,0.15); color: #c9a96e; border-radius: 8px; padding: 3px 8px; font-weight: 800; font-size: 12px; flex-shrink: 0; border: 1px solid rgba(201,169,110,0.3); }
        .rule-text { font-size: 12px; color: #2d2f2e; line-height: 1.4; }
        .filleul-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(154,170,156,0.1); }
        .filleul-item:last-child { border-bottom: none; }
        .filleul-name { font-weight: 600; font-size: 13px; flex: 1; }
        .filleul-date { font-size: 11px; color: #6b7c6e; }
        .filleul-badge { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 10px; }
        .filleul-badge.gratuit { background: rgba(91,122,94,0.1); color: #3a5a40; }
        .filleul-badge.payant { background: rgba(201,169,110,0.15); color: #c9a96e; }
        .share-btn { display: block; width: 100%; margin-top: 14px; background: #34490a; color: white; border: none; border-radius: 14px; padding: 14px; font-family: 'Nunito'; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform 0.15s; }
        .share-btn:hover { transform: translateY(-1px); }
        .share-btn:active { transform: scale(0.98); }

        /* BONUS */
        .bonus-box { border: 2px solid rgba(201,169,110,0.25); }
        .bonus-links { display: flex; flex-direction: column; gap: 8px; }
        .bonus-link-btn { width: 100%; padding: 14px; border-radius: 12px; border: 1px solid rgba(154,170,156,0.2); background: rgba(245,240,235,0.5); font-family: 'Nunito'; font-weight: 700; font-size: 14px; color: #2d2f2e; cursor: pointer; text-align: left; transition: background 0.15s; }
        .bonus-link-btn:hover { background: rgba(245,240,235,0.8); }

        /* MENU */
        .menu-box { background: rgba(255,255,255,0.93); border-radius: 16px; overflow: hidden; box-shadow: 0 2px 10px rgba(30,39,12,0.05); animation: slideUp 0.4s ease both; }
        .menu-item { width: 100%; display: flex; align-items: center; gap: 12px; padding: 14px 16px; border: none; background: transparent; cursor: pointer; text-align: left; font-family: 'Nunito'; transition: background 0.15s; }
        .menu-item:hover { background: rgba(91,122,94,0.04); }
        .menu-item + .menu-item { border-top: 1px solid rgba(154,170,156,0.1); }
        .menu-i { font-size: 17px; }
        .menu-l { flex: 1; font-weight: 600; font-size: 14px; }
        .menu-l.danger { color: #c0392b; }
        .menu-v { font-size: 12px; color: #6b7c6e; }
        .menu-arrow { color: #9aaa9c; font-size: 16px; }

        /* ═══ FOOTER LÉGER ═══ */
        .app-footer-legal { text-align: center; padding: 16px 0 80px; font-size: 10px; color: #9aaa9c; }
        /* ═══ NAVIGATION ═══ */
        .app-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-top: 1px solid rgba(154,170,156,0.1); display: flex; padding: 6px 0 max(6px, env(safe-area-inset-bottom)); z-index: 100; }
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
        <div className="app-footer-legal">© Centre VITA — VITA® · Panda Zen™</div>

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
