# build environment
# pull official base image
FROM node:14.16.1-alpine as build

WORKDIR /app

COPY . .

RUN set -eux; \
    ls -l * ; \
    npm -v ; \
    node -v ; \
    npm config ls -l && \
    npm install --loglevel verbose;  \
    npm run build 

# production environment
FROM nginx:stable-alpine

RUN apk add tzdata && \
    cp /usr/share/zoneinfo/America/Mexico_City /etc/localtime

COPY --from=build /app/build /usr/share/nginx/html/frontend-sigepa

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

