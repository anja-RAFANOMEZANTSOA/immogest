import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'
import './Auth.css'

const LogoIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="url(#logoGrad)"/>
    <path d="M16 6L7 13V26H13V20H19V26H25V13L16 6Z" fill="white" fillOpacity="0.95"/>
    <path d="M13 20H19V26H13V20Z" fill="white" fillOpacity="0.5"/>
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563EB"/>
        <stop offset="100%" stopColor="#6366F1"/>
      </linearGradient>
    </defs>
  </svg>
)

export default function Login() {
  const navigate   = useNavigate()
  const { login }  = useAuth()
  const [form,     setForm]     = useState({ email: '', mot_de_passe: '' })
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.mot_de_passe) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    setLoading(true)
    try {
      const res = await authAPI.login(form)
      login(res.data.user, res.data.token)
      if (res.data.user.role === 'locataire') {
        navigate('/espace-locataire')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      {/* Panneau gauche */}
      <div className="auth-left">
        <div className="auth-grid-bg" />

        <div className="auth-brand">
          <LogoIcon size={40} />
          <span className="auth-brand-name">ImmoGest</span>
        </div>

        <div className="auth-left-badge">🏆 Plateforme #1 de gestion immobilière</div>

        <h2 className="auth-left-title">
          Gérez votre patrimoine <span>immobilier</span> en toute simplicité
        </h2>

        <p className="auth-left-sub">
          ImmoGest centralise vos biens, locataires et finances
          en une seule plateforme moderne et sécurisée.
        </p>

        <ul className="auth-features">
          <li><span className="auth-feature-check">✓</span>Suivi des loyers et génération de quittances PDF</li>
          <li><span className="auth-feature-check">✓</span>Gestion des contrats de bail en ligne</li>
          <li><span className="auth-feature-check">✓</span>Demandes de maintenance en temps réel</li>
          <li><span className="auth-feature-check">✓</span>Tableau de bord financier avec graphiques</li>
          <li><span className="auth-feature-check">✓</span>Espace sécurisé pour les locataires</li>
        </ul>

        <div className="auth-stats">
          <div className="auth-stat">
            <span className="auth-stat-value">500+</span>
            <span className="auth-stat-label">Biens gérés</span>
          </div>
          <div className="auth-stat">
            <span className="auth-stat-value">98%</span>
            <span className="auth-stat-label">Satisfaction</span>
          </div>
          <div className="auth-stat">
            <span className="auth-stat-value">24/7</span>
            <span className="auth-stat-label">Disponible</span>
          </div>
        </div>

        <div className="auth-testimonial">
          <p className="auth-testimonial-text">
            "ImmoGest a transformé la gestion de nos 50 appartements. Un outil indispensable !"
          </p>
          <div className="auth-testimonial-author">
            <div className="auth-testimonial-avatar">MR</div>
            <div>
              <div className="auth-testimonial-name">Marc Rakoto</div>
              <div className="auth-testimonial-role">Propriétaire, Antananarivo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Panneau droit */}
      <div className="auth-right">
        <div className="auth-form-wrap">

          <div className="auth-logo-row">
            <LogoIcon size={36} />
            <span className="auth-logo-text">ImmoGest</span>
          </div>

          <div className="auth-welcome-badge">👋 Bon retour parmi nous</div>

          <h1 className="auth-title">Connectez-vous</h1>
          <p className="auth-subtitle">
            Accédez à votre espace de gestion immobilière
          </p>

          {error && (
            <div className="alert alert-danger" style={{ borderRadius: 10, fontSize: 13.5 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Adresse email</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control auth-input"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="form-label" htmlFor="mot_de_passe" style={{ margin: 0 }}>
                  Mot de passe
                </label>
                <span style={{ fontSize: 12, color: '#2563EB', cursor: 'pointer', fontWeight: 500 }}>
                  Mot de passe oublié ?
                </span>
              </div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="mot_de_passe"
                  type={showPass ? 'text' : 'password'}
                  name="mot_de_passe"
                  className="form-control auth-input"
                  placeholder="••••••••"
                  value={form.mot_de_passe}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <span className="auth-input-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span className="auth-spinner" /> Connexion en cours...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  Se connecter
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              )}
            </button>

          </form>

          <div className="auth-divider"><span>ou</span></div>

          <Link to="/register" className="btn btn-secondary auth-register-btn">
            Créer un compte propriétaire
          </Link>

          <p className="auth-bottom-text">
            Vous êtes locataire ?{' '}
            <Link to="/login" className="auth-link">Accès espace locataire →</Link>
          </p>

          <div className="auth-secure-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Connexion sécurisée SSL 256-bit
          </div>

        </div>
      </div>
    </div>
  )
}