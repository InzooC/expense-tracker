if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')


const recordsList = require('./record.json').records


db.once('open', () => {
    Record.create(recordsList)
  
})