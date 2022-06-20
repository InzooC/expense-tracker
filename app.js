const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')




if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const app = express()



const port = process.env.PORT


//設定引擎模板
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



app.use(bodyParser.urlencoded({ extended: true }))


//瀏覽首頁
app.get('/', (req, res) => {
  Record.find()//拿出Record model所有東西
    .lean()
    .sort({ date: 'asc' })
    .then(records => res.render('index', { records }))
    .catch(err => {
      console.error(error)
      res.render('errorPage', { error: '無法瀏覽首頁' })
    })
})
// 瀏覽新增頁面
app.get('/record/new', (req, res) => {
  res.render('new')
})
//瀏覽編輯頁面
app.get('/record/edit', (req, res) => {
  res.render('edit')
})

app.get('/user/login', (req, res) => {
  res.send('login頁面')
})





app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

