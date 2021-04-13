const ApiError = require('../error/ApiError')
const {Question} = require("../models/models");

class QuestionController {
    async create(req, res) {
        const {text} = req.body
        const que = await Question.create({text})
        return res.json(que)

    }

    async delete(req, res) {

    }

    async getAll(req, res) {

    }

    async getById(req, res) {

    }

}

module.exports = new QuestionController()