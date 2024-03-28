
const AuthService = require("../services/authService");

const authenticationCallback = async function(req, res){
    try{
        const response = await AuthService.handleAuthCallback(req, res);
        res.send(response)
    }
    catch(error){
        res.send(error);
    }
}

const handleLogin = async function(req, res){
    res.redirect("/auth/google");
}


module.exports = {
    authenticationCallback,
    handleLogin
}