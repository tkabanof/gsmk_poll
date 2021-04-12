class UserController {
    async registration(res, req) {

    }
    async login(req, res) {

    }
    async auth(req, res) {
        const query = req.query
        res.json(query)

    }
}
module.exports = new UserController()