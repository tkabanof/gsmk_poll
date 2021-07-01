const ApiError = require('../error/ApiError')
const sequelize = require("sequelize");
const sequelizeRAW = require('../db')
const {ClientState} = require("../models/models");
const {AnswerQuestion} = require("../models/models");
const {ClientOnHold} = require("../models/models");
const {Poll} = require("../models/models");
const {Client} = require("../models/models")
const {ClientDelayed} = require("../models/models")


class ClientController {

    async getUniqMo(req, res, next) {

        const pollId = req.params.id
        const poll = Poll.findOne({where: {id: pollId}})
        if (!poll) {
            return res.status(400).json({message: 'Нет такого опроса!'})
        }

        const clients = await Client.findAll({
            attributes: ['mo', [sequelize.fn('COUNT', sequelize.col('id')), 'persons']],
            where: {
                pollId: pollId,
                state: null
            },
            group: ['mo']
        })
        if (clients.length === 0) {
            return res.status(400).json({message: 'Опрос есть но он пуст!'})
        }

        let cli = clients.map((p) => {
            return {
                mo: p.dataValues.mo,
                count: p.dataValues.persons
            }
        })

        return res.status(200).json(cli)

    }

    async getAll(req, res, next) {
        const poll = await Client.findAll()
        return res.status(200).json(poll)
    }

    async getStatistics(req, res, next) {
        const pollId = req.params.id
        const {QueryTypes} = require('sequelize');

        const callByOper = await sequelizeRAW.query('SELECT u."fio", ' +
        'count(distinct case when cs."state" = \'DONE\' then c."id" else null end) "DONE", ' +
        '    count(distinct case when cs."state" = \'REFUSED\' then c."id" else null end) "REFUSED" ' +
        'FROM gsmk_poll."clients" c ' +
        'join gsmk_poll."clientStates" cs on cs."clientId" = c.id ' +
        'join gsmk_poll."users" u on u."id"=cs."userId" ' +
        'where c."pollId" = ? group by "fio"',
            {
                replacements: [pollId],
                type: QueryTypes.SELECT
            }
        );
        const total = await sequelizeRAW.query('SELECT ' +
        'count(distinct case when cs."state" is not null then c."id" else null end) "CLOSED", ' +
        '    count(distinct case when cs."state" = \'DONE\' then c."id" else null end) "DONE", ' +
        '    count(distinct case when cs."state" = \'REFUSED\' then c."id" else null end) "REFUSED", ' +
        '    count(distinct c."id") "TOTAL" ' +
        'FROM gsmk_poll."clients" c ' +
        'left join gsmk_poll."clientStates" cs on cs."clientId" = c.id ' +
        'where c."pollId" = ?',
            {
                replacements: [pollId],
                type: QueryTypes.SELECT
            }
        );

        res.status(200).json({
            callByOper,
            total
        })

    }

    async closeClient(req, res, next) {
        const clientId = req.body.data.clientId
        const client = await Client.findOne({
            where: {
                id: clientId
            }
        })

        await ClientOnHold.findOne({
            where: {
                clientId: clientId
            }
        })
            .then((r) => {
                r.destroy()
            })
            .catch(() => {

            })


        const userId = req.res.user.userid

        // console.log('clietcontroller userId ' + userId)
        // console.log('clietcontroller clientid ' + clientId)
        await ClientState.create({
            state: 'REFUSED',
            userId,
            clientId: clientId
        }).then(

        ).catch((e) => {
            console.log('client controller ')
            console.log(e)
        })

        return res.status(200).json({message: 'Статус REFUSED'})
    }

    async delayClient(req, res, next) {
        const clientId = req.body.data.clientId
        let delayTime = req.body.data.timeDelay
        if (!delayTime) {
            const dat = new Date()
            delayTime = dat.getTime() + 2

        }
        await Client.findOne({
            where: {
                id: clientId
            }
        }).then((r) => {

            ClientDelayed.create({
                clientId: clientId,
                timeDelay: delayTime
            }).then(() => {
                return res.status(200).json({message: 'Звонок отложен'})
            })

            ClientOnHold.findOne({
                where: {
                    clientId: clientId
                }
            })
                .then((r) => {
                    r.destroy()
                })
                .catch(() => {

                })
        })
    }

    async setAnswers(req, res, next) {
        const clientId = req.body.data.clientId
        const client = await Client.findOne({
            where: {
                id: clientId
            }
        })
        const hold = await ClientOnHold.findOne({
            where: {
                clientId: clientId
            }
        })
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


        await AnswerQuestion.bulkCreate(newArr).then(async (result) => {

                const userId = req.res.user.userid
                await ClientState.create({
                    state: 'DONE',
                    userId,
                    clientId: clientId
                }).then(

                ).catch((e) => {
                    console.log('client controller ')
                    console.log(e)
                })

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
                where: [queryParam,
                    sequelize.literal('not exists (select 1 from gsmk_poll."clientOnHolds" as "c" where "c"."clientId" = "client"."id")'),
                    sequelize.literal('not exists (select 1 from gsmk_poll."answerquestions" as "a" where "a"."clientId" = "client"."id")'),
                    sequelize.literal('not exists (select 1 from gsmk_poll."clientStates" as "a" where "a"."clientId" = "client"."id")'),
                    sequelize.literal('not exists (select 1 from gsmk_poll."clientDelayeds" as "c" where "c"."clientId" = "client"."id" and c."timeDelay" - Now() < \'0day\')')
                ],
            })
            if (!client) {
                return res.status(200).json(null)
            }
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