export default function Profil() {
  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <span className="text-5xl block mb-3">🪨</span>
        <h1 className="font-display text-2xl font-semibold text-zen-800">
          Mon Profil
        </h1>
      </div>

      {/* Profil CI */}
      <div className="bg-white/60 rounded-2xl p-5 zen-shadow space-y-3">
        <p className="font-body font-semibold text-zen-700">Mon Miroir</p>
        <div className="bg-pebble-50 rounded-xl p-4 text-center">
          <p className="text-pebble-400 font-body text-sm">
            Fais ta lecture pour découvrir ton profil
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white/60 rounded-2xl p-5 zen-shadow space-y-3">
        <p className="font-body font-semibold text-zen-700">Mes statistiques</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-leaf-50 rounded-xl p-3">
            <p className="font-display text-xl font-bold text-leaf-600">0</p>
            <p className="font-body text-[10px] text-pebble-500">Galets</p>
          </div>
          <div className="bg-water-50 rounded-xl p-3">
            <p className="font-display text-xl font-bold text-water-500">0</p>
            <p className="font-body text-[10px] text-pebble-500">Séances</p>
          </div>
          <div className="bg-pebble-50 rounded-xl p-3">
            <p className="font-display text-xl font-bold text-pebble-600">0</p>
            <p className="font-body text-[10px] text-pebble-500">Jours</p>
          </div>
        </div>
      </div>

      {/* Paramètres */}
      <div className="bg-white/60 rounded-2xl p-5 zen-shadow space-y-2">
        <p className="font-body font-semibold text-zen-700 mb-3">Paramètres</p>
        {['Notifications', 'Mode sombre', 'Langue', 'Mentions légales'].map((item) => (
          <div key={item} className="flex justify-between items-center py-2 border-b border-pebble-100 last:border-0">
            <span className="font-body text-sm text-zen-700">{item}</span>
            <span className="text-pebble-400">›</span>
          </div>
        ))}
      </div>
    </div>
  )
}
