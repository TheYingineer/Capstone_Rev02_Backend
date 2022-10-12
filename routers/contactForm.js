const express = require('express')
const contactController = require('../controllers/contactForm')
const router = express.Router()

router.get('/contactForm', contactController.getAllContactFormName)

router.get('/contactForm/:id', contactController.getContactFormByID)

router.post('/contactForm', contactController.createContactForm)

router.put('/contactForm/:id', contactController.updateContactFormByID)

router.delete('/contactForm/:id', contactController.deleteContactFormById)


module.exports = router