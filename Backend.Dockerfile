FROM node:18.14.2-bullseye-slim

WORKDIR /usr/src/app

COPY ./backend/ ./

RUN npm ci --only=production

USER node

CMD [ "node", "index.js" ]
