# Stage 1: Build Stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "build"]

# Stage 2: Production Stage
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "run", "dev"]