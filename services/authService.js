const jwt = require('jsonwebtoken');
require("dotenv").config();

const performAuthAndReturnToken = async (req) => {
  try {
    const user = { id: req.body.id, username: null };
    let currToken = await signToken(user);
    return {token : currToken};
  }
  catch (err) {
    return err;
  }
}

async function signToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
      if (err) {
        reject("Failed to generate token");
      } else {
        resolve(token);
      }
    });
  })
}

module.exports = {
  performAuthAndReturnToken,
};