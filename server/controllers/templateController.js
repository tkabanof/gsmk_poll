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
    async updateOne(req, res, next) {
        // const template = await Template.findAll()
        // return res.status(200).json(template)

    }

    async getAll(req, res, next) {
        const template = await Template.findAll()
        return res.status(200).json(template)
    }

    async deleteOne(req, res, next) {
        console.log(req)
        const templateId = req.body.id
        const template = await Template.findOne({where: {id: templateId}})
        try {
            if (template) {
                await template.destroy()
                return res.status(200).json({
                    message: "Удален"
                })
            } else {
                return res.status(400).json({
                    message: "Нет такого шаблона"
                })
            }
        } catch (e) {
            return res.status(400).json({
                message: 'Ошибка удаления шаблона',
                errorDetail: e
            })
        }
    }

}

module.exports = new TemplateController()