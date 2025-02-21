Sport Bicycle Store
Sport Bicycle Store is a web application for buying bicycles. The system includes administrators (who can manage products) and users (who can browse and order bicycles).

Features
Authentication & Authorization (registration, login, JWT tokens)
User roles (regular users and admins)
CRUD operations for bicycles (only admins can add, edit, and delete)
Order processing (stock decreases when a purchase is made)
Order tracking (users see their own orders, admins see all orders)
Order status updates (only admins can change order status)

Getting Started
1. Install dependencies
   npm install
2. Configure .env
   Create a .env file in the root directory and add:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
3. Start the server
    node server.js


API Routes
Authentication
POST	/api/auth/register	Register a new user	Public
POST	/api/auth/login	 Login	Public

Bicycles
GET	/api/bicycles	Get all bicycles	Public
GET	/api/bicycles/:id	Get a specific bicycle	Public
POST	/api/bicycles	Add a new bicycle	Admin
PUT	/api/bicycles/:id	Update a bicycle	Admin
DELETE	/api/bicycles/:id	Delete a bicycle	Admin

Orders
POST	/api/orders	Create an order	User
GET	/api/orders/my-orders	Get user orders	User
GET	/api/orders	Get all orders	Admin
PUT	/api/orders/:id	Update order status	Admin

Technologies Used
Node.js & Express — Backend
MongoDB & Mongoose — Database
JWT (JSON Web Token) — Authentication
bcrypt.js — Password hashing

Future Improvements
Add payment integration
Implement search and filtering for bicycles
Enhance review and rating system