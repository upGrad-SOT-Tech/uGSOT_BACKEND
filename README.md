# uGSOT Backend

A Node.js backend API built with Express and MongoDB.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `config.env` to `.env`
   - Update the MongoDB URI and other configurations as needed

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The server will start on `http://localhost:5000`

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests (to be implemented)

### Project Structure

```
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # MongoDB models
├── routes/         # API routes
├── utils/          # Utility functions
├── config/         # Configuration files
├── server.js       # Main server file
└── package.json    # Dependencies and scripts
```

### API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check

### Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
