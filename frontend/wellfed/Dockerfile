# Use the official Node.js image as the base image
FROM node:18 as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Use a lightweight production image to serve the app
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the build files and dependencies from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]
