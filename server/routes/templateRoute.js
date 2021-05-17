const {Router} = require("express");
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')
const templateController = require('../controllers/templateController')

router.post ('/', authMiddleware, templateController.createBrandNew)
router.get ('/', authMiddleware, templateController.getAll)
router.post ('/del', authMiddleware, templateController.deleteOne)
//router.post ('/details', authMiddleware, templateController.updateOne)

module.exports = router