# Etapa 1: Instalación de dependencias
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Etapa 2: Construcción del proyecto
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# --- SOLUCIÓN AL ERROR DE PRERENDER ---
# Definimos el argumento de construcción
ARG MY_GITHUB_TOKEN
# Lo exportamos como variable de entorno para que 'npm run build' pueda usarlo
ENV MY_GITHUB_TOKEN=$MY_GITHUB_TOKEN

# Desactivar telemetría de Next.js durante el build (Sintaxis corregida)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Etapa 3: Imagen de producción
FROM node:20-alpine AS runner
WORKDIR /app

# Sintaxis corregida: KEY=VALUE
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear un usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios desde la etapa de construcción
COPY --from=builder /app/public ./public

# Setear permisos para la cache de Next
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar el output standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

# El archivo server.js es generado automáticamente por el modo standalone
CMD ["node", "server.js"]