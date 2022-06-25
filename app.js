const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')

const userPassport = require('./config/passport')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const app = express()
const port = process.env.PORT


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


userPassport(app)

app.use(routes)



app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

