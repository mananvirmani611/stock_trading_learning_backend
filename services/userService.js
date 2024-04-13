
const {User} = require("../models/User");

const fetchCurrentBalance = async(query) => {
    const email = query.email;
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

module.exports = {
    fetchCurrentBalance,
}