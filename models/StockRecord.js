const mongoose = require('mongoose');

const StockRecordSchema = new mongoose.Schema({
    recordId : {type : String, unique : true},
    stockName : String,
    purchasedAt : String,
    quantity : Number,
    stockPrice : Number,
    totalValue : Number
})

const StockRecord = new mongoose.model('StockRecord', StockRecordSchema);

module.exports = {
    StockRecord,
}