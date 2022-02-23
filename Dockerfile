# build environment
# pull official base image
FROM node:14.16.1-alpine as build

WORKDIR /app

COPY . .

RUN ls -l * && \
    npm -v && \
    node -v && \
    npm install && \
    npm run build 

FROM node:14.16.1-alpine
WORKDIR /app

RUN apk add tzdata && \
    cp /usr/share/zoneinfo/America/Mexico_City /etc/localtime && \
    npm install -g serve && \
    mkdir -p /app/build/frontend-sigepa

COPY --from=build /app/build /app/build/frontend-sigepa/
COPY --from=build /app/build/keycloak.json /app/build/frontend-sigepa/

EXPOSE 3000

CMD ["serve", "-l", "3000", "-s", "build"]

