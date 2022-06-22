const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
// const categories = require('../../models/seeds/category.json').categories
const Category = require('../../models/category')


//瀏覽編輯頁面
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  Record.findOne({ _id })
    .lean()
    .then(record => {
      const formatDate = record.date.toJSON().toString().slice(0, 10)
      Category.find().lean()
        .then(categoryData => {
          const filterCategory = categoryData.filter(category => category.id !== record.categoryNumber)
          res.render('edit', { record, formatDate, filterCategory })
        })
    })
    .catch(err => {
      console.error(err)
      res.render('errorPage', { error: '無法呈現編輯頁面' })
    })
})

//編輯一個record
router.post('/:id', (req, res) => {
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  console.log(name, date, category, amount)
  return Record.findOne({ _id })
    .then(record => {
      Category.findOne({ id: category })
        .then(categoryData => {
          record.category = categoryData.name
          record.name = name
          record.date = date
          record.categoryNumber = category
          record.amount = amount
          return record.save()
        })
    })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.error(error)
      res.render('errorPage', { error: '無法修改紀錄' })
    })
})


// 瀏覽新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

module.exports = router