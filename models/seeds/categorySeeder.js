if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')


const categoriesList = require('./category.json').categories


db.once('open', () => {
  Category.create(categoriesList)
  console.log('categorySeeder is done.')
})