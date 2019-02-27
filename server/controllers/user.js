const User = require('../models/user')
const Password = require('../helpers/password-encrypt-decrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static login(req, res) {
        User
            .findOne({email: req.body.email})
            .then((user) => {
                if (!user) {
                    res.status(400).json({status: "Sorry, Email is not registered"})
                } else {
                    let isPasswordCorrect = Password.comparePassword(req.body.password, user.password)
                    if (isPasswordCorrect) {
                        let token = jwt.sign({email: user.email}, process.env.JWT_SECRET)
                        res.status(200).json({status: "You have successfully logged in", token, user})
                    } else {
                        res.status(400).json({status: "Sorry, wrong password"})
                    }
                }
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static register(req, res) {
        User
            .create(req.body) 
            .then((newUser) => {
                res.status(200).json({status: "You have successfully created an account", user: newUser})
            })
            .catch((err) => {
                if (err.name === "MongoError") {
                    res.status(400).json({status: "Sorry, Email has been used"})
                } else {
                    res.status(400).json({status: err.errors[Object.keys(err.errors)[0]].message})
                }
            })
    }

    static addWatchedTag(req, res) {
        User
            .findOneAndUpdate({_id: req.userStorage.id}, {$push: {watchedTags: req.body.tagId}}, {new: true})
            .then((user) => {
                res.status(200).json({status: "You have successfully added a tag in your watch list"})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })

    }

    static getWatchedTag(req, res) {
        User
            .findOne({_id: req.userStorage.id})
            .populate('watchedTags')
            .then((user) => {
                res.status(200).json({watchedTags: user.watchedTags})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }
}

module.exports = UserController