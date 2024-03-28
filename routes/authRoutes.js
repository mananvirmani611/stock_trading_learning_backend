const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthController = require('../controllers/authController')

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/error' }), AuthController.authenticationCallback)
router.get("/login", AuthController.handleLogin)
module.exports = {
    router,
}