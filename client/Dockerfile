FROM node:alpine
RUN npm install -g http-server
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8083
CMD ["npm", "start"]