const {Template} = require("../models/models")

class TemplateController {
    async addNew(req, res, next) {
        const {description} = req.body
        try {
            const poll = await Template.create({description})
            return res.status(200).json(poll)
        } catch (e) {
            return res.status(400).json({
                message: 'Новый шаблон не создан!',
                errorDetail: e
            })
        }
    }

    async getAll(req, res, next) {
        const poll = await Template.findAll()
        return res.status(200).json(poll)
    }
}

module.exports = new TemplateController()