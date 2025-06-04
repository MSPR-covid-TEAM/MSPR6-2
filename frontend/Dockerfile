# frontend/Dockerfile

# Étape 1 : Builder Angular
FROM node:20 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Si NODE_ENV=production, on fait le build
RUN if [ "$NODE_ENV" = "production" ]; then npm run build -- --configuration=production; fi

# Étape 2a : Pour la PROD - utiliser NGINX pour servir les fichiers
FROM nginx:alpine AS prod
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Étape 2b : Pour la DEV - utiliser ng serve
FROM node:20 as dev
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 4200
CMD ["npm", "run", "start"]
