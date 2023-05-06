FROM node

WORKDIR /server

COPY package.json .

RUN npm install

EXPOSE 80

CMD ["npm", "start"]

