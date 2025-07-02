FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm clean cache --force

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]
