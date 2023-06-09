const express = require('express')
const routes = express.Router()
const {
    getAllProductsStatic,
    getAllProducts
} = require('../controllers/products')


routes.route('/').get(getAllProducts)
routes.route('/static').get(getAllProductsStatic)
module.exports = routes