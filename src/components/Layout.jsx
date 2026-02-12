import { Outlet, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', icon: '🏠', label: 'Accueil' },
  { path: '/respirer', icon: '🌬️', label: 'Respirer' },
  { path: '/cartes', icon: '🎴', label: 'Cartes' },
  { path: '/relax', icon: '🐾', label: 'Relax' },
  { path: '/profil', icon: '🪨', label: 'Profil' },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-pebble-200/50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <img 
              src="/images/logo-panda-zen.png" 
              alt="Panda Zen" 
              className="w-8 h-8 rounded-lg"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <span className="font-display font-semibold text-leaf-600 text-lg">
              Panda Zen
            </span>
          </NavLink>

          {/* Compteur galets */}
          <div className="flex items-center gap-1.5 bg-pebble-100 px-3 py-1.5 rounded-full">
            <span className="text-sm">🪨</span>
            <span className="font-body font-semibold text-pebble-700 text-sm">0</span>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 pb-24">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>

      {/* Navigation basse */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-pebble-200/50 safe-bottom z-40">
        <div className="max-w-lg mx-auto flex justify-around py-2">
          {navItems.map(({ path, icon, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-leaf-600 scale-105'
                    : 'text-pebble-400 hover:text-pebble-600'
                }`
              }
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className="text-[10px] font-body font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
