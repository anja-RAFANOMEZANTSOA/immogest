const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const app = express()

// ── Middlewares ───────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',        require('./routes/authRoutes'))
app.use('/api/biens',       require('./routes/bienRoutes'))
app.use('/api/locataires',  require('./routes/locataireRoutes'))
app.use('/api/contrats',    require('./routes/contratRoutes'))
app.use('/api/paiements',   require('./routes/paiementRoutes'))
app.use('/api/maintenance', require('./routes/maintenanceRoutes'))
app.use('/api/documents',   require('./routes/documentRoutes'))

// ── Route de test ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '✅ API ImmoGest fonctionne !',
    version: '1.0.0'
  })
})

// ── Erreur 404 ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} non trouvée.` })
})

// ── Erreur globale ────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Erreur globale :', err.stack)
  res.status(500).json({ message: 'Erreur serveur interne.' })
})

// ── Démarrage ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur ImmoGest démarré`)
  console.log(`📡 Port : ${PORT}`)
  console.log(`🌍 URL  : http://localhost:${PORT}`)
  console.log(`⏰ ${new Date().toLocaleString('fr-FR')}\n`)
})
