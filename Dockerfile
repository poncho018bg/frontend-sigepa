# build environment
# pull official base image
FROM node:14.16.1-alpine as build

WORKDIR /app

COPY . .

RUN ls -l *

RUN npm -v

RUN node -v

RUN apk add tzdata

RUN cp /usr/share/zoneinfo/America/Mexico_City /etc/localtime

RUN npm install -g serve

RUN npm install --legacy-peer-deps

RUN npm run build

RUN mkdir /app/build/frontend-sigepa

RUN mv /app/build/static/ /app/build/frontend-sigepa/

RUN mv /app/build/keycloak.json /app/build/frontend-sigepa/

EXPOSE 3000

CMD ["serve", "-l", "3000", "-s", "build"]
