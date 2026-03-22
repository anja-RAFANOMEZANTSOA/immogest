import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import { bienAPI } from '../services/api'

const STATUTS = [
  { value: 'disponible', label: 'Disponible', badge: 'badge-warning' },
  { value: 'loue',       label: 'Loué',       badge: 'badge-success' },
  { value: 'travaux',    label: 'En travaux',  badge: 'badge-danger'  },
]

const TYPES = ['appartement', 'maison', 'local']

const emptyForm = {
  titre: '', adresse: '', ville: '', type: 'appartement',
  surface: '', loyer: '', charges: '', statut: 'disponible',
  description: ''
}

export default function Biens() {
  const [biens,        setBiens]        = useState([])
  const [loading,      setLoading]      = useState(true)
  const [showModal,    setShowModal]    = useState(false)
  const [editBien,     setEditBien]     = useState(null)
  const [form,         setForm]         = useState(emptyForm)
  const [errors,       setErrors]       = useState({})
  const [saving,       setSaving]       = useState(false)
  const [filterStatut, setFilterStatut] = useState('tous')
  const [globalError,  setGlobalError]  = useState('')
  const [successMsg,   setSuccessMsg]   = useState('')

  useEffect(() => { fetchBiens() }, [])

  const fetchBiens = async () => {
    try {
      const res = await bienAPI.getAll()
      setBiens(res.data)
    } catch (err) {
      setGlobalError('Erreur lors du chargement des biens.')
    } finally {
      setLoading(false)
    }
  }

  const openCreate = () => {
    setEditBien(null)
    setForm(emptyForm)
    setErrors({})
    setShowModal(true)
  }

  const openEdit = (bien) => {
    setEditBien(bien)
    setForm({
      titre:       bien.titre,
      adresse:     bien.adresse,
      ville:       bien.ville,
      type:        bien.type,
      surface:     bien.surface     || '',
      loyer:       bien.loyer,
      charges:     bien.charges     || '',
      statut:      bien.statut,
      description: bien.description || ''
    })
    setErrors({})
    setShowModal(true)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const err = {}
    if (!form.titre)   err.titre   = 'Titre requis'
    if (!form.adresse) err.adresse = 'Adresse requise'
    if (!form.ville)   err.ville   = 'Ville requise'
    if (!form.loyer)   err.loyer   = 'Loyer requis'
    if (form.loyer && isNaN(form.loyer))
      err.loyer = 'Montant invalide'
    return err
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSaving(true)
    try {
      if (editBien) {
        await bienAPI.update(editBien.id, form)
        setSuccessMsg('Bien mis à jour !')
      } else {
        await bienAPI.create(form)
        setSuccessMsg('Bien créé avec succès !')
      }
      setShowModal(false)
      fetchBiens()
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || 'Erreur serveur.'
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce bien ?')) return
    try {
      await bienAPI.delete(id)
      setBiens(biens.filter(b => b.id !== id))
      setSuccessMsg('Bien supprimé.')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setGlobalError(
        err.response?.data?.message || 'Erreur lors de la suppression.'
      )
      setTimeout(() => setGlobalError(''), 4000)
    }
  }

  const biensFiltres = filterStatut === 'tous'
    ? biens
    : biens.filter(b => b.statut === filterStatut)

  const getBadge = (statut) =>
    STATUTS.find(s => s.value === statut) || {}

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar
          title="Mes biens"
          actions={
            <button className="btn btn-primary" onClick={openCreate}>
              + Ajouter un bien
            </button>
          }
        />

        <div className="page-content">

          {globalError && (
            <div className="alert alert-danger">{globalError}</div>
          )}
          {successMsg && (
            <div className="alert alert-success">✓ {successMsg}</div>
          )}

          {/* Filtres */}
          <div className="tabs">
            {[
              { value: 'tous',       label: `Tous (${biens.length})` },
              { value: 'loue',       label: `Loués (${biens.filter(b => b.statut === 'loue').length})` },
              { value: 'disponible', label: `Disponibles (${biens.filter(b => b.statut === 'disponible').length})` },
              { value: 'travaux',    label: `Travaux (${biens.filter(b => b.statut === 'travaux').length})` },
            ].map(f => (
              <button
                key={f.value}
                className={`tab ${filterStatut === f.value ? 'active' : ''}`}
                onClick={() => setFilterStatut(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Contenu */}
          {loading ? (
            <div className="loading-wrap">
              <div className="spinner" />
              <span>Chargement...</span>
            </div>
          ) : biensFiltres.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏠</div>
              <h3>Aucun bien trouvé</h3>
              <p>Ajoutez votre premier bien immobilier.</p>
              <button className="btn btn-primary" onClick={openCreate}>
                + Ajouter un bien
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 20
            }}>
              {biensFiltres.map(bien => {
                const badge = getBadge(bien.statut)
                return (
                  <div key={bien.id} className="card" style={{
                    cursor: 'default',
                    transition: 'all 0.2s ease'
                  }}>
                    {/* Image placeholder */}
                    <div style={{
                      height: 120,
                      background: 'linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%)',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 40,
                      marginBottom: 16,
                      border: '1px solid #BFDBFE'
                    }}>
                      {bien.type === 'maison' ? '🏠' :
                       bien.type === 'local'  ? '🏪' : '🏢'}
                    </div>

                    {/* Infos */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 6
                    }}>
                      <h3 style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#1A2E4A',
                        flex: 1,
                        marginRight: 8,
                        lineHeight: 1.3
                      }}>
                        {bien.titre}
                      </h3>
                      <span className={`badge ${badge.badge}`}>
                        {badge.label}
                      </span>
                    </div>

                    <p style={{
                      fontSize: 12,
                      color: '#6B7280',
                      marginBottom: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      📍 {bien.adresse}, {bien.ville}
                    </p>

                    <p style={{
                      fontSize: 12,
                      color: '#9CA3AF',
                      marginBottom: 14,
                      textTransform: 'capitalize'
                    }}>
                      {bien.type}
                      {bien.surface ? ` • ${bien.surface} m²` : ''}
                    </p>

                    {/* Prix et actions */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 14,
                      borderTop: '1px solid #F3F4F6'
                    }}>
                      <div>
                        <span style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: '#1A2E4A'
                        }}>
                          {Number(bien.loyer).toLocaleString('fr-FR')} €
                        </span>
                        <span style={{
                          fontSize: 11,
                          color: '#9CA3AF',
                          marginLeft: 4
                        }}>
                          /mois
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => openEdit(bien)}
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(bien.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal Ajout / Modification */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.className === 'modal-overlay') setShowModal(false)
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {editBien ? '✏️ Modifier le bien' : '🏠 Ajouter un bien'}
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

            <form onSubmit={handleSave} noValidate>

              <div className="form-group">
                <label className="form-label">
                  Titre <span className="required">*</span>
                </label>
                <input
                  type="text" name="titre"
                  className={`form-control ${errors.titre ? 'error' : ''}`}
                  placeholder="Ex : Appartement T3 Lyon"
                  value={form.titre} onChange={handleChange}
                />
                {errors.titre && (
                  <span className="form-error">{errors.titre}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Adresse <span className="required">*</span>
                  </label>
                  <input
                    type="text" name="adresse"
                    className={`form-control ${errors.adresse ? 'error' : ''}`}
                    placeholder="12 Rue de la Paix"
                    value={form.adresse} onChange={handleChange}
                  />
                  {errors.adresse && (
                    <span className="form-error">{errors.adresse}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Ville <span className="required">*</span>
                  </label>
                  <input
                    type="text" name="ville"
                    className={`form-control ${errors.ville ? 'error' : ''}`}
                    placeholder="Lyon"
                    value={form.ville} onChange={handleChange}
                  />
                  {errors.ville && (
                    <span className="form-error">{errors.ville}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    name="type"
                    className="form-control"
                    value={form.type} onChange={handleChange}
                  >
                    {TYPES.map(t => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Surface (m²)</label>
                  <input
                    type="number" name="surface"
                    className="form-control"
                    placeholder="65"
                    value={form.surface} onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Loyer (€) <span className="required">*</span>
                  </label>
                  <input
                    type="number" name="loyer"
                    className={`form-control ${errors.loyer ? 'error' : ''}`}
                    placeholder="850"
                    value={form.loyer} onChange={handleChange}
                    min="0"
                  />
                  {errors.loyer && (
                    <span className="form-error">{errors.loyer}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Charges (€)</label>
                  <input
                    type="number" name="charges"
                    className="form-control"
                    placeholder="50"
                    value={form.charges} onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>

              {editBien && (
                <div className="form-group">
                  <label className="form-label">Statut</label>
                  <select
                    name="statut"
                    className="form-control"
                    value={form.statut} onChange={handleChange}
                  >
                    {STATUTS.map(s => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Décrivez votre bien..."
                  value={form.description} onChange={handleChange}
                  rows={3}
                />
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
                  {saving ? 'Enregistrement...' :
                   editBien ? 'Mettre à jour' : 'Ajouter le bien'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}