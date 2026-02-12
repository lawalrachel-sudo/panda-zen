export default function Relax() {
  const animals = ['🐝', '🪲', '🐸', '🦋', '🐢', '🐱', '🐙', '🦉']

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <span className="text-5xl block mb-3">🐾</span>
        <h1 className="font-display text-2xl font-semibold text-zen-800">
          Panda Relax
        </h1>
        <p className="text-pebble-500 font-body mt-1">
          16 animaux • 64 exercices
        </p>
      </div>

      {/* Grille animaux placeholder */}
      <div className="grid grid-cols-4 gap-3">
        {animals.map((emoji, i) => (
          <div
            key={i}
            className="aspect-square bg-white/60 rounded-2xl zen-shadow flex items-center justify-center text-3xl hover:scale-105 transition-transform cursor-pointer"
          >
            {emoji}
          </div>
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`locked-${i}`}
            className="aspect-square bg-pebble-100/50 rounded-2xl flex items-center justify-center text-2xl opacity-40"
          >
            🔒
          </div>
        ))}
      </div>

      <div className="bg-white/60 rounded-2xl p-6 zen-shadow text-center">
        <p className="font-body text-pebble-600">
          Module en cours d'intégration
        </p>
        <p className="font-body text-xs text-pebble-400 mt-1">
          → Chat 5 : Fiches Panda Relax (16 × 4 exercices)
        </p>
      </div>
    </div>
  )
}
