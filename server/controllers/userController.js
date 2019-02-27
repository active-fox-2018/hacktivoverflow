const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { comparePw } = require('../helpers/hashPw')
const mongoose = require('mongoose')

require('dotenv').config()

module.exports = {
    registerUser: (req, res, next) => {
        let newUser = { name, email, password } = req.body
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                req.error = {register: err}
                next()
            })
    },
    loginUser: (req, res, next) => {
        if(!req.body.email || !req.body.password) {
            req.error = {
                login : {
                    msg: 'Please fill in all the form'
                }
            }
            next()
        } else {
            User
                .findOne({email: req.body.email})
                .then(user => {
                    if (user) {
                         if (comparePw(req.body.password, user.password)) {
                            let token = jwt.sign({
                                id: user._id,
                                name: user.name,
                                email: user.email,
                            }, process.env.JWT_SECRET)
                            res.status(200).json({
                                token: token, 
                                id: user._id,
                            })
                        } else {
                            req.error = {
                                login : {
                                    msg: 'Email/password is wrong!'
                                }
                            }
                            next()
                        }
                    } else {
                        req.error = {
                            login : {
                                msg: 'Email/password is wrong!'
                            }
                        }
                        next()
                    }
                })
                .catch(err => {
                    req.error = {login: err}
                    next()
                })
        }
    },
    verifyUser: (req, res, next) => {
        if (!req.headers.token) {
            req.error = {
                verify : {
                    msg: 'Please login first'
                }
            }
            next()
        } else {
             try {
                const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
                 if (mongoose.Types.ObjectId.isValid(decoded.id)) {
                     User
                        .findById(decoded.id)
                        .then(user => {
                            if (!user) {
                                req.error = {
                                    verify : {
                                        msg: 'User not found'
                                    }
                                }
                                next()
                            } else {
                                res.status(200).json(user)
                            }
                         })
                         .catch(err => {
                            req.error = {
                                verify : err
                            }
                            next()
                         })
 
                 } else {
                    req.error = {
                        verify : {
                            msg: 'Invalid User Id'
                        }
                    }
                    next()
                 }
 
             } catch (err) {
                req.error = {
                    verify : {
                        msg: 'Token invalid!'
                    }
                }
                next()
             }
        }
    },
    addTags: (req, res) => {
        User
            .findOneAndUpdate({ _id: req.current_user._id }, { $push: { tags: req.body.tag  } }, { new: true })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(500).json({ msg: 'Internal Serve Error' })
            })
    },
    removeTags: (req, res) => {
        User
            .findOneAndUpdate({ _id: req.current_user._id }, { $pull: { tags: req.body.tag  } }, { new: true })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(500).json({ msg: 'Internal Serve Error' })
            })
    }
}