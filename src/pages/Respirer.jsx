export default function Respirer() {
  return (
    <div className="space-y-6 text-center">
      <div className="py-8">
        <span className="text-6xl block mb-4">🌬️</span>
        <h1 className="font-display text-2xl font-semibold text-zen-800">
          Respirer
        </h1>
        <p className="text-pebble-500 font-body mt-2">
          18 exercices de cohérence cardiaque
        </p>
      </div>

      {/* Placeholder cercle respiration */}
      <div className="flex justify-center">
        <div className="w-48 h-48 rounded-full border-4 border-water-300 flex items-center justify-center animate-breathe">
          <div className="text-center">
            <p className="font-display text-lg text-water-600">Inspire</p>
            <p className="font-body text-xs text-pebble-400 mt-1">5 secondes</p>
          </div>
        </div>
      </div>

      <div className="bg-white/60 rounded-2xl p-6 zen-shadow">
        <p className="font-body text-pebble-600">
          Module en cours d'intégration
        </p>
        <p className="font-body text-xs text-pebble-400 mt-1">
          → Chat 3 : Respirations prescrites par profil CI
        </p>
      </div>
    </div>
  )
}
