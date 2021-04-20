FROM node

RUN mkdir -p /usr/src/company-app
WORKDIR /usr/src/company-app

COPY . /usr/src/company-app

CMD [ "npm", "start" ]