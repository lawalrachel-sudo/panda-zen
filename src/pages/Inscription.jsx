export default function Inscription() {
  return (
    <div className="space-y-6 text-center">
      <div className="py-8">
        <span className="text-5xl block mb-4">✨</span>
        <h1 className="font-display text-2xl font-semibold text-zen-800">
          Rejoins Panda Zen
        </h1>
        <p className="text-pebble-500 font-body mt-2">
          Accès early adopter à vie
        </p>
      </div>

      {/* Pricing */}
      <div className="bg-white/60 rounded-2xl p-6 zen-shadow-lg border-2 border-leaf-400">
        <div className="bg-leaf-500 text-white text-xs font-body font-semibold px-3 py-1 rounded-full inline-block mb-3">
          OFFRE LANCEMENT
        </div>
        <p className="font-display text-4xl font-bold text-leaf-600">2,99€</p>
        <p className="font-body text-sm text-pebble-500">/mois • tarif bloqué à vie</p>
        <p className="font-body text-xs text-pebble-400 mt-2 line-through">
          Tarif standard : 4,99€/mois
        </p>

        <div className="border-t border-pebble-100 mt-4 pt-4 space-y-2 text-left">
          {[
            '🌬️ 18 respirations guidées',
            '🎴 72 cartes VITA quotidiennes',
            '🐾 Panda Relax (exercices)',
            '💧 Suivi hydratation',
            '🪨 Système galets & streaks',
            '🪞 Mon Miroir du jour',
          ].map((item) => (
            <p key={item} className="font-body text-sm text-zen-700">{item}</p>
          ))}
        </div>
      </div>

      <button className="w-full bg-leaf-500 text-white font-body font-semibold py-4 rounded-2xl zen-shadow-lg active:scale-[0.98] transition-transform text-lg">
        S'inscrire maintenant →
      </button>

      <p className="font-body text-xs text-pebble-400">
        Paiement sécurisé via Stripe • Résiliable à tout moment
      </p>

      <div className="bg-white/60 rounded-2xl p-6 zen-shadow">
        <p className="font-body text-pebble-600">
          Paiement Stripe en cours d'intégration
        </p>
        <p className="font-body text-xs text-pebble-400 mt-1">
          → Chat 7 : Stripe Checkout + Signup
        </p>
      </div>
    </div>
  )
}
