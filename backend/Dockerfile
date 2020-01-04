# FROM ubuntu:18.04
# RUN apt-get update

FROM node:10.16.0

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install

CMD [ "npm", "run", "dev" ]