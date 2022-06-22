const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const Record = require('./models/record')
const methodOverride = require('method-override')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const app = express()

const port = process.env.PORT


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use(routes)



app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

