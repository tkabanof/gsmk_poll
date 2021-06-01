const {Router} = require("express");
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')
const clientController = require('../controllers/clientController')
const questController = require('../controllers/questionController')

// router.post ('/', authMiddleware, clientController.addNew)
router.get ('/', authMiddleware, clientController.getAll)
router.get ('/mo/:id', authMiddleware, clientController.getUniqMo)
router.get ('/getOne', authMiddleware, clientController.getOne)
router.get('/question/:id', questController.getQuestionAnswerByIdPoll)

module.exports = router