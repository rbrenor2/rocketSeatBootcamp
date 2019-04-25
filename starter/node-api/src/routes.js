const express = require('express')
const routes = express.Router()

const ProductController = require('./controllers/ProductController')

routes.get('/products', ProductController.index) // calls the controller method that we want to run in this endpoint
routes.get('/products/:id', ProductController.show) 
routes.post('/products', ProductController.store)
routes.put('/products/:id', ProductController.update)
routes.delete('/products/:id', ProductController.destroy)

module.exports = routes