const express = require('express')
const { createOrder, paymentCallback } = require('../controllers/paymentController')

const router = express.Router()

// Frontend calls this to begin payment
router.post('/create-order', createOrder)

// PayU calls this after payment
router.post('/callback', paymentCallback)

module.exports = router