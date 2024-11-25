# Use the official Node.js image as the base image for building
FROM node:18 as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Use a lightweight Node.js image for the production environment
FROM node:18-alpine as production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Define the entrypoint for the container
ENTRYPOINT ["node"]

# Command to start the Next.js production server
CMD ["node_modules/next/dist/bin/next", "start"]
