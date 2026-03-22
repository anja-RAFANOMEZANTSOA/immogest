const express = require('express')
const router  = express.Router()
const {
  getContrats, createContrat, terminerContrat
} = require('../controllers/contratController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.get('/',                getContrats)
router.post('/',               createContrat)
router.put('/:id/terminer',    terminerContrat)

module.exports = router