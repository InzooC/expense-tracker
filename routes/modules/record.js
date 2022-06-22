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
          console.log(filterCategory)
          res.render('edit', { record, formatDate, filterCategory })
        })
    })
    .catch(err => {
      console.error(err)
      res.render('errorPage', { error: '無法呈現編輯頁面' })
    })
})

//編輯一個record
router.post('/:id/edit', (req, res) => {
  console.log(req.body)
})




// 瀏覽新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

module.exports = router