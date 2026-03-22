const express = require('express')
const router  = express.Router()
const {
  getPaiements, createPaiement, getMesPaiements
} = require('../controllers/paiementController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.get('/',               getPaiements)
router.get('/mes-paiements',  getMesPaiements)
router.post('/',              createPaiement)

module.exports = router