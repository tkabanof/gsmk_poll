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
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async checkLogin(req, res, next) {
        const email = req.body.login.trim()
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.status(200).json({loginExists: true})
        } else {
            return res.status(200).json({loginExists: false})
        }

    }

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

    async createNewUser(req, res, next) {
        const {email, password, role, fio} = req.body.user
        console.log(req.body)
        if (!email || !password) {
            return next(ApiError.badRequest('Неправильный логин или пароль'))
        }

        const candidate = await User.findOne({where: {email}})
        console.log()
        if (candidate) {
            return next(ApiError.badRequest('Такой пользователь уже есть'))
        }

        const user = await User.create({email, role, password, fio})
        if (user) {
            return res.status(200).json({
                message: 'Пользователь создан!'
            })
        } else {
            return res.status(400).json({
                message: 'Ошибка создания пользователя!'
            })
        }
    }

    async getAllUsers(req, res, next) {

        const current = req.query.current
        const pageSize = req.query.pageSize

        const offset = (current - 1) * pageSize

        const {count, rows} = await User.findAndCountAll({
            attributes: ['id', 'email', 'fio', 'role'],
            order: [['id', 'ASC']],
            offset: offset,
            limit: pageSize
        })


        if (count > 0) {
            res.status(200).json({
                users: [...rows],
                paginator: {
                    current: current,
                    pageSize: pageSize,
                    total: count
                }
            })
        } else {
            res.status(400).json({
                message: 'Пользователи не найдены'
            })
        }


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
            console.log(e)
            return next(ApiError.badRequest('не правильный запрос'))
        }

    }

    async auth(req, res, next) {
        let token = req.headers.authorization.split(' ')[1]
        if (!token) {
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