import { useState, useEffect, useRef } from 'react'
import { Bell, CreditCard, Wrench, FileText, CheckCircle, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Topbar.css'

const API = import.meta.env.VITE_API_URL || 'https://immogest-backend.onrender.com'

const iconeParType = {
  loyer_retard:       <CreditCard size={14} />,
  maintenance:        <Wrench size={14} />,
  contrat_expiration: <FileText size={14} />,
  paiement_recu:      <CheckCircle size={14} />,
}

const couleurParType = {
  loyer_retard:       '#ef4444',
  maintenance:        '#f59e0b',
  contrat_expiration: '#8b5cf6',
  paiement_recu:      '#10b981',
}

export default function Topbar({ title, subtitle, actions }) {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState([])
  const [showNotifs, setShowNotifs]       = useState(false)
  const [showProfil, setShowProfil]       = useState(false)
  const [lues, setLues]                   = useState(new Set())

  const notifRef  = useRef(null)
  const profilRef = useRef(null)

  const initials = user
    ? `${user.prenom?.[0] ?? ''}${user.nom?.[0] ?? ''}`.toUpperCase()
    : '?'

  // Charger les notifications
  useEffect(() => {
    if (!token) return
    const charger = async () => {
      try {
        const res = await fetch(`${API}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setNotifications(data)
        }
      } catch (e) {
        console.error('Erreur notifications:', e)
      }
    }
    charger()
    const interval = setInterval(charger, 60000)
    return () => clearInterval(interval)
  }, [token])

  // Fermer les dropdowns en cliquant ailleurs
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current  && !notifRef.current.contains(e.target))  setShowNotifs(false)
      if (profilRef.current && !profilRef.current.contains(e.target)) setShowProfil(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const nonLues = notifications.filter(n => !lues.has(n.id)).length

  const handleOuvrirNotifs = () => {
    setShowNotifs(v => !v)
    setShowProfil(false)
  }

  const handleOuvrirProfil = () => {
    setShowProfil(v => !v)
    setShowNotifs(false)
  }

  const marquerToutLu = () => {
    setLues(new Set(notifications.map(n => n.id)))
  }

  const handleNotifClick = (notif) => {
    setLues(prev => new Set([...prev, notif.id]))
    setShowNotifs(false)
    navigate(notif.lien)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const formaterDate = (date) => {
    const d = new Date(date)
    const now = new Date()
    const diff = Math.floor((now - d) / 60000)
    if (diff < 1)    return "à l'instant"
    if (diff < 60)   return `il y a ${diff} min`
    if (diff < 1440) return `il y a ${Math.floor(diff / 60)}h`
    return d.toLocaleDateString('fr-FR')
  }

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

        {/* Cloche notifications */}
        <div className="topbar-notif-wrapper" ref={notifRef}>
          <button
            className="topbar-icon-btn"
            title="Notifications"
            onClick={handleOuvrirNotifs}
          >
            <Bell size={16} />
            {nonLues > 0 && (
              <span className="notif-badge">{nonLues > 9 ? '9+' : nonLues}</span>
            )}
          </button>

          {showNotifs && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <span>Notifications {nonLues > 0 && <span className="notif-count">({nonLues})</span>}</span>
                {nonLues > 0 && (
                  <button className="notif-tout-lire" onClick={marquerToutLu}>
                    Tout marquer lu
                  </button>
                )}
              </div>

              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div className="notif-empty">
                    <CheckCircle size={32} color="#10b981" />
                    <p>Tout est à jour !</p>
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`notif-item ${lues.has(notif.id) ? 'lue' : 'non-lue'}`}
                      onClick={() => handleNotifClick(notif)}
                    >
                      <span
                        className="notif-icone"
                        style={{ color: couleurParType[notif.type] }}
                      >
                        {iconeParType[notif.type]}
                      </span>
                      <div className="notif-content">
                        <span className="notif-titre">{notif.titre}</span>
                        <span className="notif-message">{notif.message}</span>
                        <span className="notif-date">{formaterDate(notif.date)}</span>
                      </div>
                      {!lues.has(notif.id) && <span className="notif-dot" />}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Avatar + dropdown profil */}
        <div className="topbar-profil-wrapper" ref={profilRef}>
          <div
            className="topbar-avatar"
            title={`${user?.prenom} ${user?.nom}`}
            onClick={handleOuvrirProfil}
          >
            {initials}
          </div>

          {showProfil && (
            <div className="profil-dropdown">
              <div className="profil-header">
                <div className="profil-avatar-lg">{initials}</div>
                <div>
                  <span className="profil-nom">{user?.prenom} {user?.nom}</span>
                  <span className="profil-email">{user?.email}</span>
                  <span className="profil-role">{user?.role}</span>
                </div>
              </div>
              <div className="profil-divider" />
              <button className="profil-logout" onClick={handleLogout}>
                <LogOut size={13} />
                Déconnexion
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
