const {Router} = require("express");
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')
const clientController = require('../controllers/clientController')

router.post ('/', authMiddleware, clientController.addNew)
router.get ('/', authMiddleware, clientController.getAll)
router.get ('/keyValue/:id', authMiddleware, clientController.getFieldValue)

module.exports = router