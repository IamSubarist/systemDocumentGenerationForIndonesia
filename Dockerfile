FROM node:20.9.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm install -g serve
COPY . .

CMD ["serve", "-s", "build"]