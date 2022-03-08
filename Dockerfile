FROM node:14.16.1-alpine as build

WORKDIR /app

COPY . .

RUN ls -l * && \
    npm -v && \
    node -v && \
    npm install -g serve; \
    npm install && \
    npm run build; \
    mkdir /app/build/frontend-sigeti; \
    mv /app/build/static/ /app/build/frontend-sigepa/; \
    mv /app/build/keycloak.json /app/build/frontend-sigepa/

EXPOSE 3000

CMD ["serve", "-l", "3000", "-s", "build"]