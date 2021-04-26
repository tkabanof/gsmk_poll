const {Template} = require("../models/models")

class TemplateController {
    async addNew(req, res, next) {
        const {description} = req.body
        try {
            const template = await Template.create({description})
            return res.status(200).json(template)
        } catch (e) {
            return res.status(400).json({
                message: 'Новый шаблон не создан!',
                errorDetail: e
            })
        }
    }

    async getAll(req, res, next) {
        const template = await Template.findAll()
        return res.status(200).json(template)
    }
}

module.exports = new TemplateController()