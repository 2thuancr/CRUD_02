#!/bin/bash

echo "🚀 Setting up Express Sequelize TypeScript CRUD Application..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=crud_db
DB_USER=root
DB_PASSWORD=123456
DB_DIALECT=mysql
EOL
    echo "✅ .env file created successfully!"
    echo "📝 Please update the database credentials in .env file if needed."
else
    echo "ℹ️  .env file already exists."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create database (MySQL must be running)
echo "🗄️  Setting up database..."
mysql -u root -p123456 -e "CREATE DATABASE IF NOT EXISTS crud_db;" 2>/dev/null || {
    echo "⚠️  Could not create database automatically."
    echo "📝 Please create the database manually:"
    echo "   mysql -u root -p"
    echo "   CREATE DATABASE crud_db;"
}

# Run migrations
echo "🔄 Running database migrations..."
npm run db:migrate

# Run seeders (optional)
read -p "🌱 Do you want to seed the database with sample data? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npm run db:seed
    echo "✅ Database seeded successfully!"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📖 To start the application:"
echo "   Development mode: npm run dev"
echo "   Production mode:  npm run build && npm start"
echo ""
echo "🌐 The application will be available at: http://localhost:3000"
echo ""
echo "📚 Available routes:"
echo "   GET  /           - Home page"
echo "   GET  /users      - View all users"
echo "   GET  /crud       - Create new user"
echo "   GET  /api/users  - API: Get users (JSON)"
echo ""

