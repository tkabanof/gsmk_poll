const ApiError = require('../error/ApiError')
const {Poll} = require("../models/models")


class PollController {
    async addNew(req, res, next) {
        const {description, template_id, state} = req.body
        try {
            const poll = await Poll.create({description, state})
            return res.status(200).json(poll)
        } catch (e) {
            return res.status(400).json({
                message: 'Новый опрос не создан!',
                errorDetail: e
            })
        }
    }

    async getAll(req, res, next) {
        //const {description, state, user_idCreate} = req.body
        const poll = await Poll.findAll()
        return res.status(200).json(poll)
    }
}

module.exports = new PollController()