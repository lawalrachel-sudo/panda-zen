import React from 'react';
// ═══════════════════════════════════════
// MODULE BREATHING V13 - PANDA ZEN
// Base : V8 + nouveautés V13 (18/02/2026)
// Nouveautés :
//   1. Badge panda 28px à droite du titre ex-card
//   2. Nav 36px images GitHub (remplace emojis)
//   3. Musique Cloudinary — icône 🔇/🎵 + toast unique
//   4. Galets header live (🪨 + compteur)
// À intégrer dans App.jsx — remplace BreathScreen placeholder
// ═══════════════════════════════════════

// ─────────────────────────────────────────
// CONSTANTES MUSIQUE (à placer en haut de App.jsx avec les autres consts)
// ─────────────────────────────────────────
const BASE_SOUNDS = 'https://res.cloudinary.com/dbkpvp9ts/video/upload/';
const MUSIC_LIBRARY = {
  zen:    ['zen_1.mp3','zen_2.mp3','zen_3.mp3','zen_4.mp3','zen_5.mp3'],
  bols:   ['bols_1.mp3','bols_2.mp3','bols_3.mp3'],
  nature: ['nature_1.mp3','nature_2.mp3','nature_3.mp3']
};
// Assignation salle → catégorie musique
// 🌬️ Respiration = bols | 🎴 Carte = zen | 🐾 Relax = nature | 💧 Eau = nature | 🪞 Relations = zen
const MUSIC_CONFIG = {
  breathe:   'bols',
  card:      'zen',
  relax:     'nature',
  water:     'nature',
  relations: 'zen'
};

// ─────────────────────────────────────────
// DONNÉES BREATHING — 18 EXERCICES (6 profils)
// ─────────────────────────────────────────
const BREATHING_DATA = {
  A: {
    label: "CALMER",
    profil: "Colibri · Feu",
    besoin: "Lâcher, ralentir",
    color: "#4a8fa8",
    badge: "Badge_FEU__equilibre_.png",
    img: "e_le_ment_feu.png",
    animal: "Colibri",
    element: "Feu",
    phrase: "Laisser la pensée passer sans la retenir",
    guideTxt: "Tu rumines et ton mental tourne. Ces respirations sont faites pour lâcher, pas pour contrôler.",
    salleApres: { nom: "Carte VITA du jour", emoji: "🎴", tab: 2 },
    exercises: [
      {
        id: "A1",
        name: "Soupir Cyclique",
        subtitle: "Double inspir + longue expir",
        duration: "1–5 min",
        zenTxt: "Imagine que chaque soupir libère une pensée qui tourne en boucle. Tu n'as rien à retenir. Juste laisser sortir, encore et encore.",
        pratique: [
          "Inspire une première fois par le nez, court et rapide — remplis tes poumons à moitié.",
          "Enchaîne immédiatement une deuxième inspire, toujours par le nez — complète jusqu'au bout.",
          "Expire lentement par la bouche sur 6 temps, les joues légèrement gonflées, sans forcer."
        ],
        reps: "En continu pendant la durée choisie",
        position: "Assis ou debout, yeux ouverts ou fermés",
        astuces: "Si ton esprit repart, pas de jugement — reviens au soupir. C'est ça, la pratique.",
        source: "Balban et al. (2023), Cell Reports Medicine, Stanford University."
      },
      {
        id: "A2",
        name: "Respiration 4-7-8",
        subtitle: "Inspir · Rétention · Expir très longue",
        duration: "1–3 min",
        zenTxt: "Ce rythme particulier active ton frein naturel — le système parasympathique. Plus tu pratiques, plus il répond vite.",
        pratique: [
          "Inspire par le nez en 4 temps, régulièrement, pour remplir tes poumons.",
          "Retiens le souffle poumons pleins pendant 7 temps. Si c'est trop long au début, commence à 4.",
          "Expire par la bouche en 8 temps avec un léger son 'whoosh'. L'expiration longue, c'est la clé."
        ],
        reps: "4 cycles pour débuter, jusqu'à 8 avec la pratique",
        position: "Assis, bout de la langue derrière les incisives supérieures",
        astuces: "Le ratio 4-7-8 est plus important que la durée exacte. Adapte si besoin.",
        source: "Dr Andrew Weil, MD (University of Arizona) — recommandée NHS UK."
      },
      {
        id: "A3",
        name: "Expiration Prolongée",
        subtitle: "Expir = double de l'inspir (ratio 1:2)",
        duration: "2–5 min",
        zenTxt: "L'expiration longue envoie le signal de sécurité à ton corps. Pas besoin de chercher à te calmer — laisse l'expiration faire le travail.",
        pratique: [
          "Inspire par le nez en 4 temps, naturellement et sans forcer.",
          "Expire par le nez ou la bouche en 8 temps — lentement, en laissant tout aller."
        ],
        reps: "En flux continu pendant la durée choisie",
        position: "Assis, allongé ou debout selon ton envie",
        astuces: "Place une main sur le ventre pour sentir le mouvement. C'est ton ancre.",
        source: "HeartMath Institute — activation du nerf vague et système parasympathique."
      }
    ]
  },
  B: {
    label: "ÉQUILIBRER",
    profil: "Langouste · Feu",
    besoin: "Structure, cadre",
    color: "#c9a96e",
    badge: "BADGE_FEU.png",
    img: "e_le_ment_feu.png",
    animal: "Langouste",
    element: "Feu",
    phrase: "Trouver une structure apaisante et stable",
    guideTxt: "Tu as besoin de repères solides pour te sentir bien.",
    salleApres: { nom: "Panda Relax", emoji: "🐾", tab: 3 },
    exercises: [
      {
        id: "B1",
        name: "Box Breathing",
        subtitle: "Respiration Carrée — 4 temps égaux",
        duration: "2–5 min",
        zenTxt: "Quatre côtés égaux, un carré parfait. Le Box Breathing est utilisé par les Navy SEALs pour retrouver le calme sous pression. La structure régulière apaise le mental.",
        pratique: [
          "Inspire par le nez en 4 temps — remplis bien les poumons.",
          "Retiens le souffle 4 temps, poumons pleins.",
          "Expire par le nez en 4 temps — vide complètement.",
          "Reste poumons vides 4 temps. C'est 1 cycle. Recommence."
        ],
        reps: "5 à 10 cycles (1 cycle = 16s)",
        position: "Assis, dos droit, mains sur cuisses",
        astuces: "Visualise un carré en dessinant chaque côté mentalement pendant chaque phase.",
        source: "US Navy SEALs (Mark Divine) — HeartMath : effet stabilisant des ratios égaux."
      },
      {
        id: "B2",
        name: "Cohérence Cardiaque 5-5",
        subtitle: "Ratio 1:1 strict, 6 respirations/min",
        duration: "5 min",
        zenTxt: "6 respirations par minute — c'est la fréquence de résonance du cœur humain. À ce rythme, cœur et cerveau entrent en harmonie. Simple, puissant, prouvé.",
        pratique: [
          "Inspire par le nez en 5 temps — régulier et fluide.",
          "Expire par le nez ou la bouche en 5 temps — régulier et fluide.",
          "Répète sans interruption. 30 cycles = 5 minutes complètes."
        ],
        reps: "30 cycles = 5 min (idéalement 3×/jour : matin, midi, soir)",
        position: "Assis, relaxé",
        astuces: "Ferme les yeux et place une main sur le cœur. Sens le rythme se stabiliser.",
        source: "Dr David O'Hare 'Cohérence Cardiaque 365' (2012), HeartMath Institute."
      },
      {
        id: "B3",
        name: "Respiration Comptée Progressive",
        subtitle: "Comptage croissant = ancrage de l'attention",
        duration: "2–5 min",
        zenTxt: "Compter progressivement occupe le mental, lui donnant un cadre précis. Chaque palier monte, puis redescend — comme une vague régulière qui ancre.",
        pratique: [
          "Commence par inspirer 2s / expirer 2s.",
          "Monte d'un temps à chaque cycle : 3-3, 4-4, 5-5, 6-6.",
          "Au sommet (6-6), redescends : 5-5, 4-4, 3-3, 2-2.",
          "1 montée + 1 descente = 1 série. Fais 2 à 3 séries."
        ],
        reps: "2 à 3 séries complètes",
        position: "Assis ou allongé",
        astuces: "Si tu perds le compte, reprends à 2 sans te juger. Le compte, c'est l'outil, pas l'objectif.",
        source: "Tradition méditative universelle (Vipassana, Zen) — comptage pour ancrage mental."
      }
    ]
  },
  C: {
    label: "ANCRER / PROFONDEUR",
    profil: "Tortue · Terre",
    besoin: "Profondeur, stabilité",
    color: "#8b7355",
    badge: "Badge_TERRE.png",
    img: "e_le_ment_terre.png",
    animal: "Tortue",
    element: "Terre",
    phrase: "Trouver la profondeur et la stabilité en soi",
    guideTxt: "Tu cherches à contrôler. Ces respirations t'invitent à descendre en toi, pas à maîtriser.",
    salleApres: { nom: "Hydratation", emoji: "💧", tab: 4 },
    exercises: [
      {
        id: "C1",
        name: "Respiration Abdominale",
        subtitle: "Diaphragmatique — Respirer par le ventre",
        duration: "3–5 min",
        zenTxt: "La respiration abdominale, c'est revenir à la respiration naturelle du nouveau-né — profonde, ventrale, instinctive. Ton corps sait déjà faire ça.",
        pratique: [
          "Assieds-toi ou allonge-toi. Place ta main droite sur le ventre, la gauche sur la poitrine.",
          "Inspire par le nez en 5 temps — le ventre gonfle, la poitrine reste immobile.",
          "Expire par le nez en 6 temps, lèvres légèrement pincées — le ventre rentre doucement."
        ],
        reps: "En continu pendant la durée choisie",
        position: "Assis ou allongé (allongé = plus facile pour sentir)",
        astuces: "Si la poitrine monte en premier, ralentis. Le ventre doit mener.",
        source: "American Lung Association — NHS UK recommandée pour anxiété et gestion douleur."
      },
      {
        id: "C2",
        name: "Respiration en Vague",
        subtitle: "Body Scan Breath — Profondeur somatique",
        duration: "3–5 min",
        zenTxt: "Une vague chaude monte à l'inspiration, redescend à l'expiration. Ton corps entier participe. La profondeur ne vient pas de la tête — elle vient du ressenti.",
        pratique: [
          "Allonge-toi, yeux fermés. Inspire en 5 temps — vague chaude : pieds → jambes → ventre → poitrine → tête.",
          "Temps plein 2s — vague au sommet.",
          "Expire en 5 temps — vague redescend : tête → poitrine → ventre → jambes → pieds.",
          "Temps vide 2s — vague se retire. Recommence."
        ],
        reps: "5 à 8 cycles",
        position: "Allongé de préférence",
        astuces: "Si la visualisation est difficile, concentre-toi juste sur la sensation de chaleur.",
        source: "Sophrologie (Alfonso Caycedo) — Body scan MBSR (Jon Kabat-Zinn)."
      },
      {
        id: "C3",
        name: "Respiration Enracinement",
        subtitle: "Grounding Breath — Connexion terre",
        duration: "2–3 min",
        zenTxt: "Pieds nus sur le sol, tu envoies des racines à chaque expiration. Ce n'est pas une métaphore — c'est une sensation corporelle réelle.",
        pratique: [
          "Assieds-toi, pieds nus au sol. Sense le contact des plantes de pieds avec le sol.",
          "Inspire en 4 temps — chaleur monte : plante pieds → jambes → bassin → colonne.",
          "Rétention 2s — énergie au centre du corps.",
          "Expire en 6 temps — racines descendent de tes pieds dans le sol, de plus en plus profondes.",
          "Rétention vide 2s — sens la stabilité."
        ],
        reps: "5 à 8 cycles",
        position: "Assis pieds au sol (chaise ou sol)",
        astuces: "Si tu es debout, c'est encore mieux. Le contact avec le sol amplifie la sensation.",
        source: "Qi gong (Zhan Zhuang — posture de l'arbre) — Oschman et al. (2015), Journal of Inflammation Research."
      }
    ]
  },
  D: {
    label: "EXPRIMER",
    profil: "Giraumon · Métal",
    besoin: "Exprimer, sortir le son",
    color: "#9e9e9e",
    badge: "Badge_METAL.png",
    img: "e_le_ment_me_tal.png",
    animal: "Giraumon",
    element: "Métal",
    phrase: "Laisser sortir ce qui retient en dedans",
    guideTxt: "Tu te retires souvent plutôt que d'exprimer. Ces respirations sonores t'invitent à laisser sortir — doucement.",
    salleApres: { nom: "Relations", emoji: "🪞", tab: 5 },
    exercises: [
      {
        id: "D1",
        name: "Bhramari",
        subtitle: "Abeille Bourdonnante — Vibration crâne et corps",
        duration: "2–5 min",
        zenTxt: "Le bourdonnement crée une vibration interne que tu peux sentir dans tes lèvres, ton nez, ton front. Ce son vient de toi — il t'appartient.",
        pratique: [
          "Assieds-toi dos droit, yeux fermés. Inspire profondément en 5 temps par le nez.",
          "Expire en faisant 'HMMMM' grave et continu — bouche fermée, son qui dure 8 temps.",
          "Sens la vibration : lèvres → nez → front → crâne → poitrine.",
          "Reste dans le silence 3s après l'expiration. Écoute la résonance intérieure."
        ],
        reps: "3 à 7 cycles",
        position: "Assis dos droit. Option : doigts sur cartilages des oreilles (Shanmukhi Mudra)",
        astuces: "Plus le son est grave, plus la vibration descend dans le corps. Joue avec ça.",
        source: "Hatha Yoga Pradipika — PMC 2024 (46 études) : effets sur tension artérielle, variabilité cardiaque, anxiété."
      },
      {
        id: "D2",
        name: "Ujjayi",
        subtitle: "Souffle de l'Océan — Son de vague",
        duration: "3–5 min",
        zenTxt: "La gorge légèrement contractée crée un son de vague — inspirant et expirant. Ce son est ton ancre. Quand l'esprit part, reviens au son.",
        pratique: [
          "Bouche fermée, contracte légèrement l'arrière de la gorge — comme si tu voulais embuer un miroir avec la bouche fermée.",
          "Inspire en 5 temps — son de vague entrante 'hhhhh' audible pour toi seul.",
          "Expire en 6 temps — son de vague sortante 'haaaah' doux."
        ],
        reps: "En continu pendant la durée choisie",
        position: "Assis ou pendant activité douce (marche lente, yoga)",
        astuces: "Le son doit être audible par toi, pas par quelqu'un à 2m. Ni trop fort, ni trop faible.",
        source: "Tradition Ashtanga Yoga (K. Pattabhi Jois) — régulation température + activation parasympathique."
      },
      {
        id: "D3",
        name: "Om / Souffle Chanté",
        subtitle: "Vibration voyelle traversant le corps",
        duration: "2–3 min",
        zenTxt: "Om n'est pas une prière — c'est une vibration. O dans le ventre, U dans la poitrine, M dans le crâne. Ton corps devient instrument.",
        pratique: [
          "Inspire profondément en 5 temps.",
          "Expire en chantant lentement : 'OOOO' 2s (ventre/bassin) → 'UUUU' 2s (poitrine/cœur) → 'MMMM' 4s (crâne/front, bouche se ferme).",
          "Silence 3s — écoute la résonance."
        ],
        reps: "5 à 10 cycles",
        position: "Assis dos droit",
        astuces: "Variante simple si Om te bloque : juste 'AAAAAHHH' long sur toute l'expiration. Même effet libérateur.",
        source: "Tradition védique (5000+ ans) — Mooventhan & Khode (2014, IJOY) : Om améliore la fonction pulmonaire."
      }
    ]
  },
  E: {
    label: "ÉNERGISER",
    profil: "Scarabée Rhino · Eau",
    besoin: "Recharger, faire circuler",
    color: "#5b7a5e",
    badge: "BAdge_eau.png",
    img: "e_le_ment_eau.png",
    animal: "Scarabée Rhino",
    element: "Eau",
    phrase: "Recharger son énergie propre et retrouver son flux",
    guideTxt: "Tu portes beaucoup pour les autres — souvent sans t'en rendre compte. Ces respirations dynamisantes sont pour toi, rien que pour toi.",
    salleApres: { nom: "Carte VITA du jour", emoji: "🎴", tab: 2 },
    exercises: [
      {
        id: "E1",
        name: "Bhastrika",
        subtitle: "Soufflet du Forgeron — activation puissante",
        duration: "1–3 min",
        zenTxt: "Bhastrika réveille ta force intérieure. Les pompages rapides oxygènent le sang en quelques secondes. La rétention crée un espace de silence rare.",
        pratique: [
          "Assieds-toi dos droit. Commence par 25 inspirations et expirations rapides par le nez — environ 1 par seconde. Ton ventre pompe activement.",
          "Après les 25 cycles : inspire profondément en 3 temps, poumons pleins.",
          "Retiens le souffle 15 à 20 secondes selon ton confort.",
          "Expire lentement en 5 temps. Repose-toi 30 secondes. Recommence 3 fois."
        ],
        reps: "3 rounds complets avec pause entre chaque",
        position: "Assis dos droit, mains sur les genoux",
        astuces: "Si tu ressens des étourdissements, ralentis immédiatement. Pratique estomac vide.",
        source: "Hatha Yoga Pradipika (~15e s.) — PMC confirme l'activation sympathique."
      },
      {
        id: "E2",
        name: "Kapalabhati",
        subtitle: "Crâne Brillant — expirations actives",
        duration: "1–3 min",
        zenTxt: "Dans Kapalabhati, l'expiration est active — courte, sèche, nette. L'inspiration suit passivement, automatiquement. Ton corps reprend le contrôle.",
        pratique: [
          "Inspire une fois profondément pour commencer.",
          "Enchaîne 30 expirations rapides et sèches par le nez — ton ventre rentre d'un coup à chaque fois. L'inspiration se fait seule, passivement.",
          "Après les 30 cycles : grande inspiration, rétention 15 secondes, expiration lente.",
          "Repose-toi et recommence. 3 rounds au total."
        ],
        reps: "3 rounds de 30 expirations avec pause",
        position: "Assis dos droit",
        astuces: "C'est le ventre qui travaille, pas les poumons. Concentre-toi sur le mouvement abdominal.",
        source: "Hatha Yoga Pradipika — PMC : amélioration capacité pulmonaire et éveil mental."
      },
      {
        id: "E3",
        name: "Respiration Dynamisante",
        subtitle: "Souffle + mouvement = circulation",
        duration: "1–2 min",
        zenTxt: "Le mouvement des bras amplifie la respiration — l'énergie circule mieux quand le corps est en jeu. Simple pour se sentir vivant rapidement.",
        pratique: [
          "Debout, pieds à largeur des hanches. Lève les bras vers le haut en inspirant par le nez en 2 temps.",
          "Redescends les bras le long du corps en expirant par la bouche en 2 temps.",
          "Accélère progressivement jusqu'à un rythme rapide sur 10 à 20 répétitions.",
          "Termine par une grande inspiration bras en l'air, rétention 5 secondes, expiration lente bras qui descendent."
        ],
        reps: "10 à 20 répétitions, 1 à 2 séries",
        position: "Debout, pieds à largeur des hanches",
        astuces: "Sens l'énergie dans tes bras à chaque inspiration. Laisse-la descendre dans tes jambes à l'expiration.",
        source: "Qi gong et yoga dynamique — association mouvement/souffle pour activation circulatoire."
      }
    ]
  },
  F: {
    label: "PURIFIER / RÉVÉLER",
    profil: "Abeille · Bois",
    besoin: "Libérer, révéler",
    color: "#3a5a40",
    badge: "Badge_AIR.png",
    img: "e_le_ment_bois.png",
    animal: "Abeille",
    element: "Bois",
    phrase: "Déposer le masque et laisser émerger ce qui est vrai",
    guideTxt: "Tu souris souvent pour les autres, même quand ce n'est pas ce que tu ressens vraiment. Ces respirations créent un espace rien qu'à toi — sans public, sans rôle.",
    salleApres: { nom: "Mon Miroir du jour", emoji: "🪞", tab: 5 },
    exercises: [
      {
        id: "F1",
        name: "Nadi Shodhana",
        subtitle: "Narines Alternées — équilibre des hémisphères",
        duration: "3–5 min",
        zenTxt: "Alterner les narines équilibre les deux hémisphères — intuition et logique, douceur et clarté. Une des pratiques les plus puissantes pour retrouver son centre.",
        pratique: [
          "Assieds-toi dos droit. Main gauche sur le genou gauche. Utilise le pouce droit pour la narine droite, l'annulaire pour la narine gauche.",
          "Ferme la narine droite — inspire par la narine gauche en 4 temps.",
          "Ferme les deux narines — rétention 2 temps.",
          "Ouvre la narine droite — expire en 6 temps. Puis inspire par la narine droite en 4 temps. Rétention 2 temps. Expire gauche 6 temps. C'est 1 cycle."
        ],
        reps: "5 à 10 cycles complets",
        position: "Assis dos droit, main gauche posée sur le genou",
        astuces: "Ne force pas la rétention. Si 2 temps te semble trop court, commence sans rétention.",
        source: "Yoga Sutras de Patanjali (~400 CE) — PMC : équilibrage du système nerveux autonome."
      },
      {
        id: "F2",
        name: "Respiration 3 Parties",
        subtitle: "Dirga — remplissage complet",
        duration: "3–5 min",
        zenTxt: "On remplit rarement nos poumons complètement. Cette respiration explore leur pleine capacité — une façon de te réapproprier l'espace que tu occupes.",
        pratique: [
          "Inspire d'abord dans le ventre en 3 temps — il se gonfle.",
          "Continue l'inspiration dans la poitrine en 2 temps — la cage thoracique s'ouvre.",
          "Termine en 1 temps jusqu'aux clavicules — l'air remplit la totalité des poumons.",
          "Expire lentement en 8 temps dans l'ordre inverse : clavicules, poitrine, ventre."
        ],
        reps: "5 à 8 cycles lents et conscients",
        position: "Assis ou allongé, sans contrainte",
        astuces: "Ne force pas le remplissage. Laisse chaque région s'ouvrir à son rythme.",
        source: "Yoga classique — Dirga signifie 'complet' en sanskrit."
      },
      {
        id: "F3",
        name: "Sithali",
        subtitle: "Souffle Rafraîchissant — Purifier par le frais",
        duration: "2–3 min",
        zenTxt: "L'air qui traverse la langue enroulée arrive frais dans la gorge. Une sensation physique réelle. Respirer du frais, relâcher ce qui chauffe.",
        pratique: [
          "Enroule ta langue en U et dépasse-la légèrement entre tes lèvres.",
          "Inspire par le nez en 4 temps à travers la langue — tu sens l'air frais.",
          "Ferme la bouche, expire par le nez en 6 temps, doucement.",
          "Si tu ne peux pas enrouler la langue, garde les dents légèrement serrées et inspire entre elles — même effet, c'est le Sitkari."
        ],
        reps: "5 à 10 cycles tranquilles",
        position: "Assis confortablement",
        astuces: "Environ 35% des personnes ne peuvent pas enrouler la langue — c'est génétique, pas un problème.",
        source: "Hatha Yoga Pradipika — réduction de température corporelle perçue documentée."
      }
    ]
  }
};

// ─────────────────────────────────────────
// HOOK MUSIQUE — useMusic
// (à placer dans App.jsx avant BreathScreen)
// ─────────────────────────────────────────
// Gère 1 instance audio partagée via ref
// Usage : const music = useMusic('breathe');
//         music.toggle() / music.playing
const useMusic = (salle) => {
  const audioRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [toastShown, setToastShown] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const stop = React.useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlaying(false);
  }, []);

  const play = React.useCallback(() => {
    stop();
    const cat = MUSIC_CONFIG[salle] || 'zen';
    const lib = MUSIC_LIBRARY[cat];
    const file = lib[Math.floor(Math.random() * lib.length)];
    const audio = new Audio(BASE_SOUNDS + file);
    audio.loop = true;
    audio.volume = 0.45;
    audio.play().catch(() => {}); // silent fail si MP3 pas uploadé
    audioRef.current = audio;
    setPlaying(true);
    // Toast unique par salle
    if (!toastShown) {
      setToastShown(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [salle, stop, toastShown]);

  const toggle = React.useCallback(() => {
    playing ? stop() : play();
  }, [playing, stop, play]);

  // Cleanup au démontage du composant
  React.useEffect(() => { return () => stop(); }, [stop]);

  return { playing, toggle, showToast };
};

// ─────────────────────────────────────────
// GONG — Web Audio API (400Hz départ, 300Hz fin)
// ─────────────────────────────────────────
const playGong = (freq, dur) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const gain2 = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc2.connect(gain2); gain2.connect(ctx.destination);
    osc.frequency.value = freq;
    osc2.frequency.value = freq * 1.003;
    osc.type = 'sine'; osc2.type = 'sine';
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur);
    osc2.start(ctx.currentTime); osc2.stop(ctx.currentTime + dur);
  } catch(e) {}
};
const gongStart = () => playGong(400, 3.5);
const gongEnd   = () => playGong(300, 5.5);

// ─────────────────────────────────────────
// IMAGE RAW GITHUB
// ─────────────────────────────────────────
const RAW = 'https://raw.githubusercontent.com/lawalrachel-sudo/panda-zen/main/public/images/';
const img = (file, alt, cls = 'panda-icon') =>
  <img src={`${RAW}${file}`} alt={alt} className={cls} onError={e => { e.target.style.display = 'none'; }} />;

// ─────────────────────────────────────────
// ÉCRAN RESPIRATION — BREATHING V13
// Props : galets, setGalets (depuis App.jsx)
// ─────────────────────────────────────────
const BreathScreen = ({ galets, setGalets }) => {
  const [view, setView] = React.useState("welcome"); // welcome | explore | profil | exercise
  const [selectedKey, setSelectedKey] = React.useState(null);
  const [selectedEx, setSelectedEx] = React.useState(null);
  const [fromGuide, setFromGuide] = React.useState(false);

  // Timer state
  const [duration, setDuration] = React.useState(60);
  const [timerLeft, setTimerLeft] = React.useState(60);
  const [timerTotal, setTimerTotal] = React.useState(60);
  const [running, setRunning] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const intervalRef = React.useRef(null);
  const [completedEx, setCompletedEx] = React.useState({});

  // Musique — salle Respiration = 'breathe'
  const music = useMusic('breathe');

  const clearTimer = () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } };

  const resetTimerState = (dur = 60) => {
    clearTimer();
    setRunning(false); setPaused(false); setDone(false);
    setDuration(dur); setTimerLeft(dur); setTimerTotal(dur);
  };

  const startTimer = () => {
    clearTimer();
    gongStart();
    setRunning(true); setPaused(false);
    setTimerTotal(duration); setTimerLeft(duration);
    intervalRef.current = setInterval(() => {
      setTimerLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setRunning(false);
          setDone(true);
          gongEnd();
          if (selectedEx && !completedEx[selectedEx.id]) {
            setGalets(g => g + 2);
            setCompletedEx(prev => ({ ...prev, [selectedEx.id]: true }));
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const fmtTime = (s) => s >= 60
    ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
    : `${s}s`;

  const pct = timerTotal > 0 ? ((timerTotal - timerLeft) / timerTotal * 100) : 0;

  React.useEffect(() => { return () => clearTimer(); }, []);

  const profil = selectedKey ? BREATHING_DATA[selectedKey] : null;
  const KEYS = Object.keys(BREATHING_DATA);

  // ── WELCOME ──────────────────────────────────
  if (view === "welcome") return (
    <div className="screen" style={{ position: 'relative' }}>
      {/* Icône musique — haut gauche */}
      <button onClick={music.toggle} style={{
        position: 'absolute', top: 0, left: 0,
        background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(154,170,156,0.2)',
        borderRadius: 10, padding: '5px 9px', fontSize: 16, cursor: 'pointer', zIndex: 40
      }}>{music.playing ? '🎵' : '🔇'}</button>
      {/* Toast musique unique */}
      {music.showToast && (
        <div style={{
          position: 'absolute', top: 44, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(30,39,12,0.82)', color: 'white', borderRadius: 12,
          padding: '8px 16px', fontSize: 12, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap'
        }}>🐼 Panda a choisi une musique pour cette salle</div>
      )}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        {img('souffle.png', 'Panda respire', '')}
      </div>
      <div style={{ textAlign: 'center', marginBottom: 26 }}>
        <h2 className="title-lg">Respiration</h2>
        <p className="tagline-sm">18 exercices · 6 profils</p>
      </div>
      <button className="breath-cat-card" style={{ background: '#468a4d', color: 'white', borderLeft: 'none' }}
        onClick={() => { setFromGuide(true); setSelectedKey('A'); setView('profil'); }}>
        <div style={{ fontWeight: 800, fontSize: 16 }}>🐼 Panda me guide</div>
        <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>Séance préparée selon ton profil</div>
      </button>
      <button className="breath-cat-card" onClick={() => setView('explore')}>
        <div style={{ fontWeight: 800, fontSize: 16 }}>🔍 J'explore</div>
        <div style={{ fontSize: 12, color: '#5a4a3a', marginTop: 4 }}>6 espaces · 18 exercices · tu choisis</div>
      </button>
      <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: '#bbb', fontWeight: 600 }}>
        Chaque exercice terminé = <span style={{ color: '#c9a96e' }}>+2 galets 🪨</span>
      </div>
    </div>
  );

  // ── EXPLORE (liste profils) ───────────────────
  if (view === "explore") return (
    <div className="screen" style={{ position: 'relative' }}>
      <button onClick={music.toggle} style={{
        position: 'absolute', top: 0, left: 0,
        background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(154,170,156,0.2)',
        borderRadius: 10, padding: '5px 9px', fontSize: 16, cursor: 'pointer', zIndex: 40
      }}>{music.playing ? '🎵' : '🔇'}</button>
      {music.showToast && (
        <div style={{
          position: 'absolute', top: 44, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(30,39,12,0.82)', color: 'white', borderRadius: 12,
          padding: '8px 16px', fontSize: 12, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap'
        }}>🐼 Panda a choisi une musique pour cette salle</div>
      )}
      <button className="breath-back" onClick={() => setView('welcome')}>← Retour</button>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 className="title-lg">J'explore</h2>
        <p className="tagline-sm">Choisis toi-même ton besoin du moment</p>
      </div>
      {KEYS.map(k => {
        const p = BREATHING_DATA[k];
        return (
          <button key={k} className="breath-cat-card fade-in"
            style={{ borderLeftColor: p.color, display: 'flex', alignItems: 'center', gap: 14 }}
            onClick={() => { setSelectedKey(k); setFromGuide(false); setView('profil'); }}>
            <img src={`${RAW}${p.badge}`} alt={p.animal}
              style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }}
              onError={e => { e.target.style.display = 'none'; }} />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{p.animal}</div>
              <div style={{ fontSize: 12, color: '#5a4a3a', marginTop: 2 }}>{p.phrase}</div>
            </div>
            <img src={`${RAW}${p.img}`} alt={p.element}
              style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }}
              onError={e => { e.target.style.display = 'none'; }} />
          </button>
        );
      })}
    </div>
  );

  // ── PROFIL (liste exercices) ──────────────────
  if (view === "profil" && profil) return (
    <div className="screen" style={{ position: 'relative' }}>
      <button onClick={music.toggle} style={{
        position: 'absolute', top: 0, left: 0,
        background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(154,170,156,0.2)',
        borderRadius: 10, padding: '5px 9px', fontSize: 16, cursor: 'pointer', zIndex: 40
      }}>{music.playing ? '🎵' : '🔇'}</button>
      {music.showToast && (
        <div style={{
          position: 'absolute', top: 44, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(30,39,12,0.82)', color: 'white', borderRadius: 12,
          padding: '8px 16px', fontSize: 12, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap'
        }}>🐼 Panda a choisi une musique pour cette salle</div>
      )}
      <button className="breath-back" onClick={() => setView(fromGuide ? 'welcome' : 'explore')}>← Retour</button>
      {/* Header profil */}
      <div style={{ textAlign: 'center', marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid rgba(154,170,156,0.15)' }}>
        <img src={`${RAW}${profil.badge}`} alt={profil.animal}
          style={{ width: 68, height: 68, objectFit: 'contain', marginBottom: 8 }}
          onError={e => { e.target.style.display = 'none'; }} />
        <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 20, fontWeight: 700, color: '#1e270c', marginBottom: 6 }}>
          {profil.animal}
        </div>
        <img src={`${RAW}${profil.img}`} alt={profil.element}
          style={{ width: 30, height: 30, objectFit: 'contain', margin: '0 auto', display: 'block' }}
          onError={e => { e.target.style.display = 'none'; }} />
      </div>
      {fromGuide && (
        <div style={{
          background: 'rgba(70,138,77,0.07)', borderLeft: '3px solid #468a4d',
          borderRadius: '0 12px 12px 0', padding: '12px 14px',
          fontSize: 13, color: '#2d3a2e', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 16
        }}>{profil.guideTxt}</div>
      )}
      <div style={{ fontSize: 11, fontWeight: 800, color: '#9aaa9c', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 10 }}>
        Les 3 respirations
      </div>
      {profil.exercises.map((ex, i) => (
        <button key={ex.id} className="breath-ex-card fade-in"
          style={{ animationDelay: `${i * 0.05}s` }}
          onClick={() => { setSelectedEx(ex); resetTimerState(60); setView('exercise'); }}>
          {/* TOP : nom + done + badge panda 28px (nouveauté V13) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div className="breath-ex-name" style={{ flex: 1 }}>{ex.name}</div>
            {completedEx[ex.id] && (
              <span style={{ background: '#468a4d', color: 'white', width: 20, height: 20, borderRadius: '50%', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 4 }}>✓</span>
            )}
            {/* Badge panda 28px — nouveauté V13 */}
            <img src={`${RAW}${profil.badge}`} alt=""
              style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0, marginLeft: 6 }}
              onError={e => { e.target.style.display = 'none'; }} />
          </div>
          <div className="breath-ex-subtitle">{ex.subtitle}</div>
          <div className="breath-ex-duration">⏱️ {ex.duration}</div>
          <div className="breath-ex-cta">Commencer →</div>
        </button>
      ))}
    </div>
  );

  // ── EXERCISE + TIMER ──────────────────────────
  if (view === "exercise" && selectedEx && profil) return (
    <div className="screen" style={{ position: 'relative' }}>
      <button onClick={music.toggle} style={{
        position: 'absolute', top: 0, left: 0,
        background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(154,170,156,0.2)',
        borderRadius: 10, padding: '5px 9px', fontSize: 16, cursor: 'pointer', zIndex: 40
      }}>{music.playing ? '🎵' : '🔇'}</button>
      {music.showToast && (
        <div style={{
          position: 'absolute', top: 44, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(30,39,12,0.82)', color: 'white', borderRadius: 12,
          padding: '8px 16px', fontSize: 12, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap'
        }}>🐼 Panda a choisi une musique pour cette salle</div>
      )}
      {done ? (
        /* ÉCRAN TERMINÉ */
        <>
          <button className="breath-back" onClick={() => { clearTimer(); setDone(false); setView('profil'); }}>← Exercices</button>
          <div style={{ textAlign: 'center', padding: '24px 16px 10px' }} className="fade-in">
            <img src={`${RAW}pouce_v2.png`} alt="Bravo"
              style={{ width: 90, height: 90, objectFit: 'contain', marginBottom: 14 }}
              onError={e => { e.target.outerHTML = '<div style="font-size:72px;margin-bottom:14px">👍</div>'; }} />
            <h3 style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 22, color: '#3a5a40', marginBottom: 8, fontWeight: 700 }}>Belle séance !</h3>
            <p style={{ fontSize: 13, color: '#5a4a3a', lineHeight: 1.7, marginBottom: 20, fontWeight: 600 }}>
              Prends le temps de te poser.<br />Ferme les yeux quelques instants si tu veux.<br />Et pense à boire de l'eau 💧
            </p>
            {!completedEx[selectedEx.id] === false && (
              <div style={{ color: '#c9a96e', fontWeight: 800, fontSize: 16, marginBottom: 16 }}>🪨 +2 galets</div>
            )}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <button className="breath-timer-btn primary" style={{ flex: 1 }}
                onClick={() => { clearTimer(); setDone(false); setView('profil'); }}>Autre exercice</button>
              <button className="breath-timer-btn secondary" style={{ flex: 1 }}
                onClick={() => { resetTimerState(duration); }}>Recommencer</button>
            </div>
            {profil.salleApres && (
              <div style={{
                background: 'rgba(255,255,255,0.8)', borderRadius: 14, padding: '14px 16px',
                border: '1.5px solid rgba(201,169,110,0.2)', cursor: 'pointer', textAlign: 'left'
              }}>
                <div style={{ fontSize: 11, color: '#9aaa9c', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>
                  Et si tu poussais une autre porte ?
                </div>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#1e270c' }}>
                  {profil.salleApres.emoji} {profil.salleApres.nom}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        /* ÉCRAN EXERCICE */
        <>
          <button className="breath-back" onClick={() => { clearTimer(); setRunning(false); setPaused(false); setView('profil'); }}>← Exercices</button>
          <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 20, fontWeight: 700, color: '#1e270c', marginBottom: 4 }}>{selectedEx.name}</div>
          <div style={{ fontSize: 13, color: '#5b7a5e', fontWeight: 600, lineHeight: 1.4, marginBottom: 16 }}>{selectedEx.subtitle}</div>

          {/* Box zen */}
          <div style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 16, padding: '16px 18px', marginBottom: 16, fontSize: 14, color: '#3a3d3b', lineHeight: 1.75, fontWeight: 600, boxShadow: '0 2px 10px rgba(30,39,12,0.04)' }}>
            {selectedEx.zenTxt}
          </div>

          {/* Box pratique */}
          <div style={{ background: 'rgba(255,255,255,0.75)', borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#9aaa9c', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 10 }}>Comment pratiquer</div>
            {selectedEx.pratique.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 13, color: '#3a3d3b', lineHeight: 1.55 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#468a4d', flexShrink: 0, marginTop: 5 }} />
                <span>{step}</span>
              </div>
            ))}
          </div>

          {/* Zone timer */}
          <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 16, padding: '18px 16px 16px', marginBottom: 14 }}>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <img src={`${RAW}panda_timer.png`} alt="Panda timer"
                style={{ width: 68, height: 68, objectFit: 'contain' }}
                onError={e => { e.target.outerHTML = '<div style="font-size:52px">⏱️</div>'; }} />
            </div>
            {!running && !paused ? (
              /* Choisir durée */
              <>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#9aaa9c', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>Choisir la durée</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  {[60, 120, 180, 300].map(d => (
                    <button key={d}
                      style={{
                        flex: 1, border: `1.5px solid ${duration === d ? '#468a4d' : 'rgba(70,138,77,0.3)'}`,
                        background: duration === d ? '#468a4d' : 'rgba(255,255,255,0.7)',
                        color: duration === d ? 'white' : '#3a5a40',
                        borderRadius: 10, padding: '9px 4px',
                        fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700, cursor: 'pointer'
                      }}
                      onClick={() => { setDuration(d); setTimerLeft(d); setTimerTotal(d); }}>
                      {d === 60 ? '1 min' : d === 120 ? '2 min' : d === 180 ? '3 min' : '5 min'}
                    </button>
                  ))}
                </div>
                <button style={{
                  display: 'block', margin: '0 auto', background: 'transparent', color: '#468a4d',
                  border: '1.5px solid rgba(70,138,77,0.4)', borderRadius: 12, padding: '10px 28px',
                  fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer'
                }} onClick={startTimer}>▶ Démarrer</button>
              </>
            ) : (
              /* Timer en cours */
              <>
                <div style={{ background: 'rgba(180,210,240,0.2)', borderRadius: 6, height: 5, overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg,#5aacdf,#3a8ec4)', borderRadius: 6, width: `${pct}%`, transition: 'width 1s linear' }} />
                </div>
                <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 28, fontWeight: 700, color: '#8ab8d4', textAlign: 'center', marginBottom: 2 }}>
                  {fmtTime(timerLeft)}
                </div>
                <div style={{ fontSize: 11, color: '#aac8de', fontWeight: 600, textAlign: 'center', marginBottom: 12 }}>
                  {paused ? 'En pause' : 'En cours...'}
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                  {paused ? (
                    <button className="breath-timer-btn primary" onClick={() => {
                      setPaused(false); setRunning(true);
                      intervalRef.current = setInterval(() => {
                        setTimerLeft(t => {
                          if (t <= 1) { clearInterval(intervalRef.current); setRunning(false); setDone(true); gongEnd(); return 0; }
                          return t - 1;
                        });
                      }, 1000);
                    }}>▶ Reprendre</button>
                  ) : (
                    <button className="breath-timer-btn" style={{ background: '#f0ede8', color: '#3a5a40' }}
                      onClick={() => { clearTimer(); setRunning(false); setPaused(true); }}>⏸ Pause</button>
                  )}
                  <button className="breath-timer-btn" style={{ background: 'rgba(192,80,60,0.1)', color: '#c0503c' }}
                    onClick={() => { clearTimer(); setRunning(false); setPaused(false); setTimerLeft(duration); setTimerTotal(duration); }}>
                    ⏹ Arrêter
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Recommencer */}
          {(running || paused) && (
            <button style={{
              width: '100%', background: 'transparent', border: '1.5px solid rgba(70,138,77,0.3)',
              borderRadius: 12, padding: 11, fontFamily: "'Nunito',sans-serif", fontWeight: 700,
              fontSize: 13, color: '#468a4d', cursor: 'pointer', marginBottom: 10
            }} onClick={() => resetTimerState(duration)}>↻ Recommencer tout l'exercice</button>
          )}

          {/* Box conseils */}
          <div style={{ background: 'rgba(255,255,255,0.75)', borderRadius: 14, padding: '14px 16px', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#9aaa9c', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 12 }}>Conseils de pratique</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 13, color: '#3a3d3b', lineHeight: 1.5 }}>🔄 <span><strong>Répétitions :</strong> {selectedEx.reps}</span></div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 13, color: '#3a3d3b', lineHeight: 1.5 }}>⏱️ <span><strong>Durée idéale :</strong> {selectedEx.duration}</span></div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 13, color: '#3a3d3b', lineHeight: 1.5 }}>🧘 <span><strong>Position :</strong> {selectedEx.position}</span></div>
            <div style={{ display: 'flex', gap: 10, fontSize: 13, color: '#3a3d3b', lineHeight: 1.5 }}>💡 <span><strong>Astuce :</strong> {selectedEx.astuces}</span></div>
          </div>

          {/* Source */}
          <details style={{ marginBottom: 16 }}>
            <summary style={{ fontSize: 11, color: '#468a4d', fontWeight: 700, cursor: 'pointer', padding: '8px 0' }}>📚 Source scientifique</summary>
            <p style={{ fontSize: 11, color: '#888', lineHeight: 1.6, paddingTop: 8, borderTop: '1px solid rgba(154,170,156,0.15)' }}>{selectedEx.source}</p>
          </details>
        </>
      )}
    </div>
  );

  return null;
};

// ═══════════════════════════════════════
// CSS À AJOUTER DANS App.jsx (section <style>)
// ═══════════════════════════════════════
/*
.breath-cat-card {
  width: 100%; border: none; border-radius: 14px; padding: 14px 16px;
  font-family: 'Nunito', sans-serif; cursor: pointer; text-align: left;
  background: rgba(255,255,255,0.93); border-left: 4px solid #468a4d;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: all 0.15s; margin-bottom: 12px;
}
.breath-cat-card:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.breath-back {
  background: rgba(240,237,232,0.8); border: none; border-radius: 10px;
  padding: 7px 14px; font-size: 13px; color: #3a5a40; cursor: pointer;
  margin-bottom: 18px; font-weight: 700; font-family: 'Nunito', sans-serif; display: inline-block;
}
.breath-ex-card {
  background: white; border: 1px solid rgba(220,215,208,0.8); border-radius: 12px;
  padding: 14px; cursor: pointer; width: 100%; text-align: left; margin-bottom: 10px;
  transition: all 0.15s; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  font-family: 'Nunito', sans-serif;
}
.breath-ex-card:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.breath-ex-name { font-weight: 800; font-size: 15px; color: #1e270c; }
.breath-ex-subtitle { font-size: 12px; color: #666; margin-bottom: 5px; line-height: 1.4; }
.breath-ex-duration { font-size: 11px; color: #9aaa9c; font-weight: 600; margin-bottom: 6px; }
.breath-ex-cta { font-size: 12px; color: #468a4d; font-weight: 800; }
.breath-timer-btn {
  flex: 1; border: none; border-radius: 14px; padding: 13px 10px;
  font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 13px; cursor: pointer;
}
.breath-timer-btn.primary { background: #468a4d; color: white; }
.breath-timer-btn.secondary { background: rgba(255,255,255,0.9); color: #3a5a40; border: 1.5px solid rgba(70,138,77,0.25); }
*/
};

export default BreathScreen;
