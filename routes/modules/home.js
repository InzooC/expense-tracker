const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })//拿出特定user_id的record
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      let totalAmount = 0
      const userRecords = []
      records.map(record => {
        totalAmount += record.amount

        record.formateDate = record.date.toJSON().toString().slice(0, 10)
        userRecords.push(record)
      })
      return res.render('index', { userRecords, totalAmount })
    })
    .catch(error => {
      console.error(error)
      res.render('errorPage', { error: '無法瀏覽首頁' })
    })
})

//選取特定類別
router.post('/filter', (req, res) => {
  const userId = req.user._id
  const selectedCategoryValue = Number(req.body.category)
  Record.find({ categoryNumber: selectedCategoryValue, userId })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.map(record => totalAmount += record.amount)

      if (records.length === 0) {
        return res.render('index', { totalAmount })
      } else {
        const { categoryNumber, category } = records[0]
        Category.find().lean()
          .then(categoryData => {
            const filterCategory = categoryData.filter(eachCategory => eachCategory.id !== selectedCategoryValue)
            res.render('index', { userRecords: records, totalAmount, filterCategory, categoryNumber, category })
          })
      }

    })
    .catch(error => {
      console.error(error)
      res.render('errorPage', { error: '無法瀏覽首頁' })
    })
})




module.exports = router