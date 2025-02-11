# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Stage 2: Run the application
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Command to run the application
CMD ["npm", "run",'dev']