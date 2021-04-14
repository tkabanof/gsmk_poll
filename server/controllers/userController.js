const ApiError = require('../error/ApiError')
const jwt = require("jsonwebtoken");
const {User} = require("../models/models");

const generateJwt = (id, email, fio, role) => {
    return jwt.sign(
        {id, email, role, fio},
        process.env.secret_key,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, fio} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Неправильный логин или пароль'))

        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Такой пользователь уже есть'))
        }
        const user = await User.create({email, role, password, fio})
        const token = generateJwt(user.id, user.email, user.fio, user.role)
        return res.json({token})

    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal('Нет такого пользователя!'))
        }
        if (password!=user.password){
            return next(ApiError.internal('не верный пароль!'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.fio)
        return res.json({token})

    }

    async auth(req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('неверный id'))
        }
        res.json(id)

    }
}

module.exports = new UserController()