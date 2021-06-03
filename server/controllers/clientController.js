const ApiError = require('../error/ApiError')
const sequelize = require("sequelize");
const {Op} = require("sequelize");
const {AnswerQuestion} = require("../models/models");
const {ClientOnHold} = require("../models/models");
const {Poll} = require("../models/models");
const {Client} = require("../models/models")


class ClientController {

    async getUniqMo(req, res, next) {

        const pollId = req.params.id
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

    async setAnswers(req, res, next) {
        const clientId = req.body.data.clientId
        const client = await Client.findOne({
            where: {
                id: clientId
            }
        })
        const hold = await ClientOnHold.findOne({where: {
                clientId: clientId
            }})
        if (hold) {
            await hold.destroy()
        }

        if (!client) {
            return res.status(400).json({
                message: 'Такое client не найден!'
            })
        }

        const answers = req.body.data.answers
        const questions = Object.keys(answers)
        const newArr = questions.map((q) => {
            return {
                clientId: clientId,
                Questionid: q,
                AnswerId: answers[q]
            }
        })



        await AnswerQuestion.bulkCreate(newArr).then((result) => {
                return res.status(200).json({
                    message: 'Ответ принят!'
                })
            }
        ).catch((e) => {
                return res.status(400).json({
                    message: 'Ответ не принят!',
                    error: e
                })
            }
        )

    }

    async getOne(req, res, next) {

        const userId = req.res.user.userid
        const queryParam = req.query
        const pollId = queryParam.pollId
        let client = null

        const clientHold = await ClientOnHold.findOne({
            where: {
                userId: userId,
                pollId: pollId
            }
        })

        if (!clientHold) {
            client = await Client.findOne({
                where: [queryParam, {
                    //'$coh.id' : {[Op.is]: null},
                    '$AnswerQuestion.id$' : {[Op.is]: null}
                }],
                include: [
                    {
                        model: ClientOnHold,
                        required: false,

                    },
                    {
                        model: AnswerQuestion,
                        required: false,
                    }]

            })
            await ClientOnHold.create({
                userId: userId,
                clientId: client.id,
                pollId: client.pollId
            })
            return res.status(200).json(client)
        } else {
            client = await Client.findOne({
                where: {id: clientHold.clientId}
            })
            return res.status(200).json(client)
        }
    }
}

module.exports = new ClientController()