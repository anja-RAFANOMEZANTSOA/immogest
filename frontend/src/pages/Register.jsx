import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../services/api'
import './Auth.css'

const LogoIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="url(#logoGradReg)"/>
    <path d="M16 6L7 13V26H13V20H19V26H25V13L16 6Z" fill="white" fillOpacity="0.95"/>
    <path d="M13 20H19V26H13V20Z" fill="white" fillOpacity="0.5"/>
    <defs>
      <linearGradient id="logoGradReg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B4513"/>
        <stop offset="100%" stopColor="#C9942A"/>
      </linearGradient>
    </defs>
  </svg>
)

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nom: '', prenom: '', email: '',
    mot_de_passe: '', confirm: '', telephone: ''
  })
  const [errors,  setErrors]  = useState({})
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.nom)    newErrors.nom    = 'Nom requis'
    if (!form.prenom) newErrors.prenom = 'Prénom requis'
    if (!form.email)  newErrors.email  = 'Email requis'
    if (!form.mot_de_passe)
      newErrors.mot_de_passe = 'Mot de passe requis'
    if (form.mot_de_passe.length < 6)
      newErrors.mot_de_passe = 'Au moins 6 caractères'
    if (form.mot_de_passe !== form.confirm)
      newErrors.confirm = 'Les mots de passe ne correspondent pas'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    try {
      await authAPI.register({
        nom:          form.nom,
        prenom:       form.prenom,
        email:        form.email,
        mot_de_passe: form.mot_de_passe,
        telephone:    form.telephone,
        role:         'proprietaire'
      })
      setSuccess('Compte créé ! Redirection...')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || 'Erreur lors de la création.'
      })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    borderColor: '#E8D5BF',
    outline: 'none',
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
        <h2 className="auth-left-title">Rejoignez <span>ImmoGest</span></h2>
        <p className="auth-left-sub">
          Créez votre compte propriétaire et commencez à gérer
          vos biens dès aujourd'hui.
        </p>
        <ul className="auth-features">
          <li><span className="auth-feature-check">✓</span>Gratuit et sans engagement</li>
          <li><span className="auth-feature-check">✓</span>Configuration en moins de 5 minutes</li>
          <li><span className="auth-feature-check">✓</span>Données sécurisées et chiffrées</li>
          <li><span className="auth-feature-check">✓</span>Interface simple et moderne</li>
        </ul>
      </div>

      {/* Panneau droit */}
      <div className="auth-right">
        <div className="auth-form-wrap">

          <div className="auth-logo-row">
            <LogoIcon size={36} />
            <span className="auth-logo-text">ImmoGest</span>
          </div>

          <h1 className="auth-title">Créer un compte</h1>
          <p className="auth-subtitle">Espace propriétaire bailleur</p>

          {errors.api && (
            <div className="alert alert-danger">{errors.api}</div>
          )}
          {success && (
            <div className="alert alert-success">✓ {success}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Prénom <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="prenom"
                  className={`form-control auth-input ${errors.prenom ? 'error' : ''}`}
                  placeholder="Votre prénom"
                  value={form.prenom}
                  onChange={handleChange}
                />
                {errors.prenom && <span className="form-error">{errors.prenom}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">
                  Nom <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="nom"
                  className={`form-control auth-input ${errors.nom ? 'error' : ''}`}
                  placeholder="Votre nom"
                  value={form.nom}
                  onChange={handleChange}
                />
                {errors.nom && <span className="form-error">{errors.nom}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                className={`form-control auth-input ${errors.email ? 'error' : ''}`}
                placeholder="votre@email.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input
                type="tel"
                name="telephone"
                className="form-control auth-input"
                placeholder="+261 34 00 000 00"
                value={form.telephone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Mot de passe <span className="required">*</span>
              </label>
              <input
                type="password"
                name="mot_de_passe"
                className={`form-control auth-input ${errors.mot_de_passe ? 'error' : ''}`}
                placeholder="Au moins 6 caractères"
                value={form.mot_de_passe}
                onChange={handleChange}
              />
              {errors.mot_de_passe && <span className="form-error">{errors.mot_de_passe}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Confirmer le mot de passe <span className="required">*</span>
              </label>
              <input
                type="password"
                name="confirm"
                className={`form-control auth-input ${errors.confirm ? 'error' : ''}`}
                placeholder="Répétez le mot de passe"
                value={form.confirm}
                onChange={handleChange}
              />
              {errors.confirm && <span className="form-error">{errors.confirm}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span className="auth-spinner" /> Création en cours...
                </span>
              ) : 'Créer mon compte'}
            </button>

          </form>

          <p className="auth-bottom-text" style={{ marginTop: 16 }}>
            Déjà un compte ?{' '}
            <Link to="/login" className="auth-link">Se connecter</Link>
          </p>

        </div>
      </div>
    </div>
  )
}
