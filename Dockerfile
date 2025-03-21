FROM node:20-alpine

ARG MY_GITHUB_TOKEN
ENV MY_GITHUB_TOKEN=$MY_GITHUB_TOKEN

RUN apk add --no-cache git
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production

# Aquí Next.js ya verá MY_GITHUB_TOKEN en tiempo de build
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
