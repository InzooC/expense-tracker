const express = require('express')
const router = express.Router()


// 瀏覽新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})
//瀏覽編輯頁面
router.get('/:id/edit', (req, res) => {
  res.render('edit')
})




module.exports = router