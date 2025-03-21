FROM node:20-alpine

RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Configura el entorno de producción antes de compilar
ENV NODE_ENV=production

# Asegúrate de que las variables de entorno necesarias (ej. MY_GITHUB_TOKEN) estén definidas en el entorno de build
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
