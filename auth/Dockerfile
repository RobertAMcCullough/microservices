FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
# --omit=dev doesn't install dev dependencies (80Mb mongo-memory-server specifically)

COPY ./ ./
CMD ["npm", "start"]