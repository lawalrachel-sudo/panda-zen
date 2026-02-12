export default function Cartes() {
  return (
    <div className="space-y-6 text-center">
      <div className="py-8">
        <span className="text-6xl block mb-4">🎴</span>
        <h1 className="font-display text-2xl font-semibold text-zen-800">
          Cartes VITA
        </h1>
        <p className="text-pebble-500 font-body mt-2">
          Tire 2 cartes par jour
        </p>
        <p className="text-xs text-pebble-400 font-body mt-1">
          72 cartes • Feuille • Nœud • Racine
        </p>
      </div>

      {/* Placeholder carte */}
      <div className="flex justify-center gap-4">
        <div className="w-32 h-48 bg-gradient-to-b from-leaf-100 to-leaf-200 rounded-xl zen-shadow flex items-center justify-center border-2 border-leaf-300/50">
          <span className="text-4xl">🍃</span>
        </div>
        <div className="w-32 h-48 bg-gradient-to-b from-pebble-100 to-pebble-200 rounded-xl zen-shadow flex items-center justify-center border-2 border-pebble-300/50">
          <span className="text-4xl">?</span>
        </div>
      </div>

      <div className="bg-white/60 rounded-2xl p-6 zen-shadow">
        <p className="font-body text-pebble-600">
          Module en cours d'intégration
        </p>
        <p className="font-body text-xs text-pebble-400 mt-1">
          → Chat 4 : Tirage cartes VITA (72 cartes)
        </p>
      </div>
    </div>
  )
}
