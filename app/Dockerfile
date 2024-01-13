FROM node:alpine

RUN mkdir -p /usr/app
ENV PORT 3000

WORKDIR /usr/app

COPY . /usr/app

RUN npm install 
RUN npm build

EXPOSE 3000
CMD [ "npm", "start" ]