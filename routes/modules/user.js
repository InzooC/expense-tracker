const express = require('express')
const router = express.Router()
const User = require('../../models/user')

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
  const { name, email, password, confirmPassword } = req.body
  const errors = []  //message功能還沒放上去
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ massage: '所有欄位都是必填的！' })
  }
  if (password !== confirmPassword) {
    errors.push({ massage: '密碼與驗證密碼不相同！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors, name, email, password, confirmPassword
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) { //message功能還沒放上去
        errors.push({ massage: '此Email已註冊過！' })
        res.render('register', {
          errors, name, email, password, confirmPassword
        })
      }
      // return bcrypt.genSalt(10)
      //   .then(salt => bcrypt.hash(password, salt))
      //   .then(hash => User.create({
      //     name,
      //     email,
      //     password: hash
      //   })
      //     .then(res.redirect('/'))
      //     .catch(err => console.log(err)))
      return User.create({ name, email, password })
    })
    .catch(err => console.log(err))


  res.redirect('/')
})

//帳號登出
router.get('/logout', (req, res) => {
  req.logout()
  // req.flash('success_msg', '你已經成功登出。')   //還沒加flash功能
  res.redirect('/login')
})




module.exports = router