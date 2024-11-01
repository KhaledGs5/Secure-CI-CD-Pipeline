#!/bin/bash

# Define image versions
SERVER_IMAGE="khaledgs/footback:v0.0"
CLIENT_IMAGE="khaledgs/footfront:v0.4"

echo "Starting build and push process..."

# Build and push server image
# echo "Building server image..."
# cd nodejs-express-mongodb || exit 1
# docker build -t $SERVER_IMAGE .
# if [ $? -ne 0 ]; then
#   echo "Server image build failed"
#   exit 1
# fi

# cd ..

echo "Building client image..."
cd frontend || exit 1
docker build -t $CLIENT_IMAGE .
if [ $? -ne 0 ]; then
  echo "Client image build failed"
  exit 1
fi

cd ..

echo "Build and push process completed successfully!"