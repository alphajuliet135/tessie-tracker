# Fetching the latest node image
FROM node:18

# Setting up the work directory
WORKDIR /api

# Installing dependencies
COPY api/package.json .
RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start