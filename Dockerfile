FROM node:20-alpine

# Instala Git usando apk (el gestor de paquetes de Alpine)
RUN apk add --no-cache git

WORKDIR /app

# Copia los archivos de dependencias e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que Next.js corre por defecto
EXPOSE 3000

# Comando por defecto para iniciar Next.js en modo desarrollo
CMD ["npm", "run", "dev"]
