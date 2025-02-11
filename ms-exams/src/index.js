require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./utils/database');
const typeDefs = require('./graphql/schema/prescription.schema');
const resolvers = require('./graphql/resolvers/prescription.resolver');

// Initialize the server
const startServer = async () => {
  const app = express();

  // Connect to MongoDB
  await connectDB();

  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start Apollo Server
  await server.start();

  // Apply Apollo Server middleware to Express
  app.use(
    '/graphql',
    cors(), // Enable CORS
    bodyParser.json(), // Parse JSON requests
    expressMiddleware(server)
  );

  // Start the Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
};

startServer();