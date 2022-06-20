const express = require('express')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const port = process.env.PORT


app.get('/', (req, res) => {
  res.send('gogo')
})


app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

