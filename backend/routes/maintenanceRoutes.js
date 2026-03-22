const express = require('express')
const router  = express.Router()
const {
  getMaintenance, createMaintenance, updateStatut
} = require('../controllers/maintenanceController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.get('/',              getMaintenance)
router.post('/',             createMaintenance)
router.put('/:id/statut',    updateStatut)

module.exports = router