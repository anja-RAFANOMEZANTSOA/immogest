import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import { bienAPI, paiementAPI, maintenanceAPI } from '../services/api'

export default function Dashboard() {
  const navigate  = useNavigate()
  const [biens,       setBiens]       = useState([])
  const [paiements,   setPaiements]   = useState([])
  const [maintenance, setMaintenance] = useState([])
  const [loading,     setLoading]     = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [b, p, m] = await Promise.all([
          bienAPI.getAll(),
          paiementAPI.getAll(),
          maintenanceAPI.getAll(),
        ])
        setBiens(b.data)
        setPaiements(p.data)
        setMaintenance(m.data)
      } catch (err) {
        console.error('Erreur chargement dashboard :', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Calculs statistiques
  const totalBiens      = biens.length
  const biensLoues      = biens.filter(b => b.statut === 'loue').length
  const tauxOccupation  = totalBiens > 0
    ? Math.round((biensLoues / totalBiens) * 100) : 0
  const loyersEnRetard  = paiements.filter(p => p.statut === 'en_retard').length
  const maintenanceOpen = maintenance.filter(m => m.statut !== 'resolu').length
  const revenusMois     = paiements
    .filter(p => p.statut === 'paye')
    .reduce((sum, p) => sum + Number(p.montant), 0)

  const getBadgeClass = (statut) => {
    const map = {
      loue:       'badge-success',
      disponible: 'badge-warning',
      travaux:    'badge-danger',
      paye:       'badge-success',
      en_retard:  'badge-danger',
      en_attente: 'badge-warning',
      en_cours:   'badge-info',
      resolu:     'badge-success',
    }
    return map[statut] || 'badge-gray'
  }

  const getStatutLabel = (statut) => {
    const map = {
      loue:       'Loué',
      disponible: 'Disponible',
      travaux:    'Travaux',
      paye:       'Payé',
      en_retard:  'En retard',
      en_attente: 'En attente',
      en_cours:   'En cours',
      resolu:     'Résolu',
    }
    return map[statut] || statut
  }

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <div className="loading-wrap">
            <div className="spinner" />
            <span>Chargement...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar
          title="Tableau de bord"
          actions={
            <button
              className="btn btn-primary"
              onClick={() => navigate('/biens')}
            >
              + Nouveau bien
            </button>
          }
        />

        <div className="page-content">

          {/* Alerte loyers en retard */}
          {loyersEnRetard > 0 && (
            <div className="alert alert-warning">
              ⚠️ <strong>{loyersEnRetard} loyer{loyersEnRetard > 1 ? 's' : ''} en retard</strong>
              {' '}— Pensez à relancer vos locataires.
              <button
                className="btn btn-sm btn-ghost"
                style={{ marginLeft: 'auto' }}
                onClick={() => navigate('/loyers')}
              >
                Voir les loyers →
              </button>
            </div>
          )}

          {/* Statistiques */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Revenus du mois</div>
              <div className="stat-value">
                {revenusMois.toLocaleString('fr-FR')} €
              </div>
              <div className="stat-sub neutral">Total encaissé</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Taux d'occupation</div>
              <div className="stat-value">{tauxOccupation}%</div>
              <div className="stat-sub neutral">
                {biensLoues} / {totalBiens} biens loués
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Loyers en retard</div>
              <div className="stat-value"
                style={{ color: loyersEnRetard > 0 ? '#DC2626' : undefined }}>
                {loyersEnRetard}
              </div>
              <div className={`stat-sub ${loyersEnRetard > 0 ? 'down' : 'neutral'}`}>
                {loyersEnRetard > 0 ? 'Action requise' : 'Tout est à jour'}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Maintenance</div>
              <div className="stat-value">{maintenanceOpen}</div>
              <div className="stat-sub neutral">Demandes ouvertes</div>
            </div>
          </div>

          {/* Biens + Paiements */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            marginBottom: 20
          }}>

            {/* Mes biens */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">🏠 Mes biens récents</span>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => navigate('/biens')}
                >
                  Voir tout →
                </button>
              </div>
              {biens.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🏠</div>
                  <h3>Aucun bien</h3>
                  <p>Ajoutez votre premier bien immobilier.</p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate('/biens')}
                  >
                    + Ajouter un bien
                  </button>
                </div>
              ) : (
                biens.slice(0, 4).map(bien => (
                  <div key={bien.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 0',
                    borderBottom: '1px solid #F3F4F6'
                  }}>
                    <div style={{
                      width: 42, height: 42,
                      borderRadius: 10,
                      background: '#EBF4FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      flexShrink: 0
                    }}>
                      🏠
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#1A2E4A',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {bien.titre}
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>
                        {bien.ville}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#1A2E4A'
                      }}>
                        {Number(bien.loyer).toLocaleString('fr-FR')} €
                      </div>
                      <span className={`badge ${getBadgeClass(bien.statut)}`}>
                        {getStatutLabel(bien.statut)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Paiements récents */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">💳 Paiements récents</span>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => navigate('/loyers')}
                >
                  Voir tout →
                </button>
              </div>
              {paiements.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">💳</div>
                  <h3>Aucun paiement</h3>
                  <p>Les paiements apparaîtront ici.</p>
                </div>
              ) : (
                paiements.slice(0, 4).map(p => (
                  <div key={p.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 0',
                    borderBottom: '1px solid #F3F4F6'
                  }}>
                    <div style={{
                      width: 36, height: 36,
                      borderRadius: '50%',
                      background: '#EBF4FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#2B6CB0',
                      flexShrink: 0,
                      textTransform: 'uppercase'
                    }}>
                      {p.prenom?.[0]}{p.nom?.[0]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#1A2E4A'
                      }}>
                        {p.prenom} {p.nom}
                      </div>
                      <div style={{ fontSize: 11, color: '#6B7280' }}>
                        {p.bien_titre}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: p.statut === 'en_retard' ? '#DC2626' : '#059669'
                      }}>
                        {Number(p.montant).toLocaleString('fr-FR')} €
                      </div>
                      <span className={`badge ${getBadgeClass(p.statut)}`}>
                        {getStatutLabel(p.statut)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Maintenance */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">🔧 Demandes de maintenance</span>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => navigate('/maintenance')}
              >
                Voir tout →
              </button>
            </div>
            {maintenance.length === 0 ? (
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
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenance.slice(0, 5).map(m => (
                      <tr key={m.id}>
                        <td>
                          <span className={`badge ${
                            m.priorite === 'haute'   ? 'badge-danger' :
                            m.priorite === 'moyenne' ? 'badge-warning' :
                            'badge-info'
                          }`}>
                            {m.priorite}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600 }}>{m.titre}</td>
                        <td>{m.bien_titre}</td>
                        <td>{m.prenom} {m.nom}</td>
                        <td>
                          <span className={`badge ${getBadgeClass(m.statut)}`}>
                            {getStatutLabel(m.statut)}
                          </span>
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
    </div>
  )
}