const {Router} = require("express");
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')
const templateController = require('../controllers/templateController')

router.post ('/', authMiddleware, templateController.addNew)
router.get ('/', authMiddleware, templateController.getAll)

module.exports = router