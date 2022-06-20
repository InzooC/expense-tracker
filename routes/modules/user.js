const express = require('express')
const router = express.Router()


// 瀏覽新增頁面
router.get('/user/login', (req, res) => {
  res.render('login')
})
//瀏覽編輯頁面
router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/logout', (req, res) => {
  req.logout()
  // req.flash('success_msg', '你已經成功登出。')   //還沒加flash功能
  res.redirect('/login')
})




module.exports = router