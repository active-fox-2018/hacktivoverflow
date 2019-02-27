const Answer = require('../models/answer');
const jsonwebtoken = require('../helpers/jsonwebtoken');

class AnswerController {

  static create(req, res) {
    let user = jsonwebtoken.verify(req.headers.token);
    Answer
      .create({
        title: req.body.title,
        description: req.body.description,
        userId: user._id,
        questionId: req.body.questionId,
        created_at: new Date
      })
      .then(answer => {
        let answerMessage = {
          message: `Answer in title ${answer.title} has been added`,
          data: answer
        }
        res.status(201).json(answerMessage);
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
    Answer
      .find()
      .then(answers => {
        if(answers){
          let answerMessage = {
            message: `Answer has been found with total ${answers.length}`,
            data: answers
          }
          res.status(200).json(answerMessage);
        }
        else {
          let answerMassage = {
            message: `searching process success, but data isn't found`
          }
          res.status(200).json(answerMassage);
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

  static findByQuestion(req,res) {
    Answer
      .find({
        questionId: req.params.id
      })
      .then(answers => {
        if(answers){
          let answerMessage = {
            message: `Answer has been found with total ${answers.length}`,
            data: answers
          }
          res.status(200).json(answerMessage);
        }
        else {
          let answerMassage = {
            message: `searching process success, but data isn't found`
          }
          res.status(200).json(answerMassage);
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
    Answer
      .findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        userId: user._id,
        questionId: req.body.questionId,
        created_at: new Date
      })
      .then(answer => {
        if(answer) {
          let afterUpdate = {
            _id: answer._id,
            title: req.body.title,
            description: req.body.description,
            votes: answer.votes,
            created_at: new Date,
            userId: user._id
          }
          let answerMessage = {
            message: `Answer with title ${answer.title} has been updated`,
            beforeUpdate: answer,
            afterUpdate: afterUpdate
          }
          res.status(200).json(answerMessage)
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
    Answer
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
    Answer
      .findById(req.params.id)
      .then(answer => {
        const index = answer
          .votes
          .map(vote => vote.userId.toString() === user._id.toString() ? true : false)
          .indexOf(true)
        let voteMessage = {}
        if(index === -1){
          answer.votes.push({
            userId: user._id, 
            status: req.body.status
          })
          answer.save();
          voteMessage = {
            message: `Add vote`,
            data: answer
          }
        }
        else if(req.body.status === answer.votes[index].status){
          answer.votes.splice(index, 1);
          answer.save();
          voteMessage = {
            message: `Removed vote`,
            data: answer
          }
        }
        else {
          answer.votes
            .splice(index, 1, {
              userId: user._id, 
              status: req.body.status
            })
          answer.save();
          voteMessage = {
            message: `Changed vote`,
            data: answer
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

module.exports = AnswerController;