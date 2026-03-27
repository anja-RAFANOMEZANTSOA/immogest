import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import { maintenanceAPI, bienAPI } from '../services/api'

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

const PRIORITES_BADGES = {
  haute:   'badge-danger',
  moyenne: 'badge-warning',
  basse:   'badge-info'
}

export default function Maintenance() {
  const [demandes,     setDemandes]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [filterStatut, setFilterStatut] = useState('tous')
  const [successMsg,   setSuccessMsg]   = useState('')
  const [errorMsg,     setErrorMsg]     = useState('')
  const [showModal,    setShowModal]    = useState(false)
  const [biens,        setBiens]        = useState([])
  const [form,         setForm]         = useState({ titre: '', description: '', priorite: 'moyenne', bien_id: '' })
  const [saving,       setSaving]       = useState(false)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [m, b] = await Promise.all([
        maintenanceAPI.getAll(),
        bienAPI.getAll()
      ])
      setDemandes(m.data)
      setBiens(b.data)
    } catch (err) {
      setErrorMsg('Erreur lors du chargement.')
    } finally {
      setLoading(false)
    }
  }

  const handleStatut = async (id, newStatut) => {
    try {
      await maintenanceAPI.updateStatut(id, newStatut)
      setDemandes(demandes.map(d =>
        d.id === id ? { ...d, statut: newStatut } : d
      ))
      setSuccessMsg('Statut mis à jour !')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setErrorMsg('Erreur lors de la mise à jour.')
      setTimeout(() => setErrorMsg(''), 3000)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.titre || !form.bien_id) return
    setSaving(true)
    try {
      await maintenanceAPI.create(form)
      setSuccessMsg('Demande créée avec succès !')
      setShowModal(false)
      setForm({ titre: '', description: '', priorite: 'moyenne', bien_id: '' })
      fetchData()
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setErrorMsg('Erreur serveur.')
    } finally {
      setSaving(false)
    }
  }

  const demandesFiltrees = filterStatut === 'tous'
    ? demandes
    : demandes.filter(d => d.statut === filterStatut)

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar
          title="Maintenance"
          actions={
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Nouvelle demande
            </button>
          }
        />

        <div className="page-content">

          {successMsg && (
            <div className="alert alert-success">✓ {successMsg}</div>
          )}
          {errorMsg && (
            <div className="alert alert-danger">{errorMsg}</div>
          )}

          {/* Stats */}
          <div className="stats-grid"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            <div className="stat-card">
              <div className="stat-label">En attente</div>
              <div className="stat-value" style={{ color: '#BC6C25' }}>
                {demandes.filter(d => d.statut === 'en_attente').length}
              </div>
              <div className="stat-sub neutral">À traiter</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">En cours</div>
              <div className="stat-value" style={{ color: '#1D4E89' }}>
                {demandes.filter(d => d.statut === 'en_cours').length}
              </div>
              <div className="stat-sub neutral">En traitement</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Résolues</div>
              <div className="stat-value" style={{ color: '#2D6A4F' }}>
                {demandes.filter(d => d.statut === 'resolu').length}
              </div>
              <div className="stat-sub up">Terminées</div>
            </div>
          </div>

          {/* Filtres */}
          <div className="tabs">
            {[
              { value: 'tous',       label: `Toutes (${demandes.length})` },
              { value: 'en_attente', label: `En attente (${demandes.filter(d => d.statut === 'en_attente').length})` },
              { value: 'en_cours',   label: `En cours (${demandes.filter(d => d.statut === 'en_cours').length})` },
              { value: 'resolu',     label: `Résolues (${demandes.filter(d => d.statut === 'resolu').length})` },
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

          {/* Tableau */}
          {loading ? (
            <div className="loading-wrap">
              <div className="spinner" />
              <span>Chargement...</span>
            </div>
          ) : demandesFiltrees.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔧</div>
              <h3>Aucune demande</h3>
              <p>Les demandes de maintenance apparaîtront ici.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Priorité</th>
                    <th>Titre</th>
                    <th>Bien</th>
                    <th>Locataire</th>
                    <th>Date</th>
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {demandesFiltrees.map(d => (
                    <tr key={d.id}>
                      <td>
                        <span className={`badge ${PRIORITES_BADGES[d.priorite]}`}>
                          {d.priorite}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{d.titre}</td>
                      <td>{d.bien_titre}</td>
                      <td>{d.prenom} {d.nom}</td>
                      <td>
                        {new Date(d.date_creation).toLocaleDateString('fr-FR')}
                      </td>
                      <td>
                        <span className={`badge ${STATUTS_BADGES[d.statut]}`}>
                          {STATUTS_LABELS[d.statut]}
                        </span>
                      </td>
                      <td>
                        {d.statut !== 'resolu' && (
                          <select
                            className="form-control"
                            style={{ height: 34, fontSize: 12, padding: '0 10px', width: 'auto' }}
                            value={d.statut}
                            onChange={e => handleStatut(d.id, e.target.value)}
                          >
                            <option value="en_attente">En attente</option>
                            <option value="en_cours">En cours</option>
                            <option value="resolu">Résolu</option>
                          </select>
                        )}
                        {d.statut === 'resolu' && (
                          <span style={{ fontSize: 12, color: '#2D6A4F', fontWeight: 600 }}>
                            ✓ Terminé
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => { if (e.target.className === 'modal-overlay') setShowModal(false) }}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">🔧 Nouvelle demande</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave} noValidate>
              <div className="form-group">
                <label className="form-label">Titre <span className="required">*</span></label>
                <input type="text" className="form-control" placeholder="Ex: Fuite d'eau" value={form.titre} onChange={e => setForm({...form, titre: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Bien <span className="required">*</span></label>
                <select className="form-control" value={form.bien_id} onChange={e => setForm({...form, bien_id: e.target.value})}>
                  <option value="">-- Sélectionnez un bien --</option>
                  {biens.map(b => <option key={b.id} value={b.id}>{b.titre}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priorité</label>
                <select className="form-control" value={form.priorite} onChange={e => setForm({...form, priorite: e.target.value})}>
                  <option value="basse">Basse</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="haute">Haute</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} placeholder="Décrivez le problème..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Envoi...' : 'Créer la demande'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}