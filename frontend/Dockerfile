# FROM node:20-alpine

# WORKDIR /usr/src/app

# COPY . /usr/src/app

# RUN npm install -g @angular/cli

# RUN npm install

# CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM node:20-alpine

# Create a non-root user and set up necessary directories
RUN adduser -D myuser

# Set the working directory
WORKDIR /usr/src/app

# Copy application code
COPY . /usr/src/app

# Install dependencies globally as root, then switch to the non-root user
RUN npm install -g @angular/cli
RUN npm install

# Switch to the non-root user
USER myuser

# Expose the port the app will run on
EXPOSE 4200

# Run the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0"]
