const StockService = require("../services/stockService");

const returnStockData = async (req, res) => {
    try{
        const response = await StockService.getStocksData(req);
        console.log(response);
        res.send(response);
    }
    catch(error){
        res.send(error);
    }
}

module.exports = {
    returnStockData
}
