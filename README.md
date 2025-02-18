# GraphQL API Role Based Access Control Boilerplate

 robust and secure GraphQL API built with TypeScript, Express, Apollo Server, and MongoDB. This API includes authentication, authorization, role-based access control, and comprehensive error handling.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User, Admin, Super Admin)
  - GraphQL directives for permission management
  - Protected routes and operations

- 🛠 **Technical Stack**
  - TypeScript for type safety
  - Express.js as the web framework
  - Apollo Server for GraphQL implementation
  - MongoDB with Mongoose for data persistence
  - JWT for token-based authentication

- 🔒 **Security Features**
  - Helmet.js for HTTP headers security
  - CORS protection
  - Password hashing with bcrypt
  - Protected GraphQL introspection
  - Environment-based security configurations

- 📝 **API Features**
  - User management (CRUD operations)
  - Role management
  - Authentication operations (login/register)
  - Scalable schema and resolver structure
  - File based GraphQL schema and resolvers

## Project Structure

- 📁 `src/`
  - 📁 `config/` - Config
    - 📄 `environment.ts` - Environment variables
    - 📄 `database.ts` - Database connection
    - 📄 `logger.ts` - Logger configuration
  - 📁 `graphql/` 
    - 📁 `schema/` - Schema
      - 📄 `user.schema.ts` - User schema
      ...Other schemas
    - 📁 `resolvers/` - Resolvers
      - 📄 `user.resolver.ts` - User resolver
      ...Other resolvers
    - 📁 `directives/` - Directives
      - 📄 `auth.directive.ts` - Authentication directive for graphql
    - 📁 `models/` - Models
      - 📄 `user.model.ts` - User model
    - 📁 `utils/` - Utils
      - 📄 `error.ts` - Error handling utility
      - 📄 `logger.ts` - Logger utility
      - 📄 `schema-loader.ts` - Schema loading utility
  - 📁 `middlewares/` - Middlewares
    - 📄 `auth.middleware.ts` - Authentication middleware
  - 📄 `app.ts` - Main application file
  - 📄 `tsconfig.json` - TypeScript configuration
      
      

## Authentication Flow

1. **Registration**: Users can register with email and password
2. **Login**: Users receive a JWT token upon successful authentication
3. **Authorization**: Protected routes require valid JWT tokens
4. **Role-Based Access**: Different operations require specific role permissions

## Role Hierarchy

1. `SUPER_ADMIN`: Highest level access
2. `ADMIN`: Administrative access
3. `USER`: Basic access level

## API Operations

### Queries
- `me`: Get current user info
- `users`: Get all users (Admin only)
- `userById`: Get specific user (Admin only)

### Mutations
- `register`: Create new user account
- `login`: Authenticate user
- `updateUser`: Update user details (Admin only)
- `deleteUser`: Remove user (Admin only)
- `updateUserRole`: Change user role (Super Admin only)

## Security Measures

- Production environment uses Helmet.js for security headers
- Development environment includes CORS support
- Password hashing using bcrypt
- JWT token verification for protected routes
- GraphQL introspection protection
- Role-based directive implementation

## Error Handling

- Centralized error handling system
- Custom AppError class for operational errors
- Winston logger for error tracking
- Structured error responses

## Environment Configuration
Required environment variables:
- `NODE_ENV`: Development or production
- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token
- `JWT_EXPIRES_IN`: Token expiration time


## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

The API uses GraphQL, and when running in development mode, you can access the GraphQL Playground at:

http://localhost:4000/graphql


Note: GraphQL introspection is protected in production and requires admin privileges.

## Register User Post Example

Method: POST
URL: http://localhost:4000/graphql
Headers: 
  Content-Type: application/json

Body (raw JSON):
```json
{
  "operationName": "register",
  "query": "mutation register($input: RegisterInput!) { register(input: $input) { token user { id email firstName lastName } } }",
  "variables": {
    "input": {
      "email": "test@example.com",
      "password": "123456",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

## Login User Post Example

Method: POST
URL: http://localhost:4000/graphql
Headers: 
  Content-Type: application/json

Body (raw JSON):
```json
{
  "operationName": "login",
  "query": "mutation login($input: LoginInput!) { login(input: $input) { token user { id email firstName lastName } } }",
  "variables": {
    "input": {
      "email": "test@example.com",
      "password": "123456"
    }
  }
}
```

