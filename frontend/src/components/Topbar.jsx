import { Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Topbar.css'

export default function Topbar({ title, subtitle, actions }) {
  const { user } = useAuth()

  const initials = user
    ? `${user.prenom?.[0] ?? ''}${user.nom?.[0] ?? ''}`.toUpperCase()
    : '?'

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-title">{title}</span>
        {subtitle && <span className="topbar-subtitle">{subtitle}</span>}
      </div>

      <div className="topbar-right">
        {actions && (
          <>
            <div className="topbar-actions">{actions}</div>
            <div className="topbar-divider" />
          </>
        )}

        <button className="topbar-icon-btn" title="Notifications" aria-label="Notifications">
          <Bell size={16} />
        </button>

        <div className="topbar-avatar" title={`${user?.prenom} ${user?.nom}`} role="button" aria-label="Profil utilisateur">
          {initials}
        </div>
      </div>
    </header>
  )
}
