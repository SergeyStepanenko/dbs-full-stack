FROM node:10.16.0

WORKDIR /app

COPY ./tsconfig.json ./tsconfig.json
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
