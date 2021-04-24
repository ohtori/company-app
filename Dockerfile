FROM node

RUN mkdir -p /usr/src/company-app
WORKDIR /usr/src/company-app

COPY . /usr/src/company-app

EXPOSE 8080

ENV TZ Europe/Samara

CMD [ "npm", "start" ]