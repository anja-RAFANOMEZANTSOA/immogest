import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { paiementAPI, contratAPI } from '../services/api'

const emptyForm = {
  contrat_id: '',
  montant: '',
  date_paiement: new Date().toISOString().split('T')[0],
  mois_concerne: ''
}

export default function Loyers() {
  const [paiements,  setPaiements]  = useState([])
  const [contrats,   setContrats]   = useState([])
  const [loading,    setLoading]    = useState(true)
  const [showModal,  setShowModal]  = useState(false)
  const [form,       setForm]       = useState(emptyForm)
  const [errors,     setErrors]     = useState({})
  const [saving,     setSaving]     = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [p, c] = await Promise.all([
        paiementAPI.getAll(),
        contratAPI.getAll()
      ])
      setPaiements(p.data)
      setContrats(c.data.filter(c => c.statut === 'actif'))
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

  const validate = () => {
    const err = {}
    if (!form.contrat_id)    err.contrat_id    = 'Contrat requis'
    if (!form.montant)       err.montant       = 'Montant requis'
    if (!form.date_paiement) err.date_paiement = 'Date requise'
    if (!form.mois_concerne) err.mois_concerne = 'Mois requis'
    return err
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSaving(true)
    try {
      await paiementAPI.create(form)
      setSuccessMsg('Paiement enregistré avec succès !')
      setShowModal(false)
      setForm(emptyForm)
      fetchData()
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setErrors({ api: err.response?.data?.message || 'Erreur serveur.' })
    } finally {
      setSaving(false)
    }
  }

  const totalMois = paiements.reduce((sum, p) => sum + Number(p.montant), 0)

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar
          title="Loyers"
          actions={
            <button className="btn btn-primary" onClick={() => { setForm(emptyForm); setErrors({}); setShowModal(true) }}>
              + Enregistrer un paiement
            </button>
          }
        />

        <div className="page-content">

          {successMsg && <div className="alert alert-success">✓ {successMsg}</div>}

          {/* Stat total */}
          <div className="card" style={{ marginBottom: 24, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 32 }}>💰</div>
            <div>
              <div style={{ fontSize: 12, color: '#6B7280', textTransform: 'uppercase' }}>Total encaissé</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#1A2E4A' }}>
                {totalMois.toLocaleString('fr-FR')} €
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-wrap"><div className="spinner" /><span>Chargement...</span></div>
          ) : paiements.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">💳</div>
              <h3>Aucun paiement</h3>
              <p>Enregistrez votre premier paiement de loyer.</p>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                + Enregistrer un paiement
              </button>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Locataire</th>
                    <th>Bien</th>
                    <th>Mois concerné</th>
                    <th>Date paiement</th>
                    <th>Montant</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {paiements.map(p => (
                    <tr key={p.id}>
                      <td>{p.prenom} {p.nom}</td>
                      <td>{p.bien_titre}</td>
                      <td>{p.mois_concerne}</td>
                      <td>{new Date(p.date_paiement).toLocaleDateString('fr-FR')}</td>
                      <td style={{ fontWeight: 700 }}>{Number(p.montant).toLocaleString('fr-FR')} €</td>
                      <td><span className="badge badge-success">Payé</span></td>
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
              <h2 className="modal-title">💳 Enregistrer un paiement</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>

            {errors.api && <div className="alert alert-danger">{errors.api}</div>}

            <form onSubmit={handleSave} noValidate>

              <div className="form-group">
                <label className="form-label">Contrat <span className="required">*</span></label>
                <select name="contrat_id" className={`form-control ${errors.contrat_id ? 'error' : ''}`} value={form.contrat_id} onChange={handleChange}>
                  <option value="">-- Sélectionnez un contrat --</option>
                  {contrats.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.bien_titre} — {c.locataire_nom} {c.locataire_prenom}
                    </option>
                  ))}
                </select>
                {errors.contrat_id && <span className="form-error">{errors.contrat_id}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Montant (€) <span className="required">*</span></label>
                  <input type="number" name="montant" className={`form-control ${errors.montant ? 'error' : ''}`} placeholder="850" value={form.montant} onChange={handleChange} min="0" />
                  {errors.montant && <span className="form-error">{errors.montant}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Date de paiement <span className="required">*</span></label>
                  <input type="date" name="date_paiement" className={`form-control ${errors.date_paiement ? 'error' : ''}`} value={form.date_paiement} onChange={handleChange} />
                  {errors.date_paiement && <span className="form-error">{errors.date_paiement}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mois concerné <span className="required">*</span></label>
                <input type="month" name="mois_concerne" className={`form-control ${errors.mois_concerne ? 'error' : ''}`} value={form.mois_concerne} onChange={handleChange} />
                {errors.mois_concerne && <span className="form-error">{errors.mois_concerne}</span>}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}