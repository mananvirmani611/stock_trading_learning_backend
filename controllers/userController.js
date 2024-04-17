const { User } = require("../models/User");
const UserService = require("../services/userService");

const returnCurrentBalance = async function(req, res){
    try{
        const response = await UserService.fetchCurrentBalance(req);
        res.json({balance : response});
    }
    catch(err){
        res.json(err);
    }
}

const updateStockRecord = async function(req, res){
    try{
        const response = await UserService.createStockRecordAndUpdateUser(req);
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
}

const getUserEntireData = async function(req, res){
    try{
        const response = await UserService.fetchUserData(req);
        console.log("insdieee controller " + response);
        res.send(response);
    }
    catch(err){
        res.json(err);
    }
}

module.exports = {
    returnCurrentBalance,
    updateStockRecord,
    getUserEntireData,
}