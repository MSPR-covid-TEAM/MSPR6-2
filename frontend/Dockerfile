FROM node:20 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Ajoute un ARG pour choisir la config Angular
ARG CONFIG=production
RUN npm run build -- --configuration=$CONFIG

FROM nginx:alpine
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
