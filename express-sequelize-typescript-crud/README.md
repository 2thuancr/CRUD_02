# Express Sequelize TypeScript CRUD

A full-featured CRUD (Create, Read, Update, Delete) application built with Express.js, Sequelize ORM, and TypeScript.

## 🚀 Features

- **TypeScript**: Strongly typed JavaScript for better development experience
- **Express.js**: Fast and minimalist web framework
- **Sequelize ORM**: Database abstraction with MySQL support
- **EJS Templates**: Server-side rendering with responsive Bootstrap UI
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Search & Pagination**: Advanced user management with search and pagination
- **API Endpoints**: REST API endpoints for integration
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback
- **Modern UI**: Bootstrap 5 with Font Awesome icons

## 📦 Technologies

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MySQL with Sequelize ORM
- **Template Engine**: EJS
- **Frontend**: Bootstrap 5, Font Awesome
- **Development**: Nodemon, ts-node

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd express-sequelize-typescript-crud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   NODE_ENV=development
   
   # Database Configuration
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=crud_db
   DB_USER=root
   DB_PASSWORD=123456
   DB_DIALECT=mysql
   ```

4. **Set up MySQL Database**
   - Create a MySQL database named `crud_db`
   - Update database credentials in `.env` file

5. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

6. **Seed the database (optional)**
   ```bash
   npm run db:seed
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## 📱 Usage

### Web Interface

- **Home Page**: `GET /` - Welcome page with navigation
- **Create User**: `GET /crud` - Form to create new users
- **View Users**: `GET /users` - List all users with search and pagination
- **Edit User**: `GET /edit-user/:id` - Form to edit existing users
- **Delete User**: `GET /delete-user/:id` - Delete user with confirmation

### API Endpoints

- **Get Users**: `GET /api/users` - JSON response with pagination
- **User Statistics**: `GET /api/users/stats` - User count statistics

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  address TEXT,
  gender BOOLEAN NOT NULL DEFAULT 1 COMMENT 'true = male, false = female',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 📁 Project Structure

```
express-sequelize-typescript-crud/
├── src/
│   ├── config/
│   │   ├── database.ts          # Database configuration
│   │   └── viewEngine.ts        # EJS view engine setup
│   ├── controllers/
│   │   └── UserController.ts    # Request handlers
│   ├── models/
│   │   └── User.ts             # Sequelize User model
│   ├── routes/
│   │   ├── api.ts              # API routes
│   │   ├── web.ts              # Web routes
│   │   └── index.ts            # Route aggregator
│   ├── services/
│   │   └── UserService.ts      # Business logic
│   ├── types/
│   │   ├── User.ts             # User type definitions
│   │   ├── ApiResponse.ts      # API response types
│   │   └── index.ts            # Type exports
│   ├── views/                   # EJS templates
│   │   ├── users/
│   │   │   ├── findAllUser.ejs # User list page
│   │   │   └── updateUser.ejs  # Edit user page
│   │   ├── crud.ejs            # Create user page
│   │   ├── index.ejs           # Home page
│   │   └── error.ejs           # Error page
│   └── server.ts               # Main application entry
├── config/
│   └── config.json             # Sequelize CLI configuration
├── migrations/                  # Database migrations
├── seeders/                     # Database seeders
├── dist/                       # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Run database seeders

## 🎨 Features Details

### User Management
- Create users with form validation
- View all users in a responsive table
- Search users by name, email, or address
- Pagination support (5, 10, 25, 50 users per page)
- Edit user information
- Delete users with confirmation

### User Interface
- Responsive Bootstrap 5 design
- Font Awesome icons
- Success/error message alerts
- Breadcrumb navigation
- Modern card-based layout

### API Integration
- RESTful API endpoints
- JSON responses
- User statistics API
- Error handling with proper HTTP status codes

## 🔒 Validation

### Client-side Validation
- HTML5 form validation
- Required field indicators
- Email format validation

### Server-side Validation
- Sequelize model validation
- Unique email constraint
- Input sanitization
- Error message display

## 🚨 Error Handling

- Global error handler middleware
- Database connection error handling
- 404 page for unknown routes
- User-friendly error messages
- Development vs production error display

## 📈 Statistics

The application includes user statistics features:
- Total user count
- Male/female user distribution
- Real-time statistics via API calls

## 🔄 Database Operations

All database operations are handled through the UserService class:
- `createUser()` - Create new user
- `getAllUsers()` - Get users with pagination and search
- `getUserById()` - Get single user
- `updateUser()` - Update user information
- `deleteUser()` - Delete user
- `isEmailExists()` - Check email uniqueness
- `getUserStats()` - Get user statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is open source and available under the [ISC License](LICENSE).

## 👨‍💻 Author

Created as a learning project for Express.js, TypeScript, and Sequelize integration.

