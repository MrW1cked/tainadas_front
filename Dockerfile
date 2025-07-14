# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . ./

# Expose port 9079
EXPOSE 9079

# Start the Node.js server
CMD ["node", "index.js"]

