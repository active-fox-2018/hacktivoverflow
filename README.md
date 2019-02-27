# hacktivoverflow

Usage :

Make sure you have Node.js and npm installed in your computer, and then run these commands:
```
$ npm install
$ npm start
```
```
Access the API via http://localhost:3000/
```

APIs LISTS

List of User API

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /users/verify-user | GET | none | none | get single user data and verify token |
| /users/register | POST | none | none | register a user |
| /users/login | POST | none | none | user login |
| /users/add-tags | PATCH | token | tags:String | add watched tag |
| /users/remove-tags | PATCH | token | tags:String | remove watched tag |


List of Answers  API

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /answers/:answerId | GET | token | none | get a single asnwer |
| /answers/:questionId| POST | token | answer:String | create a new answer |
| /answers/upvote/:id | PATCH | token | none | upvote an answer |
| /answers/downvote/:id | PATCH | token | none | downvote an answer |

List of Questions  API

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /questions/ | GET | none | none | get all questions |
| /questions/user | GET | none | none | get authenticated users answer |
| /questions/:id | GET | none | none | get a single question |
| /questions/ | POST | token | title:String, description:String, tags:String | create a new question |
| /questions/upvote/:id | PATCH | token | none | upvote a question |
| /questions/downvote/:id | PATCH | token | none | downvote a question |
| /questions/:id | PUT | token | title:String, description:String, tags:String | update a questio |
| /questions/:id | DELETE | token | none | delete a question |



router.post('/', createQuestion, errorHandling)
router.patch('/upvote/:id', questionValidation, upvote, upvoteQuestion)
router.patch('/downvote/:id', questionValidation, downvote, downvoteQuestion)
router.put('/:id', updateQuestion)
router.delete('/:id', deleteQuestion)