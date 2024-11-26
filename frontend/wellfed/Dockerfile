# Stage 1: Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json, install dependencies
COPY package*.json ./
RUN npm install

# Copy application files and run the build script
COPY . .
ENV IS_DOCKER=true
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine
WORKDIR /app

# Copy necessary files and directories from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

# Expose application port
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]
