FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install all dependencies (both production and development)
RUN npm install

# Install globally needed tools like Prisma
RUN npm install -g prisma

# Copy the rest of the application files
COPY . .

# Make sure Prisma generates the right client
RUN npx prisma generate --schema=./prisma/schema.prisma
EXPOSE 8082

# Start the application using the development mode
CMD ["sh", "-c", "npm run prisma:push && npm run run:dev"]