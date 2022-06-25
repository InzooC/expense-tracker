const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// 瀏覽登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})
// 進行登入
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

//帳號登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/user/login')
})

//瀏覽註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
// 進行註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填的！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與驗證密碼不相同！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors, name, email, password, confirmPassword
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '此Email已註冊過！' })
        return res.render('register', {
          errors, name, email, password, confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        })
          .then(res.redirect('/'))
          .catch(err => console.log(err)))
    })
})





module.exports = router