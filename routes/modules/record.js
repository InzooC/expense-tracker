const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


//瀏覽編輯頁面
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
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
// save之後 回到首頁，資料沒有辦法快速更新
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  new Promise((resolve, _reject) => {
    Record.findOne({ _id, userId })
      .then(record => {
        Category.findOne({ id: category })
          .then(categoryData => {
            record.name = name
            record.date = date
            record.amount = Number(amount)
            record.category = categoryData.name
            record.categoryNumber = Number(category)
            record.categoryId = categoryData._id
            record.icon = categoryData.icon
            return record.save()
          })
      })
      .then(() => res.redirect('/'))
      .catch(error => {
        console.error(error)
        res.render('errorPage', { error: '無法修改紀錄' })
      })
  })
})

// 瀏覽新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一個record
router.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  let categoryName = ""
  Category.findOne({ id: Number(category) })
    .then(categoryData => {
      const categoryId = categoryData._id
      const icon = categoryData.icon
      return Record.create({ name, date, categoryNumber: category, amount, category: categoryData.name, userId, categoryId, icon })
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.error(error)
      res.render('errorPage', { error: '無法新增餐廳' })
    })
})

//刪除一個record
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.error(error)
      res.render('errorPage', { error: '無法刪除餐廳資訊' })
    })
})

//只顯示特定類別


module.exports = router