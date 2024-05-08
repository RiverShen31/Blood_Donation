# Use a specific node version as a parent image
FROM node:16-alpine

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 8080 to the outside once the container is launched
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "run", "server"]
