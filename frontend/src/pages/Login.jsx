import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'
import './Auth.css'

export default function Login() {
  const navigate  = useNavigate()
  const { login } = useAuth()

  const [form,    setForm]    = useState({ email: '', mot_de_passe: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

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

      // Redirige selon le rôle
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
        <div className="auth-brand">
          <div className="auth-brand-icon">🏢</div>
          <span className="auth-brand-name">ImmoGest</span>
        </div>
        <h2 className="auth-left-title">
  Gérez votre patrimoine <span>immobilier</span> en toute simplicité
</h2>
        <p className="auth-left-sub">
          ImmoGest centralise vos biens, locataires et finances
          en une seule plateforme moderne et sécurisée.
        </p>
        <ul className="auth-features">
          <li>Suivi des loyers et génération de quittances PDF</li>
          <li>Gestion des contrats de bail en ligne</li>
          <li>Demandes de maintenance en temps réel</li>
          <li>Tableau de bord financier avec graphiques</li>
          <li>Espace sécurisé pour les locataires</li>
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
      </div>

      {/* Panneau droit — formulaire */}
      <div className="auth-right">
        <div className="auth-form-wrap">

          <div className="auth-logo-row">
            <div className="auth-logo-box">🏢</div>
            <span className="auth-logo-text">ImmoGest</span>
          </div>

          <h1 className="auth-title">Bon retour !</h1>
          <p className="auth-subtitle">
            Connectez-vous à votre espace de gestion
          </p>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                placeholder="votre@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="mot_de_passe">
                Mot de passe
              </label>
              <input
                id="mot_de_passe"
                type="password"
                name="mot_de_passe"
                className="form-control"
                placeholder="••••••••"
                value={form.mot_de_passe}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>

          </form>

          <div className="auth-divider"><span>ou</span></div>

          <Link to="/register" className="btn btn-secondary auth-register-btn">
            Créer un compte propriétaire
          </Link>

          <p className="auth-bottom-text">
            Vous êtes locataire ?{' '}
            <Link to="/login" className="auth-link">
              Accès espace locataire
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}