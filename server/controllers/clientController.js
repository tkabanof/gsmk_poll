const ApiError = require('../error/ApiError')
const {Client} = require("../models/models")


class ClientController {
    async addNew(req, res, next) {
        // const {description, state, user_idCreate} = req.body
        // const poll = await Client.create({description, state, user_idCreate})
        return res.status(200).json(poll)
    }
    async getAll(req, res, next) {

        const poll = await Client.findAll()
        return res.status(200).json(poll)
    }
}

module.exports = new ClientController()