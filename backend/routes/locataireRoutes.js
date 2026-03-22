const express = require('express')
const router  = express.Router()
const {
  getLocataires, getLocataireById, createLocataire
} = require('../controllers/locataireController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.get('/',    getLocataires)
router.get('/:id', getLocataireById)
router.post('/',   createLocataire)

module.exports = router