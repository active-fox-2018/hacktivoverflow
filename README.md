# hacktivoverflow

A simple StackOverflow-like question and answer application.

Nodejs, npm, and MongoDB are required to run this application.  
Copy or rename .env-template to .env and edit it to configure the server.  

To run the server, go to server directory and enter:
```
$ npm install
$ npm start
```

To run the client, go to client/hacktivoverflow directory and enter:
```
$ npm install
$ npm run serve
```

# API References
## User Login
```
POST /api/users/login
```
### Body
name : user's full name  
email : user's email  
password : user's password  

## User registration
```
POST /api/users/register
```
### Body
email : user's registered email  
password : user's password

## Getting a list of questions
```
GET /api/questions
```

## Getting answers of a question
```
GET /api/answers/byQuestionId/:questionId
```

## The following requests require a token which can be obtained from the login request
### Headers
```
token: <token>
```

## Post a new question
```
POST /api/questions
```
### Body
title : question title  
description : description or details of the question  
tags : comma separated tags  

## Update a question
```
PUT /api/questions/:questionId
```
### Body
title : question title  
description : description or details of the question  
tags : comma separated tags  

## Delete a question
```
DELETE /api/questions/:questionId
```

## Upvote a question
```
POST /api/questions/:questionId/upvote
```

## Downvote a question
```
POST /api/questions/:questionId/downvote
```

## Post an answer for a question
```
POST /api/answers
```
### Body
questionId : id of the question  
description : description or details of the answer  

## Update an answer
```
PUT /api/answers/:answerId
```
### Body
description : description or details of the answer  

## Delete an answer
```
DELETE /api/answers/answerId
```

## Upvote an answer
```
POST /api/answers/:answerId/upvote
```

## Downvote an answer
```
POST /api/answers/:answerId/downvote
```

## Get a list of watched tags
```
GET /api/qatags
```

## Add a new watched tag
```
POST /api/qatags/:tag
```

## Remove a watched tag
```
DELETE /api/qatags/:tag
```

