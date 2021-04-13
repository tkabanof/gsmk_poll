const {Router} = require("express");
const router = Router()
const questController = require('../controllers/questionController')

router.post('/', questController.create)
router.delete('/', questController.delete)
router.get('/', questController.getAll)
router.get('/:id', questController.getById)

module.exports = router