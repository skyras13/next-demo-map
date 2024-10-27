# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set Node environment to development
ENV NODE_ENV=development

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app in development mode
CMD ["npm", "run", "dev"]