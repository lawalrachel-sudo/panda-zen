export default function Partenaires() {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">🤝</span>
        <h1 className="font-display text-2xl font-semibold text-zen-800">
          Nos Collaborateurs
        </h1>
        <p className="text-pebble-500 font-body mt-2">
          Praticiens, thérapeutes, lieux de bien-être
        </p>
      </div>

      <div className="bg-white/60 rounded-2xl p-6 zen-shadow space-y-4">
        <h2 className="font-display text-lg font-semibold text-zen-700">
          Rejoignez le réseau Panda Zen
        </h2>
        <div className="space-y-3 font-body text-pebble-600 text-sm">
          <p>
            Vous êtes praticien bien-être, thérapeute, coach ou gérant d'un lieu dédié au mieux-être ?
          </p>
          <p>
            Panda Zen construit un réseau de collaborateurs partageant une vision holistique de la santé et du bien-être.
          </p>
          <div className="bg-leaf-50 rounded-xl p-4 space-y-2">
            <p className="font-semibold text-leaf-700">En tant que collaborateur :</p>
            <p>✦ Visibilité auprès de notre communauté</p>
            <p>✦ Accès privilégié à la méthode VITA</p>
            <p>✦ Possibilité de devenir praticien certifié</p>
            <p>✦ Offres exclusives pour vos clients</p>
          </div>
        </div>
      </div>

      <a
        href="mailto:contact@panda-zen.com?subject=Devenir%20collaborateur%20Panda%20Zen"
        className="block w-full bg-gradient-to-r from-leaf-500 to-leaf-600 text-white text-center font-body font-semibold py-4 rounded-2xl zen-shadow hover:opacity-90 transition-opacity"
      >
        Nous contacter →
      </a>

      <p className="text-center text-xs text-pebble-400 font-body">
        Réponse sous 48h • contact@panda-zen.com
      </p>
    </div>
  )
}
