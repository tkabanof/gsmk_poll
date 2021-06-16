const {Router} = require("express");
const router = Router()
const questController = require('../controllers/questionController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), questController.create)
router.delete('/', checkRole('ADMIN'), questController.delete)
router.get('/', checkRole('ADMIN'), questController.getAll)


module.exports = router