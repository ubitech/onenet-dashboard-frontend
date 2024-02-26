### STAGE 1: Build static files ###
FROM node:14.18.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

ARG env="prod"
ARG port="32767"

RUN npm run build${env}
### STAGE 2: Run nginx server to serve static files ###
FROM nginx:1.21.6-alpine

COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY mime.types /etc/nginx/mime.types
COPY --from=build /usr/src/app/dist/onenet /usr/share/nginx/html

COPY docker-entrypoint.sh /
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE ${port}
CMD ["nginx", "-g", "daemon off;"]
