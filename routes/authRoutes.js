const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthController = require('../controllers/authController')

router.post("/authenticate", AuthController.authenticateUser);

module.exports = {
    router,
}