const {Router} = require("express");
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')
const pollController = require('../controllers/pollController')

router.post ('/', authMiddleware, pollController.addNew)
router.post ('/del', authMiddleware, pollController.deleteOne)
router.get ('/', authMiddleware, pollController.getAll)

module.exports = router