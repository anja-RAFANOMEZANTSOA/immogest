import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { paiementAPI, maintenanceAPI, contratAPI } from '../services/api'
import './EspaceLocataire.css'

const STATUTS_LABELS = {
  en_attente: 'En attente',
  en_cours:   'En cours',
  resolu:     'Résolu'
}

const STATUTS_BADGES = {
  en_attente: 'badge-warning',
  en_cours:   'badge-info',
  resolu:     'badge-success'
}

const emptyForm = {
  bien_id:     '',
  titre:       '',
  description: '',
  priorite:    'moyenne'
}

export default function EspaceLocataire() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()

  const [contrat,     setContrat]     = useState(null)
  const [paiements,   setPaiements]   = useState([])
  const [maintenance, setMaintenance] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [showModal,   setShowModal]   = useState(false)
  const [form,        setForm]        = useState(emptyForm)
  const [errors,      setErrors]      = useState({})
  const [saving,      setSaving]      = useState(false)
  const [successMsg,  setSuccessMsg]  = useState('')

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [p, m, c] = await Promise.all([
        paiementAPI.getMiens(),
        maintenanceAPI.getAll(),
        contratAPI.getAll(),
      ])
      setPaiements(p.data)
      setMaintenance(m.data)
      const actif = c.data.find(ct => ct.statut === 'actif')
      setContrat(actif || null)
      if (actif) {
        setForm(prev => ({ ...prev, bien_id: actif.bien_id }))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.titre) {
      setErrors({ titre: 'Titre requis' })
      return
    }
    if (!contrat) {
      setErrors({ api: 'Aucun contrat actif trouvé.' })
      return
    }
    setSaving(true)
    try {
      await maintenanceAPI.create({
        ...form,
        bien_id: contrat.bien_id
      })
      setSuccessMsg('Demande envoyée avec succès !')
      setShowModal(false)
      setForm(emptyForm)
      fetchData()
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || 'Erreur serveur.'
      })
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="loading-wrap">
        <div className="spinner" />
        <span>Chargement...</span>
      </div>
    )
  }

  return (
    <div className="loc-page">

      {/* Topbar */}
      <header className="loc-topbar">
        <div className="loc-logo">
          <div className="loc-logo-icon">🏢</div>
          <span className="loc-logo-text">ImmoGest</span>
        </div>
        <nav className="loc-nav">
          <span className="loc-nav-item active">Mon contrat</span>
          <span className="loc-nav-item">Mes paiements</span>
          <span className="loc-nav-item">Maintenance</span>
        </nav>
        <div className="loc-user">
          <div className="loc-avatar">
            {user?.prenom?.[0]}{user?.nom?.[0]}
          </div>
          <span className="loc-username">
            {user?.prenom} {user?.nom}
          </span>
          <button
            className="btn btn-sm btn-secondary"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="loc-hero">
        <div>
          <h1 className="loc-greet">
            Bonjour, {user?.prenom} {user?.nom} 👋
          </h1>
          <p className="loc-hero-sub">
            {contrat
              ? `${contrat.bien_titre} — ${contrat.adresse}`
              : 'Aucun contrat actif'}
          </p>
        </div>
        {contrat && (
          <div className="loc-hero-badge">
            <div className="loc-hero-badge-title">Contrat actif</div>
            <div className="loc-hero-badge-sub">
              Jusqu'au{' '}
              {contrat.date_fin
                ? new Date(contrat.date_fin)
                    .toLocaleDateString('fr-FR')
                : 'Indéterminé'}
            </div>
          </div>
        )}
      </div>

      <div className="loc-content">

        {successMsg && (
          <div className="alert alert-success">✓ {successMsg}</div>
        )}

        {/* Stats */}
        {contrat && (
          <div
            className="stats-grid"
            style={{
              gridTemplateColumns: 'repeat(3,1fr)',
              marginBottom: 24
            }}
          >
            <div className="stat-card">
              <div className="stat-label">Loyer mensuel</div>
              <div className="stat-value">
                {Number(contrat.loyer).toLocaleString('fr-FR')} €
              </div>
              <div className="stat-sub up">
                {paiements[0]?.statut === 'paye'
                  ? '✓ Payé ce mois'
                  : 'En attente'}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Dépôt de garantie</div>
              <div className="stat-value">
                {contrat.depot_garantie
                  ? `${Number(contrat.depot_garantie)
                      .toLocaleString('fr-FR')} €`
                  : '—'}
              </div>
              <div className="stat-sub neutral">Versé à l'entrée</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Fin de bail</div>
              <div className="stat-value" style={{ fontSize: 18 }}>
                {contrat.date_fin
                  ? new Date(contrat.date_fin)
                      .toLocaleDateString('fr-FR')
                  : 'Indéterminée'}
              </div>
              <div className="stat-sub neutral">Date de fin</div>
            </div>
          </div>
        )}

        <div className="loc-grid">

          {/* Paiements */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">💳 Mes paiements</span>
            </div>
            {paiements.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💳</div>
                <p>Aucun paiement enregistré.</p>
              </div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Mois</th>
                      <th>Montant</th>
                      <th>Date</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paiements.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600 }}>
                          {p.mois_concerne}
                        </td>
                        <td style={{ fontWeight: 700 }}>
                          {Number(p.montant).toLocaleString('fr-FR')} €
                        </td>
                        <td>
                          {new Date(p.date_paiement)
                            .toLocaleDateString('fr-FR')}
                        </td>
                        <td>
                          <span className={`badge ${
                            p.statut === 'paye'
                              ? 'badge-success'
                              : 'badge-danger'
                          }`}>
                            {p.statut === 'paye' ? '✓ Payé' : '⚠ Retard'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Maintenance */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">🔧 Mes demandes</span>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setShowModal(true)}
              >
                + Nouvelle demande
              </button>
            </div>
            {maintenance.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🔧</div>
                <p>Aucune demande de maintenance.</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowModal(true)}
                >
                  + Soumettre une demande
                </button>
              </div>
            ) : (
              maintenance.map(m => (
                <div key={m.id} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '12px 0',
                  borderBottom: '1px solid #F5F3F0'
                }}>
                  <div style={{
                    width: 8, height: 8,
                    borderRadius: '50%',
                    marginTop: 5, flexShrink: 0,
                    background:
                      m.priorite === 'haute'   ? '#C1121F' :
                      m.priorite === 'moyenne' ? '#BC6C25' : '#1D4E89'
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#1C1C1C'
                    }}>
                      {m.titre}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B6B6B' }}>
                      {new Date(m.date_creation)
                        .toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <span className={`badge ${STATUTS_BADGES[m.statut]}`}>
                    {STATUTS_LABELS[m.statut]}
                  </span>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* Modal nouvelle demande */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={e => {
            if (e.target.className === 'modal-overlay')
              setShowModal(false)
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">
                🔧 Nouvelle demande de maintenance
              </h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            {errors.api && (
              <div className="alert alert-danger">{errors.api}</div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              <div className="form-group">
                <label className="form-label">
                  Titre du problème <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="titre"
                  className={`form-control ${errors.titre ? 'error' : ''}`}
                  placeholder="Ex : Fuite d'eau dans la cuisine"
                  value={form.titre}
                  onChange={handleChange}
                />
                {errors.titre && (
                  <span className="form-error">{errors.titre}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows={4}
                  placeholder="Décrivez le problème en détail..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Priorité</label>
                <select
                  name="priorite"
                  className="form-control"
                  value={form.priorite}
                  onChange={handleChange}
                >
                  <option value="basse">
                    Basse — pas urgent
                  </option>
                  <option value="moyenne">
                    Moyenne — à traiter sous peu
                  </option>
                  <option value="haute">
                    Haute — urgent !
                  </option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Envoi...' : 'Envoyer la demande'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}