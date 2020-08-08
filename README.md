# Tasks API

This is a REST API made as part of [The Complete Node.js Developer Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/). 

It allows you to create and keep track of the tasks you need to complete. When you finish it, just mark it as completed.

## How I made it

I decided to go beyond what the course teaches and implement it using MVC, better routes, and implementing another resource not used in the videos, 'Boards', to organize your tasks. 

In this project I learned:
- What a REST API is (and what differentiates it from a non-RESTful) and how to implement it. 
- What is JWT and why it is useful to authorization (also its pros and cons). 
- How to set proper authentication and authorization (even tough the JWT implementation is not using 100% of its potential, as I am not implementing refresh tokens or OAuth2 right now).
- Better MVC practices
- How to use [Postman](https://www.postman.com/)
- A LOT about MongoDB and Mongoose (Part of the code in this project is not the best possible regarding NoSQL, but I know how to fix it for future projects which is awesome).

<br>
<hr>
<br>

## API Docs

### Signup

- **Path**: POST /auth/signup
- **Body**:
    - Name (User full name): String | Required
    - Email: String | Valid email | Required
    - Password: String | Minimum 8 characters | Required

Example:
```
POST /auth/signup
...

{"name": "Victor Colombo", "email": "victor@example.com", "password": "password123"}
```

### Login

- **Path**: POST /auth/login
- **Body**:
    - Email: String | Valid email | Required
    - Password: String | Minimum 8 characters | Required

Example:
```
POST /auth/login
...

{"email": "victor@example.com", "password": "password123"}
```

### Logout

- **Path**: POST /auth/logout
- **Body**: _empty_

Example:
```
POST /auth/logout
...
```

### Get own profile

- **Path**: GET /api/users/me

Example:
```
GET /api/users/me
...
```

Response:
```json
{
    "_id": "5f2ec8a68a598a60026ac31d",
    "name": "Victor Colombo",
    "email": "victor@example.com",
    "createdAt": "2020-08-08T15:45:42.371Z",
    "updatedAt": "2020-08-08T16:45:58.837Z",
    "__v": 0
},
{
    "boards": [
        # your boards
    ]
}
```

### Update own profile

- **Path**: PATCH /api/users/me
- **Body**:
    - Name (User full name): String | Required
    - Email: String | Valid email | Required
    - Password: String | Minimum 8 characters | Required

Example:
```
PATCH /api/users/me
...

{"name":"Changed name", "email":"changed@example.com", "password":"changedpass"}
```

### Create board

- **Path**: POST /api/boards/

Example:
```
POST /api/boards/
...

{"name": "my example board"}
```

### Get board

- **Path**: GET /api/boards/:boardId
- **Body**: 
    - name: String | Required 

Example:
```
GET /api/boards/5f2ee456491b68b57fa23ed5
...
```

Response:
```json
{
    "_id": "5f2ee456491b68b57fa23ed5",
    "name": "My example board",
    "owner": "5f2ec8a68a598a60026ac31d",
    "createdAt": "2020-08-08T17:43:50.960Z",
    "updatedAt": "2020-08-08T17:43:50.960Z",
    "__v": 0
}
```

### Update board

- **Path**: PATCH /api/boards/:boardId
- **Body**: 
    - name (new name of the board): String | Required 

Example:
```
PATCH /api/boards/5f2ee456491b68b57fa23ed5
...

{"name": "changed name"}
```

Response:
```json
{
    "_id": "5f2ee456491b68b57fa23ed5",
    "name": "changed name",
    "owner": "5f2ec8a68a598a60026ac31d",
    "createdAt": "2020-08-08T17:43:50.960Z",
    "updatedAt": "2020-08-08T18:12:46.661Z",
    "__v": 0
}
```

### Delete board

- **Path**: DELETE /api/boards/:boardId

Example:
```
DELETE /api/boards/5f2ee456491b68b57fa23ed5
...
```

### Create Task

- **Path**: POST /api/boards/:boardId/tasks
- **Body**: 
    - title: String | Required 
    - description: String
    - Completed: Boolean (true/false) | default: false

Example:
```
POST /api/boards/5f2ee456491b68b57fa23ed5/tasks
...

{"title": "TODO", "description": "Do something", "completed": true}
```

Response:
```json
{
    "_id": "5f2ee456491b68b57fa23ed5",
    "name": "My example board",
    "owner": "5f2ec8a68a598a60026ac31d",
    "createdAt": "2020-08-08T17:43:50.960Z",
    "updatedAt": "2020-08-08T17:43:50.960Z",
    "__v": 0
}
```

### Read tasks from board

- **Path**: GET /api/boards/:boardId/tasks
- **Parameters**:
    - completed? show only completed (or not) tasks: true/false | default: all
    - count? limit the number of tasks in response: int | default: all
    - start? skip the first N tasks in the response: int | default: 0
    - sortby? specify sorting: createdAt/updatedAt:asc/desc (desc is most recent) : (default: show all, incompleted first)

Example:
```
GET /api/boards/5f2ee456491b68b57fa23ed5/tasks?sortby=createdAt:desc&completed=false
...
```

Response:
```json
[
    {
        "description": "Do something",
        "completed": false,
        "_id": "5f2eedaefb9f95bbcb39d181",
        "title": "2",
        "board": "5f2ee456491b68b57fa23ed5",
        "createdAt": "2020-08-08T18:23:42.543Z",
        "updatedAt": "2020-08-08T18:23:42.543Z",
        "__v": 0
    },
    {
        "description": "Do something",
        "completed": false,
        "_id": "5f2eedacfb9f95bbcb39d180",
        "title": "1",
        "board": "5f2ee456491b68b57fa23ed5",
        "createdAt": "2020-08-08T18:23:40.210Z",
        "updatedAt": "2020-08-08T18:23:40.210Z",
        "__v": 0
    },
    {
        "description": "Do something",
        "completed": false,
        "_id": "5f2eed5ffb9f95bbcb39d17e",
        "title": "4",
        "board": "5f2ee456491b68b57fa23ed5",
        "createdAt": "2020-08-08T18:22:23.338Z",
        "updatedAt": "2020-08-08T18:22:23.338Z",
        "__v": 0
    }
]
```

### Update Task

- **Path**: PATCH /api/boards/:boardId/tasks/:taskId
- **Body**: 
    - title: String | Required 
    - description: String
    - Completed: Boolean (true/false)

Example:
```
PATCH /api/boards/5f2ee456491b68b57fa23ed5/tasks/5f2eedaefb9f95bbcb39d181
...

{"title": "changed", "description": "changed", "completed": true}
```

Response:
```json
{
    "description": "changed",
    "completed": true,
    "_id": "5f2eedaefb9f95bbcb39d181",
    "title": "changed",
    "board": "5f2ee456491b68b57fa23ed5",
    "createdAt": "2020-08-08T18:23:42.543Z",
    "updatedAt": "2020-08-08T18:34:40.931Z",
    "__v": 0
}
```

### Delete Task

- **Path**: DELETE /api/boards/:boardId/tasks/:taskId

Example:
```
DELETE /api/boards/5f2ee456491b68b57fa23ed5/tasks/5f2eedaefb9f95bbcb39d181
...
```

### Upload user avatar

- **Path**: POST /api/users/me/avatar
- **Body**: **form-data**:
    - image: jpg or png image

### Get user avatar

- **Path**: GET /api/users/:userId/avatar

Example:
```
GET /api/users/5f2ec8a68a598a60026ac31d/avatar
```

Response:

_A `content-type:image/jpeg` response with the user image_

### Delete user avatar

- **Path**: DELETE /api/users/me/avatar

Example:
```
DELETE /api/users/me/avatar
```

<br>
<hr>
<br>

## How to deploy

```terminal
git clone https://github.com/vccolombo/tasks-api.git
cd tasks-api
npm install
npm start
```

The port defaults to 3000.