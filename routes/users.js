const express = require('express');
const UserController = require('../controllers/UserController');
const { authentication } = require('../middleware/authentication');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile',authentication, UserController.getUserWithOrdersAndProducts);
router.post('/logout', authentication, UserController.logout);


module.exports = router;
