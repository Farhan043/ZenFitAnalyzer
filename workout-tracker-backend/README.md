# Workout Tracker Backend

## Overview
The Workout Tracker Backend is a RESTful API designed to manage user-related operations for a workout tracking application. It allows users to register, log in, update their profiles, manage their water intake and sleep data, set alarms, and track their fitness targets.

## Features
- User registration and login
- Profile management (update user details)
- Password change functionality
- Water intake tracking
- Sleep data management
- Alarm settings
- Target management for water intake and steps
- Contact message handling

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication
- Express Validator for input validation
- dotenv for environment variable management

## Project Structure
```
workout-tracker-backend
├── controllers
│   └── user.controller.js
├── models
│   └── user.model.js
├── routes
│   └── users.js
├── middlewares
│   └── auth.middleware.js
├── config
│   └── db.config.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd workout-tracker-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Start the server:
   ```
   npm start
   ```

## Usage
- Use tools like Postman or Insomnia to interact with the API endpoints.
- The API supports various routes for user operations, including:
  - `POST /register` - Register a new user
  - `POST /login` - Log in an existing user
  - `GET /profile` - Retrieve user profile
  - `PUT /update-profile` - Update user profile
  - `POST /water-intake` - Update water intake
  - `GET /water-intake` - Get daily water intake
  - `POST /sleep-data` - Update sleep data
  - `GET /sleep-data` - Get sleep data
  - `POST /alarm` - Set alarm and bedtime
  - `GET /alarm` - Get alarm settings
  - `POST /setTarget` - Set daily targets
  - `GET /getTarget` - Get today's target data

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

## License
This project is licensed under the MIT License.