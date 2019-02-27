const User = require('../models/user')
const jwt = require('jsonwebtoken')
const compareHash = require('../helpers/compareHash')

class UserController {
  static findOne(req, res) {
    User.findOne({
      _id: req.userAuthentic._id
    })
    .then(user => {
      res.status(200).json({ user })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }

  static register(req, res) {
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      tags: req.body.tags || []
    })
    .then(user => {
      res.status(201).json({ user })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }

  static update(req, res) {
    User.findOne({
      _id: req.userAuthentic._id,
    })
    .then(user => {
      for(let key in req.body) {
        user.set(key, req.body[key])
      }
      return user.save()
    })
    .then(user => {
      res.status(200).json({ user })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }

  static login(req, res) {
    let userFound = null
    User.findOne({
      email : req.body.email
    })
    .then(data => {
      userFound = data
      if(data) {
        data = userFound
        return compareHash(req.body.password, userFound.password)
      } else {
        throw '404'
      }
    })
    .then(verified => {
      if(verified){
        const token = jwt.sign({
          _id : userFound._id
        }, process.env.SECRET_JWT, { expiresIn : '1h' })
        res.status(200).json({ token, id: userFound._id})
      } else {
        throw '404'
      }
    })
    .catch(err => {
      if(err == '404') {
        res.status(404).json({ err : 'Not Authorized' })
      } else {
        res.status(500).json({ err : err.message })
      }
    })
  }
}

module.exports = UserController