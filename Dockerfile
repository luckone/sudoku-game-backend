# Use an official Node.js runtime as a parent image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for faster cache during builds
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Expose the port for the app
EXPOSE 5050

# Command to run the application in development mode using ts-node-dev
CMD ["npm", "run", "dev"]
