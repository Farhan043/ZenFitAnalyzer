# ZenFitAnalyzer

## Project Overview
ZenFitAnalyzer is a comprehensive health and fitness tracking application built with a React frontend and Express.js backend. The platform offers various features to help users track their health, fitness, nutrition, and wellness journey.

## Technology Stack

### Frontend
- **Framework**: React.js
- **Routing**: React Router Dom
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: Zustand
- **UI Components**: Material UI, Headless UI, React Icons
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Data Visualization**: Chart.js, React-Chartjs-2
- **Internationalization**: i18next
- **Notifications**: React Hot Toast
- **API Integration**: OpenAI, Google Generative AI

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Token), bcrypt
- **File Handling**: Multer, Cloudinary
- **Email Service**: Nodemailer
- **Real-time Communication**: Socket.io
- **AI Integration**: TensorFlow.js
- **Third-party APIs**: Spotify Web API

## Key Features

1. **User Authentication**
   - Registration and login system
   - Profile management
   - JWT-based authentication

2. **Meal Planning & Nutrition**
   - Meal tracking and logging
   - Calorie and nutrition monitoring
   - Personalized meal recommendations

3. **Workout Tracking**
   - Customized fitness routines
   - Exercise tracking
   - Progress visualization

4. **Body Progress Analysis**
   - Weight tracking
   - Body measurements
   - Progress photos
   - BMI calculation

5. **Sleep Tracking**
   - Sleep pattern monitoring
   - Sleep quality analysis
   - Sleep schedule optimization

6. **Activity Tracking**
   - GPS-based tracking for running, cycling, walking
   - Real-time location updates
   - Activity history and statistics

7. **Water Intake Monitoring**
   - Hydration tracking
   - Smart reminders

8. **Music Integration**
   - Spotify integration for workout music
   - Personalized playlists

9. **Social Features**
   - Community feed
   - Challenges and group workouts
   - Social sharing

10. **AI-Powered Features**
    - Chatbot assistance
    - Workout feedback
    - Personalized recommendations

11. **Marketplace**
    - ZenFit marketplace for fitness products
    - Shopping cart functionality

12. **Health & Wellness Content**
    - Articles on fitness, nutrition, self-care, and wellness
    - Health tips and advice

## Technical Implementation Details

### Authentication Flow
1. **Registration Process**
   - User submits registration form
   - Server validates input data
   - Password is hashed using bcrypt
   - User document is created in MongoDB
   - JWT token is generated and returned

2. **Login Process**
   - User submits login credentials
   - Server validates credentials
   - Password is verified against hashed value
   - JWT token is generated and returned
   - Token is stored in localStorage

3. **Token Verification**
   - JWT token is included in Authorization header
   - Server middleware verifies token validity
   - User ID is extracted from token payload
   - Protected routes access is granted

### Data Management
1. **MongoDB Schema Design**
   - User schema with profile information
   - Activity schema for workout tracking
   - Meal schema for nutrition tracking
   - Progress schema for body measurements
   - Sleep schema for sleep tracking

2. **Data Relationships**
   - User references in all related schemas
   - One-to-many relationship between users and activities
   - One-to-many relationship between users and meals
   - One-to-many relationship between users and progress records

3. **Real-time Data Updates**
   - Socket.io implementation for live updates
   - Event-based communication for water intake tracking
   - Real-time location updates for activity tracking

### Frontend Architecture
1. **Component Structure**
   - Reusable UI components in Components directory
   - Page components in Pages directory
   - Context providers for state management
   - Custom hooks for shared functionality

2. **State Management**
   - Zustand for global state management
   - React Context for theme and authentication
   - Local component state for UI interactions

3. **Responsive Design**
   - Mobile-first approach with Tailwind CSS
   - Custom breakpoints for different device sizes
   - Conditional rendering for optimized layouts

4. **Performance Optimizations**
   - Code splitting for optimized bundle size
   - Lazy loading for route-based components
   - Memoization for expensive calculations
   - Image optimization with responsive sizes

## Testing Procedures

### Backend Testing
1. **Unit Tests**
   - Controller functions using Jest
   - Middleware validation
   - Authentication logic
   - Data manipulation utilities

2. **Integration Tests**
   - API endpoints with supertest
   - Database operations
   - Authentication flow
   - File upload functionality

3. **Load Testing**
   - Endpoint performance under load with Artillery
   - Database query optimization
   - Socket connection handling

### Frontend Testing
1. **Unit Tests**
   - Component rendering with React Testing Library
   - Custom hooks functionality
   - Utility functions
   - State management

2. **Integration Tests**
   - User flows across multiple components
   - Form submissions and validations
   - Data fetching and display

3. **End-to-End Tests**
   - Complete user journeys with Cypress
   - Authentication flows
   - Data entry and visualization
   - Responsive behavior across devices

### Manual Testing Checklist
1. **Cross-browser Testing**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers on iOS and Android

2. **Accessibility Testing**
   - Screen reader compatibility
   - Keyboard navigation
   - Color contrast ratios
   - ARIA attributes

3. **Performance Testing**
   - Page load times
   - Time to interactive
   - First contentful paint
   - Lighthouse performance scores

## Project Structure

### Frontend Structure
```
frontend/
├── public/            # Static files
├── src/
│   ├── assets/        # Images, icons, etc.
│   ├── Components/    # Reusable UI components
│   ├── Context/       # React context providers
│   ├── Pages/         # Application pages
│   │   ├── Advices/   # Health and wellness content
│   │   ├── HomeFooter/# Main app sections
│   │   ├── Musics/    # Music integration
│   │   ├── Onboarding/# User onboarding flow
│   │   └── Register/  # Authentication pages
│   ├── App.jsx        # Main application component
│   ├── index.css      # Global styles
│   └── main.jsx       # Application entry point
```

### Backend Structure
```
Backend/
├── config/            # Configuration files
├── controllers/       # Request handlers
├── db/                # Database connection
├── middlewares/       # Express middlewares
├── Models/            # Mongoose schemas
├── routes/            # API routes
├── services/          # Business logic
├── uploads/           # File uploads
└── app.js             # Main application file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd Backend
npm install
nodemon
```

## Deployment

### Backend Deployment
1. **Prepare for Production**
   ```bash
   cd Backend
   npm install
   ```

2. **Set Environment Variables**
   - Create a `.env` file with production values
   - Ensure MongoDB connection string points to your production database

3. **Deploy to Server**
   - **Using PM2**:
     ```bash
     npm install -g pm2
     pm2 start app.js --name "zenfit-backend"
     ```
   - **Using Docker**:
     ```bash
     docker build -t zenfit-backend .
     docker run -p 4000:4000 -d zenfit-backend
     ```

### Frontend Deployment
1. **Build for Production**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy the Build Folder**
   - **Using Netlify/Vercel**:
     - Connect your GitHub repository
     - Configure build settings:
       - Build command: `npm run build`
       - Publish directory: `dist`
     - Set environment variables

   - **Using Traditional Hosting**:
     - Upload the contents of the `dist` folder to your web server

3. **Configure Environment Variables**
   - Ensure VITE_BASE_URL points to your production backend

## Troubleshooting

### Common Issues

#### Backend Issues
1. **MongoDB Connection Failed**
   - Verify MongoDB is running
   - Check connection string in `.env` file
   - Ensure network allows connection to MongoDB server

2. **JWT Authentication Errors**
   - Verify JWT_SECRET is set correctly
   - Check token expiration settings
   - Clear browser cookies and localStorage

3. **File Upload Issues**
   - Verify Cloudinary credentials
   - Check permissions on uploads directory
   - Ensure file size limits are appropriate

#### Frontend Issues
1. **API Connection Errors**
   - Verify VITE_BASE_URL is set correctly
   - Check network for CORS issues
   - Ensure backend is running and accessible

2. **Authentication Flow Problems**
   - Clear localStorage and try again
   - Check browser console for errors
   - Verify that token is being stored properly

3. **Building/Deployment Issues**
   - Run `npm clean-install` to refresh dependencies
   - Verify Node.js version compatibility
   - Check for ESLint/TypeScript errors

## Security Considerations

### Data Protection
- All user passwords are hashed using bcrypt before storage
- JWT tokens are used for authentication with appropriate expiration
- User data is stored securely in MongoDB with proper access controls
- HTTPS is enforced in production environments

### API Security
- Input validation is implemented on all API endpoints
- Rate limiting is applied to prevent abuse
- CORS is configured to restrict access to trusted domains
- Authentication middleware protects sensitive routes

### Privacy Measures
- Users have control over their data sharing preferences
- Personal health information is handled according to privacy best practices
- Third-party API integrations only receive necessary permissions

## Future Roadmap

### Upcoming Features
1. **Advanced Analytics Dashboard**
   - Comprehensive visualization of all health metrics
   - Trend analysis and predictive insights
   - Customizable reporting

2. **Enhanced Social Features**
   - Group challenges with real-time leaderboards
   - Virtual fitness events and competitions
   - Community achievement badges

3. **AI Enhancements**
   - Personalized workout plans based on user progress
   - Advanced nutrition recommendations
   - Sleep pattern optimization

4. **Extended Platform Support**
   - Mobile applications for iOS and Android
   - Wearable device integrations
   - Progressive Web App (PWA) support

5. **Enterprise Features**
   - Team management for fitness professionals
   - Corporate wellness programs
   - White-label solutions

## Version History

### v1.0.0 (Initial Release)
- Core authentication system
- Basic profile management
- Meal tracking functionality
- Simple workout tracking
- Water intake monitoring

### v1.1.0
- Added body progress tracking
- Implemented BMI calculator
- Enhanced meal tracking with nutrition data
- Improved user interface

### v1.2.0
- Added sleep tracking
- Integrated Spotify for workout music
- Implemented social feed
- Added challenges feature

### v1.3.0 (Current)
- AI-powered chatbot for assistance
- GPS activity tracking
- Enhanced analytics
- ZenFit marketplace
- Internationalization support

## Frequently Asked Questions (FAQ)

### General

#### Q: What is ZenFitAnalyzer?
A: ZenFitAnalyzer is a comprehensive health and fitness tracking application that helps users monitor various aspects of their wellness journey, including nutrition, workouts, sleep, body progress, and more.

#### Q: Is ZenFitAnalyzer free to use?
A: The application offers a free tier with basic features and a premium subscription with advanced features. Details can be found on the pricing page within the application.

#### Q: Which platforms does ZenFitAnalyzer support?
A: Currently, ZenFitAnalyzer is available as a web application, with plans to develop native mobile applications for iOS and Android in the future.

### Technical

#### Q: How is my data protected?
A: ZenFitAnalyzer implements industry-standard security measures including password hashing, JWT authentication, HTTPS encryption, and secure database storage to protect user data.

#### Q: Can I export my data from ZenFitAnalyzer?
A: Yes, users can export their data in various formats (CSV, JSON) from the profile settings page. This feature allows you to backup your information or transfer it to other platforms.

#### Q: Does ZenFitAnalyzer work offline?
A: Some features require an internet connection, but we're working on implementing offline functionality for core tracking features in future updates.

### Features

#### Q: Can I connect my fitness wearable to ZenFitAnalyzer?
A: Currently, direct integration with fitness wearables is in development. We plan to support major devices in upcoming releases.

#### Q: How does the AI-powered workout feedback work?
A: Our AI system analyzes your workout patterns, progress, and goals to provide personalized recommendations and feedback to help optimize your fitness routine.

#### Q: Can I create custom workout plans?
A: Yes, ZenFitAnalyzer allows you to create, customize, and save workout plans tailored to your specific goals and preferences.

## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

### Our Standards

Examples of behavior that contributes to a positive environment:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes
* Focusing on what is best for the community

Examples of unacceptable behavior:

* The use of sexualized language or imagery and unwelcome sexual attention or advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information without explicit permission
* Other conduct which could reasonably be considered inappropriate in a professional setting

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers. All complaints will be reviewed and investigated promptly and fairly.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned with this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.

### Scope

This Code of Conduct applies within all community spaces and also applies when an individual is representing the project or its community in public spaces.

## API Documentation

The backend provides RESTful APIs for various features:

- `/users` - User authentication and management
- `/api` - Meal tracking endpoints
- `/chatbot` - AI chatbot integration
- `/api/songs` - Music integration
- `/api/gps` - GPS tracking
- `/body-progress` - Body metrics and progress
- `/sleep` - Sleep tracking
- `/habit` - Habit tracking
- `/challenge` - Fitness challenges
- `/social` - Social features

### Detailed API Endpoints

#### User Authentication & Management

| Endpoint | Method | Description | Authentication Required |
|----------|--------|-------------|------------------------|
| `/users/register` | POST | Register a new user | No |
| `/users/login` | POST | Login an existing user | No |
| `/users/profile` | GET | Get user profile data | Yes |
| `/users/logout` | GET | Logout user | Yes |
| `/users/bmi` | GET/POST | Calculate and retrieve BMI | Yes |
| `/users/water-intake` | GET/POST | Update and retrieve water intake | Yes |
| `/users/water-intake-weekly` | GET | Get weekly water intake data | Yes |
| `/users/setTarget` | POST | Set fitness target goals | Yes |
| `/users/getTarget` | GET | Retrieve fitness target goals | Yes |
| `/users/contact` | GET/POST | Send and retrieve contact messages | Yes |
| `/users/update-profile` | PUT | Update user profile information | Yes |
| `/users/change-password` | PUT | Change user password | Yes |
| `/users/upload-photo` | POST | Upload profile photo | Yes |

#### Meal Tracking

| Endpoint | Method | Description | Authentication Required |
|----------|--------|-------------|------------------------|
| `/api/meals` | GET | Get all meals for user | Yes |
| `/api/meals` | POST | Add a new meal | Yes |
| `/api/meals/:id` | PUT | Update a meal | Yes |
| `/api/meals/:id` | DELETE | Delete a meal | Yes |

#### Body Progress

| Endpoint | Method | Description | Authentication Required |
|----------|--------|-------------|------------------------|
| `/body-progress/add` | POST | Add body progress record | Yes |
| `/body-progress/user` | GET | Get all body progress records | Yes |
| `/body-progress/stats` | GET | Get summarized progress statistics | Yes |

#### Challenge & Social Features

| Endpoint | Method | Description | Authentication Required |
|----------|--------|-------------|------------------------|
| `/challenge/create` | POST | Create a new challenge | Yes |
| `/challenge/join/:id` | POST | Join a challenge | Yes |
| `/challenge/active` | GET | Get active challenges | Yes |
| `/social/posts` | GET | Get social feed posts | Yes |
| `/social/posts` | POST | Create a new post | Yes |
| `/social/posts/:id/like` | POST | Like a post | Yes |
| `/social/posts/:id/comment` | POST | Comment on a post | Yes |

## Environment Variables

### Backend (.env)
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/zenfitanalyzer
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
OPENAI_API_KEY=your_openai_api_key
```

### Frontend (.env)
```
VITE_BASE_URL=http://localhost:4000
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/musichome
VITE_OPENAI_API_KEY=your_openai_api_key
```

## Acknowledgements

- **Open Source Libraries**
  - Thanks to all the open-source projects that made this application possible
  - Special thanks to the React, Express, MongoDB, and TensorFlow.js communities

- **APIs and Services**
  - Spotify API for music integration
  - OpenAI for AI-powered features
  - Cloudinary for image hosting and management

- **Contributors**
  - All developers who contributed to the codebase
  - UI/UX designers for their creative input
  - Beta testers who provided valuable feedback

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.

