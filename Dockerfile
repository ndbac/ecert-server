FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY config ./config
COPY temp ./temp

RUN yarn install
# If you are building your code for production
# RUN yarn ci --only=production

# Bundle app source
COPY . .

RUN yarn run build

EXPOSE 3000
CMD [ "node", "dist/main" ]