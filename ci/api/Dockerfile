FROM node:14-alpine AS build

WORKDIR /app
RUN apk update && apk add curl bash
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

COPY ./api .

RUN npm install
RUN npm run webpack:prod
RUN /usr/local/bin/node-prune

FROM node:14-alpine

WORKDIR /app
COPY --chown=node:node --from=build /app .

USER node
EXPOSE 7000

CMD [ "node", "dist/index" ]