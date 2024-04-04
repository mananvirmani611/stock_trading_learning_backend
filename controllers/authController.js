
const AuthService = require("../services/authService");

const authenticateUser = async (req, res) => {
    try{
        const response = await AuthService.performAuthAndReturnToken(req);
        res.json(response);
    }
    catch(error){
        res.json(error)
    }
}

module.exports = {
    authenticateUser,
}