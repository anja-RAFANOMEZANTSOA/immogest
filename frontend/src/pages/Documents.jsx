import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import { documentAPI } from '../services/api'

export default function Documents() {
  const [documents,  setDocuments]  = useState([])
  const [loading,    setLoading]    = useState(true)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg,   setErrorMsg]   = useState('')

  useEffect(() => { fetchDocuments() }, [])

  const fetchDocuments = async () => {
    try {
      const res = await documentAPI.getAll()
      setDocuments(res.data)
    } catch (err) {
      setErrorMsg('Erreur lors du chargement.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce document ?')) return
    try {
      await documentAPI.delete(id)
      setDocuments(documents.filter(d => d.id !== id))
      setSuccessMsg('Document supprimé.')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setErrorMsg('Erreur lors de la suppression.')
      setTimeout(() => setErrorMsg(''), 3000)
    }
  }

  const getIcon = (type) => {
    if (type === 'bail')      return '📋'
    if (type === 'quittance') return '🧾'
    if (type === 'facture')   return '💰'
    return '📄'
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar title="Documents" />

        <div className="page-content">

          {successMsg && <div className="alert alert-success">✓ {successMsg}</div>}
          {errorMsg   && <div className="alert alert-danger">{errorMsg}</div>}

          {loading ? (
            <div className="loading-wrap"><div className="spinner" /><span>Chargement...</span></div>
          ) : documents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📄</div>
              <h3>Espace documents</h3>
              <p>Vos baux, quittances et factures apparaîtront ici automatiquement.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Nom du fichier</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map(d => (
                    <tr key={d.id}>
                      <td>
                        <span style={{ fontSize: 20 }}>{getIcon(d.type)}</span>
                        <span style={{ marginLeft: 8, textTransform: 'capitalize' }}>{d.type}</span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{d.nom_fichier}</td>
                      <td>{new Date(d.created_at).toLocaleDateString('fr-FR')}</td>
                      <td style={{ display: 'flex', gap: 8 }}>
                        <a href={d.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                          👁️ Voir
                        </a>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(d.id)}>
                          🗑️
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
    </div>
  )
}