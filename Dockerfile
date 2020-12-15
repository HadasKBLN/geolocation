FROM node:8-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies (package.json + package-lock.json)
COPY package*.json ./

RUN npm config set strict-ssl false

RUN npm install

RUN npm config set strict-ssl true

# Copy app source file
COPY . .

ENTRYPOINT npm start