// const User = require('../models/user')
// const Question = require('../models/question')
// const Answer = require('../models/answer')
// const kue = require('kue')
// const queue = kue.createQueue()

// function WeeklyReport (req, res, next) {
//   // next()
//   console.log(mailOptions, '======')
//   let questionCount = []
//   let questionUpvotes = 0
//   let answerCount = 0
//   var mailOptions = {
//   from: 'hackverflowmaria@gmail.com',
//   to: '',
//   subject: 'Weekly Report',
//   text: ''
//   }

//    // transporter.sendMail(mailOptions, function(error, info){
//   //   if (error) {
//   //     console.log(error);
//   //   } else {
//   //     console.log('Email sent: ' + info.response);
//   //   }
//   // })

//   //setiap minggu kirim email 
//   User.find({})
//   .then(users => {
//     users.forEach(user => {
//       mailOptions.to = user.email
//       Question.find({
//         UserId: user._id
//       })
//       .then(questions => {
//         if(questions) {
//           questionCount = questions.length
//           questions.forEach(question => {
//             questionUpvotes = question.upVotes.length
//           })
//         }
//         return Answer.find({
//           UserId: user._id,
//           createdAt: {
//             $lt: new Date(),
//             $gte:  new Date().setDate(new Date().getDate() - 7)
//           }
//         })
//       })
//       .then(answers => {
//       answerCount = answers.length
//       if(questionCount && answerCount > 0) {
//         let addtionalMessage = ''
//         if(questionUpvotes) {
//           addtionalMessage = `, and got ${questionUpvotes} upVotes`
//         }
//         mailOptions.text = `What an amazing week. this week you've been asking ${questionCount} question[s] to your friends${addtionalMessage}. Keep Going. Ask and answer more.`
//       } else if (questionCount == 0 && answerCount > 0) {
//         mailOptions.text =  `What an amazing week. even you haven't ask anything for this week, but you help your friend's problem. thank you. Keep Going. Ask and answer more.`
//       } else if (questionCount == 0 && answerCount == 0) {
//         mailOptions.text = `It seems you've been busy. it's okay. you can visit us on the weekend. Keep going Keep Going. Ask and answer more.`
//       }
//       // queue.create('Email-weekly-report', mailOptions).save()
//       next()
//       })
//       .catch(err => {
//         console.log(err)
//       })
//     })
//   })
//   .catch(err => {
//     console.log(err) 
//   })

// }

// module.exports = WeeklyReport