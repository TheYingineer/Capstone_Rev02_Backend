const express = require('express')
const invoiceController = require('../controllers/invoice')
const router = express.Router()

router.get('/invoice', invoiceController.getAllInvoice)

router.get('/invoice/:id', invoiceController.getInvoiceById)

router.post('/invoice', invoiceController.createInvoice)

router.put('/invoice/:id', invoiceController.updateInvoiceById)

router.delete('/invoice/:id', invoiceController.deleteInvoiceById)

module.exports = router
