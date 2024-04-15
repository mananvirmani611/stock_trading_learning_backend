
const { StockRecord } = require("../models/StockRecord");
const {User} = require("../models/User");
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');


const fetchCurrentBalance = async(req) => {
    const email = req.query.email;
    try{
        const currUser = await User.findOne({'email' : email}, 'balance');
        return currUser.balance;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

const createStockRecordAndUpdateUser = async (req) => {
    const date = moment().format("DD/MM/YYYY HH:mm:ss")
    let data = req.body;
    const totalStockAmt = req.body.totalValue;
    const randomId = uuidv4();
    data = {
        ...data,
        purchasedAt : date,
        recordId : randomId
    }
    const newStockRecord = new StockRecord(data);
    await newStockRecord.save().then(async (savedData) => {
        await User.findOneAndUpdate(
            { email : req.body.email}, 
            { $push : {stocksInHand : savedData}, $inc : { balance : -totalStockAmt }}
        )
    });
    return data;
}

module.exports = {
    fetchCurrentBalance,
    createStockRecordAndUpdateUser,
}