# Stage 1: Build the React application
FROM node:22-alpine3.19 AS builder

# Set the working directory in the container
WORKDIR /health-connect

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the built application using an official Nginx image
FROM nginx:1.24-alpine

# Copy the build output to the Nginx HTML directory from the previous stage
COPY --from=builder /health-connect/dist /usr/share/nginx/html

# Expose port 5173
EXPOSE 5173

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]