FROM node:14-alpine AS build

RUN apk update && apk add curl bash
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /app
COPY ./app .

RUN npm install 
RUN npm run-script build
RUN /usr/local/bin/node-prune

FROM node:14-alpine

WORKDIR /app
COPY --chown=node:node --from=build /app .

USER node
EXPOSE 3000

CMD [ "npm", "start" ]