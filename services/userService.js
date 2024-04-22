
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
    try{
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
    catch(err){
        return err;
    }
}

const fetchUserData = async(req) => {
    try{
        const email = req.query.email;
        return new Promise(async (resolve, reject) => {
            await User.findOne({email : email}, {stocksInHand : 1})
            .then(async (response) => {
                const stockIdArray = response.stocksInHand;
                let stockArray = [];
                stockArray = await iterateOnStockIdArray(stockIdArray);
                resolve(stockArray);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
    catch(err){
        return err;
    }
} 

const sellStock = async function(req){
    console.log(req.body);
    const alreadyRecord = await StockRecord.findOne(
        {recordId : req.body.recordId}
    )

    if(alreadyRecord.quantity === req.body.quantityToSell){
        return new Promise(async (resolve, reject) => {
            await StockRecord.deleteOne({recordId : req.body.recordId})
            .then((res) => {
                resolve(res);
            });
        })
    }
    else{
        console.log("insidee this");
        return new Promise(async (resolve, reject) => {
            await StockRecord.findOneAndUpdate(
                {recordId : req.body.recordId},
                {quantity : alreadyRecord.quantity - req.body.quantityToSell}
            )
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });

            const userDetails = await User.findOne({email : req.body.username});

            let stockRecordArray = userDetails.stocksInHand;

            const newStockRecordArray = stockRecordArray.map((item) => {
                if(item.recordId === req.body.recordId){
                    item.quantity = alreadyRecord.quantity - req.body.quantity
                }
                return item;
            })

            await User.findOneAndUpdate(
                {email : req.body.email},
                {stocksInHand : newStockRecordArray}
            )
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
}

const iterateOnStockIdArray = async function(stockIdArray){
    let stockArray = [];
    for(let i = 0; i<stockIdArray.length; i++){
        await StockRecord.findById({_id : stockIdArray[i]})
        .then((res) => {
            stockArray.push(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    stockArray.reverse();
    return stockArray;
}

module.exports = {
    fetchCurrentBalance,
    createStockRecordAndUpdateUser,
    fetchUserData,
    sellStock
}