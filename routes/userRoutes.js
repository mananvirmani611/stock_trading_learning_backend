const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const TokenVerification = require('../services/TokenVerification');

router.get('/current-balance', UserController.returnCurrentBalance);


module.exports = {
    router,
}