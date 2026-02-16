import { useState } from "react";

// ═══════════════════════════════════════
// PANDA ZEN — APP COMPLÈTE v1
// Fusion skeleton-v3 + profil-v5
// 16/02/2026
// ═══════════════════════════════════════

// Emojis pandas (en prod = vrais PNG dans /images/)
const P = {
  logo: "🐼",        // galets_zen_.png
  original: "🐼",    // ORIGINAL.png
  hello: "👋",        // main_bonjour_V2.png
  breathe: "🌬️",     // souffle.png
  cards: "🎴",        // Cartes.png
  water: "💧",        // bois_de_leau.png
  mirror: "🪞",       // miroir_positif.png
  mirrorNeg: "😔",    // miroir_ne_gatif.png
  relax: "😌",        // Relax.png
  meditate: "🧘",     // me_ditant.png
  thumbsUp: "👍",     // pouce_v2.png
  couple: "💞",       // Relationnel.png
  galets: "🪨",
  envelope: "✉️",     // enveloppe.png
  mudra: "🙏",
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
// ÉCRAN ACCUEIL v2
// ═══════════════════════════════════════
const HomeScreen = ({ galets, streak, onNav }) => {
  const actions = [
    { p: P.mirror, t: "Ton Miroir du jour", d: "Découvre quel profil tu actives aujourd'hui", tab: 6, g: 5 },
    { p: P.cards, t: "Carte VITA du jour", d: "Ton message VITA® quotidien", tab: 2, g: 1 },
    { p: P.relax, t: "Panda Relax", d: "16 animaux totems pour t'accompagner dans les 64 exercices", tab: 3, g: 3 },
    { p: P.breathe, t: "Respiration", d: "Des exercices adaptés selon ton profil", tab: 1, g: 2 },
    { p: P.couple, t: "Relations", d: "Découvre ton profil dans tes relations", tab: 5, g: 5 },
    { p: P.water, t: "Hydratation", d: "Mieux comprendre, mieux s'hydrater", tab: 4, g: 1 },
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
      <h3 className="home-section-title">Ton chemin zen</h3>
      {actions.map((a, i) => (
        <button key={i} className="home-action" onClick={() => a.tab !== null && onNav(a.tab)} style={{ animationDelay: `${i * 0.06}s` }}>
          <div className="home-action-panda">{a.p}</div>
          <div className="home-action-text">
            <div className="home-action-title">{a.t}</div>
            <div className="home-action-desc">{a.d}</div>
          </div>
          <div className="home-galet-badge">{P.galets} +{a.g}</div>
        </button>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════
// ÉCRAN RESPIRER
// ═══════════════════════════════════════
const BreathScreen = () => (
  <div className="screen center-screen">
    <div className="module-card fade-in">
      <div className="module-panda big">{P.breathe}</div>
      <h2 className="title-lg">Respiration</h2>
      <p className="module-desc">Des exercices adaptés selon ton profil — 18 techniques de cohérence cardiaque.</p>
      <div className="phase-badge">⏳ Module breathing-v8 à intégrer</div>
    </div>
  </div>
);

// ═══════════════════════════════════════
// ÉCRAN CARTE VITA
// ═══════════════════════════════════════
const CardScreen = () => (
  <div className="screen center-screen">
    <div className="module-card fade-in">
      <div className="module-panda big">{P.cards}</div>
      <h2 className="title-lg">Carte VITA du jour</h2>
      <p className="module-desc">72 cartes VITA® — 3 niveaux bambou : Feuille, Nœud, Racine.</p>
      <div className="phase-badge">⏳ Tirage 2 cartes/jour à intégrer</div>
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
      <p className="module-desc">16 animaux totems · 64 exercices corps & émotions.<br/>Découvre ton animal et laisse-toi guider.</p>
      <div className="phase-badge">⏳ 16 fiches exercices à intégrer</div>
    </div>
  </div>
);

// ═══════════════════════════════════════
// ÉCRAN HYDRATATION — FONCTIONNEL
// ═══════════════════════════════════════
const WaterScreen = ({ galets, setGalets }) => {
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(8);
  const [editGoal, setEditGoal] = useState(false);
  const pct = Math.min(100, Math.round((glasses / goal) * 100));
  const weekData = [5, 7, 8, 6, 4, 8];
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const add = () => { if (glasses < 20) { setGlasses(g => g + 1); setGalets(g => g + 1); }};
  return (
    <div className="screen">
      <div className="water-header">
        <div className="water-panda">{pct >= 100 ? P.thumbsUp : P.water}</div>
        <div>
          <h2 className="title-lg">Hydratation</h2>
          <p className="tagline-sm">{pct >= 100 ? "🎉 Objectif atteint ! Bravo !" : "Mieux comprendre, mieux s'hydrater."}</p>
        </div>
      </div>
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
          <div className="home-galet-badge">{P.galets} +1</div>
        </div>
      </div>
      <div className="card fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="card-header">
          <span className="card-title-sm">Mon objectif</span>
          <button className="link-btn" onClick={() => setEditGoal(!editGoal)}>{editGoal ? "Fermer" : "Modifier"}</button>
        </div>
        {editGoal && (
          <div className="goal-options">
            {[6,7,8,9,10,12].map(n => (
              <button key={n} className={`goal-btn ${goal===n?"active":""}`} onClick={() => {setGoal(n);setEditGoal(false);}}>{n} verres</button>
            ))}
          </div>
        )}
      </div>
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
      <p className="module-desc">Découvre quel profil tu actives avec chaque personne de ton entourage.<br/>1ère relation gratuite — les suivantes en version Premium.</p>
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
            <div className="pstat"><div className="pstat-v gold">🪨 {galets}</div><div className="pstat-l">galets</div></div>
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
            <div className="miroir-insight-header"><span className="miroir-insight-panda">{P.mirror}</span><div className="miroir-insight-title up">✨ Ce qui te tire vers le haut aujourd'hui</div></div>
            <div className="miroir-tags">{mirrorProfile.forceP.split(", ").map((f,i) => <span key={`p${i}`} className="tag-plus">✨ {f}</span>)}</div>
          </div>
          <div className="miroir-insight" style={{ marginTop: 8 }}>
            <div className="miroir-insight-header"><span className="miroir-insight-panda">{P.mirrorNeg}</span><div className="miroir-insight-title down">🌒 En stress, attention à...</div></div>
            <div className="miroir-tags">{mirrorProfile.forceN.split(", ").map((f,i) => <span key={`n${i}`} className="tag-minus">🌒 {f}</span>)}</div>
          </div>
        </div>
        <div className="miroir-btns">
          <button className="miroir-cta">Découvrir mon Miroir — 3 min</button>
          <button className="miroir-share" title="Partager mon Miroir du jour">✉️</button>
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
                      <button className="testimonial-submit">Partager + gagner 🪨 1 galet</button>
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
                <div className="carte-phrase">"{c.phrase}"</div>
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
        <div className="box-header"><div className="box-panda">{P.mudra}</div><div><div className="box-title">Mon chemin Mudrâs</div><div className="box-subtitle">73 pas. 18 mudrâs. Un chemin vers soi.</div></div></div>
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
            <div className="legend-item">🙏 Mudrâ</div>
          </div>
        </div>
        <div className="path-progress">
          <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: `${Math.round((streak/73)*100)}%` }} /></div>
          <div className="path-stats">
            <div className="path-stat"><div className="path-stat-v">{streak}/73</div><div className="path-stat-l">jours</div></div>
            <div className="path-stat"><div className="path-stat-v">{MUDRAS_PALIERS.filter(m => streak >= m.day).length}/18</div><div className="path-stat-l">mudrâs reçus</div></div>
            <div className="path-stat"><div className="path-stat-v">🪨 {streak}</div><div className="path-stat-l">galets du chemin</div></div>
          </div>
        </div>
        <div className="path-galet-hint">🪨 +1 galet pour chaque jour de pratique entre deux mudrâs</div>
        <button className="path-cta">🙏 Voir mes mudrâs reçus</button>
        <div className="path-credit">Transmis avec gratitude, d'après Jacqueline (2016) 🙏</div>
      </div>

      {/* BOX 6 — GALETS */}
      <div className="profil-box" style={{ animationDelay: "0.25s" }}>
        <div className="box-header"><div className="box-panda">{P.galets}</div><div><div className="box-title">Mes galets gagnés</div><div className="box-subtitle">Construis ton équilibre, galet par galet</div></div></div>
        <div className="galets-summary"><div className="galets-big">🪨 {galets}</div><div className="galets-label">galets au total</div></div>
        <div className="galets-grid">
          <div className="galet-item"><div className="galet-item-val">+2</div><div className="galet-item-label">RESPIRATION</div></div>
          <div className="galet-item"><div className="galet-item-val">+1</div><div className="galet-item-label">CARTE VITA</div></div>
          <div className="galet-item"><div className="galet-item-val">+1</div><div className="galet-item-label">HYDRATATION</div></div>
          <div className="galet-item"><div className="galet-item-val">+5</div><div className="galet-item-label">MIROIR</div></div>
          <div className="galet-item"><div className="galet-item-val">+3</div><div className="galet-item-label">PANDA RELAX</div></div>
          <div className="galet-item"><div className="galet-item-val">+1</div><div className="galet-item-label">TÉMOIGNAGE</div></div>
        </div>
        <button className="galets-earn-btn">🪨 Clique pour gagner encore des galets aujourd'hui !</button>
        <div className="galets-explain">💡 Tes galets symbolisent ton engagement envers toi-même. Chaque action compte. Invite tes proches pour en gagner davantage !</div>
      </div>

      {/* BOX 7 — PARRAINAGE */}
      <div className="profil-box" style={{ animationDelay: "0.3s" }}>
        <div className="box-header"><div className="box-panda">{P.envelope}</div><div><div className="box-title">Parrainage</div><div className="box-subtitle">Invite tes proches, gagne des galets</div></div></div>
        <div className="parrain-stats">
          <div className="parrain-stat"><div className="parrain-v">{DEMO_FILLEULS.length}</div><div className="parrain-l">filleuls</div></div>
          <div className="parrain-stat"><div className="parrain-v gold">🪨 {DEMO_FILLEULS.reduce((s,f) => s+f.galets,0)}</div><div className="parrain-l">galets gagnés</div></div>
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
            <span className={`filleul-badge ${f.type}`}>{f.type==="payant"?"🪨 +2":"🪨 +1"}</span>
          </div>
        ))}
        <button className="share-btn">✉️ Inviter un ami</button>
      </div>

      {/* BOX BONUS */}
      <div className="profil-box bonus-box" style={{ animationDelay: "0.35s" }}>
        <div className="box-header"><div className="box-panda">⭐</div><div><div className="box-title">Bonus</div><div className="box-subtitle">Ressources, contact & partenariats</div></div></div>
        <div className="bonus-links">
          <button className="bonus-link-btn">📩 Nous contacter</button>
          <button className="bonus-link-btn">🛒 Commander les cartes VITA®</button>
          <button className="bonus-link-btn">🤝 Partenariats</button>
          <button className="bonus-link-btn">📰 Actualités Centre VITA</button>
        </div>
      </div>

      {/* MENU */}
      <div className="menu-box" style={{ animationDelay: "0.35s" }}>
        {[
          { i: "🔔", l: "Notifications & rappels" },
          { i: "🌍", l: "Langue", v: "Français · English (bientôt)" },
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
// APP PRINCIPALE
// ═══════════════════════════════════════
export default function PandaZenApp() {
  const [tab, setTab] = useState(0);
  const [galets, setGalets] = useState(12);
  const [streak] = useState(3);

  const tabs = [
    { id: "home", label: "Accueil", emoji: "🎋" },
    { id: "breathe", label: "Respirer", emoji: "🌬️" },
    { id: "card", label: "Carte", emoji: "🎴" },
    { id: "relax", label: "Relax", emoji: "😌" },
    { id: "water", label: "Eau", emoji: "💧" },
    { id: "relations", label: "Relations", emoji: "💞" },
    { id: "profile", label: "_hidden_", emoji: "" },
  ];

  const screens = [
    <HomeScreen galets={galets} streak={streak} onNav={setTab} />,
    <BreathScreen />,
    <CardScreen />,
    <RelaxScreen />,
    <WaterScreen galets={galets} setGalets={setGalets} />,
    <RelationsPlaceholder />,
    <ProfileScreen galets={galets} streak={streak} />,
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&family=Nunito:wght@400;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }

        /* ═══ APP SHELL ═══ */
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
        .header-avatar { width: 34px; height: 34px; border-radius: 50%; border: 2px solid rgba(91,122,94,0.25); background: linear-gradient(135deg,#e8f0e4,#f5f0eb); font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.15s; }
        .header-avatar:hover { transform: scale(1.1); }

        /* ═══ SCREENS ═══ */
        .screen { padding: 20px 16px 70px; }
        .center-screen { text-align: center; }

        /* ═══ TYPOGRAPHY ═══ */
        .title-lg { font-family: 'Josefin Sans', sans-serif; font-weight: 700; font-size: 24px; color: #1e270c; }
        .section-title { font-family: 'Josefin Sans', sans-serif; font-weight: 700; font-size: 18px; color: #1e270c; margin-bottom: 14px; }
        .tagline-sm { font-size: 14px; color: #6b7c6e; margin-top: 4px; line-height: 1.4; }

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
        .home-stat-label { font-size: 12px; color: #3a3d3b; margin-top: 2px; font-weight: 700; }
        .home-section-title { font-family: 'Josefin Sans', sans-serif; font-weight: 700; font-size: 20px; color: #1e270c; margin-bottom: 14px; }
        .home-action { width: 100%; display: flex; align-items: center; gap: 14px; background: rgba(255,255,255,0.93); border: none; border-radius: 16px; padding: 16px; margin-bottom: 10px; cursor: pointer; box-shadow: 0 2px 10px rgba(30,39,12,0.05); text-align: left; font-family: 'Nunito', sans-serif; transition: transform 0.2s, box-shadow 0.2s; animation: slideUp 0.4s ease both; }
        .home-action:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(30,39,12,0.1); }
        .home-action:active { transform: scale(0.98); }
        .home-action-panda { font-size: 40px; line-height: 1; }
        .home-action-text { flex: 1; }
        .home-action-title { font-weight: 800; font-size: 16px; color: #1e270c; }
        .home-action-desc { font-size: 13px; color: #3a3d3b; margin-top: 3px; font-weight: 600; line-height: 1.4; }
        .home-galet-badge { background: #f5eedd; border-radius: 20px; padding: 4px 10px; font-weight: 700; font-size: 12px; color: #c9a96e; white-space: nowrap; }

        /* ═══ CARDS GENERIC ═══ */
        .card { background: rgba(255,255,255,0.93); border-radius: 16px; padding: 16px; box-shadow: 0 2px 10px rgba(30,39,12,0.05); margin-bottom: 12px; }
        .card-header { display: flex; justify-content: space-between; align-items: center; }
        .card-title-sm { font-weight: 700; font-size: 14px; color: #2d2f2e; margin-bottom: 10px; }
        .link-btn { background: none; border: none; color: #5b7a5e; font-weight: 600; font-size: 13px; cursor: pointer; font-family: 'Nunito', sans-serif; }

        /* ═══ MODULE PLACEHOLDER ═══ */
        .module-card { background: rgba(255,255,255,0.93); border-radius: 24px; padding: 40px 24px; box-shadow: 0 4px 20px rgba(30,39,12,0.07); }
        .module-panda { font-size: 80px; line-height: 1; margin-bottom: 16px; }
        .module-panda.big { font-size: 100px; }
        .module-desc { font-size: 15px; color: #6b7c6e; line-height: 1.6; margin: 10px 0 20px; }
        .phase-badge { background: rgba(91,122,94,0.08); border-radius: 12px; padding: 14px 18px; font-size: 13px; color: #5b7a5e; font-weight: 600; }

        /* ═══ WATER ═══ */
        .water-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; animation: slideUp 0.4s ease both; }
        .water-panda { font-size: 48px; line-height: 1; }
        .water-main { background: rgba(255,255,255,0.93); border-radius: 24px; padding: 28px 20px; box-shadow: 0 4px 20px rgba(30,39,12,0.07); text-align: center; margin-bottom: 14px; }
        .circle-wrap { position: relative; width: 180px; height: 180px; margin: 0 auto 20px; }
        .circle-svg { transform: rotate(-90deg); width: 100%; height: 100%; }
        .circle-bg { fill: none; stroke: rgba(107,163,190,0.12); stroke-width: 12; }
        .circle-fill { fill: none; stroke: #6ba3be; stroke-width: 12; stroke-linecap: round; transition: stroke-dashoffset 0.6s ease; }
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
        .week-bars { display: flex; justify-content: space-between; margin-top: 14px; }
        .week-col { text-align: center; flex: 1; }
        .bar-track { width: 28px; height: 56px; background: rgba(107,163,190,0.08); border-radius: 14px; margin: 0 auto 6px; position: relative; overflow: hidden; }
        .bar-fill { position: absolute; bottom: 0; width: 100%; background: rgba(107,163,190,0.5); border-radius: 14px; transition: height 0.4s ease; }
        .bar-fill.today { background: #6ba3be; }
        .bar-label { font-size: 11px; color: #6b7c6e; }
        .bar-label.today { color: #4a8fa8; font-weight: 700; }

        /* ═══ PROFIL v5 ═══ */
        .profil-screen { padding-top: 10px; }
        .profil-box { background: rgba(255,255,255,0.93); border-radius: 20px; margin-bottom: 14px; padding: 20px; box-shadow: 0 2px 14px rgba(30,39,12,0.06); animation: slideUp 0.4s ease both; }
        .box-header { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .box-panda { font-size: 40px; line-height: 1; }
        .box-title { font-family: 'Josefin Sans'; font-weight: 700; font-size: 17px; color: #1e270c; }
        .box-subtitle { font-size: 12px; color: #6b7c6e; margin-top: 2px; }
        .avatar-zone { display: flex; flex-direction: column; align-items: center; }
        .avatar-circle { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg,#e8f0e4,#f5f0eb); border: 3px solid rgba(91,122,94,0.2); display: flex; align-items: center; justify-content: center; font-size: 44px; margin-bottom: 10px; cursor: pointer; position: relative; transition: transform 0.2s; }
        .avatar-circle:hover { transform: scale(1.05); }
        .avatar-edit-hint { position: absolute; bottom: -2px; right: -2px; background: #34490a; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; }
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
        .pstat-l { font-size: 11px; color: #6b7c6e; }
        .pstat-div { width: 1px; height: 28px; background: rgba(154,170,156,0.2); }

        /* MIROIR */
        .miroir-result { background: linear-gradient(135deg,#f5f0eb,#e8f0e4); border-radius: 16px; padding: 20px; text-align: center; }
        .miroir-date { font-size: 12px; color: #6b7c6e; margin-bottom: 8px; font-weight: 600; }
        .miroir-animal { font-size: 48px; margin-bottom: 6px; }
        .miroir-name { font-family: 'Josefin Sans'; font-weight: 700; font-size: 20px; color: #1e270c; }
        .miroir-letter { font-size: 13px; color: #6b7c6e; margin-top: 2px; }
        .miroir-insight { margin-top: 14px; padding: 14px; background: rgba(255,255,255,0.7); border-radius: 12px; text-align: left; font-size: 13px; line-height: 1.6; color: #2d2f2e; }
        .miroir-insight-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .miroir-insight-panda { font-size: 28px; line-height: 1; }
        .miroir-insight-title { font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .miroir-insight-title.up { color: #3a5a40; }
        .miroir-insight-title.down { color: #a0604a; }
        .miroir-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
        .tag-plus { background: rgba(91,122,94,0.12); color: #3a5a40; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 600; }
        .tag-minus { background: rgba(192,120,90,0.12); color: #a0604a; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 600; }
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
        .rel-animal { font-size: 24px; }
        .rel-info { flex: 1; }
        .rel-label { font-weight: 700; font-size: 14px; color: #2d2f2e; }
        .rel-meta { font-size: 11px; color: #6b7c6e; }
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
        .path-stat-v { font-weight: 800; font-size: 16px; color: #3a5a40; }
        .path-stat-l { font-size: 10px; color: #6b7c6e; }
        .path-cta { display: block; width: 100%; margin-top: 14px; background: #34490a; color: white; border: none; border-radius: 14px; padding: 14px; font-family: 'Nunito'; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform 0.15s; }
        .path-cta:hover { transform: translateY(-1px); }
        .path-cta:active { transform: scale(0.98); }
        .path-galet-hint { margin-top: 10px; padding: 10px; background: rgba(201,169,110,0.1); border-radius: 10px; font-size: 12px; color: #6b7c6e; text-align: center; }
        .path-credit { margin-top: 10px; font-size: 11px; color: #9aaa9c; text-align: center; font-style: italic; }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }

        /* GALETS */
        .galets-summary { text-align: center; padding: 10px 0; }
        .galets-big { font-size: 36px; font-weight: 800; color: #c9a96e; }
        .galets-label { font-size: 13px; color: #6b7c6e; margin-top: 2px; }
        .galets-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 14px; }
        .galet-item { background: rgba(201,169,110,0.12); border-radius: 12px; padding: 12px; text-align: center; border: 1px solid rgba(201,169,110,0.2); }
        .galet-item-val { font-weight: 800; font-size: 16px; color: #c9a96e; }
        .galet-item-label { font-size: 11px; color: #5a4a3a; margin-top: 3px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
        .galets-earn-btn { display: block; width: 100%; margin-top: 12px; background: linear-gradient(135deg,#c9a96e,#b89860); color: white; border: none; border-radius: 14px; padding: 14px; font-family: 'Nunito'; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 3px 12px rgba(201,169,110,0.3); }
        .galets-earn-btn:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(201,169,110,0.4); }
        .galets-earn-btn:active { transform: scale(0.98); }
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
        .app-footer-legal { text-align: center; padding: 6px 0 60px; font-size: 10px; color: #9aaa9c; }
        /* ═══ NAVIGATION ═══ */
        .app-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: rgba(255,255,255,0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-top: 1px solid rgba(154,170,156,0.1); display: flex; padding: 6px 0 max(6px, env(safe-area-inset-bottom)); z-index: 100; }
        .nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 4px 0; border: none; background: transparent; cursor: pointer; transition: transform 0.15s; font-family: 'Nunito'; }
        .nav-btn:active { transform: scale(0.9); }
        .nav-emoji { font-size: 20px; line-height: 1; }
        .nav-label { font-size: 9px; color: #6b7c6e; }
        .nav-btn.active .nav-label { color: #34490a; font-weight: 700; }
        .nav-dot { width: 4px; height: 4px; border-radius: 50%; background: #34490a; }

        /* ═══ ANIMATIONS ═══ */
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: slideUp 0.4s ease both; }
      `}</style>

      <div className="app-shell">
        <div className="app-header">
          <div className="header-logo">
            <div className="header-panda">{P.logo}</div>
            <div className="header-title">PANDA ZEN</div>
          </div>
          <button className="header-avatar" onClick={() => setTab(6)}>👤</button>
        </div>

        {screens[tab]}
        <div className="app-footer-legal">© Centre VITA — VITA® · Panda Zen™</div>

        <div className="app-nav">
          {tabs.filter(t => t.id !== "profile").map((t, i) => (
            <button key={t.id} className={`nav-btn ${tab===i?"active":""}`} onClick={() => setTab(i)}>
              <span className="nav-emoji">{t.emoji}</span>
              <span className="nav-label">{t.label}</span>
              {tab===i && <div className="nav-dot" />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
