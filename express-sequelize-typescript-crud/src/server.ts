import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

// Import configurations and routes
import sequelize from './config/database';
import configViewEngine from './config/viewEngine';
import routes from './routes';

// Load environment variables
dotenv.config();

// Create Express application
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000');

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure view engine
configViewEngine(app);

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Unhandled Error:', err);
  res.status(500).render('error', {
    title: 'Server Error',
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Something went wrong!'
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).render('error', {
    title: '404 - Page Not Found',
    message: `The page ${req.originalUrl} was not found.`
  });
});

// Database connection and server startup
async function startServer(): Promise<void> {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    // Sync database models (create tables if they don't exist)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database models synchronized.');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('📖 Available routes:');
      console.log('   GET  /           - Home page');
      console.log('   GET  /crud       - Create user form');
      console.log('   POST /post-crud  - Create user');
      console.log('   GET  /users      - List all users');
      console.log('   GET  /edit-user/:id - Edit user form');
      console.log('   POST /put-crud   - Update user');
      console.log('   GET  /delete-user/:id - Delete user');
      console.log('   GET  /api/users  - API: Get users');
      console.log('   GET  /api/users/stats - API: User statistics');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  try {
    await sequelize.close();
    console.log('✅ Database connection closed.');
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
  }
  process.exit(0);
});

// Start the server
startServer();

