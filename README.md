# HacktivOverflow

**Users Endpoint**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|----------|---------| ---------| --------- | -- | -- |
| POST | /register |  | name (string), email (string),  password (string) | Create user | return User Object | return error
| POST | /login |  | email (string), password (string) | Login user | return Token | return error
| POST | /verifyToken |  | token (jwt) | verify jwt token | return User | return error
| PUT | /users | Token | tags(array) | update users watched tags | return user watched tags | return error

**Questions Endpoints**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|---------|---------|------|------------| -- | -- |
| GET | /questions |  |  | Get All questions | return All questions | return error
| GET | /questions/:questionId |  |  | Get One questions | return One questions | return error
| POST | /questions/ | Token  | title(string), description(string), tags(array) | Create question | return question Object | return error
| PUT | /questions/vote/:questionId | Token | status('upvote'/'downvote') | Update question votes | return question votes Array | return error
| PUT | /questions/:questionId | Token | title(string), description(string), tags(array) | Update questions | return Updated questions Object | return error
| DELETE | /questions/:questionId| Token | | Delete questions | return Deleted question | return error

**Answers Endpoints**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|----------|---------|------|------------| -- | -- |
| GET | /answers/:answerId |  |  | Get One answers | return One answers | return error
| POST | /answers/:questionId | Token | title(string), description(string) | Create answers | return answers Object | return error
| PUT | /answers/vote/:answerId | Token | status('upvote'/'downvote') | Update answer vote | return answer votes Array | return error
| PUT | /answers/:answerId | Token | title(string), description(string) | Update answers | return Updated answers Object | return error
| DELETE | /answers/:answerId| Token | | Delete answers | return Deleted answer | return error

**Tags Endpoints**

| METHOD | ENDPOINT | HEADERS | BODY | DESCRIPTION | SUCCESS | ERROR
|--------|----------|---------|------|------------| -- | -- |
| GET | /tags |  |  | Get All tags | return All tags | return error
| POST | /tags |  | text(string) | Create tags | return tags Object | return error

### Usage


Make new file `.env` With Template:

```
JWT=
MY_EMAIL=
MY_EMAIL_PASS=
```

Run these commands:

 ```
 $ service mongod start
 $ npm install
 $ npm run dev
 ```