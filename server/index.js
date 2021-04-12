require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT || 5000

const app = express()

const start = async () => {
    try {

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server on port ${PORT}`))

    } catch (e) {
        console.log(e)
    }
}
start()
