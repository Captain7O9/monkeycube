# Stage 1: Build the application
FROM node:23-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .
RUN mv .env.example .env # Prevent fail at build time

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:23-alpine AS runner
WORKDIR /app

# Copy necessary files from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/package.json ./

# Expose application port
EXPOSE 3000

# Run the application
CMD ["node", "build"]
