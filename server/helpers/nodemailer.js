
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')
const kue = require('kue')
const queue = kue.createQueue()

function procesQueue() {


}

function generateMail () {
  let questionCount = []
  let questionUpvotes = 0
  let answerCount = 0
  var mailOptions = {
  from: 'hackverflowmaria@gmail.com',
  to: '',
  subject: 'Weekly Report',
  text: ''
  }
  let email = []
  let questionsUsers = []
  let answerUsers = []
  User.find({})
  .then(users => {
    users.forEach(user => {
      email.push(user.email)
      questionsUsers.push(Question.find({
        UserId: user._id,
        createdAt: {
          $lt: new Date(),
          $gte:  new Date().setDate(new Date().getDate() - 7)
        }
      }))
      answerUsers.push(Answer.find({
        UserId: user._id,
        createdAt: {
          $lt: new Date(),
          $gte:  new Date().setDate(new Date().getDate() - 7)
        }
      }))
    })
    
  return Promise.all(questionsUsers)
  })
  .then(questions => {
    questionsUsers = questions
    return Promise.all(answerUsers)
  })
  .then(answers => {
    console.log(answers)
    for(let i = 0; i < answers.length; i++) {
      if(questionsUsers[i]) {
        questionCount = questionsUsers[i].length
        questionsUsers[i].forEach(question => {
          questionUpvotes = question.upVotes.length
        })
      }
      answerCount = answers[i].length
      if(questionCount && answerCount > 0) {
          let addtionalMessage = ''
          if(questionUpvotes) {
            addtionalMessage = `, and got ${questionUpvotes} upVotes`
          }
          mailOptions.text = `What an amazing week. this week you've been asking ${questionCount} question[s] to your friends${addtionalMessage}. Keep Going. Ask and answer more.`
        } else if (questionCount == 0 && answerCount > 0) {
          mailOptions.text =  `What an amazing week. even you haven't ask anything for this week, but you help your friend's problem. thank you. Keep Going. Ask and answer more.`
        } else if (questionCount == 0 && answerCount == 0) {
          mailOptions.text = `It seems you've been busy. it's okay. you can visit us on the weekend. Keep going Keep Going. Ask and answer more.`
        }
        mailOptions.to = email[i]
        
        // console.log(mailOptions)
        queue.create('weekly-report', mailOptions).save()
    }
    // procesQueue()
  })
  .catch(err => {
    console.log(err) 
  })
 
}

module.exports = generateMail
