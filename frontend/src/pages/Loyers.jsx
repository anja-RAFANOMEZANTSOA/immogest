import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { paiementAPI, contratAPI } from '../services/api'
import jsPDF from 'jspdf'

const emptyForm = {
  contrat_id: '',
  montant: '',
  date_paiement: new Date().toISOString().split('T')[0],
  mois_concerne: ''
}

// ══════════════════════════════════════
// GÉNÉRATION QUITTANCE PDF
// ══════════════════════════════════════
const genererQuittancePDF = (paiement) => {
  const doc = new jsPDF()
  const pageW = doc.internal.pageSize.getWidth()

  // ── Fond header bleu ──
  doc.setFillColor(30, 58, 95)
  doc.rect(0, 0, pageW, 50, 'F')

  // ── Logo texte ──
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(26)
  doc.setFont('helvetica', 'bold')
  doc.text('ImmoGest', 14, 22)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Plateforme de gestion immobilière', 14, 32)

  // ── Titre document ──
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text('QUITTANCE DE LOYER', pageW - 14, 22, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`N° ${String(paiement.id).padStart(4, '0')}`, pageW - 14, 32, { align: 'right' })
  doc.text(`Émise le ${new Date().toLocaleDateString('fr-FR')}`, pageW - 14, 40, { align: 'right' })

  // ── Ligne séparatrice ──
  doc.setDrawColor(37, 99, 235)
  doc.setLineWidth(0.8)
  doc.line(14, 58, pageW - 14, 58)

  // ── Section locataire ──
  doc.setTextColor(30, 58, 95)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('LOCATAIRE', 14, 70)

  doc.setTextColor(55, 65, 81)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Nom complet : ${paiement.prenom} ${paiement.nom}`, 14, 80)

  // ── Section bien ──
  doc.setTextColor(30, 58, 95)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('BIEN LOUÉ', 14, 98)

  doc.setTextColor(55, 65, 81)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Désignation : ${paiement.bien_titre}`, 14, 108)

  // ── Ligne séparatrice ──
  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.4)
  doc.line(14, 120, pageW - 14, 120)

  // ── Section paiement — fond gris clair ──
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(14, 126, pageW - 28, 64, 4, 4, 'F')

  doc.setTextColor(30, 58, 95)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('DÉTAIL DU PAIEMENT', 22, 138)

  doc.setTextColor(55, 65, 81)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)

  const moisFormate = (() => {
    const d = new Date(paiement.mois_concerne + '-01')
    return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  })()

  doc.text('Mois concerné :', 22, 150)
  doc.setFont('helvetica', 'bold')
  doc.text(moisFormate, pageW - 22, 150, { align: 'right' })

  doc.setFont('helvetica', 'normal')
  doc.text('Date de paiement :', 22, 162)
  doc.setFont('helvetica', 'bold')
  doc.text(new Date(paiement.date_paiement).toLocaleDateString('fr-FR'), pageW - 22, 162, { align: 'right' })

  doc.setFont('helvetica', 'normal')
  doc.text('Mode de paiement :', 22, 174)
  doc.setFont('helvetica', 'bold')
  doc.text('Virement bancaire', pageW - 22, 174, { align: 'right' })

  // ── Montant total — fond bleu ──
  doc.setFillColor(37, 99, 235)
  doc.roundedRect(14, 200, pageW - 28, 28, 4, 4, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text('MONTANT TOTAL PAYÉ', 22, 218)
  doc.setFontSize(16)
  doc.text(
    `${Number(paiement.montant).toLocaleString('fr-FR')} €`,
    pageW - 22, 218,
    { align: 'right' }
  )

  // ── Déclaration légale ──
  doc.setTextColor(100, 116, 139)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  const declaration = `Je soussigné(e), propriétaire du bien "${paiement.bien_titre}", déclare avoir reçu de ${paiement.prenom} ${paiement.nom} la somme de ${Number(paiement.montant).toLocaleString('fr-FR')} € correspondant au loyer du mois de ${moisFormate}.`
  const lines = doc.splitTextToSize(declaration, pageW - 28)
  doc.text(lines, 14, 244)

  // ── Signature ──
  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.4)
  doc.line(14, 275, pageW - 14, 275)

  doc.setTextColor(100, 116, 139)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('Signature du propriétaire', 14, 283)
  doc.text('ImmoGest — Document généré automatiquement', pageW / 2, 283, { align: 'center' })
  doc.text(new Date().toLocaleDateString('fr-FR'), pageW - 14, 283, { align: 'right' })

  // ── Footer ──
  doc.setFillColor(15, 23, 42)
  doc.rect(0, 287, pageW, 10, 'F')
  doc.setTextColor(148, 163, 184)
  doc.setFontSize(8)
  doc.text('ImmoGest • immogest-fawn.vercel.app • Connexion sécurisée SSL 256-bit', pageW / 2, 293, { align: 'center' })

  // ── Téléchargement ──
  const nomFichier = `Quittance_${paiement.prenom}_${paiement.nom}_${moisFormate.replace(' ', '_')}.pdf`
  doc.save(nomFichier)
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

  useEffect(() => { fetchData() }, [])

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
            <button
              className="btn btn-primary"
              onClick={() => { setForm(emptyForm); setErrors({}); setShowModal(true) }}
            >
              + Enregistrer un paiement
            </button>
          }
        />

        <div className="page-content">

          {successMsg && (
            <div className="alert alert-success">✓ {successMsg}</div>
          )}

          {/* Stat total */}
          <div className="card" style={{ marginBottom: 24, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 32 }}>💰</div>
            <div>
              <div style={{ fontSize: 12, color: '#6B7280', textTransform: 'uppercase' }}>
                Total encaissé
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#1A2E4A' }}>
                {totalMois.toLocaleString('fr-FR')} €
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-wrap">
              <div className="spinner" />
              <span>Chargement...</span>
            </div>
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
                    <th>Quittance</th>
                  </tr>
                </thead>
                <tbody>
                  {paiements.map(p => (
                    <tr key={p.id}>
                      <td>{p.prenom} {p.nom}</td>
                      <td>{p.bien_titre}</td>
                      <td>
                        {new Date(p.mois_concerne + '-01').toLocaleDateString('fr-FR', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </td>
                      <td>{new Date(p.date_paiement).toLocaleDateString('fr-FR')}</td>
                      <td style={{ fontWeight: 700 }}>
                        {Number(p.montant).toLocaleString('fr-FR')} €
                      </td>
                      <td>
                        <span className="badge badge-success">Payé</span>
                      </td>
                      <td>
                        <button
                          onClick={() => genererQuittancePDF(p)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '6px 12px',
                            background: '#EFF6FF',
                            color: '#2563EB',
                            border: '1px solid #BFDBFE',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = '#2563EB'
                            e.currentTarget.style.color = '#FFFFFF'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = '#EFF6FF'
                            e.currentTarget.style.color = '#2563EB'
                          }}
                          title="Télécharger la quittance PDF"
                        >
                          📄 PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={e => { if (e.target.className === 'modal-overlay') setShowModal(false) }}
        >
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">💳 Enregistrer un paiement</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>

            {errors.api && (
              <div className="alert alert-danger">{errors.api}</div>
            )}

            <form onSubmit={handleSave} noValidate>

              <div className="form-group">
                <label className="form-label">
                  Contrat <span className="required">*</span>
                </label>
                <select
                  name="contrat_id"
                  className={`form-control ${errors.contrat_id ? 'error' : ''}`}
                  value={form.contrat_id}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionnez un contrat --</option>
                  {contrats.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.bien_titre} — {c.locataire_nom} {c.locataire_prenom}
                    </option>
                  ))}
                </select>
                {errors.contrat_id && (
                  <span className="form-error">{errors.contrat_id}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Montant (€) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="montant"
                    className={`form-control ${errors.montant ? 'error' : ''}`}
                    placeholder="850"
                    value={form.montant}
                    onChange={handleChange}
                    min="0"
                  />
                  {errors.montant && (
                    <span className="form-error">{errors.montant}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Date de paiement <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="date_paiement"
                    className={`form-control ${errors.date_paiement ? 'error' : ''}`}
                    value={form.date_paiement}
                    onChange={handleChange}
                  />
                  {errors.date_paiement && (
                    <span className="form-error">{errors.date_paiement}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Mois concerné <span className="required">*</span>
                </label>
                <input
                  type="month"
                  name="mois_concerne"
                  className={`form-control ${errors.mois_concerne ? 'error' : ''}`}
                  value={form.mois_concerne}
                  onChange={handleChange}
                />
                {errors.mois_concerne && (
                  <span className="form-error">{errors.mois_concerne}</span>
                )}
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