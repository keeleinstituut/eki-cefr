# https://blog.stackademic.com/deploy-your-angular-app-with-docker-and-nginx-a5b0a3c1d06b
# syntax=docker/dockerfile:1
FROM node:22-alpine AS build
WORKDIR /app
COPY ./ .
RUN npm ci
RUN npm run build

# Use a specific version of nginx
FROM nginx:1.26-alpine

COPY --from=build /app/dist/teacher-tools /usr/share/nginx/html
# Add a custom nginx configuration
#COPY ./docker-conf/nginx.conf /etc/nginx/conf.d/default.conf

