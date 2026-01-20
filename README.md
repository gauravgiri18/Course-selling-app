# Course Selling App

A comprehensive course selling platform with a strong focus on backend architecture and functionality.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

This Course Selling App is a robust backend-focused platform designed to facilitate online course sales and management. The application provides a complete solution for course creators to sell their content and for students to purchase and access courses seamlessly.

## ✨ Features

### Core Features
- 🔐 **User Authentication & Authorization**
  - Secure user registration and login for both students and admins
  - Role-based access control (Admin, Student)
  - JWT token-based authentication
  - Password hashing with bcrypt

- 📚 **Course Management**
  - Create and manage courses (Admin only)
  - Course previews for all users
  - Rich course descriptions, pricing, and images
  - Admin course bulk retrieval

- 🛒 **Shopping & Purchases**
  - Course purchase functionality
  - Purchase history tracking
  - Duplicate purchase prevention
  - User enrollment tracking

- 👥 **User Management**
  - Separate user and admin accounts
  - User profile management
  - Purchase history access

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Language:** JavaScript
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** Zod

## 🚀 Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn
- MongoDB

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/gauravgiri18/Course-selling-app.git
   cd Course-selling-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory: 
   ```env
   PORT=3000
   mongoose_url=your_mongodb_connection_string
   userSecretKey=your_user_jwt_secret_key
   adminSecretKey=your_admin_jwt_secret_key
   ```

4. **Start the application**
   ```bash
   node index.js
   ```

The server will start running on `http://localhost:3000`.

## 📖 Usage

### For Students
1. Sign up for a student account via `/api/v1/user/signup`
2. Sign in to get authentication token
3. Browse available courses via `/api/v1/course/preview`
4. Purchase courses securely
5. View purchase history

### For Admins
1. Sign up for an admin account via `/api/v1/admin/signup`
2. Sign in to get authentication token
3. Create and manage courses
4. View all created courses
5. Update course information

## 📚 API Documentation

### User Authentication Endpoints
**Base URL:** `/api/v1/user`
```
POST /signup - User registration
POST /signin - User login
GET /purchases - Get user's purchased courses (requires authentication)
```

### Admin Authentication Endpoints  
**Base URL:** `/api/v1/admin`
```
POST /signup - Admin registration  
POST /signin - Admin login
POST /course - Create new course (requires admin authentication)
PUT /course - Update existing course (requires admin authentication)
GET /course/bulk - Get all courses created by admin (requires admin authentication)
```

### Course Endpoints
**Base URL:** `/api/v1/course`
```
GET /preview - Get all available courses (public access)
POST /purchase - Purchase a course (requires user authentication)
```

### Authentication Headers
All protected routes require an `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

### Request/Response Examples

#### User Signup
```javascript
POST /api/v1/user/signup
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}

// Response
{
  "msg": "You have successfully created an account"
}
```

#### Admin Create Course
```javascript
POST /api/v1/admin/course
Content-Type: application/json
Authorization: Bearer <admin-jwt-token>

{
  "title": "JavaScript Fundamentals",
  "description": "Learn JavaScript from basics to advanced",
  "imageURL": "https://example.com/course-image.jpg",
  "price": 99
}

// Response
{
  "message": "Course Created",
  "courseId": "course_id_here"
}
```

#### Purchase Course
```javascript
POST /api/v1/course/purchase
Content-Type: application/json
Authorization: Bearer <user-jwt-token>

{
  "courseId": "course_id_here"
}

// Response
{
  "msg": "The course is successfully bought"
}
```

## 📁 Project Structure

```
Course-selling-app/
├── routes/
│   ├── user.js             # User authentication and purchase routes
│   ├── admin.js            # Admin authentication and course management
│   └── course. js           # Course preview and purchase endpoints
├── middleware/
│   ├── user. js             # User authentication middleware
│   └── admin.js            # Admin authentication middleware  
├── db. js                   # Database models and connection
├── index.js                # Main application entry point
├── package.json
└── README.md
```

## 🔧 Database Models

### User Model
```javascript
{
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String
}
```

### Admin Model  
```javascript
{
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName:  String
}
```

### Course Model
```javascript
{
  title: String,
  description:  String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId (references admin)
}
```

### Purchase Model
```javascript
{
  courseId: [ObjectId] (references course),
  userId: [ObjectId] (references user)
}
```

## 🤝 Contributing

We welcome contributions to improve the Course Selling App! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow JavaScript ES6+ standards
- Write comprehensive tests for new features
- Update documentation for any API changes
- Use meaningful commit messages


## 📞 Support

If you have any questions or need support:  

- Create an issue in this repository
- Contact:  [gauravv9958@gmail.com]

## 🚧 Roadmap

- [ ] Payment gateway integration
- [ ] Course content management (videos, documents)
- [ ] User progress tracking
- [ ] Course ratings and reviews
- [ ] Advanced search and filtering
- [ ] Email notifications
- [ ] Admin analytics dashboard

---

⭐ **If you find this project helpful, please consider giving it a star! **

---

**Built with ❤️ by [Gaurav Giri](https://github.com/gauravgiri18)**
