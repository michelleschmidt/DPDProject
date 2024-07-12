# Use a Node.js base image
FROM node:22-alpine3.19

# Set the working directory
WORKDIR /health-connect

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose port 80
EXPOSE 80

# Start the server
CMD ["node", "frontend-server.js"]
