const { User } = require("../models/User");
const UserService = require("../services/userService");

const returnCurrentBalance = async function(req, res){
    try{
        const response = await UserService.fetchCurrentBalance(req);
        res.json({balance : response});
    }
    catch(err){
        return err;
    }
}

const updateStockRecord = async function(req, res){
    try{
        const response = await UserService.createStockRecordAndUpdateUser(req);
        res.json(response);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    returnCurrentBalance,
    updateStockRecord,
}