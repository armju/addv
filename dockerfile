FROM node:14

# We Create and change to the app directory.
WORKDIR /usr/src/app

# We Copy application dependency manifests to the container image.
COPY package*.json ./

# We Install production dependencies.
RUN npm install

# We Copy local code to the container image.
COPY . .

# We Copy the .env file
COPY .env .env

# We Run the web service on container startup.
CMD [ "npm", "start" ]
