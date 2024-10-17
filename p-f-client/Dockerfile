FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the Next.js development server port
EXPOSE 3000

# Command to run Next.js in development mode
CMD ["npm", "run", "dev"]