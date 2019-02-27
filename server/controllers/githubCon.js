const axios = require('axios')

module.exports = (req, res) => {
    let url = `https://jobs.github.com/positions.json`
    if (req.query.search) {
        url = `https://jobs.github.com/positions.json?search=${req.query.search}`
    }
    axios({
        method: 'get',
        url
    })
    .then(({ data }) => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({
            msg: err.message
        })
    })
}