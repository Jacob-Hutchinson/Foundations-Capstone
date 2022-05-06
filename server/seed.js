require('dotenv').config()
const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists date_ideas;

        create table date_ideas (
            id serial primary key,
            name VARCHAR(100),
            description VARCHAR(250)
            );
            
            INSERT INTO date_ideas (name, description)
              values ('movie night', 'pick a movie and buy some snacks'),
              ('dinner night', 'find a good restaurant to go to'),
              ('sunset hike', 'search for a nice place with a view. bring a blanket and'),
              ('coffee shop', 'find a local coffee shop to get some drinks and some treats and get to know each other more'),
              ('walk through the park', 'it always good to appreciate nature so go walk around and get to talking');
        `)
    }
}