To access type https://jamero-api-products.vercel.app/api/v1

Product CRUD API (Node.js + Express + MongoDB)

This project is a simple REST API for managing products. It uses Node.js, Express, and MongoDB (via Mongoose).
I built this mainly for practice and for school requirements, but it’s structured cleanly enough for small projects or demos.

Features

Create new products

View all products

Get a single product by ID

Update product details

Delete a product

Versioned API (/api/v1)

Basic validation using Mongoose

Tech Stack

Node.js + Express – server and routing

MongoDB Atlas – database

Mongoose – schema + validation

dotenv – environment variables

cors – allow external access

How to Run the Project
1. Install dependencies
npm install

2. Create your .env file
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=3000

3. Start the server
node server.js


If everything works, you should see:

Connected to MongoDB Atlas
Server is running on http://localhost:3000

API Endpoints (v1)
Base URL
/api/v1

GET — Check API root
GET /api/v1

Create a product
POST /api/v1/products


Body example:

{
  "name": "Laptop",
  "description": "15-inch display",
  "price": 39999,
  "category": "Electronics",
  "stock": 20
}

Get all products
GET /api/v1/products

Get one product
GET /api/v1/products/:id

Update product
PUT /api/v1/products/:id

Delete product
DELETE /api/v1/products/:id

Notes

I made this project mainly to practice CRUD operations with Express and MongoDB.

Error handling and validation are included so invalid data won’t be saved.

Everything is organized under /api/v1 so I can easily add /v2 later if needed.
