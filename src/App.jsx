import React, { useState, useEffect, useRef } from "react";

// ╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔
// PANDA ZEN — APP COMPLÈTE v1.1
// Fix boucle respiration 1min + module breathing intégré
// 18/02/2026
// ╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔

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
};

// ╔╔╔ DONNÉES PROFIL (démo) ╔╔╔
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

// ╔╔╔ EXERCICES RESPIRATION ╔╔╔
const BREATHING_EXERCISES = [
  {
    id: 1,
    name: "Cohérence Cardiaque",
    description: "6 cycles/minute pour synchroniser cœur et respiration",
    inhale: 5,
    exhale: 5,
    hold: 0,
    color: "#3b82f6"
  },
  {
    id: 2,
    name: "Respiration 4-7-8",
    description: "Technique relaxante pour réduire l'anxiété",
    inhale: 4,
    exhale: 8,
    hold: 7,
    color: "#8b5cf6"
  },
  {
    id: 3,
    name: "Box Breathing",
    description: "Respiration carrée des Navy SEALs",
    inhale: 4,
    exhale: 4,
    hold: 4,
    color: "#06b6d4"
  }
];

// ╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔
// ÉCRAN ACCUEIL v2
// ╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔
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

// ╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔
// MODULE RESPIRATION v1.1 - AVEC BOUCLE FIXÉE
// ╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔
const BreathingScreen = ({ onGalets }) => {
  const [selectedExercise, setSelectedExercise] = useState(BREATHING_EXERCISES[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale', 'complete'
  const [timeLeft, setTimeLeft] = useState(60); // Durée total exercice : 60 secondes
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [exerciseDuration] = useState(60); // 1 minute par défaut
  const [userStopped, setUserStopped] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [phaseTime, setPhaseTime] = useState(0);
  const [breathProgress, setBreathProgress] = useState(0);
  const [showExercises, setShowExercises] = useState(true);
  const audioRef = useRef(null);

  // Sons pour guidage
  const playTone = (frequency = 440, duration = 200) => {
    if (!audioRef.current) {
      const ctx = new AudioContext();
      audioRef.current = ctx;
    }
    const oscillator = audioRef.current.createOscillator();
    const gainNode = audioRef.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioRef.current.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0, audioRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioRef.current.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioRef.current.currentTime + duration / 1000);
    oscillator.start(audioRef.current.currentTime);
    oscillator.stop(audioRef.current.currentTime + duration / 1000);
  };

  // Timer principal - incrémente temps total
  useEffect(() => {
    if (!isRunning || userStopped) return;
    
    const timer = setTimeout(() => {
      setTotalTimeElapsed(t => t + 1);
      setTimeLeft(t => t - 1);
      
      // Arrêt après 60 secondes
      if (totalTimeElapsed + 1 >= exerciseDuration) {
        setIsRunning(false);
        setPhase('complete');
        playTone(523, 500); // Note Do pour fin
        onGalets(2); // +2 galets
        return;
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isRunning, totalTimeElapsed, exerciseDuration, userStopped, onGalets]);

  // Logique des phases de respiration
  useEffect(() => {
    if (!isRunning || phase === 'complete') return;

    const { inhale, hold, exhale } = selectedExercise;
    const cycleDuration = inhale + hold + exhale;
    const cyclePosition = (totalTimeElapsed % cycleDuration);

    if (cyclePosition < inhale) {
      if (phase !== 'inhale') {
        setPhase('inhale');
        playTone(440, 200); // Note La pour inspiration
        setPhaseTime(0);
      } else {
        setPhaseTime(cyclePosition);
      }
      setBreathProgress(cyclePosition / inhale);
    } else if (cyclePosition < inhale + hold && hold > 0) {
      if (phase !== 'hold') {
        setPhase('hold');
        setPhaseTime(0);
      } else {
        setPhaseTime(cyclePosition - inhale);
      }
      setBreathProgress(1);
    } else {
      if (phase !== 'exhale') {
        setPhase('exhale');
        playTone(330, 300); // Note Mi pour expiration
        setPhaseTime(0);
      } else {
        setPhaseTime(cyclePosition - inhale - hold);
      }
      setBreathProgress(1 - ((cyclePosition - inhale - hold) / exhale));
      
      // Nouveau cycle
      if (cyclePosition === cycleDuration - 1) {
        setCycleCount(c => c + 1);
      }
    }
  }, [totalTimeElapsed, isRunning, selectedExercise, phase]);

  const startBreathing = () => {
    setIsRunning(true);
    setShowExercises(false);
    setPhase('inhale');
    setTimeLeft(60);
    setTotalTimeElapsed(0);
    setCycleCount(0);
    setUserStopped(false);
    playTone(523, 300); // Note Do pour début
  };

  const stopBreathing = () => {
    setIsRunning(false);
    setUserStopped(true);
    setShowExercises(true);
    setPhase('inhale');
  };

  const resetBreathing = () => {
    setIsRunning(false);
    setUserStopped(false);
    setShowExercises(true);
    setPhase('inhale');
    setTimeLeft(60);
    setTotalTimeElapsed(0);
    setCycleCount(0);
    setPhaseTime(0);
    setBreathProgress(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'INSPIRE ⬆️';
      case 'hold': return 'RETIENS 🫁';
      case 'exhale': return 'EXPIRE ⬇️';
      case 'complete': return 'TERMINÉ ✨';
      default: return 'PRÊT';
    }
  };

  if (showExercises) {
    return (
      <div className="screen">
        <div className="breathing-intro">
          <div className="breath-hero">
            <div className="breath-hero-panda">{P.breathe}</div>
            <h2 className="breath-title">Respiration consciente</h2>
            <p className="breath-subtitle">Choisis ton exercice et respire en conscience</p>
          </div>
          
          <div className="exercise-list">
            {BREATHING_EXERCISES.map(ex => (
              <button 
                key={ex.id} 
                className={`exercise-card ${selectedExercise.id === ex.id ? 'active' : ''}`}
                onClick={() => setSelectedExercise(ex)}
                style={{ borderColor: selectedExercise.id === ex.id ? ex.color : 'transparent' }}
              >
                <div className="exercise-name">{ex.name}</div>
                <div className="exercise-desc">{ex.description}</div>
                <div className="exercise-pattern">
                  {ex.inhale}s inspir {ex.hold > 0 && `· ${ex.hold}s pause`} · {ex.exhale}s expir
                </div>
              </button>
            ))}
          </div>

          <button className="start-breath-btn" onClick={startBreathing} style={{ background: selectedExercise.color }}>
            Commencer • 1 minute • +2 🪨
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <div className="screen">
        <div className="breath-complete">
          <div className="complete-panda">{P.thumbsUp}</div>
          <h2 className="complete-title">Bravo !</h2>
          <p className="complete-desc">Tu as terminé ton exercice de respiration</p>
          
          <div className="complete-stats">
            <div className="complete-stat">
              <div className="stat-value">{cycleCount}</div>
              <div className="stat-label">cycles respiratoires</div>
            </div>
            <div className="complete-stat">
              <div className="stat-value">1:00</div>
              <div className="stat-label">durée totale</div>
            </div>
            <div className="complete-stat">
              <div className="stat-value gold">+2 🪨</div>
              <div className="stat-label">galets gagnés</div>
            </div>
          </div>
          
          <div className="complete-actions">
            <button className="complete-btn" onClick={startBreathing} style={{ background: selectedExercise.color }}>
              Refaire un cycle
            </button>
            <button className="complete-btn-outline" onClick={resetBreathing}>
              Choisir un autre exercice
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vue session active
  return (
    <div className="screen breath-active">
      <div className="breath-session">
        <div className="breath-timer">
          <div className="timer-display">{formatTime(timeLeft)}</div>
          <div className="timer-total">sur 1 minute</div>
        </div>
        
        <div className="breath-circle-container">
          <div 
            className="breath-circle" 
            style={{ 
              transform: `scale(${0.5 + (breathProgress * 0.5)})`,
              background: `radial-gradient(circle, ${selectedExercise.color}88, ${selectedExercise.color}44)`,
              boxShadow: `0 0 ${20 + (breathProgress * 30)}px ${selectedExercise.color}66`
            }}
          />
          <div className="breath-center">
            <div className="phase-text">{getPhaseText()}</div>
            <div className="cycle-count">Cycle {cycleCount + 1}</div>
          </div>
        </div>
        
        <div className="breath-progress">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${(totalTimeElapsed / exerciseDuration) * 100}%`,
              background: selectedExercise.color 
            }}
          />
        </div>
        
        <div className="breath-controls">
          <button className="breath-control-btn" onClick={stopBreathing}>
            ⏸️ Arrêter
          </button>
        </div>
      </div>
    </div>
  );
};

// ╔╔╔ ÉCRAN CARTES VITA ╔╔╔
const CartesScreen = ({ onGalets }) => {
  return (
    <div className="screen">
      <div className="phase-badge">⚠️ Module Cartes VITA à intégrer</div>
      <p>72 cartes VITA prêtes dans CARTES_VITA_72_ONE_TRUTH.md</p>
    </div>
  );
};

// ╔╔╔ ÉCRAN PANDA RELAX ╔╔╔
const PandaRelaxScreen = ({ onGalets }) => {
  return (
    <div className="screen">
      <div className="phase-badge">⚠️ Module Panda Relax à intégrer</div>
      <p>16 fiches animaux prêtes dans PANDA_RELAX_16_EXERCICES_VALIDES_FINAL.md</p>
    </div>
  );
};

// ╔╔╔ ÉCRAN HYDRATATION ╔╔╔
const HydratationScreen = ({ waterGlasses, onAddWater }) => {
  const goal = 8; // 8 verres par jour
  const progress = (waterGlasses / goal) * 100;
  
  return (
    <div className="screen">
      <div className="water-header">
        <div className="water-hero">
          <div className="water-panda">{P.water}</div>
          <h2 className="water-title">Hydratation</h2>
          <p className="water-subtitle">Ta consommation d'eau aujourd'hui</p>
        </div>
        
        <div className="water-progress-container">
          <div className="water-circle">
            <div className="water-wave" style={{ height: `${progress}%` }}></div>
            <div className="water-stats">
              <div className="water-count">{waterGlasses}</div>
              <div className="water-goal">sur {goal} verres</div>
            </div>
          </div>
        </div>
      </div>
      
      <button className="add-water-btn" onClick={onAddWater}>
        <div className="add-water-icon">💧</div>
        <div className="add-water-text">J'ai bu un verre d'eau</div>
        <div className="add-water-reward">+1 🪨</div>
      </button>
      
      <div className="water-tips">
        <div className="tip-title">💡 Le savais-tu ?</div>
        <div className="tip-text">Boire suffisamment d'eau aide ton corps à éliminer les toxines et améliore ta concentration.</div>
      </div>
      
      <div className="water-reminders">
        <div className="reminder-title">⏰ Rappels</div>
        <div className="reminder-list">
          <div className="reminder-item">Lever : 1 verre</div>
          <div className="reminder-item">Avant chaque repas : 1 verre</div>
          <div className="reminder-item">Avant 18h : 6 verres</div>
        </div>
      </div>
    </div>
  );
};

// ╔╔╔ ÉCRAN PROFIL ╔╔╔
const ProfilScreen = ({ galets, streak, waterGlasses }) => {
  const [showParrainRules, setShowParrainRules] = useState(false);
  
  return (
    <div className="screen">
      {/* BOX 1 — MIROIR PRINCIPAL */}
      <div className="profil-box" style={{ animationDelay: "0s" }}>
        <div className="box-header"><div className="box-panda">{P.mirror}</div><div><div className="box-title">Mon Miroir</div><div className="box-subtitle">Mon profil relationnel du moment</div></div></div>
        <div className="miroir-principal">
          <div className="miroir-animal">
            <div className="animal-avatar">🐢</div>
            <div className="animal-name">Tortue</div>
          </div>
          <div className="miroir-profil">
            <div className="profil-letter">C</div>
            <div className="profil-name">SE PROTÉGER</div>
          </div>
        </div>
        <div className="miroir-forces">
          <div className="force-item positive">
            <div className="force-badge green">+</div>
            <div className="force-text">Patience, Écoute profonde, Réflexion</div>
          </div>
          <div className="force-item negative">
            <div className="force-badge red">−</div>
            <div className="force-text">Évitement, Repli sur soi, Procrastination</div>
          </div>
        </div>
        <button className="profil-cta">🔄 Refaire le test</button>
      </div>

      {/* BOX 2 — MES RELATIONS */}
      <div className="profil-box" style={{ animationDelay: "0.05s" }}>
        <div className="box-header"><div className="box-panda">{P.couple}</div><div><div className="box-title">Mes relations</div><div className="box-subtitle">Comment je réagis avec chacun</div></div></div>
        {DEMO_RELATIONS.slice(0, 2).map((rel, i) => (
          <div key={rel.id} className="relation-item">
            <div className="relation-avatar">{rel.animal}</div>
            <div className="relation-info">
              <div className="relation-name">{rel.label}</div>
              <div className="relation-date">{rel.date}</div>
            </div>
            <div className="relation-profil">
              <div className="relation-letter">{rel.profil}</div>
            </div>
            <div className="relation-status">{rel.complete ? "✅" : "⏳"}</div>
          </div>
        ))}
        <button className="profil-cta">+ Ajouter une relation</button>
      </div>

      {/* BOX 3 — MES CARTES */}
      <div className="profil-box" style={{ animationDelay: "0.1s" }}>
        <div className="box-header"><div className="box-panda">{P.cards}</div><div><div className="box-title">Mes cartes récentes</div><div className="box-subtitle">Tes derniers messages VITA®</div></div></div>
        {DEMO_CARTES.slice(0, 2).map((carte, i) => (
          <div key={carte.num} className="carte-item">
            <div className="carte-num">#{carte.num}</div>
            <div className="carte-phrase">{carte.phrase}</div>
          </div>
        ))}
        <button className="profil-cta">Voir toutes mes cartes</button>
      </div>

      {/* BOX 4 — CHEMIN MUDRÂS */}
      <div className="profil-box" style={{ animationDelay: "0.15s" }}>
        <div className="box-header"><div className="box-panda">{P.mudra}</div><div><div className="box-title">Mon chemin</div><div className="box-subtitle">Progression sur 73 jours</div></div></div>
        <div className="path-visual">
          <div className="path-line">
            {MUDRAS_PALIERS.slice(0, 12).map((palier, i) => (
              <div key={palier.day} className={`path-dot ${i < 3 ? 'green' : i < 6 ? 'gold' : 'gray'}`} style={{ left: `${(i / 11) * 100}%` }}>
                {palier.special && <div className="path-special">✨</div>}
              </div>
            ))}
          </div>
          <div className="path-legend">
            <div className="legend-item"><div className="legend-dot green"></div>Acquis</div>
            <div className="legend-item"><div className="legend-dot gold"></div>En cours</div>
            <div className="legend-item"><div className="legend-dot gray"></div>À venir</div>
          </div>
        </div>
        <div className="path-progress">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: '30%' }}></div>
          </div>
          <div className="path-stats">
            <div className="path-stat"><div className="path-stat-v">22<span className="galet-inline small">{P.galets}</span></div><div className="path-stat-l">galets</div></div>
            <div className="path-stat"><div className="path-stat-v">7</div><div className="path-stat-l">jours</div></div>
            <div className="path-stat"><div className="path-stat-v">4/18</div><div className="path-stat-l">mudrâs</div></div>
          </div>
        </div>
        <button className="path-cta">Découvrir le mudrâ du jour</button>
        <div className="path-galet-hint"><span className="galet-inline">{P.galets}</span> Chaque mudrâ débloqué = +3 galets</div>
        <div className="path-credit">Mudrâs par Valérie Robin</div>
      </div>

      {/* BOX 5 — STATS */}
      <div className="profil-box" style={{ animationDelay: "0.2s" }}>
        <div className="box-header"><div className="box-panda">📊</div><div><div className="box-title">Mes statistiques</div><div className="box-subtitle">Mon engagement quotidien</div></div></div>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{streak}</div>
            <div className="stat-label">jours consécutifs</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">💧</div>
            <div className="stat-value">{waterGlasses}</div>
            <div className="stat-label">verres aujourd'hui</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🌬️</div>
            <div className="stat-value">3</div>
            <div className="stat-label">sessions respiration</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎴</div>
            <div className="stat-value">12</div>
            <div className="stat-label">cartes tirées</div>
          </div>
        </div>
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
        </div>
      </div>
    </div>
  );
};

// ╔╔╔ SPLASH SCREEN ╔╔╔
const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState(1);
  
  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(2), 1500);
    const timer2 = setTimeout(() => onDone(), 3000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [onDone]);

  return (
    <div className="splash-screen" onClick={onDone}>
      <div className="splash-content">
        {phase === 1 ? (
          <>
            <div className="splash-panda scale-in">{P.logo}</div>
            <div className="splash-text fade-in">PANDA ZEN</div>
          </>
        ) : (
          <>
            <div className="splash-panda">{P.logo}</div>
            <div className="splash-text">PANDA ZEN</div>
            <div className="splash-tagline slide-up">Mieux te comprendre et avancer</div>
            <div className="splash-hint">Touche pour continuer</div>
          </>
        )}
      </div>
    </div>
  );
};

// ╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔
// APP PRINCIPALE
// ╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔╔
export default function App() {
  const [tab, setTab] = useState(0);
  const [galets, setGalets] = useState(42);
  const [streak, setStreak] = useState(7);
  const [waterGlasses, setWaterGlasses] = useState(3);
  const [showSplash, setShowSplash] = useState(true);

  const tabs = [
    { id: "home", icon: "🏠", label: "Accueil" },
    { id: "breathe", icon: "🌬️", label: "Respirer" },
    { id: "cards", icon: "🎴", label: "Carte" },
    { id: "relax", icon: "🐼", label: "Relax" },
    { id: "water", icon: "💧", label: "Eau" },
    { id: "relations", icon: "👥", label: "Relations" },
    { id: "profile", icon: "👤", label: "Profil" }
  ];

  const goTab = (newTab) => setTab(newTab);
  const addGalets = (amount) => setGalets(g => g + amount);
  const addWater = () => {
    setWaterGlasses(w => w + 1);
    addGalets(1);
  };

  const screens = [
    <HomeScreen galets={galets} streak={streak} onNav={goTab} />,
    <BreathingScreen onGalets={addGalets} />,
    <CartesScreen onGalets={addGalets} />,
    <PandaRelaxScreen onGalets={addGalets} />,
    <HydratationScreen waterGlasses={waterGlasses} onAddWater={addWater} />,
    <ProfilScreen galets={galets} streak={streak} waterGlasses={waterGlasses} />, // Relations = Profil pour MVP
    <ProfilScreen galets={galets} streak={streak} waterGlasses={waterGlasses} />
  ];

  return (
    <>
      <style>{`
        /* POLICES */
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&family=Nunito:wght@400;600;700;800&display=swap');
        
        /* RESET */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif; background: #f8f9fa; color: #2d2f2e; line-height: 1.5; overflow-x: hidden; }
        button { font-family: inherit; cursor: pointer; border: none; outline: none; }
        img { max-width: 100%; height: auto; }
        
        /* APP LAYOUT */
        .app-shell { min-height: 100vh; max-width: 430px; margin: 0 auto; background: white; position: relative; }
        .screen { padding: 80px 16px 100px; min-height: calc(100vh - 80px); animation: slideUp 0.3s ease both; }
        
        /* HEADER */
        .app-header { position: fixed; top: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; height: 70px; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(154,170,156,0.08); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; z-index: 200; }
        .header-logo { display: flex; align-items: center; gap: 8px; }
        .header-panda { width: 32px; height: 32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
        .header-title { font-family: 'Josefin Sans'; font-weight: 700; font-size: 18px; color: #1e270c; letter-spacing: 1px; }
        .header-avatar { width: 36px; height: 36px; border-radius: 50%; background: rgba(154,170,156,0.1); color: #5b7a5e; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; border: 2px solid transparent; }
        .header-avatar:hover { background: rgba(154,170,156,0.15); border-color: rgba(154,170,156,0.2); }
        
        /* ÉCRAN ACCUEIL */
        .home-hero { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .home-hero-panda { width: 60px; height: 60px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15)); }
        .home-greeting { font-family: 'Josefin Sans'; font-size: 24px; font-weight: 700; color: #1e270c; margin-bottom: 4px; }
        .home-tagline { color: #5b7a5e; font-size: 14px; font-weight: 600; }
        .home-stats { display: flex; gap: 12px; margin-bottom: 24px; }
        .home-stat-card { flex: 1; background: rgba(201,169,110,0.08); border-radius: 16px; padding: 16px; text-align: center; border: 1px solid rgba(201,169,110,0.15); }
        .home-stat-icon { font-size: 24px; margin-bottom: 8px; }
        .home-stat-val { font-weight: 800; font-size: 20px; margin-bottom: 2px; }
        .home-stat-val.gold { color: #c9a96e; }
        .home-stat-val.orange { color: #e67e22; }
        .home-stat-label { font-size: 11px; color: #5b7a5e; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .home-section-title { font-family: 'Josefin Sans'; font-size: 18px; font-weight: 700; color: #2d2f2e; margin: 24px 0 16px; }
        .home-action { width: 100%; display: flex; align-items: center; gap: 16px; padding: 16px; background: white; border-radius: 16px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(30,39,12,0.04); border: 1px solid rgba(154,170,156,0.08); transition: all 0.15s; animation: slideUp 0.4s ease both; }
        .home-action:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(30,39,12,0.08); }
        .home-action:active { transform: scale(0.98); }
        .home-action-panda { width: 44px; height: 44px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.1)); }
        .home-action-text { flex: 1; }
        .home-action-title { font-weight: 700; font-size: 15px; color: #2d2f2e; margin-bottom: 2px; }
        .home-action-desc { font-size: 13px; color: #6b7c6e; line-height: 1.4; }
        .home-galet-badge { background: rgba(201,169,110,0.12); color: #c9a96e; border-radius: 12px; padding: 6px 10px; font-weight: 800; font-size: 12px; display: flex; align-items: center; gap: 4px; border: 1px solid rgba(201,169,110,0.25); }
        .galet-inline { width: 14px; height: 14px; }
        .galet-inline.small { width: 12px; height: 12px; }
        
        /* MIROIR CTA HOME */
        .miroir-cta-home { width: 100%; background: linear-gradient(135deg, #34490a 0%, #5b7a5e 100%); border-radius: 20px; padding: 20px; color: white; margin-bottom: 24px; position: relative; overflow: hidden; transition: transform 0.15s; }
        .miroir-cta-home:hover { transform: translateY(-2px); }
        .miroir-cta-home:active { transform: scale(0.98); }
        .miroir-cta-panda { position: absolute; right: 16px; top: 16px; width: 50px; height: 50px; opacity: 0.9; }
        .miroir-cta-title { font-family: 'Josefin Sans'; font-size: 20px; font-weight: 700; margin-bottom: 6px; }
        .miroir-cta-desc { font-size: 14px; opacity: 0.9; margin-bottom: 16px; line-height: 1.4; }
        .miroir-cta-badge { position: absolute; right: 16px; bottom: 48px; background: rgba(255,255,255,0.15); border-radius: 12px; padding: 6px 10px; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 4px; }
        .miroir-cta-btn { background: rgba(255,255,255,0.2); border-radius: 14px; padding: 12px 24px; font-weight: 700; font-size: 14px; width: fit-content; }
        
        /* MODULE RESPIRATION */
        .breathing-intro { text-align: center; }
        .breath-hero { margin-bottom: 32px; }
        .breath-hero-panda { width: 80px; height: 80px; margin: 0 auto 16px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15)); }
        .breath-title { font-family: 'Josefin Sans'; font-size: 28px; font-weight: 700; color: #2d2f2e; margin-bottom: 8px; }
        .breath-subtitle { color: #5b7a5e; font-size: 16px; font-weight: 600; }
        
        .exercise-list { margin-bottom: 32px; }
        .exercise-card { width: 100%; text-align: left; background: white; border-radius: 16px; padding: 20px; margin-bottom: 16px; border: 2px solid transparent; transition: all 0.15s; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .exercise-card:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .exercise-card.active { border-color: currentColor; background: rgba(59,130,246,0.02); }
        .exercise-name { font-weight: 700; font-size: 16px; color: #2d2f2e; margin-bottom: 6px; }
        .exercise-desc { font-size: 14px; color: #6b7c6e; margin-bottom: 8px; line-height: 1.4; }
        .exercise-pattern { font-size: 13px; color: #9aaa9c; font-weight: 600; }
        
        .start-breath-btn { width: 100%; padding: 18px; border-radius: 16px; color: white; font-weight: 700; font-size: 16px; transition: all 0.15s; }
        .start-breath-btn:hover { transform: translateY(-1px); }
        .start-breath-btn:active { transform: scale(0.98); }
        
        /* SESSION RESPIRATION ACTIVE */
        .breath-active { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; text-align: center; }
        .breath-session { width: 100%; max-width: 320px; }
        .breath-timer { margin-bottom: 40px; }
        .timer-display { font-size: 48px; font-weight: 800; margin-bottom: 8px; }
        .timer-total { font-size: 14px; opacity: 0.7; }
        
        .breath-circle-container { position: relative; width: 200px; height: 200px; margin: 0 auto 40px; }
        .breath-circle { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 120px; height: 120px; border-radius: 50%; transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .breath-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; }
        .phase-text { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
        .cycle-count { font-size: 14px; opacity: 0.7; }
        
        .breath-progress { width: 100%; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; margin-bottom: 40px; overflow: hidden; }
        .progress-bar-fill { height: 100%; border-radius: 2px; transition: width 0.3s ease; }
        
        .breath-controls { display: flex; justify-content: center; }
        .breath-control-btn { padding: 12px 24px; background: rgba(255,255,255,0.15); border-radius: 12px; color: white; font-weight: 600; transition: all 0.15s; }
        .breath-control-btn:hover { background: rgba(255,255,255,0.25); }
        
        /* ÉCRAN RESPIRATION TERMINÉE */
        .breath-complete { text-align: center; }
        .complete-panda { width: 80px; height: 80px; margin: 0 auto 24px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15)); }
        .complete-title { font-family: 'Josefin Sans'; font-size: 32px; font-weight: 700; color: #2d2f2e; margin-bottom: 8px; }
        .complete-desc { color: #5b7a5e; font-size: 16px; margin-bottom: 32px; }
        .complete-stats { display: flex; justify-content: space-around; margin-bottom: 32px; }
        .complete-stat { text-align: center; }
        .stat-value { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
        .stat-value.gold { color: #c9a96e; }
        .stat-label { font-size: 12px; color: #6b7c6e; text-transform: uppercase; letter-spacing: 0.5px; }
        .complete-actions { display: flex; flex-direction: column; gap: 12px; }
        .complete-btn { width: 100%; padding: 16px; border-radius: 16px; color: white; font-weight: 700; transition: all 0.15s; }
        .complete-btn:hover { transform: translateY(-1px); }
        .complete-btn-outline { width: 100%; padding: 16px; border-radius: 16px; background: transparent; border: 2px solid #ddd; color: #666; font-weight: 600; transition: all 0.15s; }
        .complete-btn-outline:hover { background: #f8f9fa; }
        
        /* HYDRATATION */
        .water-header { text-align: center; margin-bottom: 32px; }
        .water-hero { margin-bottom: 24px; }
        .water-panda { width: 60px; height: 60px; margin: 0 auto 16px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15)); }
        .water-title { font-family: 'Josefin Sans'; font-size: 24px; font-weight: 700; color: #2d2f2e; margin-bottom: 4px; }
        .water-subtitle { color: #5b7a5e; font-size: 14px; font-weight: 600; }
        .water-progress-container { margin-bottom: 24px; }
        .water-circle { position: relative; width: 120px; height: 120px; margin: 0 auto; background: rgba(59,130,246,0.1); border-radius: 50%; overflow: hidden; }
        .water-wave { position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(135deg, #3b82f6, #1d4ed8); transition: height 0.6s ease; }
        .water-stats { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 10; }
        .water-count { font-size: 24px; font-weight: 800; color: #2d2f2e; }
        .water-goal { font-size: 12px; color: #6b7c6e; }
        .add-water-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border-radius: 16px; padding: 20px; margin-bottom: 24px; transition: all 0.15s; }
        .add-water-btn:hover { transform: translateY(-2px); }
        .add-water-btn:active { transform: scale(0.98); }
        .add-water-icon { font-size: 24px; }
        .add-water-text { font-weight: 700; font-size: 16px; }
        .add-water-reward { background: rgba(255,255,255,0.2); border-radius: 8px; padding: 4px 8px; font-size: 12px; font-weight: 700; }
        .water-tips, .water-reminders { background: rgba(59,130,246,0.05); border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid rgba(59,130,246,0.1); }
        .tip-title, .reminder-title { font-weight: 700; font-size: 14px; color: #2d2f2e; margin-bottom: 8px; }
        .tip-text { font-size: 14px; color: #5b7a5e; line-height: 1.4; }
        .reminder-list { display: flex; flex-direction: column; gap: 4px; }
        .reminder-item { font-size: 13px; color: #5b7a5e; padding: 4px 0; }
        
        /* PROFIL */
        .profil-box { background: white; border-radius: 16px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(30,39,12,0.04); border: 1px solid rgba(154,170,156,0.08); animation: slideUp 0.4s ease both; }
        .box-header { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
        .box-panda { width: 40px; height: 40px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.1)); }
        .box-title { font-weight: 700; font-size: 16px; color: #2d2f2e; margin-bottom: 2px; }
        .box-subtitle { font-size: 13px; color: #6b7c6e; font-weight: 600; }
        .profil-cta { width: 100%; margin-top: 16px; background: #f8f9fa; color: #5b7a5e; border: 1px solid rgba(154,170,156,0.2); border-radius: 12px; padding: 12px; font-weight: 600; font-size: 14px; transition: all 0.15s; }
        .profil-cta:hover { background: rgba(91,122,94,0.05); }
        
        /* MIROIR PRINCIPAL */
        .miroir-principal { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
        .miroir-animal { text-align: center; }
        .animal-avatar { font-size: 40px; margin-bottom: 8px; }
        .animal-name { font-size: 14px; color: #6b7c6e; font-weight: 600; }
        .miroir-profil { text-align: center; }
        .profil-letter { width: 60px; height: 60px; background: linear-gradient(135deg, #34490a, #5b7a5e); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; margin: 0 auto 8px; }
        .profil-name { font-size: 12px; color: #6b7c6e; font-weight: 700; letter-spacing: 0.5px; }
        .miroir-forces { display: flex; flex-direction: column; gap: 12px; }
        .force-item { display: flex; align-items: center; gap: 12px; }
        .force-badge { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: white; }
        .force-badge.green { background: #22c55e; }
        .force-badge.red { background: #ef4444; }
        .force-text { font-size: 13px; color: #5b7a5e; line-height: 1.4; }
        
        /* RELATIONS */
        .relation-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(154,170,156,0.1); }
        .relation-item:last-child { border-bottom: none; }
        .relation-avatar { font-size: 24px; }
        .relation-info { flex: 1; }
        .relation-name { font-weight: 600; font-size: 14px; margin-bottom: 2px; }
        .relation-date { font-size: 12px; color: #6b7c6e; }
        .relation-profil { text-align: center; }
        .relation-letter { width: 32px; height: 32px; background: rgba(52,73,10,0.1); color: #34490a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; }
        .relation-status { font-size: 16px; }
        
        /* CARTES */
        .carte-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(154,170,156,0.1); }
        .carte-item:last-child { border-bottom: none; }
        .carte-num { background: rgba(201,169,110,0.15); color: #c9a96e; border-radius: 8px; padding: 4px 8px; font-weight: 700; font-size: 12px; flex-shrink: 0; }
        .carte-phrase { font-size: 13px; color: #5b7a5e; line-height: 1.4; }
        
        /* STATS GRID */
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .stat-item { background: rgba(91,122,94,0.05); border-radius: 12px; padding: 16px; text-align: center; }
        .stat-icon { font-size: 20px; margin-bottom: 8px; }
        .stat-value { font-weight: 800; font-size: 18px; color: #34490a; margin-bottom: 4px; }
        .stat-label { font-size: 11px; color: #6b7c6e; text-transform: uppercase; letter-spacing: 0.5px; }
        
        /* CHEMIN MUDRÂS */
        .path-visual { margin-bottom: 16px; }
        .path-line { position: relative; height: 40px; background: rgba(154,170,156,0.1); border-radius: 20px; margin-bottom: 12px; }
        .path-dot { position: absolute; top: 50%; transform: translateY(-50%); width: 12px; height: 12px; border-radius: 50%; }
        .path-special { position: absolute; top: -8px; left: 50%; transform: translateX(-50%); font-size: 8px; }
        .path-legend { display: flex; gap: 16px; justify-content: center; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #6b7c6e; }
        .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
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

        /* SPLASH SCREEN */
        .splash-screen { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #1e270c 0%, #34490a 100%); color: white; display: flex; align-items: center; justify-content: center; z-index: 1000; cursor: pointer; }
        .splash-content { text-align: center; }
        .splash-panda { width: 120px; height: 120px; margin: 0 auto 24px; filter: drop-shadow(0 8px 24px rgba(0,0,0,0.3)); }
        .splash-text { font-family: 'Josefin Sans'; font-size: 48px; font-weight: 700; letter-spacing: 2px; margin-bottom: 16px; }
        .splash-tagline { font-size: 18px; font-weight: 600; opacity: 0.9; margin-bottom: 40px; }
        .splash-hint { font-size: 14px; opacity: 0.7; }
        
        /* ANIMATIONS SPLASH */
        .scale-in { animation: scaleIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both; }
        .fade-in { animation: fadeIn 0.6s ease both 0.3s; }
        .slide-up { animation: slideUp 0.6s ease both 0.8s; }
        @keyframes scaleIn { 0% { transform: scale(0); } 100% { transform: scale(1); } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes slideUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }

        /* PANDA ICONS */
        .panda-icon { width: 100%; height: 100%; object-fit: contain; }
        .pulse { animation: pulse 2s infinite; }
        
        /* PHASE BADGE */
        .phase-badge { background: linear-gradient(45deg, #ffd700, #ffed4e); color: #92400e; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 14px; text-align: center; margin-bottom: 20px; border: 2px solid rgba(146,64,14,0.2); }

        /* FOOTER LÉGAL */
        .app-footer-legal { text-align: center; padding: 16px 0 80px; font-size: 10px; color: #9aaa9c; }
        /* NAVIGATION */
        .app-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-top: 1px solid rgba(154,170,156,0.1); display: flex; padding: 6px 0 max(6px, env(safe-area-inset-bottom)); z-index: 100; }
        .nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 4px 0; border: none; background: transparent; cursor: pointer; transition: transform 0.15s; font-family: 'Nunito'; }
        .nav-btn:active { transform: scale(0.9); }
        .nav-emoji { font-size: 20px; line-height: 1; }
        .nav-label { font-size: 10px; color: #2d2f2e; font-weight: 700; }
        .nav-btn.active .nav-label { color: #34490a; font-weight: 800; }
        .nav-dot { width: 4px; height: 4px; border-radius: 50%; background: #34490a; }

        /* ANIMATIONS */
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
