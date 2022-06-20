const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()//拿出Record model所有東西
    .lean()
    .sort({ date: 'asc' })
    .then(records => res.render('index', { records }))
    .catch(err => {
      console.error(error)
      res.render('errorPage', { error: '無法瀏覽首頁' })
    })
})

module.exports = router