const mongoose = require('mongoose');


const StockRecordSchema = new mongoose.Schema({
    stockName : { type : String, unique : true},
    purchasedAt : {type : Date},
    quantity : Number,
    stockPrice : Number
})

const StockRecord = new mongoose.model('StockRecord', StockRecordSchema);
module.exports = {
    StockRecord,
}