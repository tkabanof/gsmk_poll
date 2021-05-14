const ApiError = require('../error/ApiError')
const jwt = require("jsonwebtoken");
const {User} = require("../models/models");

const generateJwt = (id, email, fio, role) => {
    return jwt.sign(
        {
            userid: id,
            email: email,
            fio: fio,
            role: role
        },
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
            const token = generateJwt(user.id, user.email, user.fio, user.role)

            return res.json({
                user: {
                    userid: user.id,
                    email: user.email,
                    role: user.role,
                    fio: user.fio
                },
                token: token
            })

        } catch (e) {
            console.log('не правильный запрос')
            console.log(req.body)
            return next(ApiError.badRequest('не правильный запрос'))
        }

    }

    async auth(req, res, next) {
        let token = req.headers.authorization.split(' ')[1]
        if (!token){
            console.log('Пустой токен')
            return res.status(400).json({
                message: 'токен пустой'
            })
        }
        const {userid, email, fio, role} = jwt.verify(token, process.env.SECRET_KEY)
        token = generateJwt(userid, email, fio, role)
        res.json({
            user: {userid, email, fio, role},
            token: token
        })
    }
}

module.exports = new UserController()