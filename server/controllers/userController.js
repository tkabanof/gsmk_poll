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
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('Нет такого пользователя!'))
            }
            if (password !== user.password) {
                return next(ApiError.internal('не верный пароль!'))
            }
            const token = generateJwt(user.id, user.email, user.role, user.fio)

            return res.json({
                user: {...user.dataValues, token: token}
            })

        } catch (e) {
            console.log(req.body)
            return next(ApiError.badRequest('не правильный запрос'))
        }

    }

    async auth(req, res, next) {
        const decoded = jwt.verify(req.token, process.env.SECRET_KEY)
        const user = decoded
        const token = generateJwt(user)
        //res.json({message: 'auth is work'})
        //const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.fio)
        res.json(token)
    }
}

module.exports = new UserController()