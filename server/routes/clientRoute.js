const {Router} = require("express");
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')
const clientController = require('../controllers/clientController')
const questController = require('../controllers/questionController')

// router.post ('/', authMiddleware, clientController.addNew)
router.get ('/', authMiddleware, clientController.getAll)
router.get ('/mo/:id', authMiddleware, clientController.getUniqMo)
router.get ('/getOne', authMiddleware, clientController.getOne)
router.get ('/get_poll_stat/:id', authMiddleware, clientController.getStatistics)
router.get('/question/:id', authMiddleware, questController.getQuestionAnswerByIdPoll)
router.post('/setAnswer', authMiddleware, clientController.setAnswers)
router.post('/close', authMiddleware, clientController.closeClient)
router.post('/delay', authMiddleware, clientController.delayClient)

module.exports = router