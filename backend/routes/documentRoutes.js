const express = require('express')
const router  = express.Router()
const { protect } = require('../middleware/authMiddleware')
const db = require('../config/db')

router.use(protect)

router.get('/', async (req, res) => {
  try {
    const [docs] = await db.query(
      `SELECT d.*, b.titre AS bien_titre
       FROM documents d
       JOIN biens b ON d.bien_id = b.id
       WHERE b.proprietaire_id = ?
       ORDER BY d.created_at DESC`,
      [req.user.id]
    )
    res.json(docs)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM documents WHERE id = ?', [req.params.id])
    res.json({ message: 'Document supprimé.' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message })
  }
})

module.exports = router