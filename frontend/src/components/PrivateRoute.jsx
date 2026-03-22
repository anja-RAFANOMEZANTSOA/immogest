import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth()

  // Pendant le chargement → affiche un spinner
  if (loading) {
    return (
      <div className="loading-wrap">
        <div className="spinner" />
      </div>
    )
  }

  // Pas connecté → redirige vers login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Mauvais rôle → redirige selon le rôle
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    if (user.role === 'locataire') {
      return <Navigate to="/espace-locataire" replace />
    }
    return <Navigate to="/dashboard" replace />
  }

  // Tout est OK → affiche la page
  return <Outlet />
}