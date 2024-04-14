
const { StockRecord } = require("../models/StockRecord");
const {User} = require("../models/User");
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');


const fetchCurrentBalance = async(req) => {
    const email = req.query.email;
    console.log(email);
    try{
        const currUser = await User.findOne({'email' : email}, 'balance');
        console.log(currUser);
        return currUser.balance;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

const createStockRecordAndUpdateUser = async (req) => {
    console.log(req.body);
    const date = moment().format("DD/MM/YYYY HH:mm:ss")
    let data = req.body;
    const randomId = uuidv4();
    data = {
        ...data,
        purchasedAt : date,
        recordId : randomId
    }

    const newStockRecord = new StockRecord(data);
    await newStockRecord.save();
    return data;
}

module.exports = {
    fetchCurrentBalance,
    createStockRecordAndUpdateUser,
}