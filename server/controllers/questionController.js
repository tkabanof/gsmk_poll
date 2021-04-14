const ApiError = require('../error/ApiError')
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

    async getById(req, res) {

    }

}

module.exports = new QuestionController()