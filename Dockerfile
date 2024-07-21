FROM node:18-alpine

WORKDIR /app


#  copy package.json, install packages and copy sources
COPY package*.json ./

RUN npm install --force

COPY . /app

RUN npm run build


CMD ["npm", "run", "start"]