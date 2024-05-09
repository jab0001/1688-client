FROM node:18.15-alpine3.17 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx as production-stage

WORKDIR /var/www

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /var/www

EXPOSE 80
