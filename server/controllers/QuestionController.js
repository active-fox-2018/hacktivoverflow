const Question = require('../models/question');
const jsonwebtoken = require('../helpers/jsonwebtoken');

class QuestionController {
  static create(req, res) {
    let user = jsonwebtoken.verify(req.headers.token);
    Question
      .create({
        title: req.body.title,
        description: req.body.description,
        userId: user._id,
        votes: [],
        created_at: new Date
      })
      .then(question => {
        let questionMessage = {
          message: `Question in title ${question.title} has been added`,
          data: question
        }
        res.status(201).json(questionMessage);
      })
      .catch(error => {
        let errorMessage = {
          error: error.message,
          fullError: error
        }
        res.status(500).json(errorMessage)
      })
  }

  static find(req, res) {
    Question
      .find()
      .then(question => {
        if(question){
          let questionMessage = {
            message: `Question has been found with total ${question.length}`,
            data: question
          }
          res.status(200).json(questionMessage);
        }
        else {
          let questionMassage = {
            message: `searching process success, but data isn't found`
          }
          res.status(200).json(questionMassage);
        }
      })
      .catch(error => {
        let errorMessage = {
          error: error.message,
          fullError: error
        }
        res.status(500).json(errorMessage);
      })
  }

  static findById(req, res) {
    Question
      .findById(req.params.id)
      .populate()
      .then(question => {
        if(question) {
          let questionMessage = {
            message: `Question with id ${question._id} found`,
            data: question
          }
          res.status(200).json(questionMessage);
        }
        else {
          let questionMassage = {
            message: `searching process success, but data isn't found`
          }
          res.status(404).json(questionMassage);
        }
      })
      .catch(error => {
        let errorMessage = {
          error: error.message,
          fullError: error
        }
        res.status(500).json(errorMessage);
      })
  }

  static update(req,res) {
    let user = jsonwebtoken.verify(req.headers.token);
    Question
      .findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        userId: user._id,
        created_at: new Date
      })
      .then(question => {
        if(question) {
          let afterUpdate = {
            _id: question._id,
            title: req.body.title,
            description: req.body.description,
            votes: question.votes,
            userId: question.userId,
            created_at: new Date
          }
          let questionMessage = {
            message: `Question with title ${question.title} has been updated`,
            beforeUpdate: question,
            afterUpdate: afterUpdate
          }
          res.status(200).json(questionMessage)
        }
        else {
          let errorMessage = {
            message: `data isn't available`
          }
          res.status(400).json(errorMessage)
        }
      })
      .catch(error => {
        let errorMessage = {
          error: error.message,
          fullError: error
        }
        res.status(500).json(errorMessage);
      })
  }

  static remove(req, res){
    Question
      .findByIdAndDelete(req.params.id)
      .then(data => {
        if(data){
          let deleteMessage = {
            message: `Title ${data.title} has been succesfully deleted`,
            data: data
          }
          res.status(200).json(deleteMessage)
        }
        else {
          let deleteMessage = {
            message: `Data isn't found`
          }
          res.status(404).json(deleteMessage)
        }
      })
      .catch(error => {
        let errorMessage = {
          error: error.message,
          fullError: error
        }
        res.status(500).json(errorMessage);
      })
  }

  static vote(req, res) {
    let user = jsonwebtoken.verify(req.headers.token);
    Question
      .findById(req.params.id)
      .then(question => {
        const index = question
          .votes
          .map(vote => vote.userId.toString() === user._id.toString() ? true : false)
          .indexOf(true)
        let voteMessage = {}
        if(index === -1){
          question.votes.push({
            userId: user._id, 
            status: req.body.status
          })
          question.save();
          voteMessage = {
            message: `Add vote`,
            data: question
          }
        }
        else if(req.body.status === question.votes[index].status){
          question.votes.splice(index, 1);
          question.save();
          voteMessage = {
            message: `Removed vote`,
            data: question
          }
        }
        else {
          question.votes
            .splice(index, 1, {
              userId: user._id, 
              status: req.body.status
            })
          question.save();
          voteMessage = {
            message: `Changed vote`,
            data: question
          }
        }
        res.status(200).json(voteMessage);
      })
      .catch(error => {
        let errorMessage = {
          error: error.message,
          fullError: error
        }
        res.status(500).json(errorMessage)
      })
  }

}

module.exports = QuestionController;