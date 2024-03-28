const mongoose = require('mongoose');
const CONSTANTS = require('../utils/constants');

const ConnectDatabase = async function(){
    try{
        await mongoose.connect(CONSTANTS.DATABASE.DATABASE_CONNECTION_URL + CONSTANTS.DATABASE.DATABASE_NAME);
        return CONSTANTS.DATABASE.DATABASE_CONNECTION_SUCCESS;
    }
    catch(error){
        return CONSTANTS.DATABASE.DATABASE_CONNECTION_ERROR;
    }
}

module.exports = ConnectDatabase;