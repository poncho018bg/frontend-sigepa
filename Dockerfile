# build environment
# pull official base image
FROM node:14.16.1-alpine as build

WORKDIR /app

COPY . .

RUN ls -l *

RUN npm -v

RUN node -v

RUN npm install -g serve

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["serve", "-l", "3000", "-s", "build"]