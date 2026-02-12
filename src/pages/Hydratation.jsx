export default function Hydratation() {
  return (
    <div className="space-y-6 text-center">
      <div className="py-8">
        <span className="text-6xl block mb-4">💧</span>
        <h1 className="font-display text-2xl font-semibold text-zen-800">
          Hydratation
        </h1>
        <p className="text-pebble-500 font-body mt-2">
          Suis ta consommation d'eau
        </p>
      </div>

      {/* Placeholder compteur */}
      <div className="flex justify-center">
        <div className="w-40 h-40 rounded-full border-8 border-water-200 flex items-center justify-center">
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-water-500">0</p>
            <p className="font-body text-xs text-pebble-400">/8 verres</p>
          </div>
        </div>
      </div>

      <button className="bg-water-400 text-white font-body font-semibold px-8 py-3 rounded-full zen-shadow active:scale-95 transition-transform">
        + 1 verre 💧
      </button>

      <div className="bg-white/60 rounded-2xl p-6 zen-shadow">
        <p className="font-body text-pebble-600">
          Module en cours d'intégration
        </p>
        <p className="font-body text-xs text-pebble-400 mt-1">
          → Chat 6 : Gamification + Hydratation
        </p>
      </div>
    </div>
  )
}
