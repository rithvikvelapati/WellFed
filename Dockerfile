# Use the official Node.js image as the base image
FROM node:18
# Set the working directory inside the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install npm dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 3000
# Define the command to run the app
CMD ["npm", "start", "dev"]