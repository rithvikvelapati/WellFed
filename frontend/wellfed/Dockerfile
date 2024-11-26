# Stage 1: Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json, install dependencies
COPY package*.json ./
RUN npm install

# Copy application files and run the build script
COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine
WORKDIR /app

# Copy necessary files and directories from the build stage
COPY --from=build /app/* .

# Expose application port
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "dev"]
