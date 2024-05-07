const express = require('express');
const OrderController = require('../controllers/OrderController');
const { authentication } = require('../middleware/authentication');
const router = express.Router();

router.post('/',authentication, OrderController.createOrder);
router.get('/OrderWhithProducts',authentication, OrderController.getOrdersWithProducts);

module.exports = router;