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

            //console.log('respons данные')
            //console.log(...user.dataValues)
            console.log({
                user: {
                    userid: user.id,
                    email: user.email,
                    role: user.role,
                    fio: user.fio
                }
            })
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
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = decoded

        console.log('jwt user')
        console.log({user: user})

        token = generateJwt(user)
        //res.json({message: 'auth is work'})
        //const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.fio)
        res.json({
            user: user,
            token: token
        })
    }
}

module.exports = new UserController()