const ApiError = require('../error/ApiError')
const {Poll} = require("../models/models");
const {Client} = require("../models/models")


class ClientController {

    async getUniqMo(req, res, next) {

        const pollId = req.params.id
        console.log(pollId)
        const poll = Poll.findOne({where: {id: pollId}})
        if (!poll) {
            return res.status(400).json({message: 'Нет такого опроса!'})
        }

        const clients = await Client.findAll({where: {pollId: pollId}})
        if (clients.length === 0) {
            return res.status(400).json({message: 'Опрос есть но он пуст!'})
        }

        let cli = clients.map((p) => {
            return p.mo
        })
        cli = [...new Set(cli)]
        //console.log(cli)

        return res.status(200).json(cli)

    }

    async getAll(req, res, next) {
        const poll = await Client.findAll()
        return res.status(200).json(poll)
    }

    async getOne(req, res, next) {

        let queryParam = req.query
        // delete queryParam.id
        const client = await Client.findOne({
            where: queryParam
        })
        // const poll = await Client.findOne({
        //
        // })

        return res.status(200).json(client)
    }
}

module.exports = new ClientController()