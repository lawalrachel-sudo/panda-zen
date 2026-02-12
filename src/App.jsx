import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Accueil from './pages/Accueil'
import Quiz from './pages/Quiz'
import Respirer from './pages/Respirer'
import Cartes from './pages/Cartes'
import Relax from './pages/Relax'
import Hydratation from './pages/Hydratation'
import Profil from './pages/Profil'
import Partenaires from './pages/Partenaires'
import Inscription from './pages/Inscription'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Accueil />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="respirer" element={<Respirer />} />
        <Route path="cartes" element={<Cartes />} />
        <Route path="relax" element={<Relax />} />
        <Route path="eau" element={<Hydratation />} />
        <Route path="profil" element={<Profil />} />
        <Route path="inscription" element={<Inscription />} />
        <Route path="partenaires" element={<Partenaires />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
