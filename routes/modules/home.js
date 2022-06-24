const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  Record.find()//拿出Record model所有東西
    .lean()
    .then(records => {
      let totalAmount = 0
      let icon = ''  //必須把icon放進record中．．．．
      records.map(record => {
        totalAmount += record.amount
        Category.findOne({ id: record.categoryNumber })
          .then(categoryData => {
            icon = categoryData.icon
          })
      })
      return res.render('index', { records, totalAmount })
    })
    .catch(error => {
      console.error(error)
      res.render('errorPage', { error: '無法瀏覽首頁' })
    })
})

//選取特定類別
router.post('/filter', (req, res) => {
  const selectedCategoryValue = Number(req.body.category)
  Record.find({ categoryNumber: selectedCategoryValue })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.map(record => totalAmount += record.amount)
      const showRecords = records

      return res.render('index', { showRecords, totalAmount, selectedCategoryValue })
    })
    .catch(error => {
      console.error(error)
      res.render('errorPage', { error: '無法瀏覽首頁' })
    })
})





module.exports = router