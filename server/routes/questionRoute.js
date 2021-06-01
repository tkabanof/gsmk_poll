const {Router} = require("express");
const router = Router()
const questController = require('../controllers/questionController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), questController.create)
router.delete('/', questController.delete)
router.get('/', questController.getAll)
router.get('/:id', questController.getQuestionAnswerByIdPoll)

module.exports = router