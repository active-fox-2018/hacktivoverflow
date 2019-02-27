const Question = require('../models/Question')
const Tag = require('../models/Tags')

class questionController {
  static create(req, res, next) {

    req.body.tags = req.body.tags ? req.body.tags : []
    var promises = []
    var filteredInputTags = []

    filteredInputTags = req.body.tags.filter(function (value, index, self) {
      return self.indexOf(value) == index;
    })

    filteredInputTags.forEach(tagName => {
      promises.push(Tag.findOne({ name: tagName }))
    })

    Promise
      .all(promises)
      .then(tags => {
        tags = tags.filter(el => el).map(tag => tag.name)
        filteredInputTags = filteredInputTags.filter(el => !tags.includes(el));

        promises = []
        filteredInputTags.forEach(tagName => {
          promises.push(Tag.create({ name: tagName }))
        })

        return Promise
          .all(promises)
      })
      .then(tags => {

        return Question
          .create({
            author: req.user._id,
            title: req.body.title,
            description: req.body.description,
            tags: tags.map(tag => tag._id)
          })
      })
      .then(question => {
        res
          .status(201)
          .json({
            msg: "create success",
            data: question
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "create fail",
            err
          })
      })
  }

  static findAll(req, res, next) {
    let query = {}
    
    if (req.query.q) {
      query = {
        $or: [{tags:{
          $regex: '.*' + req.query.q + '.*',
          $options: "i"
         }},{title: {
          $regex: '.*' + req.query.q + '.*',
          $options: "i"
        }}]
      }
    }

    Question
      .find(query)
      .populate('tags')
      .then(questions => {
        res
          .status(200)
          .json({
            msg: "get data success",
            questions
          })
      })
      .catch(err => {
        res
          .status(404)
          .json({
            msg: "not found",
            err
          })
      })
  }

  static findById(req, res, next) {
    Question
      .findById(req.params.id)
      .populate('tags')
      .populate('author')
      .populate({
        path: 'answers',
        populate: { path: 'author' }
      })
      .then(question => {
        if (!question) {
          res
            .status(404)
            .json({
              msg: 'question not found'
            })
        } else {
          res
            .status(200)
            .json({
              msg: 'fetch data success',
              data: question
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: 'fetch failed',
            err
          })
      })
  }

  static edit(req, res, next) {
    var filteredInputTags = []
    var promises = []
    req.body.tags = req.body.tags ? req.body.tags : []
    Question
      .findOne({ _id: req.params.id })
      .populate('tags')
      .then(question => {

        if (!question.author.toString() == req.user._id.toString()) {

          res
            .status(401)
            .json({
              msg: "unauthorized access"
            })
        } else {
          var tagNames = question.tags.map(tag => tag.name)
          filteredInputTags = req.body.tags.filter(el => !tagNames.includes(el))
          filteredInputTags.forEach(tagName => {
            promises.push(Tag.create({ name: tagName }))
          })

          Promise
            .all(promises)
            .then(newTags => {

              return question.update({
                title: req.body.title,
                description: req.body.description,
                tags: question.tags.concat(newTags).map(tag => tag._id)
              })
            })
            .then(() => {
              return question.save()
            })
            .then(savedQuestion => {
              res
                .status(200)
                .json({
                  msg: 'update success',
                  data: savedQuestion
                })
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "update fail",
            err
          })
      })
  }

  static upvote(req, res, next) {
    Question
      .findOne({ _id: req.params.id })
      .then(question => {
        var isUpvoter = false
        var isDownvoter = false
        var downvoterIndex = 0
        var upvoterIndex = 0

        question.upvoters.forEach((upvoter, index) => {
          if (upvoter.toString() == req.user._id.toString()) {
            isUpvoter = true
            upvoterIndex = index
          }
        })

        question.downvoters.forEach((downvoter, index) => {
          if (downvoter.toString() == req.user._id.toString()) {
            isDownvoter = true
            downvoterIndex = index
          }
        })

        if (!isUpvoter) {
          if (isDownvoter) {
            question.downvoters.splice(downvoterIndex, 1)
          }

          question.upvoters.push(req.user._id)
          return question
            .save()
            .then(() => {
              res
                .status(200)
                .json({
                  msg: "upvote success",
                  question
                })
            })
        } else {
          question.upvoters.splice(upvoterIndex, 1)
          return question
            .save()
            .then(() => {
              res
                .status(200)
                .json({
                  msg: "undo upvote success"
                })
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "upvote fail",
            err
          })
      })
  }

  static downvote(req, res, next) {
    Question
      .findOne({ _id: req.params.id })
      .then(question => {
        var isDownvoter = false
        var isUpvoter = false
        var upvoterIndex = 0
        var downvoterIndex = 0

        question.downvoters.forEach((downvoter , index) => {
          if (downvoter.toString() == req.user._id.toString()) {
            isDownvoter = true
            downvoterIndex = index
          }
        })

        question.upvoters.forEach((upvoter, index) => {
          if (upvoter.toString() == req.user._id.toString()) {
            isUpvoter = true
            upvoterIndex = index
          }
        })

        if (!isDownvoter) {
          if (isUpvoter) {
            question.upvoters.splice(upvoterIndex, 1)
          }

          question.downvoters.push(req.user._id)
          return question
            .save()
            .then(() => {
              res
                .status(200)
                .json({
                  msg: "downvote success",
                  question
                })
            })


        } else {
          question.downvoters.splice(downvoterIndex, 1)
          return question
            .save()
            .then(() => {
              res
                .status(200)
                .json({
                  msg: "undo downvote success"
                })
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal server error",
            err
          })
      })
  }

  static delete(req, res, next) {
    Question
      .findOne({ _id: req.params.id })
      .then(question => {
        if (question.author.toString() == req.user._id.toString()) {
          Question
            .findOneAndDelete({ _id: req.params.id })
            .then(question => {
              res
                .status(200)
                .json({
                  msg: "delete success",
                  question
                })
            })
        } else {
          res
            .status(401)
            .json({
              msg: "unauthorized access"
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "delete failed",
            err
          })
      })
  }
}

module.exports = questionController