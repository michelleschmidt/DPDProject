
FROM node:22-alpine3.19

WORKDIR /server-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "start"]
