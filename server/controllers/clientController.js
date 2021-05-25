const ApiError = require('../error/ApiError')
const {Client} = require("../models/models")


class ClientController {
    async addNew(req, res, next) {
        // const {description, state, user_idCreate} = req.body
        // const poll = await Client.create({description, state, user_idCreate})
        return res.status(200).json(poll)
    }
    async getFieldValue(req, res, next) {

        function getValues(arr, field) {
            let values = []
            arr.forEach((a)=>values.push(a[field]))
            return values
        }


        const pollId = req.params.id
        const clients = await Client.findAll({where: {pollId: pollId}})

        const cli = clients.map((p)=> {
            return p.params
        })

        let keys = Object.keys(cli[0])
        let keyValue = {}
        keys.forEach((a)=> keyValue[a] = getValues(cli, a))


        return res.status(200).json({keyValue})

    }
    async getAll(req, res, next) {

        const poll = await Client.findAll()
        return res.status(200).json(poll)
    }
}

module.exports = new ClientController()