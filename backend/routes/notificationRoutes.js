const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const db = require('../config/db')

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id
    const notifications = []

    const [loyersRetard] = await db.query(
      'SELECT c.id as contrat_id, b.titre as bien_titre, u.nom, u.prenom, c.loyer FROM contrats c JOIN biens b ON c.bien_id = b.id JOIN locataires l ON c.locataire_id = l.id JOIN utilisateurs u ON l.utilisateur_id = u.id WHERE b.proprietaire_id = ? AND c.statut = "actif" AND c.id NOT IN (SELECT contrat_id FROM paiements WHERE DATE_FORMAT(mois_concerne, "%Y-%m") = DATE_FORMAT(NOW(), "%Y-%m"))',
      [userId])
    loyersRetard.forEach(l => notifications.push({ id: 'loyer-' + l.contrat_id, type: 'loyer_retard', titre: 'Loyer en retard', message: l.prenom + ' ' + l.nom + ' - ' + l.bien_titre + ' (' + l.loyer + ' Ar)', lien: '/loyers', date: new Date().toISOString() }))

    const [maintenances] = await db.query(
      'SELECT m.id, m.titre, m.priorite, b.titre as bien_titre, m.date_creation FROM maintenance m JOIN biens b ON m.bien_id = b.id WHERE b.proprietaire_id = ? AND m.statut = "en_attente" ORDER BY m.date_creation DESC LIMIT 10',
      [userId])
    maintenances.forEach(m => notifications.push({ id: 'maintenance-' + m.id, type: 'maintenance', titre: 'Demande de maintenance', message: m.titre + ' - ' + m.bien_titre + ' (' + m.priorite + ')', lien: '/maintenance', date: m.date_creation }))

    const [contratsExpiration] = await db.query(
      'SELECT c.id, b.titre as bien_titre, c.date_fin, u.nom, u.prenom, DATEDIFF(c.date_fin, NOW()) as jours_restants FROM contrats c JOIN biens b ON c.bien_id = b.id JOIN locataires l ON c.locataire_id = l.id JOIN utilisateurs u ON l.utilisateur_id = u.id WHERE b.proprietaire_id = ? AND c.statut = "actif" AND c.date_fin IS NOT NULL AND DATEDIFF(c.date_fin, NOW()) BETWEEN 0 AND 30',
      [userId])
    contratsExpiration.forEach(c => notifications.push({ id: 'contrat-' + c.id, type: 'contrat_expiration', titre: 'Contrat bientot expire', message: c.prenom + ' ' + c.nom + ' - ' + c.bien_titre + ' (' + c.jours_restants + 'j restants)', lien: '/contrats', date: new Date().toISOString() }))

    const [paiementsRecents] = await db.query(
      'SELECT p.id, p.montant, p.date_paiement, b.titre as bien_titre, u.nom, u.prenom FROM paiements p JOIN contrats c ON p.contrat_id = c.id JOIN biens b ON c.bien_id = b.id JOIN locataires l ON c.locataire_id = l.id JOIN utilisateurs u ON l.utilisateur_id = u.id WHERE b.proprietaire_id = ? AND p.date_paiement >= DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY p.date_paiement DESC LIMIT 5',
      [userId])
    paiementsRecents.forEach(p => notifications.push({ id: 'paiement-' + p.id, type: 'paiement_recu', titre: 'Paiement recu', message: p.prenom + ' ' + p.nom + ' - ' + p.bien_titre + ' (' + p.montant + ' Ar)', lien: '/loyers', date: p.date_paiement }))

    notifications.sort((a, b) => new Date(b.date) - new Date(a.date))
    res.json(notifications)

  } catch (error) {
    console.error('Erreur notifications :', error)
    res.status(500).json({ message: 'Erreur serveur.', error: error.message })
  }
})

module.exports = router