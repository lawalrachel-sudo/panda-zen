import { Link } from 'react-router-dom'

const quickActions = [
  { 
    path: '/respirer', 
    icon: '🌬️', 
    label: 'Respirer', 
    sub: 'Cohérence cardiaque',
    color: 'bg-water-50 border-water-200 hover:border-water-400',
    galets: '+3'
  },
  { 
    path: '/cartes', 
    icon: '🎴', 
    label: 'Carte du jour', 
    sub: 'Tirage VITA',
    color: 'bg-lotus-400/10 border-lotus-400/30 hover:border-lotus-500',
    galets: '+2'
  },
  { 
    path: '/eau', 
    icon: '💧', 
    label: 'Boire', 
    sub: 'Hydratation',
    color: 'bg-water-50 border-water-200 hover:border-water-400',
    galets: '+1'
  },
  { 
    path: '/relax', 
    icon: '🐾', 
    label: 'Panda Relax', 
    sub: 'Exercices bien-être',
    color: 'bg-leaf-50 border-leaf-200 hover:border-leaf-400',
    galets: '+5'
  },
]

export default function Accueil() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'

  return (
    <div className="space-y-6">
      {/* Salutation */}
      <div className="text-center space-y-1">
        <h1 className="font-display text-2xl font-semibold text-zen-800">
          {greeting} 🐼
        </h1>
        <p className="text-pebble-500 font-body text-sm">
          Prends un moment pour toi aujourd'hui
        </p>
      </div>

      {/* Streak */}
      <div className="bg-white/60 rounded-2xl p-4 zen-shadow flex items-center justify-between">
        <div>
          <p className="text-xs text-pebble-500 font-body">Série en cours</p>
          <p className="font-display text-xl font-semibold text-leaf-600">0 jour</p>
        </div>
        <div className="flex gap-1">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className="w-6 h-6 rounded-full border-2 border-pebble-200 flex items-center justify-center"
            >
              <span className="text-xs opacity-30">○</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map(({ path, icon, label, sub, color, galets }) => (
          <Link
            key={path}
            to={path}
            className={`rounded-2xl p-4 border-2 transition-all duration-200 active:scale-95 ${color}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-3xl">{icon}</span>
              <span className="text-[10px] font-body font-medium text-leaf-500 bg-leaf-50 px-1.5 py-0.5 rounded-full">
                {galets} 🪨
              </span>
            </div>
            <p className="font-body font-semibold text-zen-700 text-sm">{label}</p>
            <p className="font-body text-xs text-pebble-400">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Quiz Couple Intérieur CTA */}
      <Link
        to="/quiz"
        className="block bg-gradient-to-r from-leaf-500 to-leaf-600 text-white rounded-2xl p-5 zen-shadow-lg active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🪞</span>
          <div>
            <p className="font-display font-semibold text-lg">Mon Miroir du jour</p>
            <p className="font-body text-sm text-leaf-100">
              Lecture de ton profil intérieur • 2 min
            </p>
          </div>
          <span className="ml-auto text-2xl">→</span>
        </div>
      </Link>

      {/* Inscription beta */}
      <Link
        to="/inscription"
        className="block text-center py-3 text-pebble-500 font-body text-sm hover:text-leaf-600 transition-colors"
      >
        ✨ Rejoins les early adopters • 2,99€/mois
      </Link>

      {/* Collaborateurs */}
      <Link
        to="/partenaires"
        className="block text-center py-2 text-pebble-400 font-body text-xs hover:text-leaf-600 transition-colors"
      >
        🤝 Praticien ? Rejoignez nos collaborateurs
      </Link>
    </div>
  )
}
