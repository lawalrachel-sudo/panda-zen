export default function Quiz() {
  return (
    <div className="space-y-6 text-center">
      <div className="py-12">
        <span className="text-6xl block mb-4">🪞</span>
        <h1 className="font-display text-2xl font-semibold text-zen-800">
          Mon Miroir du jour
        </h1>
        <p className="text-pebble-500 font-body mt-2">
          Lecture de ton profil intérieur
        </p>
        <p className="text-xs text-pebble-400 font-body mt-1">
          6 profils • Respirations personnalisées
        </p>
      </div>

      <div className="bg-white/60 rounded-2xl p-6 zen-shadow space-y-4">
        <div className="w-16 h-16 bg-leaf-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">⏳</span>
        </div>
        <p className="font-body text-pebble-600">
          Module en cours d'intégration
        </p>
        <p className="font-body text-xs text-pebble-400">
          → Chat 2 : Mon Miroir du jour
        </p>
      </div>
    </div>
  )
}
