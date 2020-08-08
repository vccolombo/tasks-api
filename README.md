# Tasks API

This is a REST API made as part of [The Complete Node.js Developer Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/).

It allows you to create and keep track of tasks you need to complete. When you finish it, just mark it as completed.

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
```
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

Example:
```
GET /api/users/me
...
```

Response:
```
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

## How to deploy

```terminal
git clone https://github.com/vccolombo/tasks-api.git
cd tasks-api
npm install
npm start
```

The port defaults to 3000.