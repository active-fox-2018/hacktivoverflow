const jwt = require('jsonwebtoken')

module.exports = {
  authorization: function(req, res, next) {
    // console.log(req.headers, `in authorization -----`)
    try {
      const decoded = jwt.verify(req.headers.token, process.env.jwt_secret);
      req.decoded = decoded
      // console.log(req.decoded)
      next()
    } catch {
      res.json(500).status({
        msg: `Authorization --- Invalid Token`
      })
    }
  },



}