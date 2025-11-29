# Use the official Node.js runtime as a base image
FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bullseye

# Set the working directory
WORKDIR /workspace

# Install additional system dependencies if needed
# RUN apt-get update && apt-get install -y \
#     git \
#     && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV NODE_ENV=development

# Expose ports for Vite dev server and preview
EXPOSE 5173 4173

# The base image already includes Node.js and npm
# Dependencies will be installed via postCreateCommand in devcontainer.json

