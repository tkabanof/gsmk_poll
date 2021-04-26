const {Router} = require("express");
const router = Router()

const userRouter = require('./userRouter')
const questionRoute = require('./questionRoute')
const pollRoute = require('./pollRoute')
const templateRoute = require('./templateRoute')

router.use('/user', userRouter)
router.use('/question', questionRoute)
router.use('/poll', pollRoute)
router.use('/template', templateRoute)

module.exports = router