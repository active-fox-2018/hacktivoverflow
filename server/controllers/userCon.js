const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { comparePass } = require('../helpers')
const mongoose = require('mongoose')

class Controller {
    static create (req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                msg: `Email and password must be filled`
            })
        } else {
            let user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                birthday: req.body.birthday
            }
            User.create(user)
                .then(data => {
                    res.status(201).json({
                        token: jwt.sign({ id: data._id }, process.env.JWT),
                        data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
    }

    static login (req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                msg: `Email and password must be filled`
            })
        } else {
            User.findOne({ email: req.body.email })
                .then(found => {
                    if (!found) {
                        res.status(404).json({
                            msg: `Email / password wrong`
                        })
                    } else {
                        if (!comparePass(req.body.password, found.password)) {
                            res.status(400).json({
                                msg: `Email / password wrong`
                            })
                        } else {
                            res.status(200).json({
                                token: jwt.sign({id: found._id}, process.env.JWT),
                                data: found
                            })
                        }
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
    }

    static findOne (req, res) {
        res.status(200).json(req.currentUser)
    }

    static update (req, res) {
        let tags = req.body.tags

        req.currentUser.set({ tags })
        req.currentUser.save()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}

module.exports = Controller