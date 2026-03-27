import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { contratAPI, bienAPI, locataireAPI } from '../services/api'

const emptyForm = {
  bien_id: '',
  locataire_id: '',
  date_debut: '',
  date_fin: '',
  loyer: '',
  depot_garantie: ''
}

export default function Contrats() {
  const [contrats,   setContrats]   = useState([])
  const [biens,      setBiens]      = useState([])
  const [locataires, setLocataires] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [showModal,  setShowModal]  = useState(false)
  const [form,       setForm]       = useState(emptyForm)
  const [errors,     setErrors]     = useState({})
  const [saving,     setSaving]     = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [c, b, l] = await Promise.all([
        contratAPI.getAll(),
        bienAPI.getAll(),
        locataireAPI.getAll()
      ])
      setContrats(c.data)
      setBiens(b.data.filter(b => b.statut === 'disponible'))
      setLocataires(l.data)
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
    if (!form.bien_id)      err.bien_id      = 'Bien requis'
    if (!form.locataire_id) err.locataire_id = 'Locataire requis'
    if (!form.date_debut)   err.date_debut   = 'Date début requise'
    if (!form.loyer)        err.loyer        = 'Loyer requis'
    return err
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSaving(true)
    try {
      await contratAPI.create(form)
      setSuccessMsg('Contrat créé avec succès !')
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

  const handleTerminer = async (id) => {
    if (!window.confirm('Terminer ce contrat ?')) return
    try {
      await contratAPI.terminer(id)
      setSuccessMsg('Contrat terminé.')
      fetchData()
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar
          title="Contrats"
          actions={
            <button className="btn btn-primary" onClick={() => { setForm(emptyForm); setErrors({}); setShowModal(true) }}>
              + Nouveau contrat
            </button>
          }
        />

        <div className="page-content">
          {successMsg && <div className="alert alert-success">✓ {successMsg}</div>}

          {loading ? (
            <div className="loading-wrap"><div className="spinner" /><span>Chargement...</span></div>
          ) : contrats.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📄</div>
              <h3>Aucun contrat</h3>
              <p>Créez votre premier contrat de bail.</p>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                + Nouveau contrat
              </button>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Bien</th>
                    <th>Locataire</th>
                    <th>Date début</th>
                    <th>Date fin</th>
                    <th>Loyer</th>
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contrats.map(c => (
                    <tr key={c.id}>
                      <td>{c.bien_titre}</td>
                      <td>{c.prenom} {c.nom}</td>
                      <td>{new Date(c.date_debut).toLocaleDateString('fr-FR')}</td>
                      <td>{c.date_fin ? new Date(c.date_fin).toLocaleDateString('fr-FR') : '—'}</td>
                      <td style={{ fontWeight: 700 }}>{Number(c.loyer).toLocaleString('fr-FR')} €</td>
                      <td>
                        <span className={`badge ${c.statut === 'actif' ? 'badge-success' : 'badge-danger'}`}>
                          {c.statut === 'actif' ? 'Actif' : 'Terminé'}
                        </span>
                      </td>
                      <td>
                        {c.statut === 'actif' && (
                          <button className="btn btn-sm btn-danger" onClick={() => handleTerminer(c.id)}>
                            Terminer
                          </button>
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
              <h2 className="modal-title">📄 Nouveau contrat</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>

            {errors.api && <div className="alert alert-danger">{errors.api}</div>}

            <form onSubmit={handleSave} noValidate>

              <div className="form-group">
                <label className="form-label">Bien <span className="required">*</span></label>
                <select name="bien_id" className={`form-control ${errors.bien_id ? 'error' : ''}`} value={form.bien_id} onChange={handleChange}>
                  <option value="">-- Sélectionnez un bien --</option>
                  {biens.map(b => (
                    <option key={b.id} value={b.id}>{b.titre} — {b.ville}</option>
                  ))}
                </select>
                {errors.bien_id && <span className="form-error">{errors.bien_id}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Locataire <span className="required">*</span></label>
                <select name="locataire_id" className={`form-control ${errors.locataire_id ? 'error' : ''}`} value={form.locataire_id} onChange={handleChange}>
                  <option value="">-- Sélectionnez un locataire --</option>
                  {locataires.map(l => (
                    <option key={l.id} value={l.id}>{l.prenom} {l.nom}</option>
                  ))}
                </select>
                {errors.locataire_id && <span className="form-error">{errors.locataire_id}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date début <span className="required">*</span></label>
                  <input type="date" name="date_debut" className={`form-control ${errors.date_debut ? 'error' : ''}`} value={form.date_debut} onChange={handleChange} />
                  {errors.date_debut && <span className="form-error">{errors.date_debut}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Date fin</label>
                  <input type="date" name="date_fin" className="form-control" value={form.date_fin} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Loyer (€) <span className="required">*</span></label>
                  <input type="number" name="loyer" className={`form-control ${errors.loyer ? 'error' : ''}`} placeholder="850" value={form.loyer} onChange={handleChange} min="0" />
                  {errors.loyer && <span className="form-error">{errors.loyer}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Dépôt de garantie (€)</label>
                  <input type="number" name="depot_garantie" className="form-control" placeholder="1700" value={form.depot_garantie} onChange={handleChange} min="0" />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Création...' : 'Créer le contrat'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}