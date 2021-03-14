const express = require('express')
const cors = require('cors')
const routes = require('./routes/index.js')
const db = require('../db-connect.js')

const app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())
app.use(cors())
app.use('/', routes)

db.on('error', () => {
  console.error.bind(console, 'connection error:')
  process.exit(1)
})

db.once('open', function () {
  console.log('Connected to Database...')

  //start express server
  app.listen(4006)
})
