import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'

export default function Documents() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar title="Documents" />
        <div className="page-content">
          <div className="empty-state">
            <div className="empty-state-icon">📄</div>
            <h3>Espace documents</h3>
            <p>
              Vos baux, quittances et factures
              apparaîtront ici automatiquement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}