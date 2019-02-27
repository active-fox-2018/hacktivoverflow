require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function jwtVerify(token){
  return jwt.verify(token, secret)
}

function jwtSign(payload){
  return jwt.sign(payload, secret)
}

module.exports = { jwtSign, jwtVerify }