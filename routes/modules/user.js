const express = require('express')
const router = express.Router()


// 瀏覽登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})
// 進行登入
router.post('/login', (req, res) => {
  res.redirect('/')
})


//瀏覽註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
// 進行註冊
router.post('/register', (req, res) => {
  res.redirect('/')
})

//帳號登出
router.get('/logout', (req, res) => {
  req.logout()
  // req.flash('success_msg', '你已經成功登出。')   //還沒加flash功能
  res.redirect('/login')
})




module.exports = router