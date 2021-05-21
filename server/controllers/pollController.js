const {Poll, Template, Client} = require("../models/models")

class PollController {
    async addNew(req, res, next) {
        const {description, templateId, state, dataSet} = req.body
        try {
            const poll = await Poll.create({description, state, templateId})
            const newDataSet = dataSet.map((item)=> {
                item.pollId = poll.id
                return item
            })

            const set = Client.bulkCreate(newDataSet, {returning: true})

            return res.status(200).json({
                message: 'Опрос создан!'
            })

        } catch (e) {
            return res.status(400).json({
                message: 'Новый опрос не создан!',
                errorDetail: e
            })
        }
    }

    async changePollStatus(req, res, next) {

        const pollId = req.body.id
        const state = req.body.state


        let newState

        switch (state) {
            case 'close':
                newState = 'open'
                break;
            case 'open':
                newState = 'close'
                break
            default:
                newState = 'undefined'
        }

        const willbeUpdatetd = await Poll.findOne({where: {id: pollId}})

        if (willbeUpdatetd) {
            try {
                willbeUpdatetd.state = newState
                await willbeUpdatetd.save()
                return res.status(200).json({
                    message: 'Статус изменен'
                })
            } catch (e) {
                return res.status(400)
            }
        }
    }

    async getAll(req, res, next) {
        //const {description, state, user_idCreate} = req.body
        const poll = await Poll.findAll({
            include: [{
                model: Template
            }]
        })
        return res.status(200).json(poll)
    }

    async deleteOne(req, res, nex) {
        const pollId = req.body.id
        const willbedeleted = await Poll.findOne({where: {id: pollId}})

        if (willbedeleted) {
            try {
                await willbedeleted.destroy()
                await Client.destroy({
                    where: {
                        pollId: pollId
                    },
                    truncate: true
                })
                return res.status(200).json({
                    message: "Опрос удален"
                })
            } catch (e) {
                return res.status(400).json({
                    message: "Ошибка удаления опроса"
                })
            }
        }
    }
}

module.exports = new PollController()