const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const db = require('../config/db')

router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.id
    const notifications = []
    res.json(notifications)
  } catch (error) {
    console.error('Erreur notifications :', error)
    res.status(500).json({ message: 'Erreur serveur.', error: error.message })
  }
})

module.exports = router
