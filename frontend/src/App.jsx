import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

// Pages publiques
import Login    from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
// Pages propriétaire
import Dashboard   from './pages/Dashboard'
import Biens       from './pages/Biens'
import Locataires  from './pages/Locataires'
import Loyers      from './pages/Loyers'
import Maintenance from './pages/Maintenance'
import Documents   from './pages/Documents'
import Contrats from './pages/Contrats'

// Espace locataire
import EspaceLocataire from './pages/EspaceLocataire'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Pages publiques — accessibles sans connexion */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
<Route path="/" element={<Home />} />
          {/* Pages propriétaire — connexion obligatoire */}
          <Route element={<PrivateRoute allowedRoles={['proprietaire', 'admin']} />}>
            <Route path="/dashboard"   element={<Dashboard />} />
            <Route path="/biens"       element={<Biens />} />
            <Route path="/locataires"  element={<Locataires />} />
            <Route path="/contrats" element={<Contrats />} />
            <Route path="/loyers"      element={<Loyers />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/documents"   element={<Documents />} />
          </Route>

          {/* Espace locataire — connexion obligatoire */}
          <Route element={<PrivateRoute allowedRoles={['locataire']} />}>
            <Route path="/espace-locataire" element={<EspaceLocataire />} />
          </Route>

          {/* Redirection par défaut */}
          <Route path="/"  element={<Navigate to="/login" replace />} />
          <Route path="*"  element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}