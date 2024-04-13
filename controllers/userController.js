const UserService = require("../services/userService");

const returnCurrentBalance = async function(req, res){
    try{
        console.log("herere");
        const query = req.query;
        console.log(query)
        const response = await UserService.fetchCurrentBalance(query);
        console.log(response);
        res.json({balance : response});
    }
    catch(err){
        return err;
    }
}

module.exports = {
    returnCurrentBalance,
}