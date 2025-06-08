# Use official Node.js image for local API+static serving
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json first for dependency installation
COPY packages/flashcard-app/fcapp/package.json ./

# Install production dependencies
RUN npm install --production || true

# Copy application files
COPY packages/flashcard-app/fcapp/ .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
