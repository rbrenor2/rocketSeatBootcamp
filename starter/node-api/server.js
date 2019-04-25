const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')

// Init app
const app = express()
app.use(express.json()) // tells app to allow receive json data in POST requests for example
app.use(cors()) // allow external connections to the api

// Init database
mongoose.connect('mongodb://localhost:27017/nodeapi', { useNewUrlParser: true })

// Import models
// require('./src/models/Product') 
requireDir('./src/models') // requireDir requires all created models in one line of code, instead of require each one like the example above

// Routes
app.use('/api', require('./src/routes'))

app.listen(3001)