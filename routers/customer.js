const express = require('express')
const customerController = require('../controllers/customer')
const router = express.Router()

router.get('/customer', customerController.getAllCustomer)

router.get('/customer/:id', customerController.getCustomerById)

router.post('/customer', customerController.createCustomer)

router.put('/customer/:id', customerController.updateCustomerById)

router.delete('/customer/:id', customerController.deleteCustomerById)

module.exports = router