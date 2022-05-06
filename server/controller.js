require('dotenv').config()
const Sequelize = require('sequelize')

const {DATABASE_URL} = process.env

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    getDateList: (req, res) => {
        sequelize.query(`
        SELECT * FROM date_list 
        ORDER BY id ASC;
        `).then((dbRes => res.status(200).send(dbRes[0]))).catch(err => console.log(err))
    },
    addDateList: (req,res) => {
        console.log(req)
        let {name, description} = req.body
        sequelize.query(`
        INSERT INTO date_list (name, description)
        VALUES ('${name}', '${description}');

        SELECT * FROM date_list;
        `).then((dbres) => {
            res.status(200).send(dbres[0])
        }).catch(err => console.log(err))
    },
    randomList: (req, res) => {
        sequelize.query(`
        SELECT * FROM date_ideas
        `).then((dbres) => {
            let randomIdea = Math.floor(Math.random() * dbres[0].length)
            res.status(200).send(dbres[0][randomIdea])
        }).catch(err => console.log(err))
    },
    deleteDateList: (req,res) => {
        let id = +req.params.id
        sequelize.query(`
        DELETE from date_list Where id = ${id};
        SELECT * FROM date_list
        `).then((dbres) => {
            res.status(200).send(dbres[0])
        }).catch(err=> console.log(err))
    },
    editDate: (req, res) => {
        let {id} = req.params
        let {name, description} = req.body
        console.log(id, name, description)
        sequelize.query(`
        UPDATE date_list
        SET name = '${name}'
        WHERE id = ${id};
        UPDATE date_list
        SET description = '${description}'
        WHERE id = ${id};
        select * from date_list
        ORDER BY id ASC;
        `).then((dbres) => {
            res.status(200).send(dbres[0])
        }).catch(err => console.log(err))

    }
}