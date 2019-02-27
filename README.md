# hacktivoverflow

Route | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/users/login|POST||email:String(**Required**)<br>password:String(**Required**)|error:<br>Wrong username/password<br>success:<br>login success|login to the website
/users/register|POST||name:String(**Required**)<br>email:String(**Required**)<br>password:String(**Required**)|error:<br>email have been registered<br>success:<br>register success|register to the web
/questions|POST|token:String(**Required**)|title:String(**Required**)<br>description:String(**Required**)|error:<br>haven't login or doesn't input all requirement<br>success:<br>success post questions|ask questions
/questions/findById/:id | GET | questionId:String(**Required**) | | error: <br> data isn't found <br> success: <br> get single question | get single question by id
/questions|GET|||error:<br>internal server error<br>success:<br>show the list|view all questions
/questions/vote/:id | PUT | token:String(**Required**) questionId:String(**Required**) | status: <br> Number(-1 downvote or 1 upvote) | error: <br> Internal Server Error <br> success: <br> Upvote or Downvote the question | voting question
/questions/:id|PUT|token:String(**Required**) | title:String(**Required**) <br> description:String(**Required**)|error:<br>not authorized to edit questions<br>success:<br>edit questions|edit your questions
/questions/:id|DELETE|token:String(**Required**) <br>||error:<br>not authorized to remove questions<br>success:<br>remove questions success|remove your questions
/answers | GET | | | error:<br> <br> success:<br> successfully read data | get answers from server
/question/:id | GET | headers: questionId | | error: <br> question doesn't found <br> success: get questions | get all answers from single question
/answers | POST | token:String(**Required**) | title:String(**Required**) <br> description:String(**Required**) <br> questionId:String(**Required**) | error: <br> must login first <br> success: <br> add answers to question | Add answers to question
/answers/vote/:id | PUT | token:String(**Required**) answerId:String(**Required**) | status: <br> Number(-1 downvote or 1 upvote) | error: <br> Internal Server Error <br> success: <br> Upvote or Downvote the answer | voting answer
/answers/:id | PUT | token:String(**Required**) answerId:String(**Required**) | title:String(**Required**) <br> description:String(**Required**) | error: <br> must authenticate and authorized <br> success: update asnwers | edit answers
/answers/:id | DELETE | token:String(**Required**) answerId:String(**Required**) | | error: <br> can't delete other user answers <br> success: <br> successfully delete answers | delete answers

### Usage
command |
------- |
$ npm install |
$ npm run start server |
$ npm run serve client |

Access the Server via http://localhost:3000/
<br>
Access the Client via http://localhost:8080/