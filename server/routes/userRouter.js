const {Router} = require("express");
const router = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/createUser', authMiddleware, userController.createNewUser)
router.post('/checkLogin', authMiddleware, userController.checkLogin)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.auth)
router.get('/getAll', authMiddleware, userController.getAllUsers)


module.exports = router