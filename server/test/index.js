const chai = require('chai'),
  chaiHttp = require('chai-http'),
  {
    expect
  } = chai,
  app = require('../app'),
  User = require('../models/user'),
  Question = require('../models/question'),
  Answer = require('../models/answer')

chai.use(chaiHttp)

let token1 = ''
let questionId = ''
let answerId = ''

before(function (done) {
  User.deleteMany({})
    .then(function () {
      return Question.deleteMany({})
    })
    .then(function() {
      return Answer.deleteMany({})
    })
    .then(function() {

    })
  done()
})

it('should register new user', function(done) {
  const user = {
    name : 'ulfa',
    email : 'mariaulfa33@hotmail.com',
    password : 'mariaulfa'
  }
  chai
    .request(app)
    .post('/register')
    .send(user)
    .end(function(err, res){
      expect(err).to.be.null
      expect(res).to.have.status(201)
      expect(res).to.be.json
      expect(res.body).to.have.nested.property('user')
        .that.includes.all.keys(['_id', 'email', 'password'])
      done()
    })
})

it('should login', function(done) {
  const user = {
    email : 'mariaulfa33@hotmail.com',
    password : 'mariaulfa'
  }
  chai
    .request(app)
    .post('/login')
    .send(user)
    .end(function(err, res){
      token1 = res.body.token
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      done()
    })
})

it('should post a question', function(done) {
  const question = {
    title: 'Who?',
    description: 'Who Am I',
    Tags: ['self']
  }
  chai
  .request(app)
  .post('/questions')
  .set('token', token1)
  .send(question)
  .end(function(err, res){
    questionId = res.body.question._id
    expect(err).to.be.null
    expect(res).to.have.status(201)
    expect(res).to.be.json
    done()
  })
})

it('should upVote a question', function(done) {
  chai
  .request(app)
  .patch(`/questions/${questionId}/upVotes`)
  .set('token', token1)
  .end(function(err, res){
    console.log(res.body)
    expect(err).to.be.null
    expect(res).to.have.status(200)
    expect(res).to.be.json
    done()
  })
})

it('should downVotes a question', function(done) {
  chai
  .request(app)
  .patch(`/questions/${questionId}/downVotes`)
  .set('token', token1)
  .end(function(err, res){
    console.log(res.body)
    expect(err).to.be.null
    expect(res).to.have.status(200)
    expect(res).to.be.json
    done()
  })
})

it('should fail downVotes a question that already get downVotes', function(done) {
  chai
  .request(app)
  .patch(`/questions/${questionId}/downVotes`)
  .set('token', token1)
  .end(function(err, res){
    expect(err).to.be.null
    expect(res).to.have.status(400)
    expect(res).to.be.json
    done()
  })
})

it('should answer some question', function(done) {
  const answer = {
    title: 'answer',
    description: 'I don\'n know',
    questionId: questionId
  }
  chai
  .request(app)
  .post(`/answers`)
  .send(answer)
  .set('token', token1)
  .end(function(err, res){
    answerId = res.body.question.AnswerId[0]._id
    expect(err).to.be.null
    expect(res).to.have.status(201)
    expect(res).to.be.json
    done()
  })
})


it('should upVotes some question', function(done) {
  console.log(answerId)
  chai
  .request(app)
  .patch(`/answers/${answerId}/upVotes`)
  .set('token', token1)
  .end(function(err, res){
    console.log(res.body)
    expect(err).to.be.null
    expect(res).to.have.status(200)
    expect(res).to.be.json
    done()
  })
})


