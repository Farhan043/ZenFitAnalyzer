# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. It validates the input data, checks if the user already exists, hashes the password, creates a new user, and returns a JSON Web Token (JWT) along with the user data.

## Request Body
The request body should be a JSON object containing the following fields:

- `name` (string): The name of the user. Must be at least 4 characters long.
- `email` (string): The email of the user. Must be a valid email address.
- `password` (string): The password of the user. Must be at least 6 characters long.
- `age` (number): The age of the user.

Example:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "age": 30
}
```

## Example Request
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "age": 30
  }'
```

## Responses

### Success

- Status Code: 201 Created
- Response Body:
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "timestamp": "timestamp_here"
  }
}
```

### Error

- Status Code: 400 Bad Request
- Response Body:
```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "name must be 4 characters long",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```
 
- Status Code: 409 Conflict
- Response Body:
```json
{
  "message": "User already exist"
}
```

# User Login Endpoint

## Endpoint
`POST /users/login`

## Description
This endpoint is used to log in an existing user. It validates the input data, checks if the user exists, verifies the password, and returns a JSON Web Token (JWT) along with the user data.

## Request Body
The request body should be a JSON object containing the following fields:

- `email` (string): The email of the user. Must be a valid email address.
- `password` (string): The password of the user. Must be at least 6 characters long.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Example Request
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

## Responses

### Success

- Status Code: 200 OK
- Response Body:
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "timestamp": "timestamp_here"
  }
}
```

### Error

- Status Code: 400 Bad Request
- Response Body:
```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

- Status Code: 401 Unauthorized
- Response Body:
```json
{
  "message": "Invalid Email or Password"
}
```

# User Profile Endpoint

## Endpoint
`GET /users/profile`

## Description
This endpoint is used to get the profile of the logged-in user. It requires authentication.

## Example Request
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer jwt_token_here"
```

## Responses

### Success

- Status Code: 200 OK
- Response Body:
```json
{
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "timestamp": "timestamp_here"
  }
}
```

### Error

- Status Code: 401 Unauthorized
- Response Body:
```json
{
  "message": "Authentication failed"
}
```

# User Logout Endpoint

## Endpoint
`GET /users/logout`

## Description
This endpoint is used to log out the user. It requires authentication and will invalidate the current JWT token.

## Example Request
```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer jwt_token_here"
```

## Responses

### Success

- Status Code: 200 OK
- Response Body:
```json
{
  "message": "Logout Successfully"
}
```

### Error

- Status Code: 401 Unauthorized
- Response Body:
```json
{
  "message": "Authentication failed"
}
```
# fitAnalyzer
