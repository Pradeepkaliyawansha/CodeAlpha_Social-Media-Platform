# 🌐 SocialApp - MERN Stack Social Media Platform

A full-stack social media application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, posts, comments, likes, and a follow system.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Express.js](https://img.shields.io/badge/Express.js-Backend-blue)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933)

## ✨ Features

### 🔐 Authentication

- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes and API endpoints

### 👤 User Profiles

- Customizable user profiles
- Profile bio and information
- Followers and following lists
- View other users' profiles

### 📝 Posts & Interactions

- Create and view posts (max 500 characters)
- Like/unlike posts
- Real-time like counter
- Post timestamps

### 💬 Comments

- Add comments to posts
- View all comments on a post
- Comment timestamps
- Nested comment display

### 🔍 Search & Discovery

- Search users by name or username
- Real-time search results
- User suggestions

### 👥 Social Features

- Follow/unfollow users
- View followers and following
- Follow status indicators
- User connection management

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Package manager

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/social-media-app.git
cd social-media-app
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure `.env` file:**

```env
MONGODB_URI=mongodb://localhost:27017/social-media
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

**Start the backend server:**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4️⃣ Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Start MongoDB service
mongod

# Or if using MongoDB as a service
sudo service mongod start
```

## 📁 Project Structure

```
social-media-app/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Post.js               # Post model
│   │   └── Comment.js            # Comment model
│   ├── routes/
│   │   ├── auth.js               # Auth routes (login/register)
│   │   ├── users.js              # User routes
│   │   └── posts.js              # Post & comment routes
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx        # Navigation component
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   ├── Feed.jsx          # Main feed page
    │   │   ├── Profile.jsx       # User profile page
    │   │   └── Search.jsx        # User search page
    │   ├── services/
    │   │   └── api.js            # API service layer
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Global styles
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | ❌            |
| POST   | `/api/auth/login`    | Login user        | ❌            |
| GET    | `/api/auth/me`       | Get current user  | ✅            |

### Users

| Method | Endpoint                   | Description          | Auth Required |
| ------ | -------------------------- | -------------------- | ------------- |
| GET    | `/api/users/:id`           | Get user profile     | ✅            |
| GET    | `/api/users/search/:query` | Search users         | ✅            |
| POST   | `/api/users/:id/follow`    | Follow/unfollow user | ✅            |

### Posts

| Method | Endpoint              | Description      | Auth Required |
| ------ | --------------------- | ---------------- | ------------- |
| GET    | `/api/posts`          | Get all posts    | ✅            |
| POST   | `/api/posts`          | Create new post  | ✅            |
| POST   | `/api/posts/:id/like` | Like/unlike post | ✅            |

### Comments

| Method | Endpoint                  | Description         | Auth Required |
| ------ | ------------------------- | ------------------- | ------------- |
| GET    | `/api/posts/:id/comments` | Get post comments   | ✅            |
| POST   | `/api/posts/:id/comments` | Add comment to post | ✅            |

## 🎯 Usage Guide

### 1. Registration

1. Navigate to the registration page
2. Fill in your details:
   - Full Name
   - Username (minimum 3 characters)
   - Email
   - Password (minimum 6 characters)
3. Click "Register"
4. You'll be automatically logged in

### 2. Login

1. Enter your username and password
2. Click "Login"
3. You'll be redirected to the feed

### 3. Creating Posts

1. On the feed page, find the "What's on your mind?" text area
2. Type your post (max 500 characters)
3. Click "Post"
4. Your post will appear at the top of the feed

### 4. Interacting with Posts

- **Like**: Click the heart icon
- **Comment**: Click the comment icon, type your comment, and press Enter or click Send
- **View Comments**: Click the comment icon to expand/collapse comments

### 5. Following Users

1. Go to the Search page
2. Search for users by name or username
3. Click "Follow" on any user profile
4. Visit their profile to see their details

### 6. Profile Management

1. Click the profile icon in the navigation
2. View your followers and following
3. See your account information

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ CORS enabled
- ✅ Input validation
- ✅ XSS protection

## 🎨 UI Features

- ✅ Responsive design
- ✅ Modern gradient backgrounds
- ✅ Smooth transitions and animations
- ✅ Loading states
- ✅ Error handling with user feedback
- ✅ Toast notifications
- ✅ Mobile-friendly interface

## 🧪 Testing the Application

### Sample Test Flow:

1. **Register** three different users
2. **Login** as User 1
3. **Create** a few posts
4. **Like** some posts
5. **Add** comments to posts
6. **Search** for User 2
7. **Follow** User 2
8. **Visit** User 2's profile
9. **Logout** and login as User 2
10. **Follow back** User 1

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
sudo service mongod status

# Start MongoDB
sudo service mongod start
```

### Port Already in Use

```bash
# Backend port (5000)
lsof -ti:5000 | xargs kill -9

# Frontend port (5173)
lsof -ti:5173 | xargs kill -9
```

### Clear Browser Cache

If you're experiencing issues:

1. Clear browser cache and cookies
2. Clear localStorage: Open DevTools → Application → Local Storage → Clear

### CORS Errors

Ensure your backend `.env` file has correct settings and CORS is enabled in `server.js`

## 📦 Build for Production

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 🔮 Future Enhancements

- [ ] Image upload for posts and profiles
- [ ] Direct messaging between users
- [ ] Notifications system
- [ ] Post sharing functionality
- [ ] Hashtag support
- [ ] Dark mode
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User mentions (@username)
- [ ] Post bookmarking
- [ ] Advanced search filters
- [ ] User blocking
- [ ] Report system
- [ ] Analytics dashboard

---

Made with ❤️ using the MERN Stack
