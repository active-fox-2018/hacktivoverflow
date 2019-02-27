const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = {
    create(req,res) {
        Users
            .create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                let path = Object.keys(err.errors)
                res.status(400).json({ error: err.errors[path[0]].message.slice(0, err.errors[path[0]].message.length - 1) })
            })
    },
    login(req,res) {
        let user = ''
        Users
            .findOne({
                email : req.body.email
            })
            .then(userLogin => {
                if (userLogin) {
                    user = userLogin
                    return bcrypt.compare(req.body.password, userLogin.password)
                        .then(response => {
                            if (response) {
                                console.log(user,"================");
                                
                                res.status(200).json({
                                    user: user,
                                    token: jwt.sign({
                                        id: user._id,
                                        email: user.email,
                                        role: user.role,
                                        name : user.name
                                    }, process.env.JWTTOKEN)
                                })
                            } else {
                                res.status(400).json({ error: 'password wrong' })
                            }
                        })
                } else {
                    res.status(400).json({ error: 'email wrong' })
                }
            })
            .catch(err => {
                console.log(err);
                
                res.status(500).json({error : err})
            })
    }


}