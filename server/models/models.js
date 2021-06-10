const sequelize = require('../db')
const {DataTypes} = require("sequelize");

const User = sequelize.define('user', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, unique: true},
        password: {type: DataTypes.STRING},
        fio: {type: DataTypes.STRING},
        role: {type: DataTypes.STRING, defaultValue: 'oper'}
    },
    {
        schema: 'gsmk_poll'
    }
)

const Poll = sequelize.define('poll', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        description: {type: DataTypes.STRING},
        state: {type: DataTypes.STRING, defaultValue: 'close'},
        user_idCreate: {type: DataTypes.INTEGER, defaultValue: 1}
    },
    {
        schema: 'gsmk_poll'
    }
)
//не забудь экспорт внизу!!!
const Template = sequelize.define('template', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        description: {type: DataTypes.STRING},
    },
    {
        schema: 'gsmk_poll'
    }
)
const Client = sequelize.define('client', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        surname: {type: DataTypes.STRING},
        name1: {type: DataTypes.STRING},
        name2: {type: DataTypes.STRING},
        birthday: {type: DataTypes.STRING},
        phone: {type: DataTypes.STRING},
        state: {type: DataTypes.STRING},
        call_date: {type: DataTypes.DATE},
        mo: {type: DataTypes.STRING}
    },
    {
        schema: 'gsmk_poll'
    }
)
const ClientDelayed = sequelize.define('clientDelayed', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    timeDelay: {type: DataTypes.DATE}
}, {
    schema: 'gsmk_poll'
})
const ClientOnHold = sequelize.define('clientOnHold', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    clientId: {type: DataTypes.INTEGER},
    pollId: {type: DataTypes.INTEGER}
}, {
    schema: 'gsmk_poll'
})
const Question = sequelize.define('question', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        text: {type: DataTypes.STRING}
    },
    {
        schema: 'gsmk_poll'
    }
)
const Answer = sequelize.define('answer', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        text: {type: DataTypes.STRING}
    },
    {
        schema: 'gsmk_poll'
    }
)
const AnswerQuestion = sequelize.define('answerquestion', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        Questionid: {type: DataTypes.INTEGER},
        AnswerId: {type: DataTypes.INTEGER}
    },
    {
        schema: 'gsmk_poll'
    }
)
Client.hasMany(AnswerQuestion, {as: 'Answers'})
AnswerQuestion.belongsTo(Client)

Client.hasMany(ClientOnHold)
ClientOnHold.belongsTo(Client)

Client.hasMany(ClientDelayed)
ClientDelayed.belongsTo(Client)

Question.hasMany(Answer)
Answer.belongsTo(Question)

Template.hasMany(Poll)
Poll.belongsTo(Template)

Template.hasMany(Question)
Question.belongsTo(Template)

Poll.hasMany(Client)
Client.belongsTo(Poll)

User.hasMany(Poll)
Poll.belongsTo(User)

module.exports = {
    User, Question, Poll, AnswerQuestion, Client, Answer, Template, ClientOnHold, ClientDelayed
}

