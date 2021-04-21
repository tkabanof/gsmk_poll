const {Router} = require("express");
const router = Router()

const userRouter = require('./userRouter')
const questionRoute = require('./questionRoute')
const pollRoute = require('./pollRoute')

router.use('/user', userRouter)
router.use('/question', questionRoute)
router.use('/poll', pollRoute)

module.exports = router