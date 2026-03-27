import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  FileText,
  Wrench,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

const navItems = [
  {
    section: 'Principal',
    items: [
      { path: '/dashboard',  label: 'Tableau de bord', icon: LayoutDashboard },
      { path: '/biens',      label: 'Mes biens',        icon: Building2 },
      { path: '/locataires', label: 'Locataires',       icon: Users },
    ]
  },
  {
    section: 'Finance',
    items: [
      { path: '/loyers',    label: 'Loyers',     icon: CreditCard },
      { path: '/contrats',  label: 'Contrats',   icon: FileText },
      { path: '/documents', label: 'Documents',  icon: FileText },
    ]
  },
  {
    section: 'Gestion',
    items: [
      { path: '/maintenance', label: 'Maintenance', icon: Wrench },
    ]
  },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Building2 size={18} />
        </div>
        <span className="logo-text">ImmoGest</span>
        <span className="logo-badge">Pro</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" aria-label="Navigation principale">
        {navItems.map(({ section, items }) => (
          <div key={section} className="nav-section">
            <span className="nav-section-label">{section}</span>
            {items.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <span className="nav-label">{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="sidebar-bottom">
        <div className="user-card">
          <div className="user-avatar">
            {user?.prenom?.[0]}{user?.nom?.[0]}
          </div>
          <div className="user-details">
            <span className="user-name">{user?.prenom} {user?.nom}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={13} strokeWidth={2} />
          Déconnexion
        </button>
      </div>

    </aside>
  )
}
