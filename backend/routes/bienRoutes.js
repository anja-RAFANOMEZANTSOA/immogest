const express = require('express')
const router  = express.Router()
const {
  getBiens, getBienById, createBien, updateBien, deleteBien
} = require('../controllers/bienController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.get('/',       getBiens)
router.get('/:id',    getBienById)
router.post('/',      createBien)
router.put('/:id',    updateBien)
router.delete('/:id', deleteBien)

module.exports = router