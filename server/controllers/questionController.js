const ApiError = require('../error/ApiError')
const {Answer} = require("../models/models");
const {Poll} = require("../models/models");
const {Question} = require("../models/models");

class QuestionController {
    async create(req, res) {
        const {text, required} = req.body
        const que = await Question.create({text, required})
        return res.json(que)

    }

    async delete(req, res) {

    }

    async getAll(req, res) {
        const questions = await Question.findAll()
        return res.json(questions)
    }

    async getQuestionAnswerByIdPoll(req, res) {
        const pollId = req.params.id
        const poll = await Poll.findOne({
            where: {
                id: pollId
            }
        })
        const templateId = poll.templateId

        const questions = await Question.findAll({
                where: {
                    templateId: templateId
                },
            include: [{
                model: Answer
            }]
            },
        )
        return res.json(questions)
    }

}

module.exports = new QuestionController()