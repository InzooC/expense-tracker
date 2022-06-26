if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')


const categoriesList = require('./data').categories


db.once('open', () => {
  db.dropDatabase()
  Category.create(categoriesList)
    .then(() => {
      console.log('categorySeeder is done.')
      process.exit()
    })
})