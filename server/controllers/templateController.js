const {Template, Question, Answer} = require("../models/models")

class TemplateController {
    // async addNew(req, res, next) {
    //     const {description} = req.body
    //     try {
    //         const template = await Template.create({description})
    //         return res.status(200).json(template)
    //     } catch (e) {
    //         return res.status(400).json({
    //             message: 'Новый шаблон не создан!',
    //             errorDetail: e
    //         })
    //     }
    // }

    async createBrandNew(req, res, next) {
        console.log(req.body.data)

        const template_name = req.body.data.template_name
        const arr = req.body.data.questions

        const template = await Template.create({description: template_name})

        const template_id = template.id

        for (const q of arr) {

            let answers = q.answers
            console.log(answers)
            console.log(answers.length)
            try {
                let question = await Question.create({
                    templateId: template_id,
                    text: q.question_text
                })

                for (const a of answers) {
                    console.log(a)
                    try {
                        await Answer.create({
                            text: a.answer,
                            questionId: question.id
                        })
                    } catch (e) {
                        return res.status(400).json({
                            message: 'Новый шаблон не обновленн!',
                            errorDetail: e
                        })
                    }
                }
                return res.status(200).json({
                    message: 'Шаблон обновленн!'
                })
            } catch (e) {
                return res.status(400).json({
                    message: 'Новый шаблон не обновленн!',
                    errorDetail: e
                })
            }
            // console.log(q.question_text)
            // console.log(q.answers)
        }
    }

    async getAll(req, res, next) {
        const template = await Template.findAll()
        return res.status(200).json(template)
    }

    async deleteOne(req, res, next) {
        //console.log(req.body)
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