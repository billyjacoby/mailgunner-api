FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["node_modules/nodemon/bin/nodemon.js", "bin/www.js"]