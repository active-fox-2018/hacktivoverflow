<h1> ActiveOverflow </h1>
<br>

**LIST OF USER ROUTES:**

Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/users|GET|token|none|Get one user data|
|/users|POST|none|name: String, email: String **(REQUIRED)**, password: String **(REQUIRED)**, birthday: Date|Create new user (manual) & generate jwt |
|/users/login|POST|none|email:String **(REQUIRED)**, password:String **(REQUIRED)**|generate jwt |
|/users|PUT|token|tag: Array|Update user data (tag)|

<br>
<br>

**LIST OF Questions ROUTES:**

Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/questions|GET|none|none| get all questions|
|/questions/:id|GET|none|none| get one questions|
|/questions|POST|token|title: String **(REQUIRED)**, description: String **(REQUIRED)**, tags: Array | Create new Question|
|/questions/:id|PUT|token|title: String **(REQUIRED)**, description: String **(REQUIRED)**, tags: Array | Update a Question|
|/questions/:id/up|PUT|token| none | Upvote a Question|
|/questions/:id/down|PUT|token| none | Downvote a Question|
|/questions/:id|DELETE|token|none|Delete a questions|

<br>
<br>

**LIST OF Answers ROUTES:**

Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/answers/:id(question id)|GET|none|none| get all answers from one question|
|/answers/:id(question id)|POST|token|title: String **(REQUIRED)**, description: String **(REQUIRED)**| Create new Answer|
|/answers/:id(answer id)/one|GET|token|none| get one answer|
|/answers/:id|PUT|token|title: String **(REQUIRED)**, description: String **(REQUIRED)**| Update a Answer|
|/answers/:id/up|PUT|token| none | Upvote an Answer|
|/answers/:id/down|PUT|token| none | Downvote an Answer|
|/answers/:id|DELETE|token|none|Delete a answers|

<br>

**Usage:**

Make sure you have Node.js, Redis and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```
And don't forget to fill the .env file 

link server: http://35.187.255.234/

link deploy: http://activeoverflow.veneciac.xyz/