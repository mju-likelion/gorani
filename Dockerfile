FROM node:alpine

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
WORKDIR /usr/src/app
RUN yarn

COPY . /usr/src/app

EXPOSE 3000
CMD yarn dev
