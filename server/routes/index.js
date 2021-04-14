const {Router} = require("express");
const router = Router()

const userRouter = require('./userRouter')
const questionRoute = require('./questionRoute')

router.use('/user', userRouter)
router.use('/question', questionRoute)

module.exports = router