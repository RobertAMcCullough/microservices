FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
# cache will be used up to this line, so changing src code won't cause npm install to run again
COPY . .

CMD ["npm", "run", "dev"]