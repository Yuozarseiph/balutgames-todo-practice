# BalootGames Todo Application

A full-stack todo application built with React and Node.js, featuring user authentication and real-time todo management.

## Features

- User authentication (login/register)
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Pagination for todo lists
- JWT-based authentication
- Responsive design

## Tech Stack

### Frontend

- React
- React Router for navigation
- Axios for API requests
- Context API for state management
- Vite as build tool

### Backend

- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd front-todo-baloot
npm install
```

3. Set up environment variables:
   Create `.env` file in root directory:

```
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SALT_ROUNDS=10
```

Create `.env` file in `front-todo-baloot` directory:

```
VITE_API_BASE=http://localhost:4000
```

4. Start the servers:

```bash
# Start backend (from root directory)
npm run dev

# Start frontend (from front-todo-baloot directory)
npm run dev
```

## API Endpoints

### Auth Routes

- POST /api/auth/signup - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/test-jwt - Test JWT authentication

### Todo Routes

- GET /api/todos - List todos (paginated)
- POST /api/todos - Create new todo
- PATCH /api/todos/:id - Update todo
- DELETE /api/todos/:id - Delete todo

## Project Structure

```
├── src/                # Backend source code
│   ├── config/        # Database configuration
│   ├── controllers/   # Route controllers
│   ├── middlewares/   # Custom middlewares
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── app.js         # Express app setup
│   └── server.js      # Server entry point
│
└── front-todo-baloot/ # Frontend source code
    ├── src/
    │   ├── api/       # API integration
    │   ├── components/# React components
    │   ├── context/   # React context
    │   ├── pages/     # Page components
    │   └── App.jsx    # Root component
    └── index.html     # HTML entry point
```

## License

MIT

## Author

[Your Name] - BalootGames Practice Project
