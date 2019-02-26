const { Tags } = require('../models')

module.exports = {
    create(req, res) {
        Tags
            .create({text: req.body.text})
            .then(tag =>{
                res.status(201).json(tag)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                  msg: 'internal server err',
                  err: err
                })
            })
    },
    getAll(req, res) {
      Tags
          .find()
          .then(tags => {
              res.status(200).json(tags)
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({
                  msg: 'internal server err',
                  err: err
              })
          })
    }
}