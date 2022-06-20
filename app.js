const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const port = process.env.PORT


//設定引擎模板
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  res.render('index')
})

app.get('/item/new', (req, res) => {
  res.render('new')
})

app.get('/user/login', (req, res) => {
  res.send('login頁面')
})


app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

