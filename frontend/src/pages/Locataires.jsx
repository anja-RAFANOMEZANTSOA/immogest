import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import { locataireAPI } from '../services/api'

const emptyForm = {
  nom: '', prenom: '', email: '', telephone: '',
  mot_de_passe: '', numero_cni: '',
  date_naissance: '', profession: '', revenu_mensuel: ''
}

export default function Locataires() {
  const [locataires, setLocataires] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [showModal,  setShowModal]  = useState(false)
  const [form,       setForm]       = useState(emptyForm)
  const [errors,     setErrors]     = useState({})
  const [saving,     setSaving]     = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => { fetchLocataires() }, [])

  const fetchLocataires = async () => {
    try {
      const res = await locataireAPI.getAll()
      setLocataires(res.data)
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
    if (!form.nom)          err.nom          = 'Nom requis'
    if (!form.prenom)       err.prenom       = 'Prénom requis'
    if (!form.email)        err.email        = 'Email requis'
    if (!form.mot_de_passe) err.mot_de_passe = 'Mot de passe requis'
    if (form.mot_de_passe.length < 6)
      err.mot_de_passe = 'Au moins 6 caractères'
    return err
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSaving(true)
    try {
      await locataireAPI.create(form)
      setSuccessMsg('Locataire créé avec succès !')
      setShowModal(false)
      setForm(emptyForm)
      fetchLocataires()
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || 'Erreur serveur.'
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar
          title="Locataires"
          actions={
            <button
              className="btn btn-primary"
              onClick={() => {
                setForm(emptyForm)
                setErrors({})
                setShowModal(true)
              }}
            >
              + Ajouter un locataire
            </button>
          }
        />

        <div className="page-content">

          {successMsg && (
            <div className="alert alert-success">✓ {successMsg}</div>
          )}

          {loading ? (
            <div className="loading-wrap">
              <div className="spinner" />
              <span>Chargement...</span>
            </div>
          ) : locataires.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👤</div>
              <h3>Aucun locataire</h3>
              <p>Ajoutez votre premier locataire.</p>
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                + Ajouter un locataire
              </button>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Locataire</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Profession</th>
                    <th>Revenu mensuel</th>
                  </tr>
                </thead>
                <tbody>
                  {locataires.map(l => (
                    <tr key={l.id}>
                      <td>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10
                        }}>
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            background: '#EBF4FF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#2B6CB0',
                            textTransform: 'uppercase',
                            flexShrink: 0
                          }}>
                            {l.prenom?.[0]}{l.nom?.[0]}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>
                              {l.prenom} {l.nom}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{l.email}</td>
                      <td>{l.telephone || '—'}</td>
                      <td>{l.profession || '—'}</td>
                      <td>
                        {l.revenu_mensuel
                          ? `${Number(l.revenu_mensuel).toLocaleString('fr-FR')} €`
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={e => {
            if (e.target.className === 'modal-overlay') setShowModal(false)
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">👤 Ajouter un locataire</h2>
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

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Prénom <span className="required">*</span>
                  </label>
                  <input
                    type="text" name="prenom"
                    className={`form-control ${errors.prenom ? 'error' : ''}`}
                    placeholder="Jean"
                    value={form.prenom} onChange={handleChange}
                  />
                  {errors.prenom && (
                    <span className="form-error">{errors.prenom}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Nom <span className="required">*</span>
                  </label>
                  <input
                    type="text" name="nom"
                    className={`form-control ${errors.nom ? 'error' : ''}`}
                    placeholder="Dupont"
                    value={form.nom} onChange={handleChange}
                  />
                  {errors.nom && (
                    <span className="form-error">{errors.nom}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email" name="email"
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  placeholder="jean@email.com"
                  value={form.email} onChange={handleChange}
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="tel" name="telephone"
                    className="form-control"
                    placeholder="+261 34 00 000 00"
                    value={form.telephone} onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Mot de passe <span className="required">*</span>
                  </label>
                  <input
                    type="password" name="mot_de_passe"
                    className={`form-control ${errors.mot_de_passe ? 'error' : ''}`}
                    placeholder="Min. 6 caractères"
                    value={form.mot_de_passe} onChange={handleChange}
                  />
                  {errors.mot_de_passe && (
                    <span className="form-error">{errors.mot_de_passe}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Profession</label>
                  <input
                    type="text" name="profession"
                    className="form-control"
                    placeholder="Ingénieur"
                    value={form.profession} onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Revenu mensuel (€)</label>
                  <input
                    type="number" name="revenu_mensuel"
                    className="form-control"
                    placeholder="2500"
                    value={form.revenu_mensuel} onChange={handleChange}
                    min="0"
                  />
                </div>
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
                  {saving ? 'Création...' : 'Créer le locataire'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  )
}